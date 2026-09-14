import React, { useState } from 'react';
import { ShoppingCart, Eye, Sparkles, MessageCircle, ArrowRight, Instagram } from 'lucide-react';
import { Product, Size } from '../types';
import ClickSpark from './reactbits/ClickSpark';
import { handleImageError, sanitizeImageUrl } from '../lib/imageUtils';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  lang: 'ka' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, lang }) => {
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0] || 'M');
  const [isHovered, setIsHovered] = useState(false);

  const currentImg = (isHovered && product.imageBack) ? product.imageBack : (product.imageFront || product.imageBack);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bold-card relative group flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden cursor-pointer" onClick={() => onSelect(product.id)}>
        <img
          src={sanitizeImageUrl(currentImg)}
          alt={product.titleKa}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isWc26 && (
            <span className="px-2 py-0.5 text-[9px] font-black bg-[#008ba3] text-white tracking-widest uppercase shadow-sm">
              {lang === 'ka' ? 'ახალი' : 'NEW'}
            </span>
          )}
          {product.isNiche && (
            <span className="px-2 py-0.5 text-[9px] font-bold bg-zinc-900 text-white tracking-widest uppercase">
              ✨ {lang === 'ka' ? 'ექსკლუზიური არქივი' : 'Exclusive Archive'}
            </span>
          )}
          {product.kitType === 'Retro' && (
            <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-500 text-black tracking-widest uppercase">
              RETRO CLASSIC
            </span>
          )}
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 border border-zinc-200 text-right shadow-sm">
          <div className="text-base font-black text-zinc-900 font-display">
            {product.price} ₾
          </div>
          {product.originalPrice && (
            <div className="text-[10px] text-zinc-400 line-through">
              {product.originalPrice} ₾
            </div>
          )}
        </div>
      </div>

      {/* Content details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          <div className="flex items-center justify-between micro-label mb-1">
            <span className="text-zinc-500">{product.nationalTeamKa} • {product.kitType}</span>
            {product.number > 0 && <span className="font-bold text-[#008ba3]">#{product.number}</span>}
          </div>

          <h3
            onClick={() => onSelect(product.id)}
            className="text-sm font-black uppercase tracking-tight text-zinc-900 hover:text-[#008ba3] cursor-pointer line-clamp-2 transition leading-tight"
          >
            {lang === 'ka' ? product.titleKa : product.titleEn}
          </h3>

          <p className="text-xs text-zinc-600 line-clamp-2 mt-1.5 font-normal">
            {lang === 'ka' ? product.descriptionKa : product.descriptionEn}
          </p>
        </div>

        {/* Sizes & Direct social order */}
        <div className="pt-3 border-t border-zinc-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="micro-label">
              {lang === 'ka' ? 'ზომა:' : 'Size:'}
            </span>
            <div className="flex items-center space-x-1">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2 py-0.5 text-[10px] font-bold transition uppercase ${
                    selectedSize === sz
                      ? 'bg-zinc-900 text-white font-black'
                      : 'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <ClickSpark sparkColor="#e1306c" sparkCount={8} sparkRadius={20} className="w-full">
              <a
                href="https://www.instagram.com/futt_universe/"
                target="_blank"
                rel="noreferrer"
                className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1.5 transition rounded-sm shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{lang === 'ka' ? 'Instagram' : 'Order'}</span>
              </a>
            </ClickSpark>

            <ClickSpark sparkColor="#008ba3" sparkCount={8} sparkRadius={20} className="w-full">
              <button
                onClick={() => onSelect(product.id)}
                className="w-full px-3 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1 transition cursor-pointer"
              >
                <span>{lang === 'ka' ? 'დეტალები' : 'Details'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </ClickSpark>
          </div>
        </div>
      </div>
    </div>
  );
};
