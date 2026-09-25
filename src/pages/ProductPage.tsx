import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowLeft, ShieldCheck, Truck, Sparkles, Check, Share2, Info, ArrowRight, Instagram, Clock, Send } from 'lucide-react';
import { Product, Size, PlayerInfo } from '../types';
import { ProductCard } from '../components/ProductCard';
import { handleImageError, sanitizeImageUrl } from '../lib/imageUtils';

interface ProductPageProps {
  productId: string;
  products: Product[];
  players: PlayerInfo[];
  navigate: (path: string) => void;
  lang: 'ka' | 'en';
}

export const ProductPage: React.FC<ProductPageProps> = ({
  productId,
  products,
  players,
  navigate,
  lang
}) => {
  const product = products.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState<Size>(product?.sizes[0] || 'M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId, product]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#12122b] via-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff] text-xs font-mono font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>{lang === 'ka' ? 'მაისურების ჩამოტანა შეკვეთით • 14-15 დღეში' : 'CUSTOM ORDERS • 14-15 DAYS'}</span>
          </div>

          <div className="space-y-3 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {lang === 'ka' ? 'ეს მაისური მარაგში აღარ არის? ჩამოგიტანთ!' : 'Kit Out of Stock? We Import on Order!'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'ka'
                ? 'არ იდარდოთ! FUT Universe გთავაზობთ ნებისმიერი მაისურის ჩამოტანას სულ რაღაც 14-15 დღეში. აირჩიეთ ნებისმიერი მოთამაშე, ნომერი და ზომა (S-4XL).'
                : 'Do not worry! We can order any player kit, retro classic, or club jersey and deliver it in just 14-15 days with official customization.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/futt_universe/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00e5ff] to-cyan-400 text-black font-extrabold text-xs sm:text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition flex items-center space-x-2"
            >
              <Instagram className="w-4 h-4" />
              <span>{lang === 'ka' ? 'შეკვეთა Instagram-ზე' : 'Order via Instagram'}</span>
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
              {lang === 'ka' ? 'კატალოგში დაბრუნება' : 'Back to Catalog'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const images = Array.from(new Set([product.imageFront, ...(product.images || []), product.imageBack].filter(Boolean))) as string[];

  const playerObj = players.find(pl => pl.slug === product.playerSlug || pl.nameEn.toLowerCase().includes(product.playerEn.toLowerCase()));

  // Related niche players (matching team or niche tag)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.teamSlug === product.teamSlug || p.isNiche === product.isNiche))
    .slice(0, 4);

  const copyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Structured Schema.org microdata for Google Shopping
  const schemaOrgProduct = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${product.playerEn || product.titleEn} #${product.number} ${product.nationalTeamEn} Jersey — 2025/26 Collection`,
    "image": [product.imageFront, product.imageBack].filter(Boolean),
    "description": product.descriptionEn,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "FUT Universe Tbilisi"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "GEL",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Schema.org Script Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgProduct) }}
      />

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

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl shadow-cyan-950/20">
            <img
              src={sanitizeImageUrl(images[activeImageIndex] || product.imageFront)}
              alt={product.titleKa}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.isWc26 && (
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-[#00e5ff] text-black">
                  2025/26 OFFICIAL
                </span>
              )}
              {product.isNiche && (
                <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-indigo-900/90 text-indigo-200 border border-indigo-500/40">
                  ✨ {lang === 'ka' ? 'ექსკლუზიური არქივი' : 'Exclusive Archive'}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail switcher */}
          {images.length > 1 && (
            <div className="flex items-center space-x-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === idx ? 'border-[#00e5ff] scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={sanitizeImageUrl(img)} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={handleImageError} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Sizes, Direct Order CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00e5ff]">
              <span>{product.nationalTeamKa}</span>
              <span>•</span>
              <span>{product.kitType} Kit</span>
              {product.number > 0 && <span className="font-bold text-white">#{product.number}</span>}
            </div>

            {/* H1 Requirement */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              {product.playerKa || product.playerEn} #{product.number} {product.nationalTeamKa} {product.kitType} მაისური
            </h1>

            <p className="text-xs text-slate-400 font-mono">
              Title (EN): {product.playerEn} #{product.number} {product.nationalTeamEn} {product.kitType} Jersey
            </p>
          </div>

          {/* Price display */}
          <div className="p-4 rounded-2xl bg-[#12122b] border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">{lang === 'ka' ? 'ფასი (GEL):' : 'Price:'}</span>
              <span className="text-3xl font-extrabold text-[#00e5ff] font-mono">{product.price} ₾</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through font-mono ml-2">{product.originalPrice} ₾</span>
              )}
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ✓ {lang === 'ka' ? 'მარაგშია თბილისში' : 'In Stock Tbilisi'}
              </span>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-slate-300 uppercase">{lang === 'ka' ? 'აირჩიეთ ზომა:' : 'Select Size:'}</span>
              <button
                onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                className="text-[#00e5ff] hover:underline flex items-center space-x-1"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{lang === 'ka' ? 'ზომების გიდი' : 'Size Guide'}</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 rounded-xl font-mono text-sm font-bold border transition ${
                    selectedSize === sz
                      ? 'bg-[#00e5ff] text-black border-[#00e5ff] shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* INSTAGRAM & MESSENGER ORDER BUTTONS */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://www.instagram.com/futt_universe/"
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition shadow-xl shadow-purple-950/40"
              >
                <Instagram className="w-5 h-5" />
                <span>
                  {lang === 'ka'
                    ? `Instagram-ზე წერა (${selectedSize})`
                    : `Order on Instagram (${selectedSize})`}
                </span>
              </a>

              <a
                href="https://m.me/61590795092247"
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition shadow-xl shadow-blue-950/40"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {lang === 'ka'
                    ? `Messenger-ზე წერა (${selectedSize})`
                    : `Order on Messenger (${selectedSize})`}
                </span>
              </a>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>{lang === 'ka' ? 'თბილისში 2 საათში' : '2hr Tbilisi Express'}</span>
              </span>
              <button
                onClick={copyPageUrl}
                className="flex items-center space-x-1 text-slate-400 hover:text-white transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isCopied ? (lang === 'ka' ? 'დაკოპირდა!' : 'Copied!') : (lang === 'ka' ? 'გაზიარება' : 'Share')}</span>
              </button>
            </div>

            {/* Custom order notice */}
            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start space-x-3 text-xs">
              <Clock className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-white">
                  {lang === 'ka' ? 'გჭირდებათ სხვა ზომა (S-4XL) ან სხვა მოთამაშე?' : 'Need another size (S-4XL) or player?'}
                </p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {lang === 'ka'
                    ? 'ჩვენ ჩამოგვაქვს ნებისმიერი სასურველი მაისური შეკვეთით 14-15 დღეში.'
                    : 'We can import any kit on custom order in just 14-15 days.'}{' '}
                  <a
                    href="https://www.instagram.com/futt_universe/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00e5ff] underline font-semibold"
                  >
                    {lang === 'ka' ? 'მოგვწერეთ Instagram-ზე' : 'Message on Instagram'}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Description Tabs */}
          <div className="p-5 rounded-2xl bg-[#12122b] border border-slate-800 space-y-3 text-xs leading-relaxed">
            <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
              {lang === 'ka' ? 'აღწერა & არქივის დეტალები' : 'Description & Details'}
            </h4>
            <p className="text-slate-300">{product.descriptionKa}</p>
            <p className="text-slate-400 italic pt-2 border-t border-slate-800/60 font-mono">
              {product.descriptionEn}
            </p>
          </div>

          {/* Player page quick link */}
          {playerObj && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={sanitizeImageUrl(playerObj.image)} alt="" onError={handleImageError} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="text-xs font-bold text-white">{playerObj.nameKa}</p>
                  <p className="text-[11px] text-[#00e5ff]">{playerObj.wc26Role}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/player/${playerObj.slug}`)}
                className="px-3 py-1.5 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 text-xs font-semibold hover:bg-[#00e5ff]/20"
              >
                {lang === 'ka' ? 'მოთამაშის გვერდი' : 'Player Page'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12122b] border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase">{lang === 'ka' ? 'მაისურების ზომების გიდი' : 'Jersey Size Guide'}</h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="text-xs text-slate-300 space-y-2 font-mono">
              <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2 rounded-lg font-bold text-[#00e5ff]">
                <span>SIZE</span>
                <span>CHEST (სიმკერდე)</span>
                <span>HEIGHT (სიმაღლე)</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2 border-b border-slate-800">
                <span>S</span>
                <span>88–96 cm</span>
                <span>165–173 cm</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2 border-b border-slate-800">
                <span>M</span>
                <span>96–104 cm</span>
                <span>173–180 cm</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2 border-b border-slate-800">
                <span>L</span>
                <span>104–112 cm</span>
                <span>180–186 cm</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2 border-b border-slate-800">
                <span>XL</span>
                <span>112–124 cm</span>
                <span>186–193 cm</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2">
                <span>XXL</span>
                <span>124–136 cm</span>
                <span>193–200 cm</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              * მაისურები დამზადებულია სპორტული Slim-Fit / Match-Fit ჭრით. თუ გსურთ თავისუფალი სტილი, აირჩიეთ 1 ზომით დიდი.
            </p>
          </div>
        </div>
      )}

      {/* RELATED NICHE PLAYERS SECTION */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div>
            <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-widest">
              LOGICALLY RELATED
            </span>
            <h2 className="text-xl font-extrabold text-white">
              {lang === 'ka' ? 'ასევე შეიძლება დაგაინტერესოთ (მსგავსი ექსკლუზიური მოთამაშეები)' : 'You Might Also Like'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(id) => navigate(`/product/${id}`)}
                lang={lang}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
