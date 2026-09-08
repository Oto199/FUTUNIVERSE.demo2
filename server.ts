import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS, INITIAL_PLAYERS, INITIAL_TEAMS, INITIAL_BLOG_POSTS } from './src/data/initialData.js';
import { Product, PlayerInfo, TeamInfo, BlogPost } from './src/types.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Data persistence setup
  const DATA_DIR = path.join(process.cwd(), 'data');
  const DATA_FILE = path.join(DATA_DIR, 'store.json');

  // Static uploads directory for permanent shirt photos
  const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '30d', immutable: true }));

  function saveBase64Image(dataUrl: string, prefix = 'shirt'): string {
    if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
      return dataUrl;
    }
    try {
      const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (!match) return dataUrl;
      const rawExt = match[1].toLowerCase();
      const ext = rawExt === 'jpeg' ? 'jpg' : rawExt === 'svg+xml' ? 'svg' : rawExt;
      const buffer = Buffer.from(match[2], 'base64');
      const safePrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
      const filename = `${safePrefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filepath = path.join(UPLOADS_DIR, filename);
      fs.writeFileSync(filepath, buffer);
      console.log(`[Upload] Persisted shirt image to disk: ${filename} (${buffer.length} bytes)`);
      return `/uploads/${filename}`;
    } catch (e) {
      console.warn('Failed to save base64 image to disk:', e);
      return dataUrl;
    }
  }

  let products: Product[] = [...INITIAL_PRODUCTS];
  let players: PlayerInfo[] = [...INITIAL_PLAYERS];
  let teams: TeamInfo[] = [...INITIAL_TEAMS];
  let blogPosts: BlogPost[] = [...INITIAL_BLOG_POSTS];
  let contactMessages: Array<{ id: string; name: string; contact: string; message: string; date: string }> = [];

  // Try loading from store.json if available
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.products) products = parsed.products;
      if (parsed.players) players = parsed.players;
      if (parsed.teams) teams = parsed.teams;
      if (parsed.blogPosts) blogPosts = parsed.blogPosts;
      if (parsed.contactMessages) contactMessages = parsed.contactMessages;
      console.log('Loaded persistent store from data/store.json');
    } else {
      fs.writeFileSync(DATA_FILE, JSON.stringify({ products, players, teams, blogPosts, contactMessages }, null, 2));
      console.log('Initialized data/store.json with default library items');
    }
  } catch (err) {
    console.warn('Could not read/write store.json, using in-memory state:', err);
  }

  const saveData = () => {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify({ products, players, teams, blogPosts, contactMessages }, null, 2));
    } catch (e) {
      console.error('Failed to save store.json:', e);
    }
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', storeItems: products.length });
  });

  // Get Products with filtering & sorting
  app.get('/api/products', (req, res) => {
    let result = [...products];
    const { team, player, category, kitType, size, minPrice, maxPrice, sort, q, wc26, niche } = req.query;

    if (q) {
      const queryStr = String(q).toLowerCase();
      result = result.filter(p =>
        p.titleKa.toLowerCase().includes(queryStr) ||
        p.titleEn.toLowerCase().includes(queryStr) ||
        p.playerKa.toLowerCase().includes(queryStr) ||
        p.playerEn.toLowerCase().includes(queryStr) ||
        p.nationalTeamKa.toLowerCase().includes(queryStr) ||
        p.nationalTeamEn.toLowerCase().includes(queryStr) ||
        (p.clubKa && p.clubKa.toLowerCase().includes(queryStr)) ||
        (p.clubEn && p.clubEn.toLowerCase().includes(queryStr)) ||
        p.tags.some(t => t.toLowerCase().includes(queryStr))
      );
    }

    if (team && team !== 'all') {
      result = result.filter(p => p.teamSlug === team || p.nationalTeamEn.toLowerCase() === String(team).toLowerCase());
    }

    if (player && player !== 'all') {
      result = result.filter(p => p.playerSlug === player || p.playerEn.toLowerCase().includes(String(player).toLowerCase()));
    }

    if (category && category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
    }

    if (kitType && kitType !== 'all') {
      result = result.filter(p => p.kitType.toLowerCase() === String(kitType).toLowerCase());
    }

    if (size && size !== 'all') {
      result = result.filter(p => p.sizes.includes(String(size) as any));
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    if (wc26 === 'true') {
      result = result.filter(p => p.isWc26);
    }

    if (niche === 'true') {
      result = result.filter(p => p.isNiche);
    }

    // Sort
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'popular') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    } else {
      // Default: newest
      result.sort((a, b) => b.releaseYear - a.releaseYear);
    }

    res.json(result);
  });

  // Get Single Product
  app.get('/api/products/:id', (req, res) => {
    const prod = products.find(p => p.id === req.params.id);
    if (!prod) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Related products logic
    const related = products.filter(p => p.id !== prod.id && (p.teamSlug === prod.teamSlug || p.category === prod.category || p.isNiche === prod.isNiche)).slice(0, 4);
    res.json({ product: prod, related });
  });

  const checkAdminAuth = (req: express.Request): boolean => {
    const authHeader = req.headers.authorization;
    const adminSecret = req.body?.adminSecret || req.headers['x-admin-secret'];
    const valid = ['shotarameqeni', 'fut2026'];
    return (authHeader ? valid.some(v => authHeader === `Bearer ${v}`) : false) || 
           (adminSecret ? valid.includes(adminSecret as string) : false);
  };

  // Image Upload API (Accepts Base64 JSON and saves permanent file on disk)
  app.post('/api/upload', (req, res) => {
    try {
      const { image, name, prefix } = req.body;
      if (!image || typeof image !== 'string') {
        return res.status(400).json({ error: 'No image data provided' });
      }
      const filePrefix = prefix || (name ? String(name).replace(/\.[^/.]+$/, '') : 'shirt');
      const savedUrl = saveBase64Image(image, filePrefix);
      res.json({ url: savedUrl, success: true });
    } catch (err: any) {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // Uploaded Images Library (for inspection and recovery)
  app.get('/api/uploads', (req, res) => {
    try {
      if (!fs.existsSync(UPLOADS_DIR)) {
        return res.json({ images: [] });
      }
      const files = fs.readdirSync(UPLOADS_DIR);
      const images = files
        .filter(f => !f.startsWith('.'))
        .map(file => {
          const stats = fs.statSync(path.join(UPLOADS_DIR, file));
          return {
            url: `/uploads/${file}`,
            filename: file,
            size: stats.size,
            createdAt: stats.birthtime
          };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      res.json({ images });
    } catch (err) {
      res.status(500).json({ error: 'Failed to list uploads' });
    }
  });

  // Admin Create Product
  app.post('/api/products', (req, res) => {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const processedFront = saveBase64Image(
      req.body.imageFront || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      'shirt_front'
    );
    const processedBack = req.body.imageBack ? saveBase64Image(req.body.imageBack, 'shirt_back') : '';
    const processedImages = Array.isArray(req.body.images) && req.body.images.length > 0
      ? req.body.images.map((img: string, idx: number) => saveBase64Image(img, `shirt_detail_${idx + 1}`))
      : [processedFront, processedBack].filter(Boolean);

    const newProd: Product = {
      id: req.body.id || `prod-${Date.now()}`,
      titleKa: req.body.titleKa || 'ახალი მაისური',
      titleEn: req.body.titleEn || 'New Jersey',
      playerSlug: req.body.playerSlug || 'custom',
      playerKa: req.body.playerKa || 'მოთამაშე',
      playerEn: req.body.playerEn || 'Player',
      number: Number(req.body.number) || 10,
      nationalTeamKa: req.body.nationalTeamKa || 'საქართველო',
      nationalTeamEn: req.body.nationalTeamEn || 'Georgia',
      teamSlug: req.body.teamSlug || 'georgia',
      clubKa: req.body.clubKa || '',
      clubEn: req.body.clubEn || '',
      category: req.body.category || 'Jersey',
      kitType: req.body.kitType || 'Home',
      sizes: req.body.sizes || ['S', 'M', 'L', 'XL'],
      price: Number(req.body.price) || 140,
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
      isFeatured: Boolean(req.body.isFeatured),
      isWc26: Boolean(req.body.isWc26),
      isNiche: Boolean(req.body.isNiche),
      imageFront: processedFront,
      imageBack: processedBack,
      images: processedImages,
      descriptionKa: req.body.descriptionKa || 'FUT Universe-ის ახალი ექსპონატი.',
      descriptionEn: req.body.descriptionEn || 'New addition to FUT Universe library.',
      inStock: true,
      releaseYear: 2026,
      tags: req.body.tags || ['WC26', 'Jersey']
    };

    products.unshift(newProd);

    // If player slug doesn't exist in players, create a stub player page automatically!
    if (newProd.playerSlug && !players.some(pl => pl.slug === newProd.playerSlug)) {
      players.push({
        slug: newProd.playerSlug,
        nameKa: newProd.playerKa,
        nameEn: newProd.playerEn,
        teamKa: newProd.nationalTeamKa,
        teamEn: newProd.nationalTeamEn,
        teamSlug: newProd.teamSlug,
        position: 'მოთამაშე',
        number: newProd.number,
        bioKa: `${newProd.playerKa} — FUT Universe-ის ბიბლიოთეკაში წარმოდგენილი ნიშური მოთამაშე.`,
        bioEn: `${newProd.playerEn} — Featured player in FUT Universe library.`,
        wc26Role: 'WC26 ნაკრების წევრი',
        image: newProd.imageFront
      });
    }

    saveData();
    res.status(201).json(newProd);
  });

  // Admin Update Product
  app.put('/api/products/:id', (req, res) => {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    const updated = { ...req.body };
    if (updated.imageFront) {
      updated.imageFront = saveBase64Image(updated.imageFront, 'shirt_front');
    }
    if (updated.imageBack) {
      updated.imageBack = saveBase64Image(updated.imageBack, 'shirt_back');
    }
    if (Array.isArray(updated.images)) {
      updated.images = updated.images.map((img: string, idx: number) => saveBase64Image(img, `shirt_detail_${idx + 1}`));
    }

    products[index] = { ...products[index], ...updated };
    saveData();
    res.json(products[index]);
  });

  // Admin Delete Product
  app.delete('/api/products/:id', (req, res) => {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    products = products.filter(p => p.id !== req.params.id);
    saveData();
    res.json({ success: true, deletedId: req.params.id });
  });

  // Players list and single player
  app.get('/api/players', (req, res) => {
    res.json(players);
  });

  app.get('/api/players/:slug', (req, res) => {
    const player = players.find(p => p.slug === req.params.slug);
    if (!player) {
      // Fallback stub if player has a jersey
      const playerProds = products.filter(p => p.playerSlug === req.params.slug);
      if (playerProds.length > 0) {
        const first = playerProds[0];
        const stub: PlayerInfo = {
          slug: req.params.slug,
          nameKa: first.playerKa,
          nameEn: first.playerEn,
          teamKa: first.nationalTeamKa,
          teamEn: first.nationalTeamEn,
          teamSlug: first.teamSlug,
          position: 'მოთამაშე',
          number: first.number,
          bioKa: `${first.playerKa}-ს ოფიციალური მაისურები და კოლექცია FUT Universe თბილისში.`,
          bioEn: `Official jerseys and kits for ${first.playerEn} at FUT Universe Tbilisi.`,
          wc26Role: 'WC26 ნაკრების წარმომადგენელი',
          image: first.imageFront
        };
        return res.json({ player: stub, products: playerProds });
      }
      return res.status(404).json({ error: 'Player not found' });
    }
    const playerProds = products.filter(p => p.playerSlug === player.slug || p.playerEn.toLowerCase().includes(player.nameEn.toLowerCase()));
    res.json({ player, products: playerProds });
  });

  // Teams list and single team
  app.get('/api/teams', (req, res) => {
    res.json(teams);
  });

  app.get('/api/teams/:slug', (req, res) => {
    const team = teams.find(t => t.slug === req.params.slug);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    const teamProds = products.filter(p => p.teamSlug === team.slug || p.nationalTeamEn.toLowerCase() === team.nameEn.toLowerCase());
    const teamPlayers = players.filter(pl => pl.teamSlug === team.slug);
    res.json({ team, products: teamProds, players: teamPlayers });
  });

  // Blog endpoints
  app.get('/api/blog', (req, res) => {
    res.json(blogPosts);
  });

  app.get('/api/blog/:slug', (req, res) => {
    const post = blogPosts.find(b => b.slug === req.params.slug);
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    res.json(post);
  });

  app.post('/api/blog', (req, res) => {
    if (!checkAdminAuth(req)) return res.status(401).json({ error: 'Unauthorized' });

    const newPost: BlogPost = {
      slug: req.body.slug || `post-${Date.now()}`,
      titleKa: req.body.titleKa,
      titleEn: req.body.titleEn,
      excerptKa: req.body.excerptKa,
      excerptEn: req.body.excerptEn,
      contentKa: req.body.contentKa,
      contentEn: req.body.contentEn,
      publishDate: new Date().toISOString().split('T')[0],
      readTime: '4 წუთი',
      coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      author: 'FUT Universe Editorial',
      tags: req.body.tags || ['FUT Universe', 'Georgia'],
      relatedPlayerSlugs: req.body.relatedPlayerSlugs || []
    };

    blogPosts.unshift(newPost);
    saveData();
    res.status(201).json(newPost);
  });

  // Contact Form Endpoint
  app.post('/api/contact', (req, res) => {
    const { name, contact, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    const newMsg = {
      id: `msg-${Date.now()}`,
      name,
      contact: contact || 'არ არის მითითებული',
      message,
      date: new Date().toLocaleString('ka-GE')
    };
    contactMessages.unshift(newMsg);
    saveData();
    res.status(201).json({ success: true, message: 'შეტყობინება წარმატებით გაიგზავნა!' });
  });

  // Admin GET Contact Messages
  app.get('/api/contact-messages', (req, res) => {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json(contactMessages);
  });

  // Admin DELETE Contact Message
  app.delete('/api/contact-messages/:id', (req, res) => {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    contactMessages = contactMessages.filter(m => m.id !== req.params.id);
    saveData();
    res.json({ success: true, deletedId: req.params.id });
  });

  // Admin auth
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === 'shotarameqeni') {
      return res.json({ success: true, token: 'shotarameqeni' });
    }
    return res.status(401).json({ success: false, message: 'არასწორი პაროლი' });
  });

  // Technical SEO: Dynamic Sitemap.xml
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://futuniverse.ge';
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const staticPages = ['', '/shop', '/about', '/contact', '/journal'];
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

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Technical SEO: robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://futuniverse.ge';
    const content = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
    res.header('Content-Type', 'text/plain');
    res.send(content);
  });

  // Vite middleware for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FUT Universe Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
