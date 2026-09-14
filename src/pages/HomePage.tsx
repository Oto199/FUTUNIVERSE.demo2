import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, BookOpen, MessageCircle, Search, Compass, Instagram, Layers, MapPin, Award, CheckCircle2, Zap, Tag, Percent, ShoppingBag } from 'lucide-react';
import { Product, PlayerInfo, TeamInfo, BlogPost } from '../types';
import { ProductCard } from '../components/ProductCard';
import Stack from '../components/Stack';
import ShinyText from '../components/reactbits/ShinyText';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import TrueFocus from '../components/reactbits/TrueFocus';
import DecryptedText from '../components/reactbits/DecryptedText';
import ClickSpark from '../components/reactbits/ClickSpark';
import DriftWall, { DriftWallItem } from '../components/reactbits/DriftWall';
import { handleImageError, sanitizeImageUrl } from '../lib/imageUtils';

interface HomePageProps {
  products: Product[];
  players: PlayerInfo[];
  teams: TeamInfo[];
  blogPosts: BlogPost[];
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  players,
  teams,
  blogPosts,
  navigate,
  lang
}) => {
  const backToSchoolProducts = products.filter(p => 
    p.tags?.some(t => t.toLowerCase().includes('back to school') || t.toLowerCase().includes('sale')) ||
    (p.originalPrice && p.originalPrice > p.price)
  );
  const featuredNicheProducts = products.filter(p => p.isNiche || p.isFeatured).slice(0, 8);
  const saleStackItems = (backToSchoolProducts.length > 0 ? backToSchoolProducts : products).slice(0, 8);
  const saleStackCards = saleStackItems.map((prod) => (
    <div key={`sale-stack-${prod.id}`} className="relative w-full h-full bg-[#0d091a] border-2 border-amber-500/40 rounded-2xl overflow-hidden group shadow-2xl select-none">
      <img
        src={sanitizeImageUrl(prod.imageFront)}
        alt={lang === 'ka' ? prod.titleKa : prod.titleEn}
        referrerPolicy="no-referrer"
        onError={handleImageError}
        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614] via-[#0a0614]/40 to-transparent pointer-events-none" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex items-center space-x-1.5 pointer-events-none">
        <div className="px-2.5 py-1 bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider rounded shadow-lg flex items-center space-x-1">
          <span>🎒 SALE</span>
        </div>
        {prod.kitType && (
          <div className="px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold rounded">
            {prod.kitType}
          </div>
        )}
      </div>

      {prod.sizes && prod.sizes.length > 0 && (
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/20 text-white text-[10px] font-mono font-bold rounded pointer-events-none">
          {prod.sizes.join(', ')}
        </div>
      )}

      {/* Details */}
      <div className="absolute bottom-4 left-4 right-4 space-y-1.5 text-left">
        <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
          {lang === 'ka' ? prod.nationalTeamKa : prod.nationalTeamEn}
        </p>
        <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight line-clamp-1">
          {lang === 'ka' ? prod.titleKa : prod.titleEn}
        </h3>
        <p className="text-xs text-zinc-300 line-clamp-1 italic">
          {lang === 'ka' ? prod.descriptionKa : prod.descriptionEn}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-amber-400 font-display">{prod.price} ₾</span>
            {prod.originalPrice && (
              <span className="text-xs text-zinc-400 line-through font-mono">{prod.originalPrice} ₾</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${prod.id}`);
            }}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black text-[11px] font-black uppercase tracking-wider transition rounded-lg flex items-center space-x-1.5 cursor-pointer z-10 shadow-lg shadow-amber-500/20"
          >
            <span>{lang === 'ka' ? 'შეკვეთა' : 'View / Order'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  ));

  const driftWallItems: DriftWallItem[] = products.map((prod) => ({
    id: prod.id,
    image: sanitizeImageUrl(prod.imageFront),
    title: lang === 'ka' ? prod.titleKa : prod.titleEn
  }));

  return (
    <div className="space-y-16 pb-16">
      {/* MAIN TOP HERO SECTION: DRIFT WALL + STATS WITH NO MARGIN */}
      <div className="w-full">
        {/* MAIN FIRST DIV: DRIFT WALL HERO */}
        <div className="relative w-full overflow-hidden bg-[#050508] border-b border-white/10">
          <div className="relative w-full h-[580px] sm:h-[700px] flex items-center justify-center">
            <DriftWall
              items={driftWallItems.length > 0 ? driftWallItems : undefined}
              columns={5}
              tileWidth={220}
              tileHeight={140}
              gap={20}
              tilt={16}
              turn={-14}
              perspective={1200}
              depth={120}
              speed={42}
              direction="up"
              variance={0.45}
              parallax={0.6}
              lift={64}
              fade={0.12}
              dim={0.92}
              overlayColor="transparent"
              onTileClick={(item) => {
                if (item.id) navigate(`/product/${item.id}`);
              }}
            />

            {/* Overlay text / CTA overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508]/90 via-transparent to-[#050508]/60 flex flex-col items-center justify-between p-6 sm:p-10 text-center z-20">
              <div className="pointer-events-auto backdrop-blur-md bg-black/80 px-5 py-2.5 rounded-full border border-white/20 shadow-2xl flex items-center space-x-3">
                <img src="/logo.png" alt="FUT Universe Logo" className="w-6 h-6 rounded-full object-contain border border-[#00e5ff]/60 bg-black" referrerPolicy="no-referrer" />
                <span className="text-xs font-black uppercase tracking-widest text-white">
                  FUT UNIVERSE • {lang === 'ka' ? 'თბილისის საფეხბურთო გალერეა' : 'TBILISI FOOTBALL GALLERY'}
                </span>
              </div>

              <div className="pointer-events-auto max-w-xl space-y-3 bg-black/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl">
                <div className="flex items-center justify-center space-x-2.5">
                  <img src="/logo.png" alt="FUT Universe" className="w-8 h-8 rounded-xl border border-cyan-400/50 shadow-lg shadow-cyan-500/20 object-contain bg-black p-0.5" referrerPolicy="no-referrer" />
                  <span className="text-xs font-mono font-bold text-[#00e5ff] tracking-widest uppercase">FUT UNIVERSE</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {lang === 'ka' ? 'ყველაფერი საფეხბურთო ორბიტის გარშემო.' : 'EVERYTHING AROUND FOOTBALL’S ORBIT'}
                </h2>
                <div className="pt-2 flex justify-center">
                  <ClickSpark sparkColor="#00e5ff">
                    <button
                      onClick={() => navigate('/shop')}
                      className="px-6 py-3 bg-[#00e5ff] hover:bg-[#33ebff] text-black font-black text-xs uppercase tracking-widest flex items-center space-x-2 transition cursor-pointer shadow-xl shadow-cyan-500/20 rounded-xl"
                    >
                      <span>{lang === 'ka' ? 'მაღაზიის დათვალიერება' : 'EXPLORE ALL KITS'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </ClickSpark>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 100% საუკეთესო ხარისხი... STATS BAR DIRECTLY BELOW MAIN DIV (NO MARGIN) */}
        <div className="w-full bg-[#080811] border-b border-white/10 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-6 text-center sm:text-left divide-x divide-white/10">
              <div className="space-y-1 sm:pl-0">
                <div className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">100%</div>
                <div className="micro-label">{lang === 'ka' ? 'საუკეთესო ხარისხი' : 'Best Quality'}</div>
              </div>
              <div className="space-y-1 pl-4 sm:pl-8">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#00e5ff] font-display tracking-tight leading-none">{lang === 'ka' ? 'რეტრო და ახალი' : 'Retro & New'}</div>
                <div className="micro-label text-slate-400 text-[10px]">{lang === 'ka' ? 'უდიდესი კოლექცია' : 'Largest Collection'}</div>
              </div>
              <div className="space-y-1 pl-4 sm:pl-8">
                <div className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">24/7</div>
                <div className="micro-label">{lang === 'ka' ? 'თბილისის ექსპრესი' : 'Tbilisi Velocity'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BACK TO SCHOOL SALE 🎒⚽️ BANNER & SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1005] via-[#0d091a] to-[#05050d] border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl shadow-amber-500/10">
          {/* Subtle glowing orb */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            {/* Top Showcase: Split into Headline/Info on Left & Interactive 3D Stack on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Info & Badges */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <span>🎒⚽️ BACK TO SCHOOL SALE</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                  {lang === 'ka' 
                    ? 'ახალი სასწავლო წელი ახალი მაისურით უფრო კარგად იწყება 👕🔥' 
                    : 'Kick Off the School Year with a Fresh Kit 👕🔥'}
                </h2>
                
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {lang === 'ka'
                    ? 'განსაკუთრებული მაისურები ფეხბურთის სხვადასხვა ეპოქიდან — ლეგენდებიდან დღევანდელ ვარსკვლავებამდე (რონალდინიო, ზიდანი, მბაპე, ბრუნო, მეინუ, ვირცი, დიაზი).'
                    : 'Special jerseys from across football eras — from timeless legends to today’s brightest stars (Ronaldinho, Zidane, Mbappé, Bruno, Mainoo, Wirtz, Díaz).'}
                </p>

                {/* Price Categories Badge Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                    <span>💛 Fan Version</span>
                    <span className="text-white font-mono font-black text-sm">— 49₾</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                    <span>⭐ Player / Retro</span>
                    <span className="text-white font-mono font-black text-sm">— 59₾</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => navigate('/journal/back-to-school-sale-2026')}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition border border-white/20 flex items-center space-x-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'ka' ? 'სტატიის წაკითხვა' : 'Read Article'}</span>
                  </button>
                  <button
                    onClick={() => navigate('/shop?sale=true')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs uppercase tracking-widest transition flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <span>{lang === 'ka' ? 'ყველა SALE მაისური' : 'View All Sale Kits'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: High-Contrast Interactive React Bits Stack Card for Back To School */}
              <div className="lg:col-span-5 relative flex flex-col items-center">
                <div className="w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] relative">
                  <Stack
                    randomRotation={true}
                    sensitivity={160}
                    sendToBackOnClick={true}
                    autoplay={true}
                    autoplayDelay={3500}
                    pauseOnHover={true}
                    cards={saleStackCards}
                  />
                </div>
                <p className="text-[11px] text-amber-300/80 mt-3 flex items-center space-x-1.5 font-medium tracking-wide">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {lang === 'ka'
                      ? 'დააჭირეთ ან გადაფურცლეთ SALE მაისურების დასათვალიერებლად'
                      : 'Click or swipe card to reveal next SALE kit'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK PLAYER ARCHIVE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-[#12122b]/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Compass className="w-4 h-4 text-[#00e5ff]" />
                <span>{lang === 'ka' ? 'მოძებნე შენი მოთამაშე ბიბლიოთეკაში' : 'Explore Library Players'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ka' ? 'დააჭირეთ მოთამაშეს მისი პირად გვერდზე გადასასვლელად' : 'Click player to view detailed player page'}
              </p>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="text-xs text-[#00e5ff] hover:underline font-semibold flex items-center space-x-1"
            >
              <span>{lang === 'ka' ? 'ყველა მოთამაშე' : 'All Players'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
            {players.map((pl) => (
              <button
                key={pl.slug}
                onClick={() => navigate(`/player/${pl.slug}`)}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-[#00e5ff]/50 text-slate-200 text-xs font-medium shrink-0 transition"
              >
                <img src={pl.image} alt={pl.nameKa} className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
                <span className="font-semibold">{pl.nameKa}</span>
                <span className="text-[10px] text-[#00e5ff] font-mono">#{pl.number}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIBRARY PHILOSOPHY SECTION - ULTRA SLEEK BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/10">
            <div>
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-black/80 border border-[#00e5ff]/30 backdrop-blur-md mb-2">
                <img src="/logo.png" alt="FUT Universe" className="w-4 h-4 rounded-full object-contain border border-[#00e5ff] bg-black" referrerPolicy="no-referrer" />
                <span className="text-[11px] font-mono font-bold text-[#00e5ff] tracking-widest uppercase">
                  {lang === 'ka' ? 'FUT UNIVERSE STANDARDS' : 'FUT UNIVERSE STANDARDS'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                {lang === 'ka' ? 'რატომ FUT Universe?' : 'Why FUT Universe?'}
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              {lang === 'ka'
                ? 'თბილისის საფეხბურთო ბიბლიოთეკა — მხოლოდ უმაღლესი ხარისხის მოთამაშეების ვერსიები (Player Versions), რეტრო კოლექციები და ექსკლუზიური პრინტები.'
                : 'Tbilisi Football Library — only premium Player Versions, retro collections, and authentic player nameprints.'}
            </p>
          </div>

          {/* Bento Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 - Main Highlight (Span 2 on desktop) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d0d1f] via-[#090915] to-[#04040a] border border-white/10 hover:border-[#00e5ff]/50 p-8 sm:p-10 flex flex-col justify-between group transition duration-500 shadow-2xl">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00e5ff]/20 transition duration-700" />
              
              <div className="relative z-10 space-y-4 max-w-xl">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 text-[10px] font-mono font-extrabold uppercase bg-[#00e5ff] text-black rounded-lg tracking-wider">
                    PLAYER VERSION & RETRO
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">100% IN-STOCK</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-[#00e5ff] transition duration-300">
                  {lang === 'ka' ? 'ექსკლუზიური საფეხბურთო მაისურები' : 'Exclusive Football Jerseys'}
                </h3>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {lang === 'ka'
                    ? 'ვირცი, კობი მეინუ, ბრუნო ფერნანდეში, ხულიან ალვარესი, ფედერიკო ვალვერდე, ლუის დიაზი და ზიდანის 2006 წლის ლეგენდარული რეტრო მაისური — ყველაფერი ადგილზეა თბილისში.'
                    : 'Florian Wirtz, Kobbie Mainoo, Bruno Fernandes, Julián Álvarez, Federico Valverde, Luis Díaz, and Zidane 2006 retro — available in stock in Tbilisi.'}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-300 font-medium">✓ {lang === 'ka' ? 'ოფიციალური შრიფტები' : 'Official Fonts'}</span>
                  <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-300 font-medium">✓ {lang === 'ka' ? 'ჩემპიონთა ლიგის პატჩები' : 'UCL Patches'}</span>
                  <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-300 font-medium">✓ {lang === 'ka' ? 'სუნთქვადი ქსოვილი' : 'Player-Spec Fabric'}</span>
                </div>
              </div>

              <div className="relative z-10 pt-8 flex items-center justify-between border-t border-white/10 mt-6">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-3 bg-[#00e5ff] hover:bg-[#33ebff] text-black font-black text-xs uppercase tracking-widest flex items-center space-x-2 transition cursor-pointer rounded-xl shadow-lg shadow-cyan-500/20"
                >
                  <span>{lang === 'ka' ? 'კატალოგის დათვალიერება' : 'VIEW CATALOG'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono">
                  <MapPin className="w-4 h-4 text-[#00e5ff]" />
                  <span>TBILISI, GEORGIA</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2 - Speed & Location */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c0c1b] to-[#05050d] border border-white/10 hover:border-[#00e5ff]/50 p-8 flex flex-col justify-between group transition duration-500 shadow-xl">
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-110 transition duration-300">
                  <Zap className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  {lang === 'ka' ? 'სწრაფი მიწოდება' : 'Express Delivery'}
                </h3>

                <p className="text-zinc-400 text-xs leading-relaxed">
                  {lang === 'ka'
                    ? 'შეკვეთა ბარდება იმავე დღეს თბილისში, ხოლო რეგიონებში 1-2 სამუშაო დღეში. Instagram-ით პირდაპირი კონსულტაცია.'
                    : 'Same-day delivery in Tbilisi and 1-2 days across regions. Direct consultation via Instagram.'}
                </p>
              </div>

              <div className="pt-6 relative z-10">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 bg-black/60 hover:bg-black/90 border border-white/15 hover:border-[#00e5ff]/50 text-white hover:text-[#00e5ff] font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition rounded-xl"
                >
                  <MessageCircle className="w-4 h-4 text-[#00e5ff]" />
                  <span>{lang === 'ka' ? 'კონტაქტი & IG' : 'CONTACT & IG'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED NICHE PICKS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2 text-left">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 uppercase tracking-widest">
              CURATED ARCHIVE
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
              {lang === 'ka' ? 'ექსკლუზიური არქივი & ახალი კოლექცია' : 'EXCLUSIVE ARCHIVE & NEW CATALOG'}
            </h2>
            <p className="text-xs text-zinc-400">
              {lang === 'ka' ? 'მოთამაშეები, რომლებსაც ჭეშმარიტი ფეხბურთის მოყვარულები ეძებენ' : 'Kits sought after by true football aficionados'}
            </p>
          </div>

          <ClickSpark sparkColor="#00e5ff">
            <button
              onClick={() => navigate('/shop')}
              className="px-4 py-2.5 bg-black hover:bg-zinc-900 border border-white/20 text-white hover:text-[#00e5ff] text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer"
            >
              <span>{lang === 'ka' ? 'ყველა მაისურის ნახვა' : 'View Full Catalog'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </ClickSpark>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredNicheProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(id) => navigate(`/product/${id}`)}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* INSTAGRAM FEED STRIP (@futt_universe) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Instagram className="w-5 h-5 text-[#00e5ff]" />
            <h3 className="text-base font-bold text-white">
              Instagram: <a href="https://instagram.com/futt_universe" target="_blank" rel="noreferrer" className="text-[#00e5ff] hover:underline">@futt_universe</a>
            </h3>
          </div>
          <a
            href="https://instagram.com/futt_universe"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#00e5ff] hover:underline font-semibold"
          >
            {lang === 'ka' ? 'გამოყევით ინსტაგრამზე' : 'Follow on Instagram'}
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href="https://instagram.com/futt_universe"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-950"
            >
              <img src={item.imageFront} alt={lang === 'ka' ? item.titleKa : item.titleEn} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-2 text-center">
                <p className="text-xs font-semibold text-white flex items-center space-x-1">
                  <Instagram className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>{lang === 'ka' ? item.titleKa : item.titleEn}</span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SEO JOURNAL PREVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-widest">FOOTBALL JOURNAL</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {lang === 'ka' ? 'ქართული საფეხბურთო სტატიები & გიდი' : 'Georgian Football Journal'}
            </h2>
          </div>
          <button
            onClick={() => navigate('/journal')}
            className="text-xs text-[#00e5ff] hover:underline font-semibold flex items-center space-x-1"
          >
            <span>{lang === 'ka' ? 'ყველა სტატია' : 'All Articles'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <SpotlightCard
              key={post.slug}
              onClick={() => navigate(`/journal/${post.slug}`)}
              className="p-5 border-white/10 bg-[#090915] hover:border-[#00e5ff]/50 cursor-pointer transition group"
              spotlightColor="rgba(0, 229, 255, 0.15)"
            >
              <div className="flex flex-col justify-between h-full space-y-4 text-left">
                <div className="space-y-3">
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-black">
                    <img src={post.coverImage} alt={post.titleKa} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-zinc-400">
                    <span className="text-[#00e5ff] font-mono">{post.publishDate}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00e5ff] transition line-clamp-2">
                    {lang === 'ka' ? post.titleKa : post.titleEn}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {lang === 'ka' ? post.excerptKa : post.excerptEn}
                  </p>
                </div>

                <div className="text-xs text-[#00e5ff] font-semibold flex items-center space-x-1 pt-2 border-t border-white/10">
                  <span>{lang === 'ka' ? 'სრულად წაკითხვა' : 'Read Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
};
