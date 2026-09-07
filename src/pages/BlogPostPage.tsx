import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, MessageCircle, ArrowRight, Share2 } from 'lucide-react';
import { BlogPost, PlayerInfo, Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface BlogPostPageProps {
  postSlug: string;
  blogPosts: BlogPost[];
  players: PlayerInfo[];
  products: Product[];
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  postSlug,
  blogPosts,
  players,
  products,
  navigate,
  lang
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [postSlug]);

  const post = blogPosts.find(b => b.slug === postSlug) || blogPosts[0];

  useEffect(() => {
    if (post) {
      document.title = `${post.titleKa} | FUT Universe`;
    }
  }, [post]);

  if (!post) return null;

  // Related players mentioned in article
  const relatedPlayers = players.filter(pl => post.relatedPlayerSlugs?.includes(pl.slug));
  const relatedProducts = products.filter(p =>
    post.relatedPlayerSlugs?.some(slug =>
      p.playerSlug.toLowerCase().includes(slug.toLowerCase()) ||
      p.tags?.some(t => t.toLowerCase().includes(slug.toLowerCase()))
    )
  ).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back link */}
      <div>
        <button
          onClick={() => navigate('/journal')}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-[#00e5ff] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'ka' ? 'ჟურნალში დაბრუნება' : 'Back to Journal'}</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-mono">
          <span className="text-[#00e5ff] font-bold">{post.publishDate}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
          {lang === 'ka' ? post.titleKa : post.titleEn}
        </h1>

        <p className="text-sm text-slate-300 italic border-l-2 border-[#00e5ff] pl-4">
          {lang === 'ka' ? post.excerptKa : post.excerptEn}
        </p>
      </div>

      {/* Cover Image / Poster */}
      <div className="rounded-3xl overflow-hidden border border-slate-800 bg-[#090914] shadow-2xl flex items-center justify-center p-2 sm:p-4">
        <img
          src={post.coverImage}
          alt={post.titleKa}
          className="max-h-[750px] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Article Body Content */}
      <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-6">
        <div className="whitespace-pre-line p-6 rounded-3xl bg-[#12122b]/80 border border-slate-800">
          {lang === 'ka' ? post.contentKa : post.contentEn}
        </div>
      </div>

      {/* Internal SEO links to mentioned player landing pages */}
      {relatedPlayers.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#12122b] border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-wider">
            {lang === 'ka' ? 'სტატიაში ნახსენები მოთამაშეების გვერდები' : 'Mentioned Player Pages'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedPlayers.map((pl) => (
              <div
                key={pl.slug}
                onClick={() => navigate(`/player/${pl.slug}`)}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#00e5ff]/50 cursor-pointer flex items-center justify-between transition"
              >
                <div className="flex items-center space-x-3">
                  <img src={pl.image} alt={pl.nameKa} className="w-9 h-9 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-xs font-bold text-white">{pl.nameKa} მაისური</p>
                    <p className="text-[10px] text-[#00e5ff]">{pl.teamKa} #{pl.number}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mentioned Products Cards */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white">
            {lang === 'ka' ? 'შესაბამისი მაისურები მარაგში' : 'Matching Jerseys in Stock'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(id) => navigate(`/product/${id}`)}
                lang={lang}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
