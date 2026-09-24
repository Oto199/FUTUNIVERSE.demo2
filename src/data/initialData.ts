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
    heroImage: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80'
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
    heroImage: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=1200&q=80'
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
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80'
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
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "tags": [
      "Official",
      "National Jersey",
      "Argentina"
    ],
    "nationalTeamKa": "არგენტინა",
    "number": 19,
    "isWc26": true,
    "titleKa": "ხულიან ალვარესი (Julián Álvarez) — Argentina 2026 World Cup Jersey",
    "playerKa": "ხულიან ალვარესი",
    "descriptionEn": "🔥 Julián Álvarez #19 — Argentina 2026 World Cup Fan Version | 49 GEL (Sale!) | Size L.",
    "id": "prod-alvarez-argentina",
    "releaseYear": 2026,
    "titleEn": "Julián Álvarez — Argentina 2026 World Cup Jersey",
    "sizes": [
      "L"
    ],
    "kitType": "Fan Version",
    "teamSlug": "argentina",
    "originalPrice": 57,
    "isFeatured": true,
    "inStock": true,
    "playerSlug": "alvarez",
    "nationalTeamEn": "Argentina",
    "price": 49,
    "descriptionKa": "🔥 Julián Álvarez #19 — არგენტინის 2026 World Cup ფან ვერსია | 💰 49₾ (ფასდაკლება!) | 📏 L.",
    "category": "Jersey",
    "playerEn": "Julián Álvarez",
    "images": [
      "/uploads/jersey_prod-alvarez-argentina_img_1.webp",
      "/uploads/jersey_prod-alvarez-argentina_img_2.webp"
    ],
    "imageFront": "/uploads/jersey_prod-alvarez-argentina_front.webp",
    "isNiche": false,
    "imageBack": "/uploads/jersey_prod-alvarez-argentina_back.webp",
    "teamCategory": "nation"
  },
  {
    "teamSlug": "portugal",
    "originalPrice": 55,
    "sizes": [
      "L"
    ],
    "nationalTeamKa": "პორტუგალია",
    "descriptionEn": "🇵🇹 Bruno Fernandes Portugal 2026 (Fan Version) | 49 GEL (BACK TO SCHOOL SALE!) | Size: L.",
    "isNiche": false,
    "imageBack": "/uploads/jersey_prod-bruno-portugal_back.webp",
    "inStock": true,
    "tags": [
      "Official",
      "National Jersey",
      "Portugal"
    ],
    "playerKa": "ბრუნო ფერნანდეში",
    "number": 8,
    "isWc26": true,
    "teamCategory": "nation",
    "images": [
      "/uploads/jersey_prod-bruno-portugal_img_1.webp",
      "/uploads/jersey_prod-bruno-portugal_img_2.webp"
    ],
    "titleEn": "Bruno Fernandes — Portugal 2026 World Cup",
    "playerEn": "Bruno Fernandes",
    "kitType": "Fan Version",
    "nationalTeamEn": "Portugal",
    "releaseYear": 2026,
    "imageFront": "/uploads/jersey_prod-bruno-portugal_front.webp",
    "id": "prod-bruno-portugal",
    "playerSlug": "brunof",
    "category": "Jersey",
    "isFeatured": true,
    "price": 49,
    "titleKa": "ბრუნო ფერნანდეში (Bruno Fernandes) — Portugal 2026",
    "descriptionKa": "🇵🇹 Bruno Fernandes Portugal 2026 (Fan Version) | 💰 49₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L."
  },
  {
    "inStock": true,
    "teamCategory": "nation",
    "category": "Jersey",
    "isWc26": true,
    "number": 7,
    "imageFront": "/uploads/jersey_prod-diaz-colombia-2026_front.webp",
    "imageBack": "/uploads/jersey_prod-diaz-colombia-2026_back.webp",
    "playerSlug": "diaz",
    "isFeatured": true,
    "descriptionKa": "🇨🇴 Luis Diaz Colombia 2026 (Fan Version) | 💰 49₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: XL.",
    "isNiche": false,
    "price": 49,
    "playerEn": "Luis Díaz",
    "id": "prod-diaz-colombia-2026",
    "nationalTeamKa": "კოლუმბია",
    "releaseYear": 2026,
    "descriptionEn": "🇨🇴 Luis Diaz Colombia 2026 (Fan Version) | 49 GEL (BACK TO SCHOOL SALE!) | Size: XL.",
    "playerKa": "ლუის დიაზი",
    "originalPrice": 55,
    "sizes": [
      "XL"
    ],
    "titleKa": "ლუის დიაზი (Luis Díaz) — Colombia 2026 World Cup",
    "images": [
      "/uploads/jersey_prod-diaz-colombia-2026_img_1.webp",
      "/uploads/jersey_prod-diaz-colombia-2026_img_2.webp"
    ],
    "nationalTeamEn": "Colombia",
    "teamSlug": "colombia",
    "titleEn": "Luis Díaz — Colombia 2026 World Cup",
    "tags": [
      "Official",
      "National Jersey",
      "Colombia"
    ],
    "kitType": "Fan Version"
  },
  {
    "descriptionEn": "🔥 Toni Kroos #8 — Real Madrid 2021/22 UCL Final Jersey | 75 GEL | Size L.",
    "titleEn": "Toni Kroos — Real Madrid 2021/22 UCL Final Jersey",
    "teamSlug": "real-madrid",
    "kitType": "UCL Final",
    "id": "prod-kroos-real-2022",
    "price": 75,
    "isWc26": false,
    "number": 8,
    "nationalTeamEn": "Real Madrid",
    "titleKa": "ტონი კროსი (Toni Kroos) — Real Madrid 2021/22 UCL Final Jersey",
    "playerKa": "ტონი კროსი",
    "sizes": [
      "L"
    ],
    "playerEn": "Toni Kroos",
    "playerSlug": "toni-kroos",
    "isFeatured": true,
    "teamCategory": "club",
    "images": [
      "/uploads/jersey_prod-kroos-real-2022_img_1.webp",
      "/uploads/jersey_prod-kroos-real-2022_img_2.webp"
    ],
    "releaseYear": 2022,
    "tags": [
      "Official",
      "Club Jersey",
      "Real Madrid"
    ],
    "isNiche": true,
    "descriptionKa": "🔥 Toni Kroos #8 — Real Madrid 2021/22 UCL Final Jersey | 💰 75₾ | 📏 L.",
    "imageBack": "/uploads/jersey_prod-kroos-real-2022_back.webp",
    "inStock": true,
    "nationalTeamKa": "რეალ მადრიდი",
    "imageFront": "/uploads/jersey_prod-kroos-real-2022_front.webp",
    "category": "Jersey"
  },
  {
    "imageBack": "/uploads/jersey_prod-mainoo-england_back.webp",
    "imageFront": "/uploads/jersey_prod-mainoo-england_front.webp",
    "nationalTeamEn": "England",
    "number": 26,
    "isWc26": true,
    "descriptionKa": "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Kobbie Mainoo England 2026 (Fan Version) | 💰 49₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L.",
    "titleKa": "კობი მეინუ (Kobbie Mainoo) — England 2026 World Cup",
    "playerKa": "კობი მეინუ",
    "titleEn": "Kobbie Mainoo — England 2026 World Cup",
    "teamSlug": "england",
    "kitType": "Fan Version",
    "isFeatured": true,
    "playerSlug": "mainoo",
    "sizes": [
      "L"
    ],
    "inStock": true,
    "tags": [
      "Official",
      "National Jersey",
      "England"
    ],
    "teamCategory": "nation",
    "id": "prod-mainoo-england",
    "nationalTeamKa": "ინგლისი",
    "releaseYear": 2026,
    "price": 49,
    "category": "Jersey",
    "playerEn": "Kobbie Mainoo",
    "images": [
      "/uploads/jersey_prod-mainoo-england_img_1.webp",
      "/uploads/jersey_prod-mainoo-england_img_2.webp"
    ],
    "originalPrice": 55,
    "isNiche": false,
    "descriptionEn": "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Kobbie Mainoo England 2026 (Fan Version) | 49 GEL (BACK TO SCHOOL SALE!) | Size: L."
  },
  {
    "imageBack": "/uploads/jersey_prod-mbappe-france-2018_back.webp",
    "playerKa": "კილიან მბაპე",
    "releaseYear": 2018,
    "inStock": true,
    "isNiche": true,
    "images": [
      "/uploads/jersey_prod-mbappe-france-2018_img_1.webp",
      "/uploads/jersey_prod-mbappe-france-2018_img_2.webp"
    ],
    "teamSlug": "france",
    "descriptionKa": "🇫🇷 Mbappé France 2018 World Cup Champions | 💰 59₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: XL.",
    "nationalTeamEn": "France",
    "sizes": [
      "XL"
    ],
    "tags": [
      "Official",
      "National Jersey",
      "France"
    ],
    "category": "Jersey",
    "titleKa": "კილიან მბაპე (Kylian Mbappé) — France 2018 World Cup Champions",
    "isWc26": false,
    "playerSlug": "mbappe",
    "number": 10,
    "price": 67,
    "isFeatured": true,
    "descriptionEn": "🇫🇷 Mbappé France 2018 World Cup Champions | 59 GEL (BACK TO SCHOOL SALE!) | Size: XL.",
    "kitType": "Retro",
    "id": "prod-mbappe-france-2018",
    "imageFront": "/uploads/jersey_prod-mbappe-france-2018_front.webp",
    "teamCategory": "nation",
    "nationalTeamKa": "საფრანგეთი",
    "titleEn": "Kylian Mbappé — France 2018 World Cup Champions",
    "playerEn": "Kylian Mbappé"
  },
  {
    "isWc26": false,
    "imageBack": "/uploads/jersey_prod-ronaldinho-brazil-2002_back.webp",
    "number": 11,
    "playerSlug": "ronaldinho",
    "playerKa": "რონალდინიო",
    "inStock": true,
    "isFeatured": true,
    "descriptionKa": "🇧🇷 Ronaldinho Brazil 2002 World Cup Retro | 💰 59₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L, XL.",
    "price": 67,
    "nationalTeamKa": "ბრაზილია",
    "releaseYear": 2002,
    "id": "prod-ronaldinho-brazil-2002",
    "teamSlug": "brazil",
    "isNiche": true,
    "imageFront": "/uploads/jersey_prod-ronaldinho-brazil-2002_front.webp",
    "nationalTeamEn": "Brazil",
    "category": "Jersey",
    "teamCategory": "nation",
    "titleKa": "რონალდინიო (Ronaldinho) — Brazil 2002 World Cup Retro",
    "tags": [
      "Official",
      "National Jersey",
      "Brazil"
    ],
    "titleEn": "Ronaldinho — Brazil 2002 World Cup Retro",
    "images": [
      "/uploads/jersey_prod-ronaldinho-brazil-2002_img_1.webp",
      "/uploads/jersey_prod-ronaldinho-brazil-2002_img_2.webp"
    ],
    "sizes": [
      "L",
      "XL"
    ],
    "playerEn": "Ronaldinho",
    "kitType": "Retro",
    "descriptionEn": "🇧🇷 Ronaldinho Brazil 2002 World Cup Retro | 59 GEL (BACK TO SCHOOL SALE!) | Sizes: L, XL."
  },
  {
    "sizes": [
      "XL"
    ],
    "titleKa": "კრიშტიანუ რონალდუ (Cristiano Ronaldo) — Manchester United 2007/08 Away Long Sleeve",
    "playerEn": "Cristiano Ronaldo",
    "playerSlug": "cristiano-ronaldo",
    "isFeatured": true,
    "category": "Jersey",
    "kitType": "Away Long Sleeve",
    "imageFront": "/uploads/jersey_prod-ronaldo-mufc-2007_front.webp",
    "descriptionKa": "🔥 Cristiano Ronaldo #7 — Manchester United 2007/08 Away Long Sleeve | 💰 75₾ | 📏 XL.",
    "nationalTeamEn": "Manchester United",
    "tags": [
      "Official",
      "Club Jersey",
      "Manchester United"
    ],
    "isWc26": false,
    "number": 7,
    "titleEn": "Cristiano Ronaldo — Manchester United 2007/08 Away Long Sleeve",
    "imageBack": "/uploads/jersey_prod-ronaldo-mufc-2007_back.webp",
    "images": [
      "/uploads/jersey_prod-ronaldo-mufc-2007_img_1.webp",
      "/uploads/jersey_prod-ronaldo-mufc-2007_img_2.webp"
    ],
    "teamSlug": "manchester-united",
    "inStock": true,
    "releaseYear": 2008,
    "descriptionEn": "🔥 Cristiano Ronaldo #7 — Manchester United 2007/08 Away Long Sleeve | 75 GEL | Size XL.",
    "price": 75,
    "isNiche": true,
    "playerKa": "კრიშტიანუ რონალდუ",
    "teamCategory": "club",
    "nationalTeamKa": "მანჩესტერ იუნაიტედი",
    "id": "prod-ronaldo-mufc-2007"
  },
  {
    "kitType": "Home Fan Version",
    "isWc26": false,
    "number": 66,
    "titleEn": "Trent Alexander-Arnold — Liverpool Home Jersey",
    "imageBack": "/uploads/jersey_prod-trent-liverpool_back.webp",
    "teamSlug": "liverpool",
    "descriptionEn": "🔥 Trent Alexander-Arnold #66 — Liverpool Home Kit (Fan Version) | 55 GEL.",
    "id": "prod-trent-liverpool",
    "releaseYear": 2026,
    "titleKa": "ტრენტ ალექსანდერ-არნოლდი (Trent Alexander-Arnold) — Liverpool Home Jersey",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "playerKa": "ტრენტ ალექსანდერ-არნოლდი",
    "nationalTeamEn": "Liverpool",
    "isNiche": false,
    "imageFront": "/uploads/jersey_prod-trent-liverpool_front.webp",
    "descriptionKa": "🔥 Trent Alexander-Arnold #66 — Liverpool Home Kit (Fan Version) | 💰 55₾.",
    "teamCategory": "club",
    "playerEn": "Trent Alexander-Arnold",
    "price": 55,
    "tags": [
      "Official",
      "Club Jersey",
      "Liverpool"
    ],
    "images": [
      "/uploads/jersey_prod-trent-liverpool_img_1.webp",
      "/uploads/jersey_prod-trent-liverpool_img_2.webp"
    ],
    "nationalTeamKa": "ლივერპული",
    "inStock": true,
    "isFeatured": true,
    "category": "Jersey",
    "playerSlug": "trent-alexander-arnold"
  },
  {
    "playerEn": "Florian Wirtz",
    "imageFront": "/uploads/jersey_prod-wirtz-germany_front.webp",
    "inStock": true,
    "id": "prod-wirtz-germany",
    "number": 10,
    "isWc26": true,
    "descriptionKa": "🇩🇪 Florian Wirtz Germany 2026 | 💰 49₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L.",
    "nationalTeamEn": "Germany",
    "sizes": [
      "L"
    ],
    "isFeatured": true,
    "playerSlug": "wirtz",
    "isNiche": true,
    "category": "Jersey",
    "price": 49,
    "imageBack": "/uploads/jersey_prod-wirtz-germany_back.webp",
    "releaseYear": 2026,
    "teamCategory": "nation",
    "teamSlug": "germany",
    "titleKa": "ფლორიან ვირცი (Florian Wirtz) — Germany 2026 World Cup",
    "tags": [
      "Official",
      "National Jersey",
      "Germany"
    ],
    "originalPrice": 67,
    "titleEn": "Florian Wirtz — Germany 2026 World Cup",
    "images": [
      "/uploads/jersey_prod-wirtz-germany_img_1.webp",
      "/uploads/jersey_prod-wirtz-germany_img_2.webp"
    ],
    "descriptionEn": "🇩🇪 Florian Wirtz Germany 2026 | 49 GEL (BACK TO SCHOOL SALE!) | Size: L.",
    "kitType": "Fan Version",
    "nationalTeamKa": "გერმანია",
    "playerKa": "ფლორიან ვირცი"
  },
  {
    "isNiche": true,
    "teamSlug": "france",
    "nationalTeamKa": "საფრანგეთი",
    "number": 10,
    "id": "prod-zidane-2006",
    "isWc26": false,
    "playerKa": "ზინედინ ზიდანი",
    "tags": [
      "Official",
      "National Jersey",
      "France"
    ],
    "descriptionEn": "🇫🇷 Zidane France 2006 World Cup Retro | 59 GEL (BACK TO SCHOOL SALE!) | Sizes: M, L, XL.",
    "price": 67,
    "inStock": true,
    "releaseYear": 2006,
    "teamCategory": "nation",
    "descriptionKa": "🇫🇷 Zidane France 2006 World Cup Retro | 💰 59₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: M, L, XL.",
    "kitType": "Retro",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "playerSlug": "zidane",
    "isFeatured": true,
    "nationalTeamEn": "France",
    "playerEn": "Zinedine Zidane",
    "titleEn": "Zinedine Zidane — France 2006 World Cup Retro",
    "category": "Jersey",
    "imageBack": "/uploads/jersey_prod-zidane-2006_back.webp",
    "images": [
      "/uploads/jersey_prod-zidane-2006_img_1.webp",
      "/uploads/jersey_prod-zidane-2006_img_2.webp"
    ],
    "titleKa": "ზინედინ ზიდანი (Zinedine Zidane) — France 2006 World Cup Retro",
    "imageFront": "/uploads/jersey_prod-zidane-2006_front.webp"
  },
  {
    "isNiche": true,
    "number": 10,
    "descriptionKa": "🇫🇷 Zidane France 1998 World Cup Final Retro | 💰 59₾ (BACK TO SCHOOL SALE!) | 📏 ზომა: L, XL.",
    "isWc26": false,
    "imageFront": "/uploads/jersey_prod-zidane-france-1998_front.webp",
    "playerEn": "Zinedine Zidane",
    "category": "Jersey",
    "playerSlug": "zidane",
    "nationalTeamEn": "France",
    "isFeatured": true,
    "teamCategory": "nation",
    "inStock": true,
    "imageBack": "/uploads/jersey_prod-zidane-france-1998_back.webp",
    "sizes": [
      "L",
      "XL"
    ],
    "kitType": "Retro",
    "tags": [
      "Official",
      "National Jersey",
      "France"
    ],
    "teamSlug": "france",
    "titleEn": "Zinedine Zidane — France 1998 World Cup Final Retro",
    "price": 67,
    "playerKa": "ზინედინ ზიდანი",
    "images": [
      "/uploads/jersey_prod-zidane-france-1998_img_1.webp",
      "/uploads/jersey_prod-zidane-france-1998_img_2.webp",
      "/uploads/jersey_prod-zidane-france-1998_img_3.webp",
      "/uploads/jersey_prod-zidane-france-1998_img_4.webp"
    ],
    "releaseYear": 1998,
    "titleKa": "ზინედინ ზიდანი (Zinedine Zidane) — France 1998 World Cup Final Retro",
    "id": "prod-zidane-france-1998",
    "nationalTeamKa": "საფრანგეთი",
    "descriptionEn": "🇫🇷 Zidane France 1998 World Cup Final Retro | 59 GEL (BACK TO SCHOOL SALE!) | Sizes: L, XL."
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
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
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
