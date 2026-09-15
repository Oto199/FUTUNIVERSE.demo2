import React from 'react';
import { MessageCircle, Instagram, Facebook, Truck, Mail, ShieldCheck, FileText } from 'lucide-react';
import { TikTokIcon } from './TikTokIcon';
import { PlayerInfo, TeamInfo } from '../types';

interface FooterProps {
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
  players: PlayerInfo[];
  teams: TeamInfo[];
}

export const Footer: React.FC<FooterProps> = ({ navigate, lang, players, teams }) => {
  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-600 text-sm">
      {/* Slogan Banner - Bold Typography Statement */}
      <div className="border-b border-zinc-200 bg-zinc-50 py-14 px-4 relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <span className="text-[120px] sm:text-[200px] font-black outline-text uppercase font-display text-zinc-900 tracking-widest whitespace-nowrap">
            TBILISI ARCHIVE
          </span>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <p className="micro-label-cyan">FUT UNIVERSE • FOOTBALL ARCHIVE MANIFESTO</p>
          <h2 className="display-large text-zinc-900">
            ყველაფერი საფეხბურთო<br />
            <span className="text-[#008ba3]">ორბიტის გარშემო</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {lang === 'ka'
              ? 'თბილისის საფეხბურთო ბიბლიოთეკა & არქივი. ჩვენთან იპოვით იმ მოთამაშეებსა და ნაკრებების ფორმებს, რომლებსაც მასობრივ მაღაზიებში ვერ შეხვდებით.'
              : 'Tbilisi football library & archive. Discover the under-the-radar players and national team kits skipped by mainstream stores.'}
          </p>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-black border border-zinc-300 flex items-center justify-center overflow-hidden p-0.5 shadow-sm">
              <img src="/logo.png" alt="FUT Universe" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <span className="font-display font-black text-lg text-zinc-900 tracking-wider">FUT UNIVERSE</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {lang === 'ka'
              ? 'საფეხბურთო მაისურების ბიბლიოთეკა თბილისში. ოფიციალური კოლექციები, იშვიათი ექსკლუზიური მოთამაშეები და რეტრო კლასიკა.'
              : 'Football jersey library in Tbilisi. Official collections, rare exclusive players, and retro classics.'}
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-zinc-700">
              <Truck className="w-4 h-4 text-[#008ba3]" />
              <span>
                {lang === 'ka'
                  ? 'ონლაინ მაღაზია | მიწოდება მთელ საქართველოს მასშტაბით'
                  : 'Online Store | Shipping across all Georgia'}
              </span>
            </div>
          </div>
          {/* Socials */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://www.tiktok.com/@fut.universe8"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-black hover:border-black transition"
              title="TikTok @fut.universe8"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/futt_universe/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-[#008ba3] hover:border-[#008ba3] transition"
              title="Instagram @futt_universe"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/p/Fut-Universe-61590795092247/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-[#008ba3] hover:border-[#008ba3] transition"
              title="Facebook Fut Universe"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://m.me/61590795092247"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-[#008ba3] hover:border-[#008ba3] transition"
              title="Facebook Messenger Order"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation & Technical SEO */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider text-[#008ba3]">
            {lang === 'ka' ? 'ნავიგაცია & ტექნიკური' : 'Links & Technical'}
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => navigate('/shop')} className="hover:text-black text-zinc-600 transition">
                {lang === 'ka' ? 'სრული კატალოგი' : 'Full Catalog'}
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/journal')} className="hover:text-black text-zinc-600 transition">
                {lang === 'ka' ? 'ქართული საფეხბურთო ჟურნალი' : 'Journal'}
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/about')} className="hover:text-black text-zinc-600 transition">
                {lang === 'ka' ? 'ბიბლიოთეკის კონცეფცია' : 'Library Concept'}
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/contact')} className="hover:text-black text-zinc-600 transition">
                {lang === 'ka' ? 'ლოკაცია & კონტაქტი' : 'Location & Contact'}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/admin')}
                className="opacity-0 hover:opacity-0 cursor-default select-none transition-none text-xs block py-0.5"
                tabIndex={-1}
                aria-hidden="true"
              >
                Admin
              </button>
            </li>
            <li className="pt-2 border-t border-zinc-200 text-[11px] text-zinc-500 flex items-center space-x-3">
              <a href="/sitemap.xml" target="_blank" className="hover:underline flex items-center space-x-1">
                <FileText className="w-3 h-3 text-[#008ba3]" />
                <span>sitemap.xml</span>
              </a>
              <a href="/robots.txt" target="_blank" className="hover:underline flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-[#008ba3]" />
                <span>robots.txt</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright bottom bar */}
      <div className="border-t border-zinc-200 bg-zinc-100 py-4 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 FUT Universe Tbilisi. ყველა უფლება დაცულია.</p>
          <p className="text-[11px] text-zinc-500">
            Instagram: <a href="https://www.instagram.com/futt_universe/" target="_blank" rel="noreferrer" className="text-[#008ba3] font-bold">@futt_universe</a> | Facebook: <a href="https://www.facebook.com/p/Fut-Universe-61590795092247/" target="_blank" rel="noreferrer" className="text-[#008ba3] font-bold">Fut Universe</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
