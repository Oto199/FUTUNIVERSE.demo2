import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Search,
  X,
  RotateCcw,
  Sparkles,
  Filter,
  Shield,
  Globe,
  Flame,
  Tag,
  Percent,
  Clock,
  PackageCheck,
  Send,
  Instagram,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Product, PlayerInfo, TeamInfo, FilterState, Size, Category, KitType } from '../types';
import { ProductCard } from '../components/ProductCard';
import { TOP_CLUBS, TOP_NATIONS } from '../data/teamsList';

interface ShopPageProps {
  products: Product[];
  players: PlayerInfo[];
  teams: TeamInfo[];
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
  initialFilter?: Partial<FilterState>;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  players,
  teams,
  navigate,
  lang,
  initialFilter
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    nationalTeam: initialFilter?.nationalTeam || 'all',
    club: initialFilter?.club || 'all',
    player: initialFilter?.player || 'all',
    category: initialFilter?.category || 'all',
    kitType: initialFilter?.kitType || 'all',
    size: initialFilter?.size || 'all',
    minPrice: initialFilter?.minPrice || 0,
    maxPrice: initialFilter?.maxPrice || 500,
    sortBy: initialFilter?.sortBy || 'newest',
    searchQuery: initialFilter?.searchQuery || '',
    isOnSaleOnly: initialFilter?.isOnSaleOnly || false,
    isFeaturedOnly: initialFilter?.isFeaturedOnly || false,
    isInStockOnly: initialFilter?.isInStockOnly || false,
    isWc26Only: initialFilter?.isWc26Only || false,
    isNicheOnly: initialFilter?.isNicheOnly || false,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique clubs for club filter dropdown
  const uniqueClubs = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.clubKa) set.add(p.clubKa);
      if (p.clubEn) set.add(p.clubEn);
    });
    return Array.from(set);
  }, [products]);

  // COMBINABLE FILTER LOGIC
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search Query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesTitle = p.titleKa.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q);
        const matchesPlayer = p.playerKa.toLowerCase().includes(q) || p.playerEn.toLowerCase().includes(q);
        const matchesTeam = p.nationalTeamKa.toLowerCase().includes(q) || p.nationalTeamEn.toLowerCase().includes(q);
        const matchesTag = p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesPlayer && !matchesTeam && !matchesTag) return false;
      }

      // Nationality / National Team Filter
      if (filterState.nationalTeam !== 'all') {
        const target = filterState.nationalTeam.toLowerCase().trim();
        const matchedNation = TOP_NATIONS.find(n => n.slug === target || n.nameEn.toLowerCase() === target || n.nameKa.toLowerCase() === target);

        const nameKa = (matchedNation?.nameKa || target).toLowerCase();
        const nameEn = (matchedNation?.nameEn || target).toLowerCase();

        const nKa = (p.nationalTeamKa || '').toLowerCase();
        const nEn = (p.nationalTeamEn || '').toLowerCase();
        const titleKa = p.titleKa.toLowerCase();
        const titleEn = p.titleEn.toLowerCase();
        const slug = (p.teamSlug || '').toLowerCase();

        const matches = nKa.includes(nameKa) || nKa.includes(target) ||
                        nEn.includes(nameEn) || nEn.includes(target) ||
                        slug === target ||
                        titleKa.includes(nameKa) || titleKa.includes(target) ||
                        titleEn.includes(nameEn) || titleEn.includes(target) ||
                        p.tags.some(t => {
                          const tagLower = t.toLowerCase();
                          return tagLower.includes(nameKa) || tagLower.includes(nameEn) || tagLower.includes(target);
                        });

        if (!matches) return false;
      }

      // Club / Team Filter
      if (filterState.club !== 'all') {
        const target = filterState.club.toLowerCase().trim();
        const matchedClub = TOP_CLUBS.find(c => c.slug === target || c.nameEn.toLowerCase() === target || c.nameKa.toLowerCase() === target);
        const matchedNation = TOP_NATIONS.find(n => n.slug === target || n.nameEn.toLowerCase() === target || n.nameKa.toLowerCase() === target);

        const nameKa = (matchedClub?.nameKa || matchedNation?.nameKa || target).toLowerCase();
        const nameEn = (matchedClub?.nameEn || matchedNation?.nameEn || target).toLowerCase();

        const cKa = (p.clubKa || '').toLowerCase();
        const cEn = (p.clubEn || '').toLowerCase();
        const nKa = (p.nationalTeamKa || '').toLowerCase();
        const nEn = (p.nationalTeamEn || '').toLowerCase();
        const titleKa = p.titleKa.toLowerCase();
        const titleEn = p.titleEn.toLowerCase();
        const slug = (p.teamSlug || '').toLowerCase();

        const matches = cKa.includes(nameKa) || cKa.includes(target) ||
                        cEn.includes(nameEn) || cEn.includes(target) ||
                        nKa.includes(nameKa) || nKa.includes(target) ||
                        nEn.includes(nameEn) || nEn.includes(target) ||
                        slug === target ||
                        titleKa.includes(nameKa) || titleKa.includes(target) ||
                        titleEn.includes(nameEn) || titleEn.includes(target) ||
                        p.tags.some(t => {
                          const tagLower = t.toLowerCase();
                          return tagLower.includes(nameKa) || tagLower.includes(nameEn) || tagLower.includes(target);
                        });

        if (!matches) return false;
      }

      // Player
      if (filterState.player !== 'all') {
        if (p.playerSlug !== filterState.player && !p.playerEn.toLowerCase().includes(filterState.player.toLowerCase())) {
          return false;
        }
      }

      // Category
      if (filterState.category !== 'all') {
        if (p.category.toLowerCase() !== filterState.category.toLowerCase()) {
          return false;
        }
      }

      // Kit Type (Flexible & Precision Matching)
      if (filterState.kitType !== 'all') {
        const selKit = filterState.kitType.toLowerCase().trim();
        const itemKit = (p.kitType || '').toLowerCase().trim();

        let matchesKit = false;
        if (selKit === 'home') {
          matchesKit = itemKit.includes('home');
        } else if (selKit === 'away') {
          matchesKit = itemKit.includes('away');
        } else if (selKit === 'third') {
          matchesKit = itemKit.includes('third');
        } else if (selKit === 'goalkeeper' || selKit === 'gk') {
          matchesKit = itemKit.includes('goalkeeper') || itemKit.includes('gk') || itemKit.includes('მეკარე');
        } else if (selKit === 'retro') {
          matchesKit = itemKit.includes('retro') || p.tags.some(t => t.toLowerCase().includes('retro'));
        } else if (selKit === 'player' || selKit === 'player version') {
          matchesKit = itemKit.includes('player') || p.tags.some(t => t.toLowerCase().includes('player'));
        } else if (selKit === 'fan' || selKit === 'fan version') {
          matchesKit = itemKit.includes('fan') || p.tags.some(t => t.toLowerCase().includes('fan'));
        } else if (selKit === 'special') {
          matchesKit = itemKit.includes('special') || itemKit.includes('ucl') || itemKit.includes('final');
        } else {
          matchesKit = itemKit === selKit || itemKit.includes(selKit);
        }

        if (!matchesKit) return false;
      }

      // Size
      if (filterState.size !== 'all') {
        if (!p.sizes.includes(filterState.size as Size)) {
          return false;
        }
      }

      // Price
      if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
        return false;
      }

      // On Sale Only
      if (filterState.isOnSaleOnly) {
        const isDiscounted = Boolean(p.originalPrice && p.originalPrice > p.price);
        const hasSaleTag = p.tags.some(t => {
          const l = t.toLowerCase();
          return l === 'sale' || l === 'ფასდაკლება' || l === 'discount';
        });
        if (!isDiscounted && !hasSaleTag) {
          return false;
        }
      }

      // Featured Only
      if (filterState.isFeaturedOnly && !p.isFeatured) {
        return false;
      }

      // In Stock Only
      if (filterState.isInStockOnly && !p.inStock) {
        return false;
      }

      // WC26 Only
      if (filterState.isWc26Only && !p.isWc26) {
        return false;
      }

      // Niche Only
      if (filterState.isNicheOnly && !p.isNiche) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'popular') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      return b.releaseYear - a.releaseYear;
    });
  }, [products, filterState]);

  const resetFilters = () => {
    setFilterState({
      nationalTeam: 'all',
      club: 'all',
      player: 'all',
      category: 'all',
      kitType: 'all',
      size: 'all',
      minPrice: 0,
      maxPrice: 500,
      sortBy: 'newest',
      searchQuery: '',
      isWc26Only: false,
      isNicheOnly: false,
      isOnSaleOnly: false,
      isFeaturedOnly: false,
      isInStockOnly: false,
    });
  };

  const hasActiveFilters =
    filterState.nationalTeam !== 'all' ||
    filterState.club !== 'all' ||
    filterState.player !== 'all' ||
    filterState.category !== 'all' ||
    filterState.kitType !== 'all' ||
    filterState.size !== 'all' ||
    filterState.searchQuery !== '' ||
    filterState.isWc26Only ||
    filterState.isNicheOnly ||
    filterState.isOnSaleOnly ||
    filterState.isFeaturedOnly ||
    filterState.isInStockOnly ||
    filterState.maxPrice < 500;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Title & WC26 Toggle */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-[#12122b] to-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-widest">
              FUT UNIVERSE CATALOG
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              {lang === 'ka' ? 'მაისურების სრული ბიბლიოთეკა' : 'Full Jersey Catalog'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'ka'
                ? 'გაფილტრეთ ნაკრები, მოთამაშე, კიტის ტიპი ან ზომა. ყველა მაისური ხელმისაწვდომია თბილისში.'
                : 'Filter by National Team, Player, Kit Type or Size. All items available in Tbilisi.'}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setFilterState(prev => ({ ...prev, isWc26Only: !prev.isWc26Only }))}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center space-x-2 ${
                filterState.isWc26Only
                  ? 'bg-[#00e5ff] text-black border-[#00e5ff] shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-[#00e5ff]/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ka' ? 'ახალი კოლექცია' : 'New Collection'}</span>
            </button>

            <button
              onClick={() => setFilterState(prev => ({ ...prev, isNicheOnly: !prev.isNicheOnly }))}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center space-x-2 ${
                filterState.isNicheOnly
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-950/40'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-indigo-500/50'
              }`}
            >
              <span>✨ {lang === 'ka' ? 'ექსკლუზიური არქივი' : 'Exclusive Archive'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center space-x-2 text-sm font-bold text-[#00e5ff]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{lang === 'ka' ? 'ფილტრების გახსნა' : 'Open Filters'} ({filteredProducts.length})</span>
          </button>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="text-xs text-red-400 underline">
              {lang === 'ka' ? 'გასუფთავება' : 'Reset'}
            </button>
          )}
        </div>

        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:block ${
            isMobileFilterOpen ? 'block fixed inset-0 z-50 bg-[#0a0a0f] p-6 overflow-y-auto' : 'hidden'
          } space-y-6 lg:static`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#00e5ff]" />
              <span>{lang === 'ka' ? 'კომბინირებული ფილტრები' : 'Combinable Filters'}</span>
            </h3>
            {isMobileFilterOpen && (
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            )}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center space-x-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{lang === 'ka' ? 'გასუფთავება' : 'Reset'}</span>
              </button>
            )}
          </div>

          {/* 1. Search Bar */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase">{lang === 'ka' ? 'ძებნა' : 'Search'}</label>
            <div className="relative">
              <input
                type="text"
                placeholder={lang === 'ka' ? 'ვირცი, მეინუ, ვალვერდე, ზიდანი...' : 'Search player or team...'}
                value={filterState.searchQuery}
                onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#00e5ff]"
              />
              {filterState.searchQuery && (
                <button
                  onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Team / Club Selector (Clubs like Liverpool, Real Madrid, Barcelona, etc.) */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#00e5ff] uppercase flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>{lang === 'ka' ? 'გუნდი / კლუბი (Team / Club)' : 'By Team or Club'}</span>
            </label>
            <select
              value={filterState.club}
              onChange={(e) => setFilterState(prev => ({ ...prev, club: e.target.value }))}
              className="w-full bg-slate-900 border border-cyan-500/40 focus:border-[#00e5ff] rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:outline-none"
            >
              <option value="all">{lang === 'ka' ? '⚽ ყველა გუნდი და კლუბი (All Teams & Clubs)' : '⚽ All Teams & Clubs'}</option>
              
              <optgroup label="🏆 TOP CLUBS (პოპულარული კლუბები)">
                {TOP_CLUBS.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.nameKa} ({c.nameEn})
                  </option>
                ))}
              </optgroup>

              <optgroup label="🌍 NATIONAL TEAMS (ნაკრებები)">
                {TOP_NATIONS.map((n) => (
                  <option key={n.slug} value={n.slug}>
                    {n.nameKa} ({n.nameEn})
                  </option>
                ))}
              </optgroup>

              {uniqueClubs.filter(uc => !TOP_CLUBS.some(tc => tc.nameKa === uc || tc.nameEn === uc)).length > 0 && (
                <optgroup label="📌 OTHER CLUBS (სხვა კლუბები)">
                  {uniqueClubs
                    .filter(uc => !TOP_CLUBS.some(tc => tc.nameKa === uc || tc.nameEn === uc))
                    .map((club) => (
                      <option key={club} value={club}>
                        {club}
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* 3. Nationality / National Team Selector (France, Portugal, Georgia, Argentina, Brazil, etc.) */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#00e5ff] uppercase flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ka' ? 'ეროვნება / ეროვნული ნაკრები (Nationality / National Team)' : 'By Nationality or National Team'}</span>
            </label>
            <select
              value={filterState.nationalTeam}
              onChange={(e) => setFilterState(prev => ({ ...prev, nationalTeam: e.target.value }))}
              className="w-full bg-slate-900 border border-cyan-500/40 focus:border-[#00e5ff] rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:outline-none"
            >
              <option value="all">{lang === 'ka' ? '🌍 ყველა ეროვნება და ნაკრები (All Nationalities)' : '🌍 All Nationalities & Teams'}</option>
              
              <optgroup label="🌍 POPULAR NATIONAL TEAMS (ეროვნული ნაკრებები)">
                {TOP_NATIONS.map((n) => (
                  <option key={n.slug} value={n.slug}>
                    {n.flagEmoji ? `${n.flagEmoji} ` : ''}{n.nameKa} ({n.nameEn})
                  </option>
                ))}
              </optgroup>

              {teams.filter(t => !TOP_NATIONS.some(tn => tn.slug === t.slug || tn.nameKa === t.nameKa)).length > 0 && (
                <optgroup label="📌 OTHER NATIONAL TEAMS (სხვა ნაკრებები)">
                  {teams
                    .filter(t => !TOP_NATIONS.some(tn => tn.slug === t.slug || tn.nameKa === t.nameKa))
                    .map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.flagEmoji ? `${t.flagEmoji} ` : ''}{t.nameKa} ({t.nameEn})
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* 4. Kit Type Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#00e5ff] uppercase flex items-center space-x-1">
              <span>{lang === 'ka' ? 'ფორმის ტიპი (Kit Type)' : 'Kit Type'}</span>
            </label>
            <select
              value={filterState.kitType}
              onChange={(e) => setFilterState(prev => ({ ...prev, kitType: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-bold focus:outline-none focus:border-[#00e5ff]"
            >
              <option value="all">{lang === 'ka' ? '👕 ყველა ფორმის ტიპი (All Kit Types)' : '👕 All Kit Types'}</option>
              <option value="Home">🏠 Home (საშინაო ფორმა)</option>
              <option value="Away">✈️ Away (საგარეო ფორმა)</option>
              <option value="Third">✨ Third (მესამე ფორმა)</option>
              <option value="Goalkeeper">🧤 Goalkeeper (მეკარის ფორმა)</option>
              <option value="Retro">📜 Retro Classic (რეტრო კოლექცია)</option>
              <option value="Player Version">⚡ Player Version (პროფესიონალური)</option>
              <option value="Fan Version">👥 Fan Version (ფან ვერსია)</option>
              <option value="Special">🏆 Special / UCL Final (სპეციალური)</option>
            </select>
          </div>

          {/* Special Deals & Collections Section */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-mono font-bold text-[#00e5ff] uppercase flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ka' ? 'შეთავაზებები & კოლექციები' : 'Deals & Collections'}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFilterState(prev => ({ ...prev, isOnSaleOnly: !prev.isOnSaleOnly }))}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center space-x-1.5 ${
                  filterState.isOnSaleOnly
                    ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <Percent className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ka' ? '🔥 ფასდაკლება' : '🔥 On Sale'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterState(prev => ({ ...prev, isWc26Only: !prev.isWc26Only }))}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center space-x-1.5 ${
                  filterState.isWc26Only
                    ? 'bg-[#00e5ff] text-black border-[#00e5ff] shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-[#00e5ff]/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ka' ? '🏆 WC 2026' : '🏆 WC 2026'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterState(prev => ({ ...prev, isFeaturedOnly: !prev.isFeaturedOnly }))}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center space-x-1.5 ${
                  filterState.isFeaturedOnly
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-900/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-purple-500/50'
                }`}
              >
                <span>⭐ {lang === 'ka' ? 'პოპულარული' : 'Featured'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterState(prev => ({ ...prev, isInStockOnly: !prev.isInStockOnly }))}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center space-x-1.5 ${
                  filterState.isInStockOnly
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <span>📦 {lang === 'ka' ? 'მარაგშია' : 'In Stock'}</span>
              </button>
            </div>
          </div>

          {/* 7. Size Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase">
              {lang === 'ka' ? 'ზომა (Size)' : 'By Size'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'S', 'M', 'L', 'XL', 'XXL', 'Kids'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFilterState(prev => ({ ...prev, size: sz }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                    filterState.size === sz
                      ? 'bg-[#00e5ff] text-black shadow-md shadow-cyan-500/30'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {sz === 'all' ? (lang === 'ka' ? 'ყველა' : 'All') : sz}
                </button>
              ))}
            </div>
          </div>

          {/* 8. Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-mono font-bold uppercase">{lang === 'ka' ? 'მაქს. ფასი' : 'Max Price'}</span>
              <span className="font-mono text-[#00e5ff] font-bold">{filterState.maxPrice} ₾</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={filterState.maxPrice}
              onChange={(e) => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-[#00e5ff] cursor-pointer"
            />
          </div>

          {isMobileFilterOpen && (
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-[#00e5ff] text-black font-extrabold text-sm"
            >
              {lang === 'ka' ? 'შედეგების ნახვა' : 'Apply Filters'} ({filteredProducts.length})
            </button>
          )}
        </aside>

        {/* Main Product Grid Column */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Bar: Active Tags & Quick Filter Pills & Sort */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-xs text-slate-300 font-medium mr-1">
                <span>{lang === 'ka' ? 'ნაპოვნია' : 'Found'} </span>
                <strong className="text-[#00e5ff] font-mono text-sm">{filteredProducts.length}</strong>
                <span> {lang === 'ka' ? 'ნივთი' : 'items'}</span>
              </div>

              {/* Quick Filters Pill Bar (Left to Sorting) */}
              <div className="flex flex-wrap items-center gap-1.5 border-l border-slate-800 pl-3">
                <button
                  type="button"
                  onClick={() => setFilterState(p => ({ ...p, isOnSaleOnly: !p.isOnSaleOnly }))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition flex items-center space-x-1 ${
                    filterState.isOnSaleOnly
                      ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-sm'
                      : 'bg-[#0a0a0f] text-slate-300 border-slate-800 hover:border-amber-500/50'
                  }`}
                >
                  <Percent className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'ka' ? '🔥 ფასდაკლება' : '🔥 On Sale'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterState(p => ({ ...p, isWc26Only: !p.isWc26Only }))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition flex items-center space-x-1 ${
                    filterState.isWc26Only
                      ? 'bg-[#00e5ff] text-black border-[#00e5ff] shadow-sm'
                      : 'bg-[#0a0a0f] text-slate-300 border-slate-800 hover:border-[#00e5ff]/50'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{lang === 'ka' ? '🏆 WC26' : '🏆 WC26'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterState(p => ({ ...p, isFeaturedOnly: !p.isFeaturedOnly }))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition flex items-center space-x-1 ${
                    filterState.isFeaturedOnly
                      ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                      : 'bg-[#0a0a0f] text-slate-300 border-slate-800 hover:border-purple-500/50'
                  }`}
                >
                  <span>⭐ {lang === 'ka' ? 'პოპულარული' : 'Featured'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterState(p => ({ ...p, isInStockOnly: !p.isInStockOnly }))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition flex items-center space-x-1 ${
                    filterState.isInStockOnly
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                      : 'bg-[#0a0a0f] text-slate-300 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <span>📦 {lang === 'ka' ? 'მარაგშია' : 'In Stock'}</span>
                </button>
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2 text-xs self-end md:self-auto">
              <span className="text-slate-400 font-medium">{lang === 'ka' ? 'სორტირება:' : 'Sort:'}</span>
              <select
                value={filterState.sortBy}
                onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-[#0a0a0f] border border-slate-800 text-slate-200 font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00e5ff]"
              >
                <option value="newest">{lang === 'ka' ? 'ახალი დამატებული' : 'Newest'}</option>
                <option value="price-asc">{lang === 'ka' ? 'ფასი: დაბლიდან მაღლა' : 'Price: Low to High'}</option>
                <option value="price-desc">{lang === 'ka' ? 'ფასი: მაღლიდან დაბლა' : 'Price: High to Low'}</option>
                <option value="popular">{lang === 'ka' ? 'პოპულარული' : 'Most Popular'}</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">{lang === 'ka' ? 'აქტიური ფილტრები:' : 'Active:'}</span>
              {filterState.isOnSaleOnly && (
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-xs text-amber-400 border border-amber-500/40 flex items-center space-x-1 font-bold">
                  <span>{lang === 'ka' ? '🔥 ფასდაკლება' : '🔥 On Sale'}</span>
                  <button onClick={() => setFilterState(p => ({ ...p, isOnSaleOnly: false }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.nationalTeam !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs text-[#00e5ff] border border-slate-700 flex items-center space-x-1">
                  <span>{filterState.nationalTeam}</span>
                  <button onClick={() => setFilterState(p => ({ ...p, nationalTeam: 'all' }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.club !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs text-[#00e5ff] border border-slate-700 flex items-center space-x-1">
                  <span>{filterState.club}</span>
                  <button onClick={() => setFilterState(p => ({ ...p, club: 'all' }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.player !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs text-[#00e5ff] border border-slate-700 flex items-center space-x-1">
                  <span>{filterState.player}</span>
                  <button onClick={() => setFilterState(p => ({ ...p, player: 'all' }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.kitType !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs text-[#00e5ff] border border-slate-700 flex items-center space-x-1">
                  <span>{filterState.kitType}</span>
                  <button onClick={() => setFilterState(p => ({ ...p, kitType: 'all' }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.size !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs text-[#00e5ff] border border-slate-700 flex items-center space-x-1">
                  <span>Size {filterState.size}</span>
                  <button onClick={() => setFilterState(p => ({ ...p, size: 'all' }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.isWc26Only && (
                <span className="px-2.5 py-1 rounded-full bg-[#00e5ff]/20 text-xs text-[#00e5ff] border border-[#00e5ff]/40 flex items-center space-x-1 font-bold">
                  <span>{lang === 'ka' ? '🏆 WC 2026' : '🏆 WC 2026'}</span>
                  <button onClick={() => setFilterState(p => ({ ...p, isWc26Only: false }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.isFeaturedOnly && (
                <span className="px-2.5 py-1 rounded-full bg-purple-900/60 text-xs text-purple-300 border border-purple-500/40 flex items-center space-x-1 font-bold">
                  <span>⭐ Featured</span>
                  <button onClick={() => setFilterState(p => ({ ...p, isFeaturedOnly: false }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.isInStockOnly && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 text-xs text-emerald-300 border border-emerald-500/40 flex items-center space-x-1 font-bold">
                  <span>📦 In Stock</span>
                  <button onClick={() => setFilterState(p => ({ ...p, isInStockOnly: false }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filterState.isNicheOnly && (
                <span className="px-2.5 py-1 rounded-full bg-indigo-900/60 text-xs text-indigo-300 border border-indigo-500/40 flex items-center space-x-1">
                  <span>Niche Archive</span>
                  <button onClick={() => setFilterState(p => ({ ...p, isNicheOnly: false }))}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(id) => navigate(`/product/${id}`)}
                    lang={lang}
                  />
                ))}
              </div>

              {/* Discovery Banner for Custom Orders */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d0d1f] via-slate-900 to-[#0d0d1f] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white">
                      {lang === 'ka'
                        ? 'ვერ იპოვეთ სასურველი მაისური? ჩამოგიტანთ შეკვეთით 14-15 დღეში!'
                        : "Can't find your desired jersey? We import any kit in 14-15 days!"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === 'ka'
                        ? 'ნებისმიერი კლუბი, ნაკრები, რეტრო მოდელი და მოთამაშის ბეჭდვა ოფიციალური შრიფტით.'
                        : 'Any club, national team, retro classic, and custom official player printing.'}
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.instagram.com/futt_universe/"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00e5ff] to-cyan-400 text-black font-black text-xs hover:shadow-lg hover:shadow-cyan-500/30 transition flex items-center space-x-2 cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{lang === 'ka' ? 'შეკვეთა Instagram-ზე' : 'Order on Instagram'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 sm:p-12 text-center rounded-3xl bg-gradient-to-b from-[#12122b] via-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-2xl space-y-6 relative overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ka' ? 'მაისურების ჩამოტანა შეკვეთით • 14-15 დღეში' : 'CUSTOM ORDER SERVICE • 14-15 DAYS'}</span>
              </div>

              <div className="space-y-3 max-w-xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {lang === 'ka'
                    ? 'ვერ იპოვეთ სასურველი მაისური? ჩამოგიტანთ შეკვეთით!'
                    : "Can't find the jersey you're looking for? We'll order it for you!"}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {lang === 'ka'
                    ? 'FUT Universe-ში შეგიძლიათ შეუკვეთოთ მსოფლიოს ნებისმიერი კლუბის, ნაკრების თუ ისტორიული რეტრო სეზონის მაისური. ჩამოტანა ხდება სულ რაღაც 14-15 დღეში!'
                    : 'At FUT Universe, you can order any club, national team, or historic retro classic jersey. Delivered straight to your hands in just 14-15 days!'}
                </p>
              </div>

              {/* Highlights: 14-15 Days, Any Player/Retro, Guarantee */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 text-[#00e5ff] font-bold text-xs">
                    <Clock className="w-4 h-4" />
                    <span>{lang === 'ka' ? '14-15 დღეში ჩამოტანა' : '14-15 Days Delivery'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ka' ? 'პირდაპირი საერთაშორისო რეისით თბილისში უმოკლეს ვადაში' : 'Express international transit straight to Tbilisi'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                    <PackageCheck className="w-4 h-4" />
                    <span>{lang === 'ka' ? 'ნებისმიერი გუნდი & მოთამაშე' : 'Any Club & Player'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ka' ? 'სასურველი სახელი, ნომერი, ოფიციალური პაჩები (S-4XL)' : 'Custom name, number, tournament sleeve patches (S-4XL)'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{lang === 'ka' ? '100% ხარისხის გარანტია' : '100% Quality Check'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ka' ? 'სუნთქვადი Dry-Fit ქსოვილი და ზომის დაზღვევა' : 'Premium breathable fabrics & hassle-free guarantee'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://www.instagram.com/futt_universe/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00e5ff] to-cyan-400 text-black font-extrabold text-xs sm:text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition flex items-center space-x-2 cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{lang === 'ka' ? 'მოგვწერეთ Instagram-ზე და შეუკვეთეთ' : 'Order via Instagram Direct'}</span>
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs sm:text-sm transition flex items-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'ka' ? 'შეკვეთის ფორმა' : 'Order Form'}</span>
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-3 rounded-2xl bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-white text-xs font-semibold transition cursor-pointer"
                  >
                    {lang === 'ka' ? 'ფილტრების გასუფთავება' : 'Reset Filters'}
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
