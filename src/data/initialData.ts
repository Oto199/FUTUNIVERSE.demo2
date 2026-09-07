import { Product, PlayerInfo, TeamInfo, BlogPost } from '../types';

export const INITIAL_TEAMS: TeamInfo[] = [
  {
    slug: 'germany',
    nameKa: 'გერმანია',
    nameEn: 'Germany',
    flagEmoji: '🇩🇪',
    descriptionKa: 'გერმანიის ნაკრებისა და ბაიერ ლევერკუზენის ვარსკვლავები — ფლორიან ვირცი.',
    descriptionEn: 'German stars — Florian Wirtz player version kit.',
    heroImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'france',
    nameKa: 'საფრანგეთი',
    nameEn: 'France',
    flagEmoji: '🇫🇷',
    descriptionKa: 'საფრანგეთის 2006 წლის ისტორიული რეტრო მაისური — ზინედინ ზიდანი.',
    descriptionEn: 'France 2006 iconic retro jersey — Zinedine Zidane.',
    heroImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'england',
    nameKa: 'ინგლისი',
    nameEn: 'England',
    flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    descriptionKa: 'ინგლისისა და მანჩესტერ იუნაიტედის ახალი თაობა — კობი მეინუ.',
    descriptionEn: 'England and Manchester United star — Kobbie Mainoo.',
    heroImage: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'portugal',
    nameKa: 'პორტუგალია',
    nameEn: 'Portugal',
    flagEmoji: '🇵🇹',
    descriptionKa: 'პორტუგალიისა და მანჩესტერ იუნაიტედის კაპიტანი — ბრუნო ფერნანდეში.',
    descriptionEn: 'Portugal and Manchester United captain — Bruno Fernandes.',
    heroImage: 'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'argentina',
    nameKa: 'არგენტინა',
    nameEn: 'Argentina',
    flagEmoji: '🇦🇷',
    descriptionKa: 'მსოფლიო ჩემპიონი არგენტინელი თავდამსხმელი — ხულიან ალვარესი.',
    descriptionEn: 'World Champion Argentina striker — Julián Álvarez.',
    heroImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'uruguay',
    nameKa: 'ურუგვაი',
    nameEn: 'Uruguay',
    flagEmoji: '🇺🇾',
    descriptionKa: 'რეალ მადრიდისა და ურუგვაის ლიდერი — ფედერიკო ვალვერდე.',
    descriptionEn: 'Real Madrid and Uruguay midfield powerhouse — Federico Valverde.',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'colombia',
    nameKa: 'კოლუმბია',
    nameEn: 'Colombia',
    flagEmoji: '🇨🇴',
    descriptionKa: 'ლივერპულისა და კოლუმბიის შემტევი — ლუის დიაზი.',
    descriptionEn: 'Liverpool and Colombia winger — Luis Díaz.',
    heroImage: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'brazil',
    nameKa: 'ბრაზილია',
    nameEn: 'Brazil',
    flagEmoji: '🇧🇷',
    descriptionKa: 'ხუთგზის მსოფლიო ჩემპიონი — რონალდინიოს 2002 წლის ლეგენდარული მაისური.',
    descriptionEn: 'Five-time World Champions — Ronaldinho 2002 legendary retro kit.',
    heroImage: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80'
  }
];

