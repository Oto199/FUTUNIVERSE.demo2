import React, { useEffect } from 'react';
import { ArrowLeft, MessageCircle, Sparkles, ShieldCheck, ArrowRight, Share2, Instagram } from 'lucide-react';
import { PlayerInfo, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { handleImageError, INLINE_SVG_JERSEY, sanitizeImageUrl } from '../lib/imageUtils';

interface PlayerLandingPageProps {
  playerSlug: string;
  players: PlayerInfo[];
  products: Product[];
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
}

export const PlayerLandingPage: React.FC<PlayerLandingPageProps> = ({
  playerSlug,
  players,
  products,
  navigate,
  lang
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [playerSlug]);

  // Find player or create dynamic fallback stub for any search
  const player = players.find(p => p.slug === playerSlug) || {
    slug: playerSlug,
    nameKa: playerSlug.charAt(0).toUpperCase() + playerSlug.slice(1),
    nameEn: playerSlug.charAt(0).toUpperCase() + playerSlug.slice(1),
    teamKa: 'საერთაშორისო',
    teamEn: 'International',
    teamSlug: 'germany',
    position: 'მოთამაშე',
    number: 10,
    bioKa: `${playerSlug}-ს ოფიციალური მაისურები FUT Universe-ის თბილისის ბიბლიოთეკაში.`,
    bioEn: `Official ${playerSlug} jerseys in FUT Universe Tbilisi library.`,
    wc26Role: 'ნაკრების წევრი',
    image: INLINE_SVG_JERSEY
  };

  const playerProducts = products.filter(
    p => p.playerSlug === player.slug || p.playerEn.toLowerCase().includes(player.nameEn.toLowerCase())
  );

  // SEO Page Title & Meta Tags
  useEffect(() => {
    document.title = `${player.nameKa} (${player.nameEn}) მაისური | FUT Universe თბილისი`;
  }, [player]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Link */}
      <div>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-[#00e5ff] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'ka' ? 'კატალოგში დაბრუნება' : 'Back to Catalog'}</span>
        </button>
      </div>

      {/* SEO Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#12122b] to-slate-950 border border-slate-800 p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-mono font-bold uppercase">
              <span>{player.teamKa}</span>
              <span>•</span>
              <span>#{player.number}</span>
              <span>•</span>
              <span>{player.position}</span>
            </div>

            {/* MANDATORY H1 PATTERN */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {player.nameKa} მაისური — {player.teamKa}
            </h1>

            <p className="text-xs font-mono text-slate-400">
              SEO Title: {player.nameEn} Kit & Jersey | FUT Universe Tbilisi
            </p>

            {/* 2-3 Sentences of Genuine Georgian Content (Anti thin-content requirement) */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm leading-relaxed space-y-2">
              <p>{player.bioKa}</p>
              <p className="text-xs text-[#00e5ff] font-semibold">{player.wc26Role}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://www.instagram.com/futt_universe/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-purple-950/40"
              >
                <Instagram className="w-4 h-4" />
                <span>{lang === 'ka' ? 'Instagram-ზე წერა' : 'Order via Instagram'}</span>
              </a>

              <a
                href="https://m.me/61590795092247"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-blue-950/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ka' ? 'Messenger-ზე წერა' : 'Order via Messenger'}</span>
              </a>

              <button
                onClick={() => navigate(`/team/${player.teamSlug}`)}
                className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-[#00e5ff] font-semibold text-xs transition flex items-center space-x-1"
              >
                <span>{player.teamKa}-ს ყველა მაისური</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full p-1 bg-gradient-to-tr from-[#00e5ff] to-indigo-600 shadow-2xl shadow-cyan-950/50">
              <img
                src={sanitizeImageUrl(playerProducts[0]?.imageFront || player.image)}
                alt={player.nameKa}
                className="w-full h-full rounded-full object-cover border-4 border-[#0a0a0f]"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS IN STOCK FOR THIS PLAYER */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-widest">LIBRARY INVENTORY</span>
            <h2 className="text-xl font-extrabold text-white">
              {player.nameKa}-ს ხელმისაწვდომი მაისურები
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {playerProducts.length} {lang === 'ka' ? 'მაისური მარაგშია' : 'kits in stock'}
          </span>
        </div>

        {playerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playerProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(id) => navigate(`/product/${id}`)}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <p className="text-sm text-slate-300 font-semibold">
              {player.nameKa}-ს მაისური მზადდება შეკვეთით თბილისში!
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              დაგვიკავშირდით Instagram-ზე ან Messenger-ში და ჩვენი გუნდი დაამზადებს ორიგინალ პრინტს თქვენს ზომაზე.
            </p>
            <a
              href="https://www.instagram.com/futt_universe/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs"
            >
              <Instagram className="w-4 h-4" />
              <span>ინდივიდუალური შეკვეთა Instagram-ზე</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
