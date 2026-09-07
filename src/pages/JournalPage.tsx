import React from 'react';
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';

interface JournalPageProps {
  blogPosts: BlogPost[];
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
}

export const JournalPage: React.FC<JournalPageProps> = ({ blogPosts, navigate, lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-[#12122b] to-slate-950 border border-slate-800 space-y-3">
        <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-widest">
          GEORGIAN FOOTBALL JOURNAL
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {lang === 'ka' ? 'ქართული საფეხბურთო ჟურნალი & გიდი' : 'Georgian Football Journal'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          {lang === 'ka'
            ? 'სტატიები ახალი მაისურების, იშვიათი ექსკლუზიური მოთამაშეებისა და საფეხბურთო არქივის კულტურის შესახებ თბილისში.'
            : 'Articles on new kits, rare exclusive players, and football jersey culture in Tbilisi.'}
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            onClick={() => navigate(`/journal/${post.slug}`)}
            className="group p-6 rounded-3xl bg-[#12122b] border border-slate-800 hover:border-[#00e5ff]/50 cursor-pointer transition flex flex-col justify-between space-y-4 shadow-xl shadow-black/40"
          >
            <div className="space-y-4">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={post.coverImage}
                  alt={post.titleKa}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center space-x-1 text-[#00e5ff]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-[#00e5ff] transition leading-snug">
                {lang === 'ka' ? post.titleKa : post.titleEn}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {lang === 'ka' ? post.excerptKa : post.excerptEn}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#00e5ff]">
              <span>{lang === 'ka' ? 'სრულად წაკითხვა' : 'Read Article'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
