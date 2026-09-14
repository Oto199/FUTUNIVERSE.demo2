import React, { useEffect } from 'react';
import { ArrowLeft, MessageCircle, ShieldCheck, ArrowRight, Instagram } from 'lucide-react';
import { TeamInfo, Product, PlayerInfo } from '../types';
import { ProductCard } from '../components/ProductCard';

interface TeamLandingPageProps {
  teamSlug: string;
  teams: TeamInfo[];
  products: Product[];
  players: PlayerInfo[];
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
}

export const TeamLandingPage: React.FC<TeamLandingPageProps> = ({
  teamSlug,
  teams,
  products,
  players,
  navigate,
  lang
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [teamSlug]);

  const team = teams.find(t => t.slug === teamSlug) || {
    slug: teamSlug,
    nameKa: teamSlug.charAt(0).toUpperCase() + teamSlug.slice(1),
    nameEn: teamSlug.charAt(0).toUpperCase() + teamSlug.slice(1),
    flagEmoji: '⚽',
    descriptionKa: `${teamSlug}-ს ოფიციალური ახალი და საკლუბო მაისურები FUT Universe-ის თბილისის ბიბლიოთეკაში.`,
    descriptionEn: `Official ${teamSlug} kits in FUT Universe Tbilisi.`,
    heroImage: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80'
  };

  const teamProducts = products.filter(
    p => p.teamSlug === team.slug || p.nationalTeamEn.toLowerCase() === team.nameEn.toLowerCase()
  );

  const teamPlayers = players.filter(pl => pl.teamSlug === team.slug);

  useEffect(() => {
    document.title = `${team.nameKa} მაისურები | FUT Universe თბილისი`;
  }, [team]);

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

      {/* Team Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#12122b] to-slate-950 border border-slate-800 p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{team.flagEmoji}</span>
            <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-widest">NATIONAL TEAM ARCHIVE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {team.nameKa} მაისურები
          </h1>

          <p className="text-xs font-mono text-slate-400">
            SEO Title: {team.nameEn} National Team Kits & Jerseys | FUT Universe
          </p>

          <p className="text-slate-300 text-sm leading-relaxed">
            {team.descriptionKa}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
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
              href="https://m.me/futt_universe"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-blue-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'ka' ? 'Messenger-ზე წერა' : 'Order via Messenger'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Team Roster Player Page Links */}
      {teamPlayers.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#12122b] border border-slate-800 space-y-3">
          <h3 className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-wider">
            {team.nameKa}-ს ნაკრების მოთამაშეების გვერდები
          </h3>
          <div className="flex flex-wrap gap-2">
            {teamPlayers.map((pl) => (
              <button
                key={pl.slug}
                onClick={() => navigate(`/player/${pl.slug}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition"
              >
                <span>{pl.nameKa} #{pl.number}</span>
                <ArrowRight className="w-3 h-3 text-[#00e5ff]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Team Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-widest">INVENTORY</span>
            <h2 className="text-xl font-extrabold text-white">
              {team.nameKa}-ს ყველა ხელმისაწვდომი ფორმა
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {teamProducts.length} {lang === 'ka' ? 'მაისური მარაგშია' : 'items'}
          </span>
        </div>

        {teamProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(id) => navigate(`/product/${id}`)}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 font-semibold">
              {team.nameKa}-ს ნაკრების მაისურების მიღება იგეგმება!
            </p>
            <p className="text-xs text-slate-500">
              დაგვიკავშირდით Instagram-ზე ან Messenger-ში წინასწარი შეკვეთისთვის.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
