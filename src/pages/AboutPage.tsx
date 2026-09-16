import React from 'react';
import { ShieldCheck, MapPin, Sparkles, MessageCircle, Instagram, CheckCircle2, Clock, PackageCheck, Send, ArrowRight } from 'lucide-react';

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

      {/* SPECIAL ORDER PROMOTION: 14-15 DAYS IMPORT SERVICE */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0b0f24] via-[#12122b] to-[#0a071a] border-2 border-cyan-500/40 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff] text-xs font-mono font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>{lang === 'ka' ? 'ექსკლუზიური შეკვეთა • 14-15 დღეში' : 'CUSTOM ORDERS • 14-15 DAYS'}</span>
          </div>
          <span className="text-xs text-amber-400 font-mono font-bold bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            {lang === 'ka' ? '✓ ნებისმიერი კლუბი & რეტრო' : '✓ Any Club & Retro'}
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {lang === 'ka'
              ? 'ვერ იპოვეთ სასურველი მაისური? ჩამოგიტანთ 14-15 დღეში!'
              : "Can't find your desired jersey? We import it in 14-15 days!"}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {lang === 'ka'
              ? 'თუ კატალოგში თქვენი საყვარელი გუნდის, ნაკრების ან რეტრო სეზონის ფორმა ამ ეტაპზე არ არის, ჩვენ გთავაზობთ ინდივიდუალური ჩამოტანის სერვისს. აირჩიეთ ნებისმიერი მოთამაშე, ნომერი და ოფიციალური ტურნირის პაჩები — მაისური თქვენთან იქნება სულ რაღაც 14-15 დღეში.'
              : 'If your dream club kit, national jersey, or vintage retro shirt is not currently in our local stock, our special import service brings it directly to Tbilisi in just 14-15 days with full official printing and custom badge choices.'}
          </p>
        </div>

        {/* 3 Step Process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-white">
              {lang === 'ka' ? 'აირჩიეთ მაისური' : 'Choose Any Jersey'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ka' ? 'ნებისმიერი ლიგა, სეზონი, რეტრო თუ ნაკრები სასურველი ზომით' : 'Any league, classic retro, or national squad in sizes S-4XL'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-white">
              {lang === 'ka' ? 'დაგვიკავშირდით' : 'Contact Our Team'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ka' ? 'გამოგვიგზავნეთ ფოტო ან მოთამაშის სახელი Instagram-ზე' : 'Send screenshot or kit details via Instagram Direct'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-white">
              {lang === 'ka' ? 'მიიღეთ 14-15 დღეში' : 'Receive in 14-15 Days'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ka' ? 'სწრაფი საერთაშორისო ტრანზიტი და მიწოდება თბილისში' : 'Direct international transit and delivery straight to your door'}
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://www.instagram.com/futt_universe/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00e5ff] to-cyan-400 text-black font-extrabold text-xs sm:text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition flex items-center space-x-2"
          >
            <Instagram className="w-4 h-4" />
            <span>{lang === 'ka' ? 'ინდივიდუალური შეკვეთა Instagram-ზე' : 'Custom Order on Instagram'}</span>
          </a>
          <button
            onClick={() => navigate('/contact')}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs sm:text-sm transition flex items-center space-x-2"
          >
            <Send className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ka' ? 'საკონტაქტო ფორმა' : 'Contact Form'}</span>
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="px-4 py-3 rounded-2xl text-slate-400 hover:text-white text-xs font-semibold transition"
          >
            {lang === 'ka' ? 'მარაგში არსებული კატალოგი →' : 'Browse In-Stock Kits →'}
          </button>
        </div>
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

      {/* Highlights & Guarantees */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-center">
        <h3 className="text-lg font-bold text-white">
          {lang === 'ka' ? 'FUT Universe თბილისის გარანტიები' : 'FUT Universe Guarantees'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-200">
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-slate-800 flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />
            <span>{lang === 'ka' ? 'ოფიციალური პრინტები' : 'Official Printing'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-slate-800 flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4 text-[#00e5ff]" />
            <span>{lang === 'ka' ? 'შეკვეთით 14-15 დღეში' : '14-15d Custom Orders'}</span>
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
export default AboutPage;
