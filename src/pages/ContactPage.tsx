import React, { useState } from 'react';
import { MessageCircle, Instagram, Facebook, Truck, Mail, Send, Check, Clock } from 'lucide-react';
import { TikTokIcon } from '../components/TikTokIcon';
import { dbAddContactMessage } from '../lib/firebase';

interface ContactPageProps {
  lang: 'ka' | 'en';
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const msgObj = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        contact: formData.phone || 'არ არის მითითებული',
        message: formData.message,
        date: new Date().toLocaleString('ka-GE')
      };

      await dbAddContactMessage(msgObj);

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgObj)
      }).catch(() => {});

      setSubmitted(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-[#12122b] to-slate-950 border border-slate-800 space-y-3 text-center sm:text-left">
        <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-widest">GET IN TOUCH</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {lang === 'ka' ? 'დაგვიკავშირდით FUT Universe-ს' : 'Contact FUT Universe'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {lang === 'ka'
            ? 'შეკვეთები, 14-15 დღეში ინდივიდუალური ჩამოტანა, ზომების დაზუსტება და პრინტები.'
            : 'Orders, 14-15 day custom kit imports, size verification, and official prints in Tbilisi.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact info channels */}
        <div className="p-8 rounded-3xl bg-[#12122b] border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            {lang === 'ka' ? 'პირდაპირი სოციალური არხები' : 'Direct Social Channels'}
          </h2>

          <div className="space-y-3">
            {/* 14-15 Days Import Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-[#12122b] border border-cyan-500/40 flex items-center space-x-3 text-slate-300 text-xs shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">{lang === 'ka' ? 'მაისურების ჩამოტანა • 14-15 დღეში' : 'Custom Kits • 14-15 Days'}</p>
                <p className="text-slate-400 text-[11px]">{lang === 'ka' ? 'ჩამოგვაქვს ნებისმიერი კლუბის, ნაკრების თუ რეტრო მაისური' : 'Import any club, national team, or retro classic kit'}</p>
              </div>
            </div>
            <a
              href="https://www.tiktok.com/@fut.universe8"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-black hover:bg-zinc-900 border border-zinc-800 text-white flex items-center space-x-3 transition shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-cyan-400">
                <TikTokIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold">TikTok Official</p>
                <p className="text-xs text-slate-400">@fut.universe8</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/futt_universe/"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-pink-950/60 hover:from-purple-900/80 hover:to-pink-900/80 border border-pink-500/30 text-white flex items-center space-x-3 transition shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Instagram Direct</p>
                <p className="text-xs text-pink-200">@futt_universe</p>
              </div>
            </a>

            <a
              href="https://m.me/61590795092247"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/30 text-blue-100 flex items-center space-x-3 transition shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Facebook Messenger Direct</p>
                <p className="text-xs text-blue-200">Fut Universe Messenger</p>
              </div>
            </a>

            <a
              href="https://www.facebook.com/p/Fut-Universe-61590795092247/"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center space-x-3 transition"
            >
              <Facebook className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm font-bold">Facebook Page</p>
                <p className="text-xs text-slate-400">Fut-Universe</p>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-3 text-slate-300 text-xs">
              <Truck className="w-6 h-6 text-[#00e5ff] shrink-0" />
              <div>
                <p className="font-bold text-white">{lang === 'ka' ? 'ონლაინ მაღაზია & მიწოდება' : 'Online Store & Delivery'}</p>
                <p className="text-slate-400">{lang === 'ka' ? 'სწრაფი მიწოდება თბილისსა და მთელ საქართველოში' : 'Fast delivery across Tbilisi and all Georgia'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="p-8 rounded-3xl bg-[#12122b] border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            {lang === 'ka' ? 'შეტყობინების გაგზავნა ადმინისტრაციასთან' : 'Send Message to Admin'}
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-center space-y-3">
              <Check className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-emerald-300">
                {lang === 'ka' ? 'შეტყობინება წარმატებით გაიგზავნა ადმინ პანელში!' : 'Message Sent to Admin Panel!'}
              </p>
              <p className="text-xs text-emerald-200">
                ჩვენი გუნდი დაგიკავშირდებათ უახლოეს დროში. ასევე შეგიძლიათ მოგვწეროთ პირდაპირ Instagram-ზე ან Messenger-ში.
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <a
                  href="https://www.instagram.com/futt_universe/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-pink-600 text-white font-bold text-xs flex items-center space-x-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://m.me/61590795092247"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center space-x-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Messenger</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-slate-400 uppercase">{lang === 'ka' ? 'სახელი' : 'Name'}</label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ka' ? 'თქვენი სახელი...' : 'Your name...'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-400 uppercase">{lang === 'ka' ? 'Instagram / Facebook პროფილი ან საკონტაქტო' : 'Social Handle or Contact'}</label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ka' ? '@username ან პროფილი' : '@username or contact info'}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-400 uppercase">{lang === 'ka' ? 'შეტყობინება / სასურველი მაისური' : 'Message'}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={lang === 'ka' ? 'რომელი მოთამაშის ან ნაკრების მაისური გსურთ?' : 'Which jersey are you looking for?'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#00e5ff] hover:bg-[#33ebff] disabled:opacity-50 text-black font-extrabold text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? (lang === 'ka' ? 'იგზავნება...' : 'Sending...') : (lang === 'ka' ? 'შეტყობინების გაგზავნა' : 'Send Message')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
