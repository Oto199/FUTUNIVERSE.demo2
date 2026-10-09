import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { PlayerLandingPage } from './pages/PlayerLandingPage';
import { TeamLandingPage } from './pages/TeamLandingPage';
import { JournalPage } from './pages/JournalPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

import { INITIAL_PRODUCTS, INITIAL_PLAYERS, INITIAL_TEAMS, INITIAL_BLOG_POSTS } from './data/initialData';
import { Product, PlayerInfo, TeamInfo, BlogPost } from './types';
import { 
  subscribeProducts, 
  subscribePlayers, 
  subscribeTeams, 
  subscribeBlogPosts,
  dbAddProduct,
  dbUpdateProduct,
  dbDeleteProduct,
  dbAddBlogPost,
  dbUpdateBlogPost,
  dbDeleteBlogPost
} from './lib/firebase';
import { getCachedData, setCachedData } from './lib/storageCache';
import { optimizeProductImages, FALLBACK_JERSEY_IMAGE, sanitizeImageUrl, isBrokenImageUrl, INLINE_SVG_JERSEY } from './lib/imageUtils';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname + window.location.search);
  const [lang, setLang] = useState<'ka' | 'en'>('ka');

  // Helper sanitizers for players and teams
  const sanitizePlayers = (incoming: PlayerInfo[]): PlayerInfo[] => {
    if (!Array.isArray(incoming) || incoming.length === 0) return INITIAL_PLAYERS;
    const initialMap = new Map<string, PlayerInfo>(INITIAL_PLAYERS.map(p => [p.slug, p]));
    return incoming.map(pl => {
      const initial = initialMap.get(pl.slug);
      let img = pl.image;
      if (isBrokenImageUrl(img)) {
        img = initial?.image || INLINE_SVG_JERSEY;
      }
      return {
        ...(initial || {}),
        ...pl,
        image: sanitizeImageUrl(img, initial?.image || INLINE_SVG_JERSEY)
      };
    });
  };

  const sanitizeTeams = (incoming: TeamInfo[]): TeamInfo[] => {
    if (!Array.isArray(incoming) || incoming.length === 0) return INITIAL_TEAMS;
    const initialMap = new Map<string, TeamInfo>(INITIAL_TEAMS.map(t => [t.slug, t]));
    return incoming.map(t => {
      const initial = initialMap.get(t.slug);
      let img = t.heroImage;
      if (isBrokenImageUrl(img)) {
        img = initial?.heroImage || INLINE_SVG_JERSEY;
      }
      return {
        ...(initial || {}),
        ...t,
        heroImage: sanitizeImageUrl(img, initial?.heroImage || INLINE_SVG_JERSEY)
      };
    });
  };

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear all legacy caches that might contain old stock photos or broken /uploads/ paths
      ['fut_products_v1', 'fut_products_v2', 'fut_products_v3', 'fut_products_v4', 'fut_products_v5', 'fut_products_v6', 'fut_products_v7'].forEach(k => {
        localStorage.removeItem(k);
      });

      const stored = localStorage.getItem('fut_products_v8');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasInvalid = parsed.some((p: Product) => isBrokenImageUrl(p?.imageFront));
          if (!hasInvalid) {
            return parsed;
          }
        }
      }
    } catch (e) {}
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('fut_products_v8', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  const [players, setPlayers] = useState<PlayerInfo[]>(() => {
    try {
      ['fut_players_v1', 'fut_players_v2', 'fut_players_v3', 'fut_players_v4'].forEach(k => localStorage.removeItem(k));
      const stored = localStorage.getItem('fut_players_v5');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some((p: PlayerInfo) => isBrokenImageUrl(p?.image))) {
          return sanitizePlayers(parsed);
        }
      }
    } catch (e) {}
    return INITIAL_PLAYERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('fut_players_v5', JSON.stringify(players));
    } catch (e) {}
  }, [players]);

  const [teams, setTeams] = useState<TeamInfo[]>(() => {
    try {
      ['fut_teams_v1', 'fut_teams_v2', 'fut_teams_v3', 'fut_teams_v4'].forEach(k => localStorage.removeItem(k));
      const stored = localStorage.getItem('fut_teams_v5');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some((t: TeamInfo) => isBrokenImageUrl(t?.heroImage))) {
          return sanitizeTeams(parsed);
        }
      }
    } catch (e) {}
    return INITIAL_TEAMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('fut_teams_v5', JSON.stringify(teams));
    } catch (e) {}
  }, [teams]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      ['fut_blog_posts_v1', 'fut_blog_posts_v2', 'fut_blog_posts_v3', 'fut_blog_posts_v4'].forEach(k => localStorage.removeItem(k));
      const stored = localStorage.getItem('fut_blog_posts_v5');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasInvalid = parsed.some((b: BlogPost) => isBrokenImageUrl(b?.coverImage));
          if (!hasInvalid) {
            return parsed;
          }
        }
      }
    } catch (e) {}
    return INITIAL_BLOG_POSTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('fut_blog_posts_v5', JSON.stringify(blogPosts));
    } catch (e) {}
  }, [blogPosts]);

  // Helper to merge incoming database products: authority is always Firestore/Cloud DB.
  // Deleted products in DB must NEVER be resurrected.
  const mergeProducts = (incomingFromDb: Product[]): Product[] => {
    if (!Array.isArray(incomingFromDb) || incomingFromDb.length === 0) {
      return INITIAL_PRODUCTS;
    }

    const initialMap = new Map<string, Product>();
    INITIAL_PRODUCTS.forEach(p => initialMap.set(p.id, p));

    return incomingFromDb.map(p => {
      const initial = initialMap.get(p.id);

      // Determine best front image: prefer valid base64 data URLs or clean images, avoid 404-prone /uploads/ paths and unsplash
      let bestFront = p.imageFront;
      if (isBrokenImageUrl(bestFront)) {
        bestFront = initial?.imageFront || FALLBACK_JERSEY_IMAGE;
      }
      bestFront = sanitizeImageUrl(bestFront, initial?.imageFront || FALLBACK_JERSEY_IMAGE);

      let bestBack = p.imageBack;
      if (isBrokenImageUrl(bestBack)) {
        bestBack = initial?.imageBack || undefined;
      }
      if (bestBack) {
        bestBack = sanitizeImageUrl(bestBack, initial?.imageBack);
      }

      let rawImages = Array.isArray(p.images) && p.images.length > 0 ? p.images : (initial?.images || [bestFront]);
      if (rawImages.some(img => isBrokenImageUrl(img)) && initial?.images) {
        rawImages = initial.images;
      }
      const sanitizedImages = rawImages.map(img => sanitizeImageUrl(img, bestFront));

      const mergedProd: Product = {
        ...(initial || {}),
        ...p,
        imageFront: bestFront,
        imageBack: bestBack,
        images: sanitizedImages
      };

      if (!mergedProd.originalPrice || (mergedProd.price && mergedProd.originalPrice <= mergedProd.price)) {
        delete mergedProd.originalPrice;
      }

      return mergedProd;
    });
  };

  const mergeBlogPosts = (incomingFromDb: BlogPost[]): BlogPost[] => {
    const map = new Map<string, BlogPost>();

    // 1. Initial code posts
    INITIAL_BLOG_POSTS.forEach(bp => map.set(bp.slug, bp));

    // 2. Overlay Firestore (Cloud Database)
    if (Array.isArray(incomingFromDb)) {
      incomingFromDb.forEach(bp => {
        if (bp.slug) {
          const existing = map.get(bp.slug);
          let cover = bp.coverImage;
          if (isBrokenImageUrl(cover)) {
            cover = existing?.coverImage || '/back-to-school-poster.jpg';
          }
          map.set(bp.slug, {
            ...(existing || {}),
            ...bp,
            coverImage: sanitizeImageUrl(cover, existing?.coverImage || '/back-to-school-poster.jpg')
          });
        }
      });
    }

    return Array.from(map.values());
  };

  // Real-time Firestore subscriptions + Local IndexedDB caching
  useEffect(() => {
    // 1. Instant load from local IndexedDB cache (0ms perceived latency & saves Firestore quotas)
    getCachedData<Product[]>('products').then(cached => {
      if (Array.isArray(cached) && cached.length > 0) {
        const hasInvalid = cached.some((p: Product) => isBrokenImageUrl(p?.imageFront));
        if (!hasInvalid) {
          setProducts(mergeProducts(cached));
        }
      }
    });
    getCachedData<BlogPost[]>('blogPosts').then(cached => {
      if (Array.isArray(cached) && cached.length > 0) {
        const hasInvalid = cached.some((b: BlogPost) => isBrokenImageUrl(b?.coverImage));
        if (!hasInvalid) {
          setBlogPosts(mergeBlogPosts(cached));
        }
      }
    });
    getCachedData<PlayerInfo[]>('players').then(cached => {
      if (Array.isArray(cached) && cached.length > 0) {
        const hasInvalid = cached.some((pl: PlayerInfo) => isBrokenImageUrl(pl?.image));
        if (!hasInvalid) {
          setPlayers(sanitizePlayers(cached));
        }
      }
    });
    getCachedData<TeamInfo[]>('teams').then(cached => {
      if (Array.isArray(cached) && cached.length > 0) {
        const hasInvalid = cached.some((t: TeamInfo) => isBrokenImageUrl(t?.heroImage));
        if (!hasInvalid) {
          setTeams(sanitizeTeams(cached));
        }
      }
    });

    // 2. Real-time Firestore event subscriptions (Cloud authority)
    const unsubProducts = subscribeProducts((data) => {
      if (Array.isArray(data)) {
        const merged = mergeProducts(data);
        setProducts(merged);
        setCachedData('products', merged);
      }
    });

    const unsubPlayers = subscribePlayers((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const sanitized = sanitizePlayers(data);
        setPlayers(sanitized);
        setCachedData('players', sanitized);
      }
    });

    const unsubTeams = subscribeTeams((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const sanitized = sanitizeTeams(data);
        setTeams(sanitized);
        setCachedData('teams', sanitized);
      }
    });

    const unsubBlog = subscribeBlogPosts((data) => {
      if (Array.isArray(data)) {
        const merged = mergeBlogPosts(data);
        setBlogPosts(merged);
        setCachedData('blogPosts', merged);
      }
    });

    return () => {
      unsubProducts();
      unsubPlayers();
      unsubTeams();
      unsubBlog();
    };
  }, []);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Product handler (Firestore + API + Local State)
  const handleAddProduct = async (newProdData: Partial<Product>) => {
    try {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        titleKa: newProdData.titleKa || 'ახალი მაისური',
        titleEn: newProdData.titleEn || 'New Jersey',
        playerSlug: newProdData.playerSlug || 'custom',
        playerKa: newProdData.playerKa || 'მოთამაშე',
        playerEn: newProdData.playerEn || 'Player',
        number: Number(newProdData.number) || 10,
        nationalTeamKa: newProdData.nationalTeamKa || 'საქართველო',
        nationalTeamEn: newProdData.nationalTeamEn || 'Georgia',
        teamSlug: newProdData.teamSlug || 'georgia',
        clubKa: newProdData.clubKa || '',
        clubEn: newProdData.clubEn || '',
        category: newProdData.category || 'Jersey',
        kitType: newProdData.kitType || 'Home',
        sizes: newProdData.sizes || ['S', 'M', 'L', 'XL'],
        price: Number(newProdData.price) || 140,
        originalPrice: newProdData.originalPrice ? Number(newProdData.originalPrice) : undefined,
        isFeatured: Boolean(newProdData.isFeatured),
        isWc26: Boolean(newProdData.isWc26),
        isNiche: Boolean(newProdData.isNiche),
        imageFront: sanitizeImageUrl(newProdData.imageFront, FALLBACK_JERSEY_IMAGE),
        imageBack: newProdData.imageBack ? sanitizeImageUrl(newProdData.imageBack) : '',
        images: newProdData.images || [sanitizeImageUrl(newProdData.imageFront, FALLBACK_JERSEY_IMAGE)],
        descriptionKa: newProdData.descriptionKa || 'FUT Universe-ის ახალი ექსპონატი.',
        descriptionEn: newProdData.descriptionEn || 'New addition to FUT Universe library.',
        inStock: true,
        releaseYear: 2026,
        tags: newProdData.tags || ['WC26', 'Jersey']
      };

      // Optimistically optimize any heavy images to WebP/URL to ensure tiny Firestore document size
      const optimizedProd = await optimizeProductImages(newProd);

      // Optimistic state update
      setProducts(prev => [optimizedProd, ...prev]);

      // Save to Firestore (Real-time Cloud Database)
      await dbAddProduct(optimizedProd);

      // Also notify local Express server and persist images to server disk
      try {
        const apiRes = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer shotarameqeni' },
          body: JSON.stringify({ ...optimizedProd, adminSecret: 'shotarameqeni' })
        });
        if (apiRes.ok) {
          const persistedProd = await apiRes.json();
          setProducts(prev => prev.map(p => p.id === optimizedProd.id ? persistedProd : p));
        }
      } catch (e) {
        console.warn('Server sync error on add:', e);
      }

    } catch (e) {
      console.error('Failed to add product:', e);
    }
  };

  // Delete Product handler
  const handleDeleteProduct = async (productId: string) => {
    try {
      setProducts(prev => prev.filter(p => p.id !== productId));
      await dbDeleteProduct(productId);
      fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer shotarameqeni', 'x-admin-secret': 'shotarameqeni' }
      }).catch(() => {});
    } catch (e) {
      console.error('Failed to delete product:', e);
    }
  };

  // Update Product handler
  const handleUpdateProduct = async (productId: string, updatedData: Partial<Product>) => {
    try {
      const optimizedData = await optimizeProductImages(updatedData);
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...optimizedData } as Product : p));
      await dbUpdateProduct(productId, optimizedData);
      try {
        const apiRes = await fetch(`/api/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer shotarameqeni' },
          body: JSON.stringify({ ...optimizedData, adminSecret: 'shotarameqeni' })
        });
        if (apiRes.ok) {
          const persistedProd = await apiRes.json();
          setProducts(prev => prev.map(p => p.id === productId ? persistedProd : p));
        }
      } catch (e) {
        console.warn('Server sync error on update:', e);
      }
    } catch (e) {
      console.error('Failed to update product:', e);
    }
  };

  // Add Blog Post handler
  const handleAddBlogPost = async (newPostData: Partial<BlogPost>) => {
    try {
      const newPost: BlogPost = {
        slug: newPostData.slug || `post-${Date.now()}`,
        titleKa: newPostData.titleKa || '',
        titleEn: newPostData.titleEn || '',
        excerptKa: newPostData.excerptKa || '',
        excerptEn: newPostData.excerptEn || '',
        contentKa: newPostData.contentKa || '',
        contentEn: newPostData.contentEn || '',
        publishDate: new Date().toISOString().split('T')[0],
        readTime: '4 წუთი',
        coverImage: sanitizeImageUrl(newPostData.coverImage, INLINE_SVG_JERSEY),
        author: 'FUT Universe Editorial',
        tags: newPostData.tags || ['FUT Universe', 'Georgia'],
        relatedPlayerSlugs: newPostData.relatedPlayerSlugs || []
      };

      await dbAddBlogPost(newPost);

      // Optimistic update
      setBlogPosts(prev => [newPost, ...prev.filter(b => b.slug !== newPost.slug)]);

      fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newPost, adminSecret: 'shotarameqeni' })
      }).catch(() => {});
    } catch (e) {
      console.error('Failed to add blog post:', e);
    }
  };

  // Update Blog Post handler
  const handleUpdateBlogPost = async (slug: string, updatedData: Partial<BlogPost>) => {
    try {
      setBlogPosts(prev => prev.map(b => b.slug === slug ? { ...b, ...updatedData } as BlogPost : b));
      await dbUpdateBlogPost(slug, updatedData);
    } catch (e) {
      console.error('Failed to update blog post:', e);
    }
  };

  // Delete Blog Post handler
  const handleDeleteBlogPost = async (slug: string) => {
    try {
      setBlogPosts(prev => prev.filter(b => b.slug !== slug));
      await dbDeleteBlogPost(slug);
    } catch (e) {
      console.error('Failed to delete blog post:', e);
    }
  };

  // Route parser
  const pathWithoutQuery = currentPath.split('?')[0];
  const urlParams = new URLSearchParams(currentPath.split('?')[1] || '');

  let pageContent = null;

  if (pathWithoutQuery === '/' || pathWithoutQuery === '') {
    pageContent = (
      <HomePage
        products={products}
        players={players}
        teams={teams}
        blogPosts={blogPosts}
        navigate={navigate}
        lang={lang}
      />
    );
  } else if (pathWithoutQuery === '/shop') {
    const isWc26Only = urlParams.get('wc26') === 'true';
    const playerParam = urlParams.get('player') || 'all';
    const teamParam = urlParams.get('team') || 'all';
    pageContent = (
      <ShopPage
        products={products}
        players={players}
        teams={teams}
        navigate={navigate}
        lang={lang}
        initialFilter={{ isWc26Only, player: playerParam, nationalTeam: teamParam }}
      />
    );
  } else if (pathWithoutQuery.startsWith('/product/')) {
    const id = pathWithoutQuery.replace('/product/', '');
    pageContent = (
      <ProductPage
        productId={id}
        products={products}
        players={players}
        navigate={navigate}
        lang={lang}
      />
    );
  } else if (pathWithoutQuery.startsWith('/player/') || pathWithoutQuery.startsWith('/მაისური/')) {
    const slug = pathWithoutQuery.replace('/player/', '').replace('/მაისური/', '');
    pageContent = (
      <PlayerLandingPage
        playerSlug={slug}
        players={players}
        products={products}
        navigate={navigate}
        lang={lang}
      />
    );
  } else if (pathWithoutQuery.startsWith('/team/') || pathWithoutQuery.startsWith('/გუნდი/')) {
    const slug = pathWithoutQuery.replace('/team/', '').replace('/გუნდი/', '');
    pageContent = (
      <TeamLandingPage
        teamSlug={slug}
        teams={teams}
        products={products}
        players={players}
        navigate={navigate}
        lang={lang}
      />
    );
  } else if (pathWithoutQuery === '/journal') {
    pageContent = (
      <JournalPage
        blogPosts={blogPosts}
        navigate={navigate}
        lang={lang}
      />
    );
  } else if (pathWithoutQuery.startsWith('/journal/')) {
    const slug = pathWithoutQuery.replace('/journal/', '');
    pageContent = (
      <BlogPostPage
        postSlug={slug}
        blogPosts={blogPosts}
        players={players}
        products={products}
        navigate={navigate}
        lang={lang}
      />
    );
  } else if (pathWithoutQuery === '/about') {
    pageContent = (
      <AboutPage
        navigate={navigate}
        lang={lang}
      />
    );
  } else if (pathWithoutQuery === '/contact') {
    pageContent = (
      <ContactPage
        lang={lang}
      />
    );
  } else if (pathWithoutQuery === '/admin') {
    pageContent = (
      <AdminPage
        products={products}
        blogPosts={blogPosts}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddBlogPost={handleAddBlogPost}
        onUpdateBlogPost={handleUpdateBlogPost}
        onDeleteBlogPost={handleDeleteBlogPost}
        lang={lang}
      />
    );
  } else if (pathWithoutQuery === '/sitemap.xml') {
    const baseUrl = 'https://futuniverse.ge';
    const staticPages = ['/', '/shop', '/about', '/contact', '/journal'];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    staticPages.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    });
    players.forEach(pl => {
      xml += `  <url>\n    <loc>${baseUrl}/player/${pl.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });
    teams.forEach(t => {
      xml += `  <url>\n    <loc>${baseUrl}/team/${t.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });
    products.forEach(pr => {
      xml += `  <url>\n    <loc>${baseUrl}/product/${pr.id}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    blogPosts.forEach(b => {
      xml += `  <url>\n    <loc>${baseUrl}/journal/${b.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;

    return (
      <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs sm:text-sm p-4 sm:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-700 text-xs font-sans">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-[#008ba3] text-white font-semibold">XML Sitemap</span>
              <span className="text-zinc-400">https://futuniverse.ge/sitemap.xml</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigator.clipboard?.writeText(xml)}
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 transition cursor-pointer"
              >
                Copy XML
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 transition cursor-pointer"
              >
                ← Back to Site
              </button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap break-all leading-relaxed select-all bg-[#141414] p-4 rounded-lg border border-zinc-800 overflow-x-auto">
            {xml}
          </pre>
        </div>
      </div>
    );
  } else if (pathWithoutQuery === '/robots.txt') {
    const robotsTxt = `User-agent: *\nAllow: /\nSitemap: https://futuniverse.ge/sitemap.xml\n`;
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs sm:text-sm p-4 sm:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-700 text-xs font-sans">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-[#008ba3] text-white font-semibold">robots.txt</span>
              <span className="text-zinc-400">https://futuniverse.ge/robots.txt</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 transition cursor-pointer"
            >
              ← Back to Site
            </button>
          </div>
          <pre className="whitespace-pre-wrap break-all leading-relaxed select-all bg-[#141414] p-4 rounded-lg border border-zinc-800">
            {robotsTxt}
          </pre>
        </div>
      </div>
    );
  } else {
    // Fallback to Shop
    pageContent = (
      <ShopPage
        products={products}
        players={players}
        teams={teams}
        navigate={navigate}
        lang={lang}
      />
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen text-zinc-900 flex flex-col justify-between font-sans selection:bg-[#00e5ff] selection:text-black">
      <Navbar
        currentPath={pathWithoutQuery}
        navigate={navigate}
        lang={lang}
        setLang={setLang}
        products={products}
        players={players}
        teams={teams}
      />

      <main className="flex-1">
        {pageContent}
      </main>

      <Footer
        navigate={navigate}
        lang={lang}
        players={players}
        teams={teams}
      />
    </div>
  );
}