export const INITIAL_PLAYERS: PlayerInfo[] = [
  {
    slug: 'ronaldinho',
    nameKa: 'რონალდინიო',
    nameEn: 'Ronaldinho',
    teamKa: 'ბრაზილია',
    teamEn: 'Brazil',
    teamSlug: 'brazil',
    position: 'ლეგენდარული შემტევი',
    number: 11,
    bioKa: 'რონალდინიო (Ronaldinho Gaucho) — მსოფლიო ფეხბურთის ჯადოქარი. ბრაზილიის 2002 წლის მსოფლიო ჩემპიონატის საკულტო რეტრო მაისური. ხელმისაწვდომია L და XL ზომებში.',
    bioEn: 'Ronaldinho Gaucho — The magician of football. Iconic Brazil 2002 World Cup champion retro jersey. Available in sizes L and XL.',
    wc26Role: '⭐ Player / Retro — 59₾ (ზომები: L, XL)',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'mbappe',
    nameKa: 'კილიან მბაპე',
    nameEn: 'Kylian Mbappé',
    teamKa: 'საფრანგეთი',
    teamEn: 'France',
    teamSlug: 'france',
    position: 'თავდამსხმელი',
    number: 10,
    bioKa: 'კილიან მბაპე — საფრანგეთის 2018 წლის მსოფლიო ჩემპიონატის ოქროს მაისური. ხელმისაწვდომია XL ზომაში.',
    bioEn: 'Kylian Mbappé — France 2018 World Cup Champions jersey. Available in size XL.',
    wc26Role: '⭐ Player / Retro — 59₾ (ზომა: XL)',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'wirtz',
    nameKa: 'ფლორიან ვირცი',
    nameEn: 'Florian Wirtz',
    teamKa: 'გერმანია / ბაიერ ლევერკუზენი',
    teamEn: 'Germany / Bayer Leverkusen',
    teamSlug: 'germany',
    position: 'შემტევი ნახევარმცველი',
    number: 10,
    bioKa: 'ფლორიან ვირცი — გერმანული და ევროპული ფეხბურთის მთავარი შემოქმედი. ხელმისაწვდომია 49₾-ად Back to School Sale-ში L ზომაში.',
    bioEn: 'Florian Wirtz — German genius. Available in size L at 49 GEL in the Back to School Sale.',
    wc26Role: '💛 Fan Version / Sale — 49₾ (ზომა: L)',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'mainoo',
    nameKa: 'კობი მეინუ',
    nameEn: 'Kobbie Mainoo',
    teamKa: 'ინგლისი / მანჩესტერ იუნაიტედი',
    teamEn: 'England / Manchester United',
    teamSlug: 'england',
    position: 'ნახევარმცველი',
    number: 26,
    bioKa: 'კობი მეინუ — ინგლისური ფეხბურთისა და მანჩესტერ იუნაიტედის აღმოჩენა. ხელმისაწვდომია ფან ვერსია (Fan Version) L ზომაში 49₾-ად.',
    bioEn: 'Kobbie Mainoo — Manchester United star. Fan Version available in size L at 49 GEL.',
    wc26Role: '💛 Fan Version — 49₾ (ზომა: L)',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'brunof',
    nameKa: 'ბრუნო ფერნანდეში',
    nameEn: 'Bruno Fernandes',
    teamKa: 'პორტუგალია / მანჩესტერ იუნაიტედი',
    teamEn: 'Portugal / Manchester United',
    teamSlug: 'portugal',
    position: 'პლეიმეიკერი',
    number: 8,
    bioKa: 'ბრუნო ფერნანდეში — პორტუგალიის ნაკრებისა და იუნაიტედის კაპიტანი. ხელმისაწვდომია ფან ვერსია (Fan Version) L ზომაში 49₾-ად.',
    bioEn: 'Bruno Fernandes — Portugal captain. Fan Version available in size L at 49 GEL.',
    wc26Role: '💛 Fan Version — 49₾ (ზომა: L)',
    image: 'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'alvarez',
    nameKa: 'ხულიან ალვარესი',
    nameEn: 'Julián Álvarez',
    teamKa: 'არგენტინა / ატლეტიკო მადრიდი',
    teamEn: 'Argentina / Atletico Madrid',
    teamSlug: 'argentina',
    position: 'თავდამსხმელი',
    number: 19,
    bioKa: 'ხულიან ალვარესი — მსოფლიო ჩემპიონი არგენტინელი თავდამსხმელი. ხელმისაწვდომია ფან ვერსია (Fan Version) L ზომაში.',
    bioEn: 'Julián Álvarez — World Champion striker. Fan Version available in size L.',
    wc26Role: '💛 Fan Version — 49₾ (ზომა: L)',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'valverde',
    nameKa: 'ფედერიკო ვალვერდე',
    nameEn: 'Federico Valverde',
    teamKa: 'ურუგვაი / რეალ მადრიდი',
    teamEn: 'Uruguay / Real Madrid',
    teamSlug: 'uruguay',
    position: 'ცენტრალური ნახევარმცველი',
    number: 8,
    bioKa: 'ფედერიკო ვალვერდე — რეალ მადრიდისა და ურუგვაის ენერგიული ლიდერი. ხელმისაწვდომია მოთამაშის ვერსია (Player Version) L ზომაში.',
    bioEn: 'Federico Valverde — Real Madrid superstar. Player Version available in size L.',
    wc26Role: 'მოთამაშის ვერსია (Player Version) — 67₾ (ზომა: L)',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'diaz',
    nameKa: 'ლუის დიაზი',
    nameEn: 'Luis Díaz',
    teamKa: 'კოლუმბია / ლივერპული',
    teamEn: 'Colombia / Liverpool',
    teamSlug: 'colombia',
    position: 'გარემარბი',
    number: 7,
    bioKa: 'ლუის დიაზი — ლივერპულისა და კოლუმბიის ელვისებური ფლანგელი. ხელმისაწვდომია ფან ვერსია (Fan Version) XL ზომაში 49₾-ად.',
    bioEn: 'Luis Díaz — Liverpool & Colombia electric winger. Fan Version available in size XL at 49 GEL.',
    wc26Role: '💛 Fan Version — 49₾ (ზომა: XL)',
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'zidane',
    nameKa: 'ზინედინ ზიდანი',
    nameEn: 'Zinedine Zidane',
    teamKa: 'საფრანგეთი',
    teamEn: 'France',
    teamSlug: 'france',
    position: 'ლეგენდარული პლეიმეიკერი',
    number: 10,
    bioKa: 'ზინედინ ზიდანი ✨ — საფრანგეთის 1998 და 2006 წლების მსოფლიო ჩემპიონატის ლეგენდარული რეტრო მაისურები. ხელმისაწვდომია M, L და XL ზომებში.',
    bioEn: 'Zinedine Zidane ✨ — Iconic France 1998 and 2006 World Cup Retro jerseys. Available in M, L, XL sizes.',
    wc26Role: '⭐ რეტრო ვერსია — 59₾ (ზომები: M, L, XL)',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-ronaldinho-brazil-2002',
    titleKa: 'რონალდინიო (Ronaldinho) — Brazil 2002 World Cup Retro',
    titleEn: 'Ronaldinho — Brazil 2002 World Cup Retro',
    playerSlug: 'ronaldinho',
    playerKa: 'რონალდინიო',
    playerEn: 'Ronaldinho',
    number: 11,
    teamCategory: 'nation',
    nationalTeamKa: 'ბრაზილია',
    nationalTeamEn: 'Brazil',
    teamSlug: 'brazil',
    category: 'Jersey',
    kitType: 'Retro',
    sizes: ['L', 'XL'],
    price: 59,
    originalPrice: 79,
    isFeatured: true,
    isWc26: false,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
    ],
    descriptionKa: '🇧🇷 Ronaldinho Brazil 2002 World Cup Retro | 💰 59₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L, XL.',
    descriptionEn: '🇧🇷 Ronaldinho Brazil 2002 World Cup Retro | 59 GEL (BACK TO SCHOOL SALE!) | Sizes: L, XL.',
    inStock: true,
    releaseYear: 2002,
    tags: ['Retro', 'Ronaldinho', 'Brazil', 'World Cup 2002', 'Sale', 'Back To School']
  },
  {
    id: 'prod-zidane-france-1998',
    titleKa: 'ზინედინ ზიდანი (Zinedine Zidane) — France 1998 World Cup Final Retro',
    titleEn: 'Zinedine Zidane — France 1998 World Cup Final Retro',
    playerSlug: 'zidane',
    playerKa: 'ზინედინ ზიდანი',
    playerEn: 'Zinedine Zidane',
    number: 10,
    teamCategory: 'nation',
    nationalTeamKa: 'საფრანგეთი',
    nationalTeamEn: 'France',
    teamSlug: 'france',
    category: 'Jersey',
    kitType: 'Retro',
    sizes: ['L', 'XL'],
    price: 59,
    originalPrice: 79,
    isFeatured: true,
    isWc26: false,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
    ],
    descriptionKa: '🇫🇷 Zidane France 1998 World Cup Final Retro | 💰 59₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L, XL.',
    descriptionEn: '🇫🇷 Zidane France 1998 World Cup Final Retro | 59 GEL (BACK TO SCHOOL SALE!) | Sizes: L, XL.',
    inStock: true,
    releaseYear: 1998,
    tags: ['Retro', 'Zidane', 'France', 'World Cup 1998', 'Sale', 'Back To School']
  },
  {
    id: 'prod-zidane-2006',
    titleKa: 'ზინედინ ზიდანი (Zinedine Zidane) — France 2006 World Cup Retro',
    titleEn: 'Zinedine Zidane — France 2006 World Cup Retro',
    playerSlug: 'zidane',
    playerKa: 'ზინედინ ზიდანი',
    playerEn: 'Zinedine Zidane',
    number: 10,
    teamCategory: 'nation',
    nationalTeamKa: 'საფრანგეთი',
    nationalTeamEn: 'France',
    teamSlug: 'france',
    category: 'Jersey',
    kitType: 'Retro',
    sizes: ['M', 'L', 'XL'],
    price: 59,
    originalPrice: 75,
    isFeatured: true,
    isWc26: false,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
    ],
    descriptionKa: '🇫🇷 Zidane France 2006 World Cup Retro | 💰 59₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: M, L, XL.',
    descriptionEn: '🇫🇷 Zidane France 2006 World Cup Retro | 59 GEL (BACK TO SCHOOL SALE!) | Sizes: M, L, XL.',
    inStock: true,
    releaseYear: 2006,
    tags: ['Retro', 'Zidane', 'France', 'World Cup 2006', 'Sale', 'Back To School']
  },
  {
    id: 'prod-bruno-portugal',
    titleKa: 'ბრუნო ფერნანდეში (Bruno Fernandes) — Portugal 2026',
    titleEn: 'Bruno Fernandes — Portugal 2026 World Cup',
    playerSlug: 'brunof',
    playerKa: 'ბრუნო ფერნანდეში',
    playerEn: 'Bruno Fernandes',
    number: 8,
    teamCategory: 'nation',
    nationalTeamKa: 'პორტუგალია',
    nationalTeamEn: 'Portugal',
    teamSlug: 'portugal',
    category: 'Jersey',
    kitType: 'Fan Version',
    sizes: ['L'],
    price: 49,
    originalPrice: 55,
    isFeatured: true,
    isWc26: true,
    isNiche: false,
    imageFront: 'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80'
    ],
    descriptionKa: '🇵🇹 Bruno Fernandes Portugal 2026 (Fan Version) | 💰 49₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L.',
    descriptionEn: '🇵🇹 Bruno Fernandes Portugal 2026 (Fan Version) | 49 GEL (BACK TO SCHOOL SALE!) | Size: L.',
    inStock: true,
    releaseYear: 2026,
    tags: ['Bruno Fernandes', 'Portugal', 'World Cup', 'Sale', 'Fan Version', 'Back To School']
  },
  {
    id: 'prod-mbappe-france-2018',
    titleKa: 'კილიან მბაპე (Kylian Mbappé) — France 2018 World Cup Champions',
    titleEn: 'Kylian Mbappé — France 2018 World Cup Champions',
    playerSlug: 'mbappe',
    playerKa: 'კილიან მბაპე',
    playerEn: 'Kylian Mbappé',
    number: 10,
    teamCategory: 'nation',
    nationalTeamKa: 'საფრანგეთი',
    nationalTeamEn: 'France',
    teamSlug: 'france',
    category: 'Jersey',
    kitType: 'Retro',
    sizes: ['XL'],
    price: 59,
    originalPrice: 79,
    isFeatured: true,
    isWc26: false,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80'
    ],
    descriptionKa: '🇫🇷 Mbappé France 2018 World Cup Champions | 💰 59₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: XL.',
    descriptionEn: '🇫🇷 Mbappé France 2018 World Cup Champions | 59 GEL (BACK TO SCHOOL SALE!) | Size: XL.',
    inStock: true,
    releaseYear: 2018,
    tags: ['Mbappe', 'France', 'World Cup 2018', 'Retro', 'Sale', 'Back To School']
  },
  {
    id: 'prod-mainoo-england',
    titleKa: 'კობი მეინუ (Kobbie Mainoo) — England 2026 World Cup',
    titleEn: 'Kobbie Mainoo — England 2026 World Cup',
    playerSlug: 'mainoo',
    playerKa: 'კობი მეინუ',
    playerEn: 'Kobbie Mainoo',
    number: 26,
    teamCategory: 'nation',
    nationalTeamKa: 'ინგლისი',
    nationalTeamEn: 'England',
    teamSlug: 'england',
    category: 'Jersey',
    kitType: 'Fan Version',
    sizes: ['L'],
    price: 49,
    originalPrice: 55,
    isFeatured: true,
    isWc26: true,
    isNiche: false,
    imageFront: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=800&q=80'
    ],
    descriptionKa: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Kobbie Mainoo England 2026 (Fan Version) | 💰 49₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L.',
    descriptionEn: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Kobbie Mainoo England 2026 (Fan Version) | 49 GEL (BACK TO SCHOOL SALE!) | Size: L.',
    inStock: true,
    releaseYear: 2026,
    tags: ['Mainoo', 'England', 'World Cup', 'Sale', 'Fan Version', 'Back To School']
  },
  {
    id: 'prod-wirtz-germany',
    titleKa: 'ფლორიან ვირცი (Florian Wirtz) — Germany 2026 World Cup',
    titleEn: 'Florian Wirtz — Germany 2026 World Cup',
    playerSlug: 'wirtz',
    playerKa: 'ფლორიან ვირცი',
    playerEn: 'Florian Wirtz',
    number: 10,
    teamCategory: 'nation',
    nationalTeamKa: 'გერმანია',
    nationalTeamEn: 'Germany',
    teamSlug: 'germany',
    category: 'Jersey',
    kitType: 'Fan Version',
    sizes: ['L'],
    price: 49,
    originalPrice: 67,
    isFeatured: true,
    isWc26: true,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
    ],
    descriptionKa: '🇩🇪 Florian Wirtz Germany 2026 | 💰 49₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L.',
    descriptionEn: '🇩🇪 Florian Wirtz Germany 2026 | 49 GEL (BACK TO SCHOOL SALE!) | Size: L.',
    inStock: true,
    releaseYear: 2026,
    tags: ['Wirtz', 'Germany', 'World Cup', 'Sale', 'Back To School']
  },
  {
    id: 'prod-diaz-colombia-2026',
    titleKa: 'ლუის დიაზი (Luis Díaz) — Colombia 2026 World Cup',
    titleEn: 'Luis Díaz — Colombia 2026 World Cup',
    playerSlug: 'diaz',
    playerKa: 'ლუის დიაზი',
    playerEn: 'Luis Díaz',
    number: 7,
    teamCategory: 'nation',
    nationalTeamKa: 'კოლუმბია',
    nationalTeamEn: 'Colombia',
    teamSlug: 'colombia',
    category: 'Jersey',
    kitType: 'Fan Version',
    sizes: ['XL'],
    price: 49,
    originalPrice: 55,
    isFeatured: true,
    isWc26: true,
    isNiche: false,
    imageFront: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80'
    ],
    descriptionKa: '🇨🇴 Luis Diaz Colombia 2026 (Fan Version) | 💰 49₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: XL.',
    descriptionEn: '🇨🇴 Luis Diaz Colombia 2026 (Fan Version) | 49 GEL (BACK TO SCHOOL SALE!) | Size: XL.',
    inStock: true,
    releaseYear: 2026,
    tags: ['Luis Diaz', 'Colombia', 'World Cup', 'Sale', 'Fan Version', 'Back To School']
  },
  {
    id: 'prod-ronaldo-mufc-2007',
    titleKa: 'კრიშტიანუ რონალდუ (Cristiano Ronaldo) — Manchester United 2007/08 Away Long Sleeve',
    titleEn: 'Cristiano Ronaldo — Manchester United 2007/08 Away Long Sleeve',
    playerSlug: 'cristiano-ronaldo',
    playerKa: 'კრიშტიანუ რონალდუ',
    playerEn: 'Cristiano Ronaldo',
    number: 7,
    teamCategory: 'club',
    nationalTeamKa: 'მანჩესტერ იუნაიტედი',
    nationalTeamEn: 'Manchester United',
    teamSlug: 'manchester-united',
    category: 'Jersey',
    kitType: 'Away Long Sleeve',
    sizes: ['XL'],
    price: 75,
    isFeatured: true,
    isWc26: false,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1560272564-669520551062?auto=format&fit=crop&w=800&q=80'],
    descriptionKa: '🔥 Cristiano Ronaldo #7 — Manchester United 2007/08 Away Long Sleeve | 💰 75₾ | 📏 XL.',
    descriptionEn: '🔥 Cristiano Ronaldo #7 — Manchester United 2007/08 Away Long Sleeve | 75 GEL | Size XL.',
    inStock: true,
    releaseYear: 2008,
    tags: ['Ronaldo', 'Man United', 'Away Long Sleeve']
  },
  {
    id: 'prod-kroos-real-2022',
    titleKa: 'ტონი კროსი (Toni Kroos) — Real Madrid 2021/22 UCL Final Jersey',
    titleEn: 'Toni Kroos — Real Madrid 2021/22 UCL Final Jersey',
    playerSlug: 'toni-kroos',
    playerKa: 'ტონი კროსი',
    playerEn: 'Toni Kroos',
    number: 8,
    teamCategory: 'club',
    nationalTeamKa: 'რეალ მადრიდი',
    nationalTeamEn: 'Real Madrid',
    teamSlug: 'real-madrid',
    category: 'Jersey',
    kitType: 'UCL Final',
    sizes: ['L'],
    price: 75,
    isFeatured: true,
    isWc26: false,
    isNiche: true,
    imageFront: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'],
    descriptionKa: '🔥 Toni Kroos #8 — Real Madrid 2021/22 UCL Final Jersey | 💰 75₾ | 📏 L.',
    descriptionEn: '🔥 Toni Kroos #8 — Real Madrid 2021/22 UCL Final Jersey | 75 GEL | Size L.',
    inStock: true,
    releaseYear: 2022,
    tags: ['Toni Kroos', 'Real Madrid', 'UCL Final']
  },
  {
    id: 'prod-trent-liverpool',
    titleKa: 'ტრენტ ალექსანდერ-არნოლდი (Trent Alexander-Arnold) — Liverpool Home Jersey',
    titleEn: 'Trent Alexander-Arnold — Liverpool Home Jersey',
    playerSlug: 'trent-alexander-arnold',
    playerKa: 'ტრენტ ალექსანდერ-არნოლდი',
    playerEn: 'Trent Alexander-Arnold',
    number: 66,
    teamCategory: 'club',
    nationalTeamKa: 'ლივერპული',
    nationalTeamEn: 'Liverpool',
    teamSlug: 'liverpool',
    category: 'Jersey',
    kitType: 'Home Fan Version',
    sizes: ['S', 'M', 'L', 'XL'],
    price: 55,
    isFeatured: true,
    isWc26: false,
    isNiche: false,
    imageFront: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80'],
    descriptionKa: '🔥 Trent Alexander-Arnold #66 — Liverpool Home Kit (Fan Version) | 💰 55₾.',
    descriptionEn: '🔥 Trent Alexander-Arnold #66 — Liverpool Home Kit (Fan Version) | 55 GEL.',
    inStock: true,
    releaseYear: 2026,
    tags: ['Trent', 'Liverpool', 'Home Kit']
  },
  {
    id: 'prod-alvarez-argentina',
    titleKa: 'ხულიან ალვარესი (Julián Álvarez) — Argentina 2026 World Cup Jersey',
    titleEn: 'Julián Álvarez — Argentina 2026 World Cup Jersey',
    playerSlug: 'alvarez',
    playerKa: 'ხულიან ალვარესი',
    playerEn: 'Julián Álvarez',
    number: 19,
    teamCategory: 'nation',
    nationalTeamKa: 'არგენტინა',
    nationalTeamEn: 'Argentina',
    teamSlug: 'argentina',
    category: 'Jersey',
    kitType: 'Fan Version',
    sizes: ['L'],
    price: 49,
    originalPrice: 57,
    isFeatured: true,
    isWc26: true,
    isNiche: false,
    imageFront: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
    imageBack: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80'],
    descriptionKa: '🔥 Julián Álvarez #19 — არგენტინის 2026 World Cup ფან ვერსია | 💰 49₾ (ფასდაკლება!) | 📏 L.',
    descriptionEn: '🔥 Julián Álvarez #19 — Argentina 2026 World Cup Fan Version | 49 GEL (Sale!) | Size L.',
    inStock: true,
    releaseYear: 2026,
    tags: ['Alvarez', 'Argentina', 'World Cup', 'Sale', 'Fan Version']
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'back-to-school-sale-2026',
    titleKa: '🎒⚽️ BACK TO SCHOOL SALE — ახალი სასწავლო წელი ახალი მაისურით!',
    titleEn: '🎒⚽️ BACK TO SCHOOL SALE — Kick Off the New Academic Year With a Fresh Kit!',
    excerptKa: 'ახალი სასწავლო წელი ახალი მაისურით უფრო კარგად იწყება! განსაკუთრებული მაისურები ფეხბურთის სხვადასხვა ეპოქიდან — ლეგენდებიდან დღევანდელ ვარსკვლავებამდე: Fan Version — 49₾ | Player / Retro — 59₾.',
    excerptEn: 'The new school year starts better with a fresh football kit! Special kits across eras — from legends to modern superstars: Fan Version — 49 GEL | Player / Retro — 59 GEL.',
    contentKa: `🎒⚽️ **BACK TO SCHOOL SALE — FUT UNIVERSE TBILISI**

ახალი სასწავლო წელი ახალი მაისურით უფრო კარგად იწყება. 👕🔥

განსაკუთრებული მაისურები ფეხბურთის სხვადასხვა ეპოქიდან — ლეგენდებიდან დღევანდელ ვარსკვლავებამდე:

---

### 📦 ხელმისაწვდომი მაისურების სრული სია:
* 🇧🇷 **Ronaldinho Brazil 2002** — 💰 **59₾** | 📏 ზომა: **L, XL** (⭐ Player / Retro)
* 🇫🇷 **Zidane France 1998** — 💰 **59₾** | 📏 ზომა: **L, XL** (⭐ Player / Retro)
* 🇫🇷 **Zidane France 2006** — 💰 **59₾** | 📏 ზომა: **M, L, XL** (⭐ Player / Retro)
* 🇵🇹 **Bruno Fernandes Portugal 2026** — 💰 **49₾** | 📏 ზომა: **L** (💛 Fan Version)
* 🇫🇷 **Mbappé France 2018** — 💰 **59₾** | 📏 ზომა: **XL** (⭐ Player / Retro)
* 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Kobbie Mainoo England 2026** — 💰 **49₾** | 📏 ზომა: **L** (💛 Fan Version)
* 🇩🇪 **Florian Wirtz Germany 2026** — 💰 **49₾** | 📏 ზომა: **L** (💛 Fan Version)
* 🇨🇴 **Luis Diaz Colombia 2026** — 💰 **49₾** | 📏 ზომა: **XL** (💛 Fan Version)

---

### 🏷️ საფასო კატეგორიები:
* 💛 **Fan Version** — **49₾**
* ⭐ **Player / Retro** — **59₾**

---

### 📍 როგორ შეუკვეთოთ?
ყველა მაისური ადგილზეა თბილისში, დამზადებულია პრემიუმ სუნთქვადი ქსოვილითა და ოფიციალური დეტალებით.
* **Instagram:** მოგვწერეთ პირადში — [@futt_universe](https://instagram.com/futt_universe)
* **მიწოდება:** თბილისში იმავე დღეს კურიერით, რეგიონებში 1-2 სამუშაო დღეში!`,
    contentEn: `🎒⚽️ **BACK TO SCHOOL SALE — FUT UNIVERSE TBILISI**

The new school year starts better with a fresh jersey! 👕🔥

Special jerseys from across football eras — from timeless legends to today's brightest stars:

---

### 📦 Available Kits in This Drop:
* 🇧🇷 **Ronaldinho Brazil 2002** — 💰 **59 GEL** | 📏 Sizes: **L, XL** (⭐ Player / Retro)
* 🇫🇷 **Zidane France 1998** — 💰 **59 GEL** | 📏 Sizes: **L, XL** (⭐ Player / Retro)
* 🇫🇷 **Zidane France 2006** — 💰 **59 GEL** | 📏 Sizes: **M, L, XL** (⭐ Player / Retro)
* 🇵🇹 **Bruno Fernandes Portugal 2026** — 💰 **49 GEL** | 📏 Size: **L** (💛 Fan Version)
* 🇫🇷 **Mbappé France 2018** — 💰 **59 GEL** | 📏 Size: **XL** (⭐ Player / Retro)
* 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Kobbie Mainoo England 2026** — 💰 **49 GEL** | 📏 Size: **L** (💛 Fan Version)
* 🇩🇪 **Florian Wirtz Germany 2026** — 💰 **49 GEL** | 📏 Size: **L** (💛 Fan Version)
* 🇨🇴 **Luis Diaz Colombia 2026** — 💰 **49 GEL** | 📏 Size: **XL** (💛 Fan Version)

---

### 🏷️ Pricing Categories:
* 💛 **Fan Version** — **49 GEL**
* ⭐ **Player / Retro** — **59 GEL**

---

### 📍 How to Order?
All jerseys are physically in stock in Tbilisi with premium breathable fabrics and official player prints.
* **Instagram:** Direct message us at [@futt_universe](https://instagram.com/futt_universe)
* **Delivery:** Same-day express delivery in Tbilisi, 1-2 business days nationwide!`,
    publishDate: '2026-09-01',
    readTime: '2 წუთი',
    coverImage: '/back-to-school-poster.jpg',
    author: 'FUT Universe Curation Team',
    tags: ['Back To School', 'Sale', 'Retro', 'Fan Version', 'Player Version', 'Ronaldinho', 'Zidane', 'Mbappe', 'Tbilisi'],
    relatedPlayerSlugs: ['ronaldinho', 'zidane', 'mbappe', 'brunof', 'mainoo', 'wirtz', 'diaz']
  },
  {
    slug: '2026-world-cup-jerseys-sale-49gel',
    titleKa: '🔥 2026 World Cup-ის მაისურების დიდი ფასდაკლება — 2026 წლის მსოფლიო ჩემპიონატის ყველა მაისური 49₾-ად!',
    titleEn: '🔥 2026 World Cup Jersey Sale — All 2026 World Cup Kits Now Only 49 GEL!',
    excerptKa: 'სპეციალური შეთავაზება FUT Universe-ის თბილისის ბიბლიოთეკაში: 2026 წლის მსოფლიო ჩემპიონატის ყველა ნაკრების მაისური (გერმანია, ინგლისი, პორტუგალია, არგენტინა) და ზიდანის 2006 რეტრო მაისური სულ რაღაც 49 ლარად!',
    excerptEn: 'Exclusive deal at FUT Universe Tbilisi: All 2026 World Cup national team jerseys (Germany, England, Portugal, Argentina) and Zidane 2006 retro kit available for only 49 GEL!',
    contentKa: `🎉 **სპეციალური ფასდაკლება მხოლოდ 2026 World Cup-ის მაისურებზე!**

საფეხბურთო სეზონის საპატივცემულოდ, FUT Universe-ის თბილისის ბიბლიოთეკაში აცხადებს სპეციალურ ფასდაკლებას: **2026 წლის მსოფლიო ჩემპიონატის (2026 World Cup) ყველა მაისური ხელმისაწვდომია 49₾-ად!**

### 📍 რა მაისურები შედის 49₾-იან ფასდაკლებაში?
* 🇩🇪 **Florian Wirtz — Germany 2026 World Cup** (Player Version) | 💰 **49₾** (ნაცვლად 67₾)
* 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Kobbie Mainoo — England 2026 World Cup** (Fan Version) | 💰 **49₾** (ნაცვლად 55₾)
* 🇵🇹 **Bruno Fernandes — Portugal 2026 World Cup** (Fan Version) | 💰 **49₾** (ნაცვლად 55₾)
* 🇦🇷 **Julián Álvarez — Argentina 2026 World Cup** (Fan Version) | 💰 **49₾** (ნაცვლად 57₾)
* 🇫🇷 **Zinedine Zidane #10 — France 2006 World Cup Retro** | 💰 **49₾** (M, L, XL ზომები)

ყველა მაისური რეალურად მარაგშია თბილისში, დამზადებულია უმაღლესი ხარისხის სუნთქვადი მასალით და ოფიციალური შრიფტებით!

### 📲 როგორ შევუკვეთოთ?
შესაკვეთად მოგვწერეთ Instagram-ზე (**@futt_universe**) ან Facebook Messenger-ში. თბილისში მოქმედებს იმავე დღის სწრაფი კურიერული მიწოდება!`,
    contentEn: `🎉 **Special Sale On 2026 World Cup Jerseys Only!**

At FUT Universe Tbilisi, we are launching an exclusive promotion: **All 2026 World Cup national team kits are now priced at just 49 GEL!**

### 📍 What Kits Are On Sale For 49 GEL?
* 🇩🇪 **Florian Wirtz — Germany 2026 World Cup** (Player Version) | 💰 **49 GEL** (Was 67 GEL)
* 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Kobbie Mainoo — England 2026 World Cup** (Fan Version) | 💰 **49 GEL** (Was 55 GEL)
* 🇵🇹 **Bruno Fernandes — Portugal 2026 World Cup** (Fan Version) | 💰 **49 GEL** (Was 55 GEL)
* 🇦🇷 **Julián Álvarez — Argentina 2026 World Cup** (Fan Version) | 💰 **49 GEL** (Was 57 GEL)
* 🇫🇷 **Zinedine Zidane #10 — France 2006 World Cup Retro** | 💰 **49 GEL** (Sizes M, L, XL)

All jerseys are physically in-stock in Tbilisi, made with premium breathable polyester and official badges.

### 📲 How to Order?
DM us on Instagram (**@futt_universe**) or Facebook. Same-day local delivery across Tbilisi!`,
    publishDate: '2026-08-10',
    readTime: '2 წუთი',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    author: 'FUT Universe Team',
    tags: ['World Cup 2026', 'Sale', '49 GEL', 'Jerseys', 'Tbilisi'],
    relatedPlayerSlugs: ['wirtz', 'mainoo', 'brunof', 'alvarez', 'zidane']
  },
  {
    slug: 'fan-version-vs-player-version-guide',
    titleKa: '⚽ Fan Version vs. Player Version — რა განსხვავებაა საფეხბურთო მაისურების ვერსიებს შორის?',
    titleEn: '⚽ Fan Version vs. Player Version — What is the Difference Between Kit Specs?',
    excerptKa: 'გაინტერესებთ რით განსხვავდება მოთამაშის ვერსია (Player Version) ფან ვერსიისგან (Fan Version)? დეტალური გზამკვლევი FUT Universe-ის კატალოგის მაგალითებით.',
    excerptEn: 'Wondering what sets Player Version kits apart from Fan Version jerseys? Detailed guide featuring examples directly from our FUT Universe library.',
    contentKa: `როდესაც საფეხბურთო მაისურს ირჩევთ, ხშირად შეხვდებით ორ ძირითად კატეგორიას: **Fan Version (ფან ვერსია)** და **Player Version (მოთამაშის ვერსია)**. აი, რა ძირითადი განსხვავებებია მათ შორის:

---

### 1. ⚡️ Player Version (მოთამაშის ვერსია)
ეს არის მაისური, რომელსაც პროფესიონალი ფეხბურთელები ატარებენ მოედანზე მატჩის დროს.
* **ჭრა & თარგები (Slim Fit):** მომდგარი, ათლეტური ჭრა, რომელიც იდეალურად ერგება სხეულის ფორმას.
* **ემბლემები & ლოგოები:** 3D თერმულად დაკრობილი (Heat-Sealed) სილიკონის ან რეზინის ლოგოები — არის ულტრამსუბუქი, რათა არ დამძიმდეს მაისური.
* **ქსოვილი & ვენტილაცია:** შეიცავს მიკრო-ხვრელებსა და ლაზერულად გაჭრილ სავენტილაციო ზონებს (Micro-mesh) ოფლის მომენტალური აორთქლებისთვის.
* **FUT Universe-ის მაგალითები:** 
  * 🇩🇪 **Florian Wirtz — Germany 2026 World Cup** (Player Version)
  * 🇺🇾 **Federico Valverde — Real Madrid & Uruguay** (Player Version)

---

### 2. 🏟️ Fan Version (ფან ვერსია)
ეს არის მაისური, რომელიც შექმნილია გულშემატკივრებისთვის ყოველდღიური მოხმარებისა და სტადიონზე სატარებლად.
* **ჭრა & თარგები (Regular Fit):** თავისუფალი და კომფორტული ჭრა, რომელიც უხდება ნებისმიერ აღნაგობას.
* **ემბლემები & ლოგოები:** მკვრივი ქარგვით (Embroidered) შესრულებული ემბლემები, რომლებიც გამოირჩევა მაღალი გამძლეობითა და მრავალჯერადი რეცხვისადმი მდგრადობით.
* **ქსოვილი:** რბილი, სუნთქვადი პოლიესტერი, რომელიც იდეალურია ყოველდღიური ტარებისთვის.
* **FUT Universe-ის მაგალითები:**
  * 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Kobbie Mainoo — England 2026 World Cup**
  * 🇵🇹 **Bruno Fernandes — Portugal 2026 World Cup**
  * 🇦🇷 **Julián Álvarez — Argentina 2026 World Cup**
  * 🇨🇴 **Luis Díaz — Colombia Home Kit**

---

💡 **რომელი ავირჩიოთ?**
თუ გსურთ მაქსიმალურად მსუბუქი, ტანზე მომდგარი და ინოვაციური სპორტული მაისური — აირჩიეთ **Player Version**. ხოლო თუ ეძებთ გამძლე, ყოველდღიურ და კომფორტულ მაისურს — **Fan Version** საუკეთესო არჩევანია!`,
    contentEn: `When choosing a football kit, you'll often encounter two primary specifications: **Fan Version** and **Player Version**. Here is a clear breakdown of the differences:

---

### 1. ⚡️ Player Version
Designed for elite performance, exactly matching what professional players wear on the pitch.
* **Athletic Slim Fit:** Tailored close to the body for maximum mobility and minimal drag.
* **Heat-Applied Crests & Logos:** 3D silicone heat-pressed crests and badges — ultra-lightweight so no extra weight is added.
* **Advanced Ventilation:** Features laser-cut perforation zones and micro-mesh breathable weave for maximum heat dissipation.
* **Examples in FUT Universe:**
  * 🇩🇪 **Florian Wirtz — Germany 2026 World Cup** (Player Version)
  * 🇺🇾 **Federico Valverde — Real Madrid & Uruguay** (Player Version)

---

### 2. 🏟️ Fan Version
Crafted for supporters, offering maximum comfort for everyday wear and matchday cheering.
* **Regular Comfortable Fit:** Relaxed fit suitable for all body shapes.
* **Embroidered Crests:** High-density stitched logos for enhanced longevity through countless washes.
* **Durable Fabric:** Soft, breathable performance polyester ideal for casual wear.
* **Examples in FUT Universe:**
  * 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Kobbie Mainoo — England 2026 World Cup**
  * 🇵🇹 **Bruno Fernandes — Portugal 2026 World Cup**
  * 🇦🇷 **Julián Álvarez — Argentina 2026 World Cup**
  * 🇨🇴 **Luis Díaz — Colombia Home Kit**

---

💡 **Which Should You Choose?**
For an ultra-lightweight, high-tech athletic fit, go for **Player Version**. For a relaxed, durable, everyday supporter jersey, **Fan Version** is the perfect choice!`,
    publishDate: '2026-08-10',
    readTime: '3 წუთი',
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    author: 'FUT Universe Curation Team',
    tags: ['Guide', 'Player Version', 'Fan Version', 'Jerseys', 'FUT Universe'],
    relatedPlayerSlugs: ['wirtz', 'valverde', 'mainoo', 'brunof', 'alvarez', 'diaz']
  }
];
