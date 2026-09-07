import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Lock, ShieldCheck, Sparkles, Check, RefreshCw, FileText, Upload, Image as ImageIcon, MessageCircle, Instagram, ArrowRight, Zap, Copy, ExternalLink, Eye, X, Tag, Percent, TrendingDown } from 'lucide-react';
import { Product, Size, Category, KitType, BlogPost } from '../types';
import { ImageDropzone } from '../components/ImageDropzone';
import { TOP_CLUBS, TOP_NATIONS } from '../data/teamsList';
import { subscribeContactMessages, dbDeleteContactMessage } from '../lib/firebase';
import { optimizeProductImages } from '../lib/imageUtils';

interface AdminPageProps {
  products: Product[];
  blogPosts: BlogPost[];
  onAddProduct: (product: Partial<Product>) => Promise<void>;
  onUpdateProduct?: (productId: string, product: Partial<Product>) => Promise<void>;
  onDeleteProduct: (productId: string) => Promise<void>;
  onAddBlogPost: (post: Partial<BlogPost>) => Promise<void>;
  onUpdateBlogPost?: (slug: string, post: Partial<BlogPost>) => Promise<void>;
  onDeleteBlogPost?: (slug: string) => Promise<void>;
  lang: 'ka' | 'en';
}

const INSTAGRAM_PRESETS: Array<Partial<Product> & { captionSampleKa: string }> = [
  {
    titleKa: 'ლამინ იამალი (Lamine Yamal) — Spain 2026 World Cup',
    titleEn: 'Lamine Yamal — Spain 2026 World Cup',
    playerSlug: 'yamal',
    playerKa: 'ლამინ იამალი',
    playerEn: 'Lamine Yamal',
    number: 19,
    nationalTeamKa: 'ესპანეთი',
    nationalTeamEn: 'Spain',
    teamSlug: 'spain',
    category: 'Jersey' as Category,
    kitType: 'Player Version' as KitType,
    sizes: ['M', 'L', 'XL'] as Size[],
    price: 49,
    originalPrice: 67,
    isFeatured: true,
    isWc26: true,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    descriptionKa: '🔥 Lamine Yamal #19 — Spain 2026 World Cup Player Version | 💰 49₾ (ფასდაკლება!) | 📏 M, L, XL.',
    descriptionEn: 'Lamine Yamal #19 Spain 2026 World Cup Player Version | 49 GEL (Sale!) | Sizes: M, L, XL.',
    captionSampleKa: 'Lamine Yamal — Spain 2026 World Cup\n💰 ფასი: 49₾ (ფასდაკლება!)\n📏 ზომა: M, L, XL\n🔥 ესპანეთი #19 Player Version'
  },
  {
    titleKa: 'ჯუდ ბელინგემი (Jude Bellingham) — England 2026 World Cup',
    titleEn: 'Jude Bellingham — England 2026 World Cup',
    playerSlug: 'bellingham',
    playerKa: 'ჯუდ ბელინგემი',
    playerEn: 'Jude Bellingham',
    number: 10,
    nationalTeamKa: 'ინგლისი',
    nationalTeamEn: 'England',
    teamSlug: 'england',
    category: 'Jersey' as Category,
    kitType: 'Player Version' as KitType,
    sizes: ['S', 'M', 'L', 'XL'] as Size[],
    price: 49,
    originalPrice: 67,
    isFeatured: true,
    isWc26: true,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    descriptionKa: '🔥 Jude Bellingham — England 2026 World Cup #10 | 💰 49₾ (ფასდაკლება!) | 📏 S, M, L, XL.',
    descriptionEn: 'Jude Bellingham England 2026 World Cup Player Version | 49 GEL | Sizes S, M, L, XL.',
    captionSampleKa: 'Jude Bellingham — England 2026 World Cup\n💰 ფასი: 49₾ (ფასდაკლება!)\n📏 ზომა: S, M, L, XL\n🔥 ინგლისი #10 Player Version'
  },
  {
    titleKa: 'ლიონელ მესი (Lionel Messi) — Argentina 2026 World Cup',
    titleEn: 'Lionel Messi — Argentina 2026 World Cup',
    playerSlug: 'messi',
    playerKa: 'ლიონელ მესი',
    playerEn: 'Lionel Messi',
    number: 10,
    nationalTeamKa: 'არგენტინა',
    nationalTeamEn: 'Argentina',
    teamSlug: 'argentina',
    category: 'Jersey' as Category,
    kitType: 'Player Version' as KitType,
    sizes: ['M', 'L', 'XL'] as Size[],
    price: 49,
    originalPrice: 67,
    isFeatured: true,
    isWc26: true,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
    descriptionKa: '🔥 Lionel Messi #10 — Argentina 2026 World Cup Player Version | 💰 49₾ (ფასდაკლება!) | 📏 M, L, XL.',
    descriptionEn: 'Lionel Messi #10 Argentina 2026 World Cup Kit | 49 GEL | Sizes M, L, XL.',
    captionSampleKa: 'Lionel Messi — Argentina 2026 World Cup\n💰 ფასი: 49₾ (ფასდაკლება!)\n📏 ზომა: M, L, XL\n🔥 არგენტინა #10 Player Version'
  },
  {
    titleKa: 'კრიშტიანუ რონალდუ (Cristiano Ronaldo) — Portugal 2026 World Cup',
    titleEn: 'Cristiano Ronaldo — Portugal 2026 World Cup',
    playerSlug: 'ronaldo',
    playerKa: 'კრიშტიანუ რონალდუ',
    playerEn: 'Cristiano Ronaldo',
    number: 7,
    nationalTeamKa: 'პორტუგალია',
    nationalTeamEn: 'Portugal',
    teamSlug: 'portugal',
    category: 'Jersey' as Category,
    kitType: 'Player Version' as KitType,
    sizes: ['M', 'L', 'XL'] as Size[],
    price: 49,
    originalPrice: 67,
    isFeatured: true,
    isWc26: true,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=800&q=80',
    descriptionKa: '🔥 Cristiano Ronaldo #7 — Portugal 2026 World Cup Player Version | 💰 49₾ (ფასდაკლება!) | 📏 M, L, XL.',
    descriptionEn: 'Cristiano Ronaldo #7 Portugal 2026 World Cup Player Version | 49 GEL.',
    captionSampleKa: 'Cristiano Ronaldo — Portugal 2026 World Cup\n💰 ფასი: 49₾ (ფასდაკლება!)\n📏 ზომა: M, L, XL\n🔥 პორტუგალია #7 Player Version'
  },
  {
    titleKa: 'კილიან მბაპე (Kylian Mbappé) — France 2026 World Cup',
    titleEn: 'Kylian Mbappé — France 2026 World Cup',
    playerSlug: 'mbappe',
    playerKa: 'კილიან მბაპე',
    playerEn: 'Kylian Mbappé',
    number: 10,
    nationalTeamKa: 'საფრანგეთი',
    nationalTeamEn: 'France',
    teamSlug: 'france',
    category: 'Jersey' as Category,
    kitType: 'Player Version' as KitType,
    sizes: ['S', 'M', 'L', 'XL'] as Size[],
    price: 49,
    originalPrice: 67,
    isFeatured: true,
    isWc26: true,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    descriptionKa: '🔥 Kylian Mbappé #10 — France 2026 World Cup Player Version | 💰 49₾ (ფასდაკლება!) | 📏 S, M, L, XL.',
    descriptionEn: 'Kylian Mbappé #10 France 2026 World Cup Player Version | 49 GEL.',
    captionSampleKa: 'Kylian Mbappé — France 2026 World Cup\n💰 ფასი: 49₾ (ფასდაკლება!)\n📏 ზომა: S, M, L, XL\n🔥 საფრანგეთი #10'
  },
  {
    titleKa: 'ჯამალ მუსიალა (Jamal Musiala) — Germany 2026 World Cup',
    titleEn: 'Jamal Musiala — Germany 2026 World Cup',
    playerSlug: 'musiala',
    playerKa: 'ჯამალ მუსიალა',
    playerEn: 'Jamal Musiala',
    number: 10,
    nationalTeamKa: 'გერმანია',
    nationalTeamEn: 'Germany',
    teamSlug: 'germany',
    category: 'Jersey' as Category,
    kitType: 'Player Version' as KitType,
    sizes: ['M', 'L'] as Size[],
    price: 49,
    originalPrice: 67,
    isFeatured: false,
    isWc26: true,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
    descriptionKa: '🔥 Jamal Musiala #10 — Germany 2026 World Cup Player Version | 💰 49₾ (ფასდაკლება!) | 📏 M, L.',
    descriptionEn: 'Jamal Musiala #10 Germany 2026 World Cup Player Version | 49 GEL.',
    captionSampleKa: 'Jamal Musiala — Germany 2026 World Cup #10\n💰 ფასი: 49₾ (ფასდაკლება!)\n📏 ზომა: M, L\n🔥 გერმანია #10'
  }
];

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  blogPosts,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddBlogPost,
  onUpdateBlogPost,
  onDeleteBlogPost,
  lang
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'products' | 'instagram' | 'blog' | 'messages'>('products');
  const [contactMessages, setContactMessages] = useState<Array<{ id: string; name: string; contact: string; message: string; date: string }>>([]);

  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Instagram Import state
  const [igCaptionText, setIgCaptionText] = useState('');
  const [igPhotoUrl, setIgPhotoUrl] = useState('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80');

  // Team category state (Club vs Nation mutually exclusive)
  const [teamCategory, setTeamCategory] = useState<'club' | 'nation'>('club');
  const [selectedTeamSlug, setSelectedTeamSlug] = useState<string>('real-madrid');
  const [customTeamKa, setCustomTeamKa] = useState<string>('');
  const [customTeamEn, setCustomTeamEn] = useState<string>('');

  // 5 Gallery photo slots
  const [imageFront, setImageFront] = useState<string>('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80');
  const [imageBack, setImageBack] = useState<string>('');
  const [imageDetail1, setImageDetail1] = useState<string>('');
  const [imageDetail2, setImageDetail2] = useState<string>('');
  const [imageDetail3, setImageDetail3] = useState<string>('');

  // New/Edit product form state
  const [newProd, setNewProd] = useState({
    titleKa: '',
    titleEn: '',
    playerSlug: '',
    playerKa: '',
    playerEn: '',
    number: 10,
    nationalTeamKa: 'რეალ მადრიდი',
    nationalTeamEn: 'Real Madrid',
    teamSlug: 'real-madrid',
    category: 'Jersey' as Category,
    kitType: 'Home' as KitType,
    sizes: ['S', 'M', 'L', 'XL'] as Size[],
    price: 140,
    originalPrice: undefined as number | undefined,
    isFeatured: false,
    isWc26: true,
    isNiche: true,
    descriptionKa: '',
    descriptionEn: ''
  });

  // Editing blog post state
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    slug: '',
    titleKa: '',
    titleEn: '',
    excerptKa: '',
    excerptEn: '',
    contentKa: '',
    contentEn: '',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    author: 'FUT Universe Team',
    readTime: '3 წუთი',
    tags: 'World Cup 2026, Sale, 49 GEL, Tbilisi',
    relatedPlayerSlugs: 'wirtz, mainoo, zidande'
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleTeamCategoryChange = (cat: 'club' | 'nation') => {
    setTeamCategory(cat);
    if (cat === 'club') {
      const defaultClub = TOP_CLUBS[0];
      setSelectedTeamSlug(defaultClub.slug);
      setNewProd(prev => ({
        ...prev,
        nationalTeamKa: defaultClub.nameKa,
        nationalTeamEn: defaultClub.nameEn,
        teamSlug: defaultClub.slug
      }));
    } else {
      const defaultNation = TOP_NATIONS[0];
      setSelectedTeamSlug(defaultNation.slug);
      setNewProd(prev => ({
        ...prev,
        nationalTeamKa: defaultNation.nameKa,
        nationalTeamEn: defaultNation.nameEn,
        teamSlug: defaultNation.slug
      }));
    }
  };

  const handleSelectTeamSlug = (slug: string) => {
    setSelectedTeamSlug(slug);
    if (slug === 'custom') return;

    if (teamCategory === 'club') {
      const club = TOP_CLUBS.find(c => c.slug === slug);
      if (club) {
        setNewProd(prev => ({
          ...prev,
          nationalTeamKa: club.nameKa,
          nationalTeamEn: club.nameEn,
          teamSlug: club.slug
        }));
      }
    } else {
      const nation = TOP_NATIONS.find(n => n.slug === slug);
      if (nation) {
        setNewProd(prev => ({
          ...prev,
          nationalTeamKa: nation.nameKa,
          nationalTeamEn: nation.nameEn,
          teamSlug: nation.slug
        }));
      }
    }
  };

  const fetchContactMessages = async () => {
    try {
      const res = await fetch('/api/contact-messages', {
        headers: { Authorization: 'Bearer fut2026' }
      });
      if (res.ok) {
        const data = await res.json();
        setContactMessages(data);
      }
    } catch (err) {
      console.error('Error fetching contact messages:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const unsub = subscribeContactMessages((messages) => {
        if (Array.isArray(messages) && messages.length > 0) {
          setContactMessages(messages);
        }
      });
      fetchContactMessages();
      return () => unsub();
    }
  }, [isAuthenticated, activeTab]);

  const handleDeleteMessage = async (id: string) => {
    try {
      await dbDeleteContactMessage(id);
      fetch(`/api/contact-messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer fut2026' }
      }).catch(() => {});
      setContactMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('ფაილის ზომა ძალიან დიდია. გთხოვთ აირჩიოთ 10MB-მდე სურათი.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'fut2026' || password === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('არასწორი პაროლი! (გამოიყენეთ: fut2026)');
    }
  };

  const handleStartEdit = (p: Product) => {
    setEditingProductId(p.id);

    const cat = p.teamCategory || (TOP_NATIONS.some(n => n.slug === p.teamSlug || n.nameEn.toLowerCase() === p.nationalTeamEn?.toLowerCase()) ? 'nation' : 'club');
    setTeamCategory(cat);

    if (cat === 'club') {
      const matchClub = TOP_CLUBS.find(c => c.slug === p.teamSlug || c.nameEn.toLowerCase() === p.nationalTeamEn?.toLowerCase());
      if (matchClub) {
        setSelectedTeamSlug(matchClub.slug);
      } else {
        setSelectedTeamSlug('custom');
        setCustomTeamKa(p.nationalTeamKa || '');
        setCustomTeamEn(p.nationalTeamEn || '');
      }
    } else {
      const matchNation = TOP_NATIONS.find(n => n.slug === p.teamSlug || n.nameEn.toLowerCase() === p.nationalTeamEn?.toLowerCase());
      if (matchNation) {
        setSelectedTeamSlug(matchNation.slug);
      } else {
        setSelectedTeamSlug('custom');
        setCustomTeamKa(p.nationalTeamKa || '');
        setCustomTeamEn(p.nationalTeamEn || '');
      }
    }

    const imgs = p.images || [];
    setImageFront(p.imageFront || '');
    setImageBack(p.imageBack || imgs[1] || '');
    setImageDetail1(imgs[2] || '');
    setImageDetail2(imgs[3] || '');
    setImageDetail3(imgs[4] || '');

    setNewProd({
      titleKa: p.titleKa || '',
      titleEn: p.titleEn || '',
      playerSlug: p.playerSlug || '',
      playerKa: p.playerKa || '',
      playerEn: p.playerEn || '',
      number: p.number || 10,
      nationalTeamKa: p.nationalTeamKa || '',
      nationalTeamEn: p.nationalTeamEn || '',
      teamSlug: p.teamSlug || '',
      category: p.category || 'Jersey',
      kitType: p.kitType || 'Home',
      sizes: p.sizes && p.sizes.length > 0 ? p.sizes : ['S', 'M', 'L', 'XL'],
      price: p.price || 140,
      originalPrice: p.originalPrice && p.originalPrice > (p.price || 0) ? p.originalPrice : undefined,
      isFeatured: Boolean(p.isFeatured),
      isWc26: Boolean(p.isWc26),
      isNiche: Boolean(p.isNiche),
      descriptionKa: p.descriptionKa || '',
      descriptionEn: p.descriptionEn || ''
    });
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setTeamCategory('club');
    setSelectedTeamSlug('real-madrid');
    setCustomTeamKa('');
    setCustomTeamEn('');
    setImageFront('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80');
    setImageBack('');
    setImageDetail1('');
    setImageDetail2('');
    setImageDetail3('');
    setNewProd({
      titleKa: '',
      titleEn: '',
      playerSlug: '',
      playerKa: '',
      playerEn: '',
      number: 10,
      nationalTeamKa: 'რეალ მადრიდი',
      nationalTeamEn: 'Real Madrid',
      teamSlug: 'real-madrid',
      category: 'Jersey',
      kitType: 'Home',
      sizes: ['S', 'M', 'L', 'XL'],
      price: 140,
      originalPrice: undefined,
      isFeatured: false,
      isWc26: true,
      isNiche: true,
      descriptionKa: '',
      descriptionEn: ''
    });
  };

  const handleCreateOrUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let teamKa = newProd.nationalTeamKa;
      let teamEn = newProd.nationalTeamEn;
      let teamSlug = newProd.teamSlug;

      if (selectedTeamSlug === 'custom') {
        teamKa = customTeamKa.trim() || (teamCategory === 'club' ? 'კლუბი' : 'ნაკრები');
        teamEn = customTeamEn.trim() || (teamCategory === 'club' ? 'Club' : 'National Team');
        teamSlug = teamEn.toLowerCase().replace(/\s+/g, '-');
      }

      const allImages = Array.from(new Set([imageFront, imageBack, imageDetail1, imageDetail2, imageDetail3].filter(Boolean)));

      const rawProdData: Partial<Product> = {
        ...newProd,
        teamCategory,
        nationalTeamKa: teamKa,
        nationalTeamEn: teamEn,
        teamSlug,
        imageFront: imageFront || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
        imageBack: imageBack || undefined,
        images: allImages,
        playerSlug: newProd.playerSlug || newProd.playerEn.toLowerCase().replace(/\s+/g, '-'),
        tags: ['Official', teamCategory === 'club' ? 'Club Jersey' : 'National Jersey', teamEn],
        originalPrice: (newProd.originalPrice && Number(newProd.originalPrice) > Number(newProd.price)) ? Number(newProd.originalPrice) : undefined
      };

      const prodData = await optimizeProductImages(rawProdData);

      if (editingProductId) {
        if (onUpdateProduct) {
          await onUpdateProduct(editingProductId, prodData);
        } else {
          await onAddProduct(prodData);
        }
        setStatusMessage('მაისურის მონაცემები წარმატებით განახლდა!');
      } else {
        await onAddProduct(prodData);
        setStatusMessage('ახალი მაისური წარმატებით დაემატა ბიბლიოთეკას!');
      }

      setTimeout(() => setStatusMessage(''), 3000);
      handleCancelEdit();
    } catch (err) {
      alert(editingProductId ? 'შეცდომა პროდუქტის განახლებისას' : 'შეცდომა პროდუქტის დამატებისას');
    }
  };

  const handleStartEditBlog = (post: BlogPost) => {
    setEditingBlogSlug(post.slug);
    setBlogForm({
      slug: post.slug,
      titleKa: post.titleKa || '',
      titleEn: post.titleEn || '',
      excerptKa: post.excerptKa || '',
      excerptEn: post.excerptEn || '',
      contentKa: post.contentKa || '',
      contentEn: post.contentEn || '',
      coverImage: post.coverImage || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      author: post.author || 'FUT Universe Team',
      readTime: post.readTime || '3 წუთი',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      relatedPlayerSlugs: Array.isArray(post.relatedPlayerSlugs) ? post.relatedPlayerSlugs.join(', ') : ''
    });

    const el = document.getElementById('journal-editor-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEditBlog = () => {
    setEditingBlogSlug(null);
    setBlogForm({
      slug: '',
      titleKa: '',
      titleEn: '',
      excerptKa: '',
      excerptEn: '',
      contentKa: '',
      contentEn: '',
      coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      author: 'FUT Universe Team',
      readTime: '3 წუთი',
      tags: 'World Cup 2026, Sale, 49 GEL, Tbilisi',
      relatedPlayerSlugs: 'wirtz, mainoo, zidande'
    });
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedTags = blogForm.tags
        ? blogForm.tags.split(',').map(s => s.trim()).filter(Boolean)
        : ['FUT Universe', 'World Cup 2026'];
      const parsedPlayerSlugs = blogForm.relatedPlayerSlugs
        ? blogForm.relatedPlayerSlugs.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      const cleanSlug = blogForm.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-') ||
        (blogForm.titleEn ? blogForm.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : `post-${Date.now()}`);

      const payload: Partial<BlogPost> = {
        slug: cleanSlug,
        titleKa: blogForm.titleKa,
        titleEn: blogForm.titleEn || blogForm.titleKa,
        excerptKa: blogForm.excerptKa,
        excerptEn: blogForm.excerptEn || blogForm.excerptKa,
        contentKa: blogForm.contentKa,
        contentEn: blogForm.contentEn || blogForm.contentKa,
        coverImage: blogForm.coverImage,
        author: blogForm.author || 'FUT Universe Team',
        readTime: blogForm.readTime || '3 წუთი',
        tags: parsedTags,
        relatedPlayerSlugs: parsedPlayerSlugs,
        publishDate: new Date().toISOString().split('T')[0]
      };

      if (editingBlogSlug && onUpdateBlogPost) {
        await onUpdateBlogPost(editingBlogSlug, payload);
        setStatusMessage('ჟურნალის სტატია წარმატებით განახლდა!');
      } else {
        await onAddBlogPost(payload);
        setStatusMessage('ახალი სტატია წარმატებით გამოქვეყნდა!');
      }

      setTimeout(() => setStatusMessage(''), 3000);
      handleCancelEditBlog();
    } catch (err) {
      alert('შეცდომა სტატიის შენახვისას');
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (window.confirm('ნამდვილად გსურთ ამ სტატიის წაშლა?')) {
      try {
        if (onDeleteBlogPost) {
          await onDeleteBlogPost(slug);
          setStatusMessage('სტატია წარმატებით წაიშალა!');
          setTimeout(() => setStatusMessage(''), 3000);
        }
      } catch (err) {
        alert('შეცდომა სტატიის წაშლისას');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 space-y-6">
        <div className="p-8 rounded-3xl bg-[#12122b] border border-slate-800 space-y-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-white">
              FUT Universe ადმინ პანელი
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              შეიყვანეთ ადმინისტრატორის პაროლი (Default: <code className="text-[#00e5ff] font-mono">fut2026</code>)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="ადმინ პაროლი..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-center text-white focus:outline-none focus:border-[#00e5ff]"
            />

            {authError && <p className="text-xs text-red-400">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00e5ff] text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20"
            >
              შესვლა (Login)
            </button>
          </form>
        </div>
      </div>
    );
  }

  const parseInstagramCaption = (text: string) => {
    let titleKa = '';
    let titleEn = '';
    let price = 67;
    let sizes: Size[] = ['L'];
    let kitType: KitType = 'Player Version';
    let playerKa = '';
    let playerEn = '';
    let nationalTeamKa = 'გერმანია';
    let nationalTeamEn = 'Germany';

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length > 0) {
      titleKa = lines[0];
      titleEn = lines[0];
      const rawName = lines[0].split(/[-—–(]/)[0].trim();
      if (rawName) {
        playerKa = rawName;
        playerEn = rawName;
      }
    }

    const priceMatch = text.match(/(\d+)\s*(₾|GEL|gel|ლარი)/i) || text.match(/(ფასი|price):\s*(\d+)/i);
    if (priceMatch) {
      const parsed = parseInt(priceMatch[1] || priceMatch[2], 10);
      if (!isNaN(parsed)) price = parsed;
    }

    const sizeMatch = text.match(/(ზომა|ზომები|sizes?|size):\s*([A-Za-z0-9,\s]+)/i);
    if (sizeMatch) {
      const rawSizes = sizeMatch[2].toUpperCase().split(/[\s,]+/);
      const validSizes: Size[] = [];
      rawSizes.forEach(s => {
        if (['S', 'M', 'L', 'XL', '2XL', 'XXL'].includes(s)) {
          validSizes.push(s as Size);
        }
      });
      if (validSizes.length > 0) sizes = validSizes;
    }

    if (/player\s*version|მოთამაშის\s*ვერსია/i.test(text)) {
      kitType = 'Player Version';
    } else if (/fan\s*version|ფან\s*ვერსია/i.test(text)) {
      kitType = 'Fan Version';
    } else if (/retro|რეტრო/i.test(text)) {
      kitType = 'Retro Version';
    } else if (/away|საგარეო/i.test(text)) {
      kitType = 'Away';
    }

    return {
      titleKa: titleKa || 'Instagram Jersey Kit',
      titleEn: titleEn || 'Instagram Jersey Kit',
      playerKa: playerKa || 'Football Star',
      playerEn: playerEn || 'Football Star',
      playerSlug: (playerEn || 'player').toLowerCase().replace(/\s+/g, '-'),
      number: 10,
      nationalTeamKa,
      nationalTeamEn,
      teamSlug: 'germany',
      category: 'Jersey' as Category,
      kitType,
      sizes,
      price,
      isFeatured: true,
      isWc26: true,
      isNiche: true,
      imageFront: igPhotoUrl || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      descriptionKa: text,
      descriptionEn: text
    };
  };

  const handleParseAndFill = () => {
    if (!igCaptionText.trim()) {
      alert('გთხოვთ ჩასვათ ინსტაგრამის პოსტის აღწერა!');
      return;
    }
    const parsed = parseInstagramCaption(igCaptionText);
    setNewProd(parsed);
    setActiveTab('products');
    setStatusMessage('ინსტაგრამის პოსტი გაანალიზდა და ფორმაში აისახა!');
    setTimeout(() => setStatusMessage(''), 3500);
  };

  const handleDirectAddInstagram = async () => {
    if (!igCaptionText.trim()) {
      alert('გთხოვთ ჩასვათ ინსტაგრამის პოსტის აღწერა!');
      return;
    }
    const parsed = parseInstagramCaption(igCaptionText);
    await onAddProduct({
      ...parsed,
      tags: ['Instagram', 'Official', parsed.kitType]
    });
    setIgCaptionText('');
    setStatusMessage('ინსტაგრამის მაისური წარმატებით დაემატა ბიბლიოთეკას!');
    setTimeout(() => setStatusMessage(''), 3500);
  };

  const handleImportPreset = async (preset: Partial<Product>) => {
    await onAddProduct({
      ...preset,
      tags: ['Instagram', 'Official', preset.kitType || 'Jersey']
    });
    setStatusMessage(`"${preset.titleKa}" წარმატებით დაემატა ინსტაგრამის კოლექციიდან!`);
    setTimeout(() => setStatusMessage(''), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-widest">
            FUT UNIVERSE CMS
          </span>
          <h1 className="text-2xl font-extrabold text-white">ადმინისტრატორის მართვის პანელი</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'products'
                ? 'bg-[#00e5ff] text-black'
                : 'bg-slate-900 text-slate-300 border border-slate-800'
            }`}
          >
            მაისურები ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('instagram')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'instagram'
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white font-black shadow-lg shadow-pink-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-pink-500/40'
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>📸 Instagram იმპორტი</span>
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'blog'
                ? 'bg-[#00e5ff] text-black'
                : 'bg-slate-900 text-slate-300 border border-slate-800'
            }`}
          >
            ჟურნალი ({blogPosts.length})
          </button>
          <button
            onClick={() => { setActiveTab('messages'); fetchContactMessages(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'messages'
                ? 'bg-[#00e5ff] text-black'
                : 'bg-slate-900 text-slate-300 border border-slate-800'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>შეტყობინებები ({contactMessages.length})</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add/Edit product form */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#12122b] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                {editingProductId ? (
                  <>
                    <Edit3 className="w-4 h-4 text-[#00e5ff]" />
                    <span>მაისურის რედაქტირება</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-[#00e5ff]" />
                    <span>ახალი მაისურის დამატება</span>
                  </>
                )}
              </h2>
              {editingProductId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition"
                >
                  გაუქმება
                </button>
              )}
            </div>

            <form onSubmit={handleCreateOrUpdateProduct} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-slate-400">სათაური (ქართულად):</label>
                <input
                  type="text"
                  required
                  placeholder="მაგ: ფლორიან ვირცი (Florian Wirtz) — Player Version"
                  value={newProd.titleKa}
                  onChange={(e) => setNewProd({ ...newProd, titleKa: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-slate-400">მოთამაშე (ქართ):</label>
                  <input
                    type="text"
                    required
                    placeholder="ფლორიან ვირცი"
                    value={newProd.playerKa}
                    onChange={(e) => setNewProd({ ...newProd, playerKa: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="font-mono text-slate-400">Player Name (EN):</label>
                  <input
                    type="text"
                    required
                    placeholder="Florian Wirtz"
                    value={newProd.playerEn}
                    onChange={(e) => setNewProd({ ...newProd, playerEn: e.target.value, playerSlug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-slate-400">ნომერი (Number):</label>
                  <input
                    type="number"
                    value={newProd.number}
                    onChange={(e) => setNewProd({ ...newProd, number: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="font-mono text-slate-400">კიტის ტიპი (Kit Type):</label>
                  <select
                    value={newProd.kitType}
                    onChange={(e) => setNewProd({ ...newProd, kitType: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-2 text-white"
                  >
                    <option value="Home">Home</option>
                    <option value="Away">Away</option>
                    <option value="Third">Third</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Retro">Retro</option>
                    <option value="Player Version">Player Version</option>
                    <option value="Fan Version">Fan Version</option>
                  </select>
                </div>
              </div>

              {/* DEDICATED PRICING & DISCOUNTS SECTION */}
              <div className="p-4 rounded-2xl bg-[#0e0e24] border border-cyan-500/40 space-y-3.5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wide flex items-center space-x-1.5">
                        <span>ფასების და ფასდაკლების მართვა</span>
                        <span className="text-[10px] text-[#00e5ff] font-mono font-normal">(Pricing & Discounts)</span>
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        მიუთითეთ საბოლოო გასაყიდი ფასი და (სურვილისამებრ) ძველი ფასი ფასდაკლების გამოსაჩენად
                      </p>
                    </div>
                  </div>

                  {newProd.originalPrice && newProd.originalPrice > newProd.price && (
                    <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-extrabold font-mono flex items-center space-x-1 animate-pulse">
                      <span>🔥 SALE</span>
                      <span>-{Math.round(((newProd.originalPrice - newProd.price) / newProd.originalPrice) * 100)}%</span>
                    </span>
                  )}
                </div>

                {/* Price Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Current / Sale Price */}
                  <div>
                    <label className="text-[11px] font-mono text-[#00e5ff] font-bold block mb-1">
                      💰 გასაყიდი (საბოლოო) ფასი (₾) *:
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        min={1}
                        placeholder="49"
                        value={newProd.price || ''}
                        onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-cyan-500/50 focus:border-[#00e5ff] rounded-xl px-3 py-2 text-white font-extrabold text-sm outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-mono text-cyan-400 font-bold">₾ GEL</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      თანხა, რომელსაც მომხმარებელი იხდის
                    </span>
                  </div>

                  {/* Original / Regular Price */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-mono text-slate-300 font-bold block">
                        🏷️ ძველი (სტანდარტული) ფასი (₾):
                      </label>
                      {newProd.originalPrice ? (
                        <button
                          type="button"
                          onClick={() => setNewProd({ ...newProd, originalPrice: undefined })}
                          className="text-[10px] text-red-400 hover:underline font-mono"
                        >
                          გაუქმება
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">(არასავალდებულო)</span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="მაგ: 140"
                        value={newProd.originalPrice || ''}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : undefined;
                          setNewProd({ ...newProd, originalPrice: val });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#00e5ff] rounded-xl px-3 py-2 text-slate-300 font-bold text-sm outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-500">₾ GEL</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      გადახაზული ძველი ფასის საჩვენებლად
                    </span>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-mono text-slate-400 font-bold uppercase block">
                    ⚡ ფასდაკლების სწრაფი პრესეტები (Quick Presets):
                  </label>

                  <div className="flex flex-wrap gap-1.5">
                    {/* WC26 49 GEL Special Preset */}
                    <button
                      type="button"
                      onClick={() => {
                        const orig = newProd.originalPrice && newProd.originalPrice > 49 ? newProd.originalPrice : 140;
                        setNewProd({ ...newProd, price: 49, originalPrice: orig });
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 text-xs font-extrabold transition flex items-center space-x-1"
                    >
                      <Zap className="w-3 h-3 text-[#00e5ff]" />
                      <span>49 ₾ World Cup აქცია</span>
                    </button>

                    {/* Percentage Presets */}
                    {[20, 30, 40, 50, 60].map((pct) => {
                      return (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => {
                            const basePrice = newProd.originalPrice && newProd.originalPrice > newProd.price 
                              ? newProd.originalPrice 
                              : (newProd.price || 140);
                            const calculatedSale = Math.round(basePrice * (1 - pct / 100));
                            setNewProd({
                              ...newProd,
                              originalPrice: basePrice,
                              price: calculatedSale
                            });
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold font-mono transition"
                        >
                          -{pct}%
                        </button>
                      );
                    })}

                    {/* Reset Discount button */}
                    {newProd.originalPrice && (
                      <button
                        type="button"
                        onClick={() => setNewProd({ ...newProd, originalPrice: undefined })}
                        className="px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-900/50 text-xs font-bold transition font-mono"
                      >
                        ❌ ფასდაკლების გაუქმება
                      </button>
                    )}
                  </div>
                </div>

                {/* Calculation Info Box */}
                {newProd.originalPrice && newProd.originalPrice > newProd.price && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-emerald-400 font-mono">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>
                        ფასდაკლება: <strong>-{Math.round(((newProd.originalPrice - newProd.price) / newProd.originalPrice) * 100)}%</strong> (მომხმარებელი დაზოგავს <strong>{newProd.originalPrice - newProd.price} ₾</strong>-ს)
                      </span>
                    </div>

                    <div className="text-right font-mono text-[11px] shrink-0">
                      <span className="text-slate-500 line-through mr-1.5">{newProd.originalPrice} ₾</span>
                      <span className="text-[#00e5ff] font-extrabold">{newProd.price} ₾</span>
                    </div>
                  </div>
                )}
              </div>

              {/* TEAM CATEGORY & SELECTOR (MUTUALLY EXCLUSIVE) */}
              <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <label className="font-mono text-slate-300 font-bold text-xs flex justify-between items-center">
                  <span>გუნდის ტიპი: კლუბი თუ ნაკრები?</span>
                  <span className="text-[10px] text-[#00e5ff] uppercase font-bold">
                    {teamCategory === 'club' ? '⚽ კლუბი (Top 50)' : '🇬🇪 ეროვნული ნაკრები (Top 20)'}
                  </span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleTeamCategoryChange('club')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-1.5 ${
                      teamCategory === 'club'
                        ? 'bg-[#00e5ff] text-black shadow-md shadow-cyan-500/20'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    <span>⚽ კლუბი (Top 50)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTeamCategoryChange('nation')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-1.5 ${
                      teamCategory === 'nation'
                        ? 'bg-[#00e5ff] text-black shadow-md shadow-cyan-500/20'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    <span>🇬🇪 ეროვნული ნაკრები (Top 20)</span>
                  </button>
                </div>

                <div className="pt-1 space-y-2">
                  {teamCategory === 'club' ? (
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        აირჩიეთ კლუბი (Top 50 European & World Clubs):
                      </label>
                      <select
                        value={selectedTeamSlug}
                        onChange={(e) => handleSelectTeamSlug(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#00e5ff]"
                      >
                        {TOP_CLUBS.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.nameKa} ({c.nameEn})
                          </option>
                        ))}
                        <option value="custom">-- ➕ სხვა კლუბი / Custom Club --</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        აირჩიეთ ეროვნული ნაკრები (Top 20 World Cup Nations):
                      </label>
                      <select
                        value={selectedTeamSlug}
                        onChange={(e) => handleSelectTeamSlug(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#00e5ff]"
                      >
                        {TOP_NATIONS.map((n) => (
                          <option key={n.slug} value={n.slug}>
                            {n.nameKa} ({n.nameEn})
                          </option>
                        ))}
                        <option value="custom">-- ➕ სხვა ნაკრები / Custom Nation --</option>
                      </select>
                    </div>
                  )}

                  {selectedTeamSlug === 'custom' && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 animate-fade-in">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400">სახელი (ქართულად):</label>
                        <input
                          type="text"
                          required
                          placeholder={teamCategory === 'club' ? 'მაგ: დინამო თბილისი' : 'მაგ: საქართველო'}
                          value={customTeamKa}
                          onChange={(e) => setCustomTeamKa(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400">Name in English:</label>
                        <input
                          type="text"
                          required
                          placeholder={teamCategory === 'club' ? 'e.g. Dinamo Tbilisi' : 'e.g. Georgia'}
                          value={customTeamEn}
                          onChange={(e) => setCustomTeamEn(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Size Selection Section */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <label className="font-mono text-slate-300 font-bold text-xs flex justify-between items-center">
                  <span>ხელმისაწვდომი ზომები (Sizes):</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {newProd.sizes.length > 0 ? newProd.sizes.join(', ') : 'ზომა არ არის არჩეული'}
                  </span>
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(['S', 'M', 'L', 'XL', 'XXL', 'Kids'] as Size[]).map((sz) => {
                    const isSelected = newProd.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          const next = isSelected
                            ? newProd.sizes.filter(s => s !== sz)
                            : [...newProd.sizes, sz];
                          setNewProd({ ...newProd, sizes: next });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          isSelected
                            ? 'bg-[#00e5ff] text-black border border-[#00e5ff]'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* MULTIPLE PHOTOS GALLERY SECTION (4-5 Photos) */}
              <div className="space-y-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <label className="font-mono text-slate-200 font-bold text-xs flex items-center space-x-1.5">
                    <ImageIcon className="w-4 h-4 text-[#00e5ff]" />
                    <span>მაისურის ფოტოები (4-5 Photos Gallery):</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Drag & Drop + URL</span>
                </div>

                <ImageDropzone
                  value={imageFront}
                  onChange={(url) => setImageFront(url)}
                  label="1️⃣ მთავარი ფოტო (Front / Cover Image)"
                  accentColor="cyan"
                  helperText="ძირითადი ქავერ ფოტო, რომელიც გამოჩნდება ბარათზე"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <ImageDropzone
                    value={imageBack}
                    onChange={(url) => setImageBack(url)}
                    label="2️⃣ ზურგის ფოტო (Back / Nameplate)"
                    accentColor="cyan"
                    helperText="ზურგი, მოთამაშის სახელი და ნომერი"
                  />

                  <ImageDropzone
                    value={imageDetail1}
                    onChange={(url) => setImageDetail1(url)}
                    label="3️⃣ დეტალი / ლოგო (Badge / Patch)"
                    accentColor="cyan"
                    helperText="გუნდის ემბლემა, პაჩი ან ბრენდის ლოგო"
                  />

                  <ImageDropzone
                    value={imageDetail2}
                    onChange={(url) => setImageDetail2(url)}
                    label="4️⃣ იარლიყი / ნაკერი (Stitch / Tag)"
                    accentColor="cyan"
                    helperText="ხარისხის დეტალი, იარლიყი ან ქსოვილი"
                  />

                  <ImageDropzone
                    value={imageDetail3}
                    onChange={(url) => setImageDetail3(url)}
                    label="5️⃣ მოედანზე / მოდელი (Pitch / Lifestyle)"
                    accentColor="cyan"
                    helperText="დამატებითი რაკურსი ან მოდელი"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProd.isWc26}
                    onChange={(e) => setNewProd({ ...newProd, isWc26: e.target.checked })}
                    className="accent-[#00e5ff]"
                  />
                  <span>ოფიციალური კოლექცია</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProd.isNiche}
                    onChange={(e) => setNewProd({ ...newProd, isNiche: e.target.checked })}
                    className="accent-[#00e5ff]"
                  />
                  <span>ექსკლუზიური არქივი</span>
                </label>
              </div>

              {/* DESCRIPTIONS IN GEORGIAN & ENGLISH */}
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <label className="font-mono text-slate-400 flex items-center justify-between">
                    <span>აღწერა (ქართულად):</span>
                    <span className="text-[10px] text-slate-500">Georgian Description</span>
                  </label>
                  <textarea
                    rows={2}
                    value={newProd.descriptionKa}
                    onChange={(e) => setNewProd({ ...newProd, descriptionKa: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00e5ff]"
                    placeholder="მაგ: 🔥 Florian Wirtz #10 | 💰 140₾ | 📏 S, M, L. ოფიციალური Player Version მაისური."
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-400 flex items-center justify-between">
                    <span>Description (English):</span>
                    <span className="text-[10px] text-[#00e5ff]">English Description</span>
                  </label>
                  <textarea
                    rows={2}
                    value={newProd.descriptionEn}
                    onChange={(e) => setNewProd({ ...newProd, descriptionEn: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00e5ff]"
                    placeholder="e.g. 🔥 Florian Wirtz #10 Player Version Jersey | 140 GEL | Available sizes S, M, L."
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#00e5ff] text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:bg-[#33ebff] transition"
                >
                  {editingProductId ? 'ცვლილებების შენახვა' : 'ბიბლიოთეკაში დამატება'}
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition shrink-0"
                  >
                    გაუქმება
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Current products list */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              არსებული მაისურები ({products.length})
            </h2>

            <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`p-3 rounded-2xl bg-slate-900 border transition flex items-center justify-between text-xs ${
                    editingProductId === p.id
                      ? 'border-[#00e5ff] bg-cyan-950/20'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden mr-2">
                    <img src={p.imageFront} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />
                    <div className="truncate">
                      <p className="font-bold text-white truncate flex items-center space-x-1.5">
                        <span className="truncate">{p.titleKa}</span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-mono font-bold shrink-0">
                            -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% SALE
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {p.nationalTeamKa} • #{p.number} •{' '}
                        <span className="text-[#00e5ff] font-bold">{p.price} ₾</span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="line-through text-slate-500 ml-1 font-mono">{p.originalPrice} ₾</span>
                        )}
                        {p.sizes && p.sizes.length > 0 && ` • [${p.sizes.join(', ')}]`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => handleStartEdit(p)}
                      className={`p-2 rounded-lg border transition ${
                        editingProductId === p.id
                          ? 'bg-[#00e5ff] text-black border-[#00e5ff]'
                          : 'bg-cyan-950/60 text-[#00e5ff] border-cyan-800/40 hover:bg-cyan-900/60'
                      }`}
                      title="რედაქტირება"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-2 rounded-lg bg-red-950/60 text-red-400 border border-red-900/40 hover:bg-red-900 transition"
                      title="წაშლა"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INSTAGRAM IMPORT TAB */}
      {activeTab === 'instagram' && (
        <div className="space-y-8 max-w-6xl mx-auto">
          {/* Top Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-amber-900/20 border border-pink-500/30 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg shadow-pink-500/30">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white">ინსტაგრამიდან პოსტის იმპორტი (@futt_universe)</h2>
                <p className="text-xs text-slate-300">
                  ჩასვით ინსტაგრამის პოსტის ტექსტი / აღწერა და სისტემა ავტომატურად გააანალიზებს ფასს, ზომას, მოთამაშეს და ტიპს!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Parser Box */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-[#12122b] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>ინსტაგრამის პოსტის ტექსტის ჩასმა & გაანალიზება</span>
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300">
                  ჩასვით ინსტაგრამის პოსტის აღწერა (Caption):
                </label>
                <textarea
                  rows={6}
                  value={igCaptionText}
                  onChange={(e) => setIgCaptionText(e.target.value)}
                  placeholder={`მაგალითად:\nFlorian Wirtz — Player Version\n💰 ფასი: 67₾\n📏 ზომა: L\n🔥 მოთამაშის ვერსია (Player Version)\nგერმანია / ბაიერ ლევერკუზენი`}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-pink-500 font-mono leading-relaxed"
                />
              </div>

              {/* Instagram Photo Drag & Drop */}
              <ImageDropzone
                value={igPhotoUrl}
                onChange={(url) => setIgPhotoUrl(url)}
                label="ინსტაგრამის ფოტო (Drag & Drop)"
                accentColor="pink"
                helperText="ჩააგდეთ ინსტაგრამის ფოტო, დააკოპირეთ სურათი ან ჩასვით ლინკი"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleParseAndFill}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs transition flex items-center justify-center space-x-2"
                >
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  <span>გაანალიზება & ფორმაში გადატანა</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectAddInstagram}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-xs shadow-lg shadow-pink-500/25 transition flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>პირდაპირ ბიბლიოთეკაში დამატება</span>
                </button>
              </div>
            </div>

            {/* Instruction Box */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#12122b] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>როგორ დავამატოთ ინსტაგრამის პოსტი?</span>
              </h3>

              <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside leading-relaxed font-mono">
                <li>
                  გახსენით ინსტაგრამზე <strong className="text-pink-400">@futt_universe</strong> პოსტი.
                </li>
                <li>
                  დააკოპირეთ პოსტის აღწერა (Caption) და ჩასვით მარცხენა ველში.
                </li>
                <li>
                  სისტემა ავტომატურად იპოვის <span className="text-[#00e5ff]">ფასს (67₾/55₾)</span>, <span className="text-[#00e5ff]">ზომას (L, M...)</span>, <span className="text-[#00e5ff]">მოთამაშის სახელს</span> და <span className="text-[#00e5ff]">ვერსიას (Player / Fan / Retro)</span>.
                </li>
                <li>
                  დააჭირეთ <strong>"პირდაპირ ბიბლიოთეკაში დამატებას"</strong> და მაისური მაშინვე გამოჩნდება საიტის კატალოგში!
                </li>
              </ol>
            </div>
          </div>

          {/* INSTAGRAM PRESET COLLECTION */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>ინსტაგრამის პოპულარული პოსტების კოლექცია (1-Click Import)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  დააჭირეთ ერთ ღილაკს, რომ პოპულარული ინსტაგრამის მაისურები მყისიერად დაემატოს საიტის ბიბლიოთეკას:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INSTAGRAM_PRESETS.map((preset, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/40 transition space-y-3 relative group"
                >
                  <div className="flex space-x-3">
                    <img
                      src={preset.imageFront}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1">
                      <p className="text-xs font-black text-white">{preset.titleKa}</p>
                      <p className="text-[11px] text-pink-400 font-bold">{preset.nationalTeamKa} • #{preset.number}</p>
                      <p className="text-[11px] text-[#00e5ff] font-extrabold">{preset.price} ₾ • [{preset.sizes?.join(', ')}]</p>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 font-mono bg-slate-950 p-2 rounded-lg line-clamp-2">
                    {preset.captionSampleKa}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleImportPreset(preset)}
                    className="w-full py-2 px-3 rounded-xl bg-pink-500/10 hover:bg-pink-500 border border-pink-500/40 text-pink-300 hover:text-white font-bold text-xs transition flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ბიბლიოთეკაში დამატება</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BLOG / JOURNAL EDITOR TAB */}
      {activeTab === 'blog' && (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header Banner */}
          <div className="p-6 rounded-3xl bg-[#12122b] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#00e5ff]" />
                <h2 className="text-lg font-extrabold text-white">ჟურნალის და სტატიების სარედაქციო მართვა</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20 text-xs font-mono font-bold">
                  {blogPosts.length} სტატია
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                შექმენით, დაარედაქტირეთ ან წაშალეთ FUT Universe-ის ბლოგის სტატიები, SEO მიმოხილვები და სიახლეები.
              </p>
            </div>

            {editingBlogSlug && (
              <button
                type="button"
                onClick={handleCancelEditBlog}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition flex items-center space-x-2"
              >
                <X className="w-4 h-4 text-red-400" />
                <span>რედაქტირების გაუქმება</span>
              </button>
            )}
          </div>

          {/* Main Grid: Editor Window (Left) + Published Articles (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* JOURNAL EDITOR WINDOW */}
            <div id="journal-editor-form" className="lg:col-span-7 p-6 rounded-3xl bg-[#12122b] border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-4 h-4 text-[#00e5ff]" />
                  <h3 className="text-sm font-extrabold text-white">
                    {editingBlogSlug ? `სტატიის რედაქტირება: ${editingBlogSlug}` : 'ახალი სტატიის დაწერა და გამოქვეყნება'}
                  </h3>
                </div>
                {editingBlogSlug && (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-mono font-bold">
                    რედაქტირების რეჟიმი
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
                {/* Title KA & EN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-slate-400 mb-1 block">სათაური (ქართულად) *:</label>
                    <input
                      type="text"
                      required
                      placeholder="მაგ: 2026 წლის მსოფლიო ჩემპიონატის მაისურები — 49 ლარად!"
                      value={blogForm.titleKa}
                      onChange={(e) => setBlogForm({ ...blogForm, titleKa: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-[#00e5ff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-slate-400 mb-1 block">Title (English):</label>
                    <input
                      type="text"
                      placeholder="e.g. 2026 World Cup Kits Special Offer — Only 49 GEL"
                      value={blogForm.titleEn}
                      onChange={(e) => setBlogForm({ ...blogForm, titleEn: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-[#00e5ff] outline-none"
                    />
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-mono text-slate-400">URL Slug (იდენტიფიკატორი) *:</label>
                    <span className="text-[10px] text-slate-500 font-mono">მაგ: 2026-world-cup-sale-49gel</span>
                  </div>
                  <input
                    type="text"
                    required
                    disabled={Boolean(editingBlogSlug)}
                    placeholder="2026-world-cup-sale-49gel"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono disabled:opacity-50 focus:border-[#00e5ff] outline-none"
                  />
                </div>

                {/* Excerpt KA & EN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-slate-400 mb-1 block">მოკლე ანონსი (ქართულად) *:</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="მოკლე 2-3 წინადადება, რომელიც გამოჩნდება ბარათზე..."
                      value={blogForm.excerptKa}
                      onChange={(e) => setBlogForm({ ...blogForm, excerptKa: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-[#00e5ff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-slate-400 mb-1 block">Short Excerpt (English):</label>
                    <textarea
                      rows={2}
                      placeholder="Short preview for card displays..."
                      value={blogForm.excerptEn}
                      onChange={(e) => setBlogForm({ ...blogForm, excerptEn: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-[#00e5ff] outline-none"
                    />
                  </div>
                </div>

                {/* Content KA */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-mono text-slate-400">სრული სტატიის ტექსტი (ქართულად) *:</label>
                    <span className="text-[10px] text-slate-500 font-mono">მხარს უჭერს აბზაცებს & Markdown-ს</span>
                  </div>
                  <textarea
                    rows={8}
                    required
                    placeholder="დაწერეთ სტატიის სრული ტექსტი..."
                    value={blogForm.contentKa}
                    onChange={(e) => setBlogForm({ ...blogForm, contentKa: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-[#00e5ff] outline-none font-sans text-xs leading-relaxed"
                  />
                </div>

                {/* Content EN */}
                <div>
                  <label className="font-mono text-slate-400 mb-1 block">Full Article Content (English):</label>
                  <textarea
                    rows={5}
                    placeholder="Full article body in English..."
                    value={blogForm.contentEn}
                    onChange={(e) => setBlogForm({ ...blogForm, contentEn: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-[#00e5ff] outline-none font-sans text-xs leading-relaxed"
                  />
                </div>

                {/* Blog Cover Image Drag & Drop */}
                <ImageDropzone
                  value={blogForm.coverImage}
                  onChange={(url) => setBlogForm({ ...blogForm, coverImage: url })}
                  label="სტატიის ქავერის ფოტო (Drag & Drop / URL / Base64)"
                  accentColor="cyan"
                  helperText="ჩააგდეთ ფოტო, დააკოპირეთ ლინკი ან ჩასვით Ctrl+V"
                />

                {/* Meta: Author & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-slate-400 mb-1 block">ავტორი (Author):</label>
                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-slate-400 mb-1 block">კითხვის დრო (Read Time):</label>
                    <input
                      type="text"
                      placeholder="მაგ: 3 წუთი"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* Tags & Related Player Slugs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-slate-400 mb-1 block">ტეგები (მძიმით გამოყოფილი):</label>
                    <input
                      type="text"
                      placeholder="World Cup 2026, Sale, 49 GEL, Georgia"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-slate-400 mb-1 block">დაკავშირებული მოთამაშეები (Slugs):</label>
                    <input
                      type="text"
                      placeholder="wirtz, mainoo, zidande, messi"
                      value={blogForm.relatedPlayerSlugs}
                      onChange={(e) => setBlogForm({ ...blogForm, relatedPlayerSlugs: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="pt-2 flex items-center space-x-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-cyan-400 hover:from-cyan-400 hover:to-[#00e5ff] text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{editingBlogSlug ? 'ცვლილებების შენახვა' : 'ჟურნალში გამოქვეყნება'}</span>
                  </button>

                  {editingBlogSlug && (
                    <button
                      type="button"
                      onClick={handleCancelEditBlog}
                      className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition"
                    >
                      გაუქმება
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* PUBLISHED ARTICLES LIST */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-[#12122b] border border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>გამოქვეყნებული სტატიები ({blogPosts.length})</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">FUT Journal</span>
              </div>

              {blogPosts.length === 0 ? (
                <div className="p-8 rounded-3xl bg-[#12122b] border border-slate-800 text-center text-slate-500 text-xs">
                  სტატიები ჯერ არ არის გამოქვეყნებული.
                </div>
              ) : (
                <div className="space-y-3 max-h-[900px] overflow-y-auto pr-1">
                  {blogPosts.map((post) => (
                    <div
                      key={post.slug}
                      className={`p-4 rounded-2xl bg-slate-900 border transition space-y-3 relative group ${
                        editingBlogSlug === post.slug ? 'border-[#00e5ff] bg-[#00e5ff]/5' : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex space-x-3">
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-20 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-black text-white line-clamp-1 group-hover:text-[#00e5ff] transition">
                            {post.titleKa}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {post.excerptKa}
                          </p>
                          <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono pt-0.5">
                            <span>{post.publishDate}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags Badges */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[9px] font-mono">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                        <a
                          href={`/journal/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-[#00e5ff] text-[11px] font-mono flex items-center space-x-1 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>ნახვა</span>
                        </a>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleStartEditBlog(post)}
                            className="px-3 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/50 text-[11px] font-bold flex items-center space-x-1 transition"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>რედაქტირება</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(post.slug)}
                            className="px-3 py-1 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-900/50 text-[11px] font-bold flex items-center space-x-1 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>წაშლა</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div className="p-6 rounded-3xl bg-[#12122b] border border-slate-800 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-[#00e5ff]" />
              <span>მომხმარებლების შეტყობინებები ({contactMessages.length})</span>
            </h2>
            <button
              onClick={fetchContactMessages}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center space-x-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span>განახლება</span>
            </button>
          </div>

          {contactMessages.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs space-y-2">
              <MessageCircle className="w-8 h-8 text-slate-600 mx-auto" />
              <p>ჯერჯერობით შეტყობინებები არ არის.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {contactMessages.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs relative"
                >
                  <div className="flex items-center justify-between text-slate-300 border-b border-slate-800/80 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-white text-sm">{m.name}</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#00e5ff]/10 text-[#00e5ff] font-mono text-[10px]">
                        {m.contact}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] text-slate-500 font-mono">{m.date}</span>
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1.5 rounded-lg bg-red-950/60 text-red-400 border border-red-900/40 hover:bg-red-900 transition"
                        title="წაშლა"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
