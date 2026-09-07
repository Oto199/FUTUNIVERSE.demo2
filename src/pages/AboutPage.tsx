import React from 'react';
import { ShieldCheck, MapPin, Sparkles, MessageCircle, Instagram, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate, lang }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-[#12122b] to-slate-950 border border-slate-800 text-center space-y-4 shadow-2xl">
        <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-widest">
          OUR MISSION & PHILOSOPHY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          ყველაფერი საფეხბურთო ორბიტის გარშემო
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          {lang === 'ka'
            ? 'FUT Universe შეიქმნა თბილისში, როგორც საფეხბურთო მაისურების ბიბლიოთეკა და არქივი. ჩვენ არ ვართ უბრალოდ კიდევ ერთი მაღაზია — ჩვენ ვართ ადგილი, სადაც საფეხბურთო კულტურა ცოცხლობს.'
            : 'FUT Universe was established in Tbilisi as a football jersey library and archive for true purists.'}
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-8 rounded-3xl bg-[#12122b] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {lang === 'ka' ? 'რატომ ექსკლუზიური კოლექციები?' : 'Why We Stock Exclusive Kits'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ka'
              ? 'ჩვენთან იპოვით მხოლოდ რეალურ მარაგში არსებულ ექსკლუზიურ მაისურებს: ფლორიან ვირცი (Player Version), კობი მეინუ, ბრუნო ფერნანდეში, ხულიან ალვარესი, ფედერიკო ვალვერდე (Player Version), ლუის დიაზი და ზიდანის 2006 წლის ლეგენდარული რეტრო ფორმა.'
              : 'Our library offers exclusively in-stock authentic kits: Florian Wirtz (Player Version), Kobbie Mainoo, Bruno Fernandes, Julián Álvarez, Federico Valverde (Player Version), Luis Díaz, and Zidane 2006 retro.'}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#12122b] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {lang === 'ka' ? 'ხარისხი & საფეხბურთო არქივი' : 'Quality & Football Archive'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ka'
              ? 'ყოველი მაისური FUT Universe-ის ბიბლიოთეკაში გადის დეტალურ შემოწმებას. Breathable Dry-Fit ქსოვილი, ორიგინალი პრინტითა და ნაქარგი ემბლემებით. თბილისში ადგილზე მიწოდება ხორციელდება იმავე დღეს.'
              : 'Every kit in our library undergoes rigorous quality inspection with authentic heat-pressed nameprints and woven national badges.'}
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-center">
        <h3 className="text-lg font-bold text-white">
          {lang === 'ka' ? 'FUT Universe თბილისის გარანტიები' : 'FUT Universe Guarantees'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-200">
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-slate-800 flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />
            <span>{lang === 'ka' ? 'ოფიციალური პრინტები' : 'Official Printing'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-slate-800 flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />
            <span>{lang === 'ka' ? 'თბილისში 2 საათში' : '2hr Tbilisi Express'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-slate-800 flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />
            <span>{lang === 'ka' ? 'ზომის შეცვლის გარანტია' : 'Easy Exchange'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
