export type Category = 'Jersey' | 'Boots' | 'Gloves' | 'Figures' | string;
export type KitType = 'Home' | 'Away' | 'Third' | 'Goalkeeper' | 'Retro' | 'Special' | 'Player Version' | 'Fan Version' | 'Retro Version' | 'World Cup Home' | 'Away Long Sleeve' | 'UCL Final' | 'Home Fan Version' | string;
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Kids';

export interface Product {
  id: string;
  titleKa: string;
  titleEn: string;
  playerSlug: string;
  playerKa: string;
  playerEn: string;
  number: number;
  nationalTeamKa: string;
  nationalTeamEn: string;
  teamSlug: string;
  clubKa?: string;
  clubEn?: string;
  category: Category;
  kitType: KitType;
  sizes: Size[];
  price: number;
  originalPrice?: number;
  isFeatured: boolean;
  isWc26: boolean;
  isNiche: boolean;
  teamCategory?: 'club' | 'nation';
  images?: string[];
  imageFront: string;
  imageBack?: string;
  descriptionKa: string;
  descriptionEn: string;
  inStock: boolean;
  releaseYear: number;
  tags: string[];
}

export interface PlayerInfo {
  slug: string;
  nameKa: string;
  nameEn: string;
  teamKa: string;
  teamEn: string;
  teamSlug: string;
  position: string;
  number: number;
  bioKa: string;
  bioEn: string;
  wc26Role: string;
  image: string;
}

export interface TeamInfo {
  slug: string;
  nameKa: string;
  nameEn: string;
  flagEmoji: string;
  descriptionKa: string;
  descriptionEn: string;
  heroImage: string;
}

export interface BlogPost {
  slug: string;
  titleKa: string;
  titleEn: string;
  excerptKa: string;
  excerptEn: string;
  contentKa: string;
  contentEn: string;
  publishDate: string;
  readTime: string;
  coverImage: string;
  author: string;
  tags: string[];
  relatedPlayerSlugs: string[];
}

export interface FilterState {
  nationalTeam: string;
  club: string;
  player: string;
  category: string;
  kitType: string;
  size: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular';
  searchQuery: string;
  isWc26Only: boolean;
  isNicheOnly: boolean;
  isOnSaleOnly?: boolean;
  isFeaturedOnly?: boolean;
  isInStockOnly?: boolean;
}
