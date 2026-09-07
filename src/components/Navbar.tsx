import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowRight, ShieldCheck, Sparkles, MessageCircle, SlidersHorizontal, BookOpen, Instagram } from 'lucide-react';
import { Product, PlayerInfo, TeamInfo } from '../types';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
  setLang: (lang: 'ka' | 'en') => void;
  products: Product[];
  players: PlayerInfo[];
  teams: TeamInfo[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  navigate,
  lang,
  setLang,
  products,
  players,
  teams
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter search results for instant autocomplete
  const filteredProducts = searchQuery.trim()
    ? products.filter(p =>
        p.titleKa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.playerKa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.playerEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nationalTeamKa.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredPlayers = searchQuery.trim()
    ? players.filter(pl =>
        pl.nameKa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pl.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pl.slug.includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredTeams = searchQuery.trim()
    ? teams.filter(t =>
        t.nameKa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.slug.includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const handleSelectResult = (path: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer flex items-center space-x-5 group select-none"
        >
          <div className="relative w-12 h-12 rounded-xl bg-black border border-zinc-800 flex items-center justify-center shadow-md group-hover:border-[#008ba3] group-hover:shadow-cyan-500/20 transition duration-300 overflow-hidden shrink-0">
            <img 
              src="/logo.png" 
              alt="FUT Universe Logo" 
              className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-black text-2xl tracking-wider text-zinc-900 uppercase group-hover:text-[#008ba3] transition duration-300 font-display">
                FUT <span className="text-[#008ba3] font-mono group-hover:text-cyan-500">UNIVERSE</span>
              </span>
            </div>
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase -mt-0.5 group-hover:text-zinc-600 transition">
              JERSEY LIBRARY • TBILISI
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-sm font-semibold">
          <button
            onClick={() => navigate('/')}
            className={`transition ${currentPath === '/' ? 'text-[#008ba3] font-black' : 'text-zinc-700 hover:text-black'}`}
          >
            {lang === 'ka' ? 'მთავარი' : 'Home'}
          </button>
          <button
            onClick={() => navigate('/shop')}
            className={`transition flex items-center space-x-1 ${currentPath === '/shop' ? 'text-[#008ba3] font-black' : 'text-zinc-700 hover:text-black'}`}
          >
            <span>{lang === 'ka' ? 'მაღაზია' : 'Catalog'}</span>
          </button>
          <button
            onClick={() => navigate('/shop?niche=true')}
            className="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-300 text-[#008ba3] text-xs font-extrabold hover:bg-cyan-100 transition whitespace-nowrap"
          >
            {lang === 'ka' ? 'ახალი კოლექცია' : 'NEW COLLECTION'}
          </button>
          <button
            onClick={() => navigate('/journal')}
            className={`transition ${currentPath === '/journal' ? 'text-[#008ba3] font-black' : 'text-zinc-700 hover:text-black'}`}
          >
            {lang === 'ka' ? 'ჟურნალი' : 'Journal'}
          </button>
          <button
            onClick={() => navigate('/about')}
            className={`transition ${currentPath === '/about' ? 'text-[#008ba3] font-black' : 'text-zinc-700 hover:text-black'}`}
          >
            {lang === 'ka' ? 'შესახებ' : 'About'}
          </button>
          <button
            onClick={() => navigate('/contact')}
            className={`transition ${currentPath === '/contact' ? 'text-[#008ba3] font-black' : 'text-zinc-700 hover:text-black'}`}
          >
            {lang === 'ka' ? 'კონტაქტი' : 'Contact'}
          </button>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center space-x-3 lg:ml-8">
          {/* Search trigger */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-[#008ba3] hover:border-[#008ba3] transition flex items-center space-x-2 text-xs"
            >
              <Search className="w-4 h-4 text-[#008ba3]" />
              <span className="hidden sm:inline text-zinc-500 font-medium">
                {lang === 'ka' ? 'ძებნა' : 'Search'}
              </span>
            </button>
          </div>

          <button
            onClick={() => navigate('/admin')}
            className="p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black text-xs hidden sm:block font-bold"
            title="Admin Management"
          >
            Admin
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-[#008ba3]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-2 pb-6 space-y-3">
          <div className="pt-2 pb-3 border-b border-zinc-200 space-y-1">
            <p className="text-xs text-zinc-500 italic">ყველაფერი საფეხბურთო ორბიტის გარშემო</p>
          </div>

          <button
            onClick={() => { setIsMenuOpen(false); navigate('/'); }}
            className="block w-full text-left py-2 px-3 rounded text-zinc-800 hover:bg-zinc-100 hover:text-[#008ba3] font-medium"
          >
            {lang === 'ka' ? 'მთავარი' : 'Home'}
          </button>
          <button
            onClick={() => { setIsMenuOpen(false); navigate('/shop'); }}
            className="block w-full text-left py-2 px-3 rounded text-zinc-800 hover:bg-zinc-100 hover:text-[#008ba3] font-medium"
          >
            {lang === 'ka' ? 'მაღაზია' : 'Catalog'}
          </button>
          <button
            onClick={() => { setIsMenuOpen(false); navigate('/shop?niche=true'); }}
            className="block w-full text-left py-2 px-3 rounded bg-cyan-50 border border-cyan-200 text-[#008ba3] font-bold"
          >
            {lang === 'ka' ? 'ახალი კოლექცია' : 'NEW COLLECTION'}
          </button>
          <button
            onClick={() => { setIsMenuOpen(false); navigate('/journal'); }}
            className="block w-full text-left py-2 px-3 rounded text-zinc-800 hover:bg-zinc-100 hover:text-[#008ba3] font-medium"
          >
            {lang === 'ka' ? 'ჟურნალი' : 'Journal'}
          </button>
          <button
            onClick={() => { setIsMenuOpen(false); navigate('/about'); }}
            className="block w-full text-left py-2 px-3 rounded text-zinc-800 hover:bg-zinc-100 hover:text-[#008ba3] font-medium"
          >
            {lang === 'ka' ? 'შესახებ' : 'About'}
          </button>
          <button
            onClick={() => { setIsMenuOpen(false); navigate('/contact'); }}
            className="block w-full text-left py-2 px-3 rounded text-zinc-800 hover:bg-zinc-100 hover:text-[#008ba3] font-medium"
          >
            {lang === 'ka' ? 'კონტაქტი' : 'Contact'}
          </button>

          <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
            <a
              href="https://www.instagram.com/futt_universe/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 text-sm text-[#008ba3] font-bold"
            >
              <Instagram className="w-4 h-4" />
              <span>{lang === 'ka' ? 'Instagram-ით შეკვეთა' : 'Order via Instagram'}</span>
            </a>
            <button
              onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}
              className="px-3 py-1 rounded text-xs bg-zinc-100 text-zinc-800 border border-zinc-300 font-bold"
            >
              {lang === 'ka' ? 'English' : 'ქართული'}
            </button>
          </div>
        </div>
      )}

      {/* Global Instant Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-200 flex items-center space-x-3 bg-zinc-50">
              <Search className="w-5 h-5 text-[#008ba3]" />
              <input
                type="text"
                autoFocus
                placeholder={lang === 'ka' ? 'მოძებნეთ მოთამაშე (მაგ. ვირცი, მეინუ, ვალვერდე, ზიდანი...)' : 'Search player or team...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg hover:bg-zinc-200 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto space-y-6 bg-white">
              {!searchQuery.trim() && (
                <div className="text-center py-8">
                  <p className="text-xs text-[#008ba3] font-bold mb-2 uppercase tracking-widest">პოპულარული ძიებები / Popular Searches</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Florian Wirtz', 'Kobbie Mainoo', 'Valverde', 'Zidane 2006', 'Julián Álvarez', 'Bruno Fernandes', 'Luis Díaz'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs text-zinc-800 hover:border-[#008ba3] hover:text-[#008ba3] font-medium transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Players matching */}
              {filteredPlayers.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">მოთამაშეების გვერდები / Player Pages</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {filteredPlayers.map(pl => (
                      <div
                        key={pl.slug}
                        onClick={() => handleSelectResult(`/player/${pl.slug}`)}
                        className="p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#008ba3] cursor-pointer flex items-center justify-between transition"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={pl.image} alt={pl.nameKa} className="w-10 h-10 rounded-full object-cover border border-zinc-300" referrerPolicy="no-referrer" />
                          <div>
                            <p className="text-sm font-bold text-zinc-900">{pl.nameKa} ({pl.nameEn})</p>
                            <p className="text-xs text-[#008ba3] font-semibold">{pl.teamKa} #{pl.number} — {pl.position}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teams matching */}
              {filteredTeams.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">ნაკრებები / National Teams</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredTeams.map(t => (
                      <div
                        key={t.slug}
                        onClick={() => handleSelectResult(`/team/${t.slug}`)}
                        className="p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#008ba3] cursor-pointer flex items-center space-x-3 transition"
                      >
                        <span className="text-2xl">{t.flagEmoji}</span>
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{t.nameKa}</p>
                          <p className="text-xs text-zinc-500">{t.nameEn}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products matching */}
              {filteredProducts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">მაისურები / Jerseys</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {filteredProducts.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelectResult(`/product/${prod.id}`)}
                        className="p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#008ba3] cursor-pointer flex items-center justify-between transition"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={prod.imageFront} alt={prod.titleKa} className="w-12 h-12 rounded-lg object-cover border border-zinc-300" referrerPolicy="no-referrer" />
                          <div>
                            <p className="text-sm font-bold text-zinc-900">{prod.titleKa}</p>
                            <p className="text-xs text-zinc-500">{prod.nationalTeamKa} • {prod.kitType}</p>
                          </div>
                        </div>
                        <span className="text-sm font-extrabold text-[#008ba3]">{prod.price} ₾</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery.trim() && filteredPlayers.length === 0 && filteredTeams.length === 0 && filteredProducts.length === 0 && (
                <div className="text-center py-8 text-zinc-500">
                  <p className="text-sm font-medium">შედეგი ვერ მოიძებნა: "{searchQuery}"</p>
                  <p className="text-xs text-zinc-400 mt-1">სცადეთ სხვა მოთამაშის ან ნაკრების დასახელება</p>
                  <button
                    onClick={() => handleSelectResult('/shop')}
                    className="mt-4 px-4 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-[#008ba3] text-xs font-bold"
                  >
                    იხილეთ სრული კატალოგი
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
