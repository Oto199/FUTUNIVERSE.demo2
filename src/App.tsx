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
import { optimizeProductImages, FALLBACK_JERSEY_IMAGE, sanitizeImageUrl } from './lib/imageUtils';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname + window.location.search);
  const [lang, setLang] = useState<'ka' | 'en'>('ka');

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear legacy caches that might contain old stock photos or broken /uploads/ paths
      localStorage.removeItem('fut_products_v3');
      localStorage.removeItem('fut_products_v4');
      localStorage.removeItem('fut_products_v5');
      localStorage.removeItem('fut_products_v6');

      const stored = localStorage.getItem('fut_products_v7');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If stored items contain obsolete stock photos or invalid /uploads/ paths, discard and use clean initial products
          const hasInvalidImages = parsed.some((p: Product) => 
            !p?.imageFront || 
            p.imageFront.includes('images.unsplash.com') || 
            p.imageFront.includes('picsum.photos') ||
            p.imageFront.startsWith('/uploads/')
          );
          if (!hasInvalidImages) {
            return parsed;
          }
        }
      }
    } catch (e) {}
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('fut_products_v7', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  const [players, setPlayers] = useState<PlayerInfo[]>(INITIAL_PLAYERS);
  const [teams, setTeams] = useState<TeamInfo[]>(INITIAL_TEAMS);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem('fut_blog_posts_v4') || localStorage.getItem('fut_blog_posts_v3');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map<string, BlogPost>();
          INITIAL_BLOG_POSTS.forEach(b => map.set(b.slug, b));
          parsed.forEach((b: BlogPost) => {
            if (b?.slug) {
              const item = { ...(map.get(b.slug) || {}), ...b };
              if (b.slug === 'back-to-school-sale-2026' && (!b.coverImage || b.coverImage.includes('unsplash.com'))) {
                item.coverImage = '/back-to-school-poster.jpg';
              }
              map.set(b.slug, item);
            }
          });
          return Array.from(map.values());
        }
      }
    } catch (e) {}
    return INITIAL_BLOG_POSTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('fut_blog_posts_v4', JSON.stringify(blogPosts));
    } catch (e) {}
  }, [blogPosts]);

  const isDataUrl = (url?: string) => Boolean(url && (url.startsWith('data:image/') || url.startsWith('blob:')));
  const isDefaultUnsplash = (url?: string) => !url || url.includes('images.unsplash.com');

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
      if (isDefaultUnsplash(bestFront) || (bestFront && bestFront.startsWith('/uploads/'))) {
        bestFront = initial?.imageFront || bestFront;
      }
      bestFront = sanitizeImageUrl(bestFront, initial?.imageFront || FALLBACK_JERSEY_IMAGE);

      let bestBack = p.imageBack;
      if (isDefaultUnsplash(bestBack) || (bestBack && bestBack.startsWith('/uploads/'))) {
        bestBack = initial?.imageBack || bestBack;
      }
      if (bestBack) {
        bestBack = sanitizeImageUrl(bestBack, initial?.imageBack);
      }

      let rawImages = Array.isArray(p.images) && p.images.length > 0 ? p.images : (initial?.images || [bestFront]);
      if (rawImages.some(img => isDefaultUnsplash(img) || (img && img.startsWith('/uploads/'))) && initial?.images) {
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
    let localStored: BlogPost[] = [];
    try {
      const stored = localStorage.getItem('fut_blog_posts_v3');
      if (stored) localStored = JSON.parse(stored);
    } catch (e) {}

    const map = new Map<string, BlogPost>();

    // 1. Initial code posts
    INITIAL_BLOG_POSTS.forEach(bp => map.set(bp.slug, bp));

    // 2. Overlay Local Storage
    localStored.forEach(bp => {
      if (bp.slug) map.set(bp.slug, bp);
    });

    // 3. Overlay Firestore (Cloud Database)
    if (Array.isArray(incomingFromDb)) {
      incomingFromDb.forEach(bp => {
        if (bp.slug) {
          const existing = map.get(bp.slug);
          map.set(bp.slug, existing ? { ...existing, ...bp } : bp);
        }
      });
    }

    // Ensure Back to School poster is preserved if previous db record has placeholder
    const schoolPost = map.get('back-to-school-sale-2026');
    if (schoolPost && (!schoolPost.coverImage || schoolPost.coverImage.includes('unsplash.com'))) {
      schoolPost.coverImage = '/back-to-school-poster.jpg';
    }

    return Array.from(map.values());
  };

  // Real-time Firestore subscriptions + Local IndexedDB caching
  useEffect(() => {
    // 1. Instant load from local IndexedDB cache (0ms perceived latency & saves Firestore quotas)
    getCachedData<Product[]>('products').then(cached => {
      if (Array.isArray(cached) && cached.length > 0) {
        const hasInvalid = cached.some((p: Product) => 
          !p?.imageFront || 
          p.imageFront.includes('images.unsplash.com') || 
          p.imageFront.includes('picsum.photos') ||
          p.imageFront.startsWith('/uploads/')
        );
        if (!hasInvalid) {
          setProducts(mergeProducts(cached));
        }
      }
    });
    getCachedData<BlogPost[]>('blogPosts').then(cached => {
      if (Array.isArray(cached) && cached.length > 0) {
        setBlogPosts(mergeBlogPosts(cached));
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
        setPlayers(data);
        setCachedData('players', data);
      }
    });

    const unsubTeams = subscribeTeams((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setTeams(data);
        setCachedData('teams', data);
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
        coverImage: sanitizeImageUrl(newPostData.coverImage, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80'),
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
