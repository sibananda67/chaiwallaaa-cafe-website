export interface MenuItem {
  id: string;
  name: string;
  category: 'signature' | 'chai' | 'bites' | 'drinks';
  subtitle: string;
  description: string;
  story: string;
  highlights: string[];
  imageUrl: string;
  badge?: string;
  isKnownSignature?: boolean;
}

export interface AtmospherePhoto {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  tag: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export const CAFE_INFO = {
  name: 'Chaiwallaaa',
  tagline: 'Good Chai. Great Company. No Plans.',
  subtext: 'Your favourite little escape near IIT Bhubaneswar.',
  brandQuote: 'Chai tastes better together.',
  address: 'Near IIT Bhubaneswar entry gate, Jatni, Odisha 752050',
  shortAddress: 'IIT BBS Gate, Jatni, Odisha',
  closingTimeStr: '11:00 PM',
  closingHour: 23,
  openingHour: 9,
  serviceTypes: ['Outdoor Seating', 'Dine-In', 'Takeaway'],
  // Direct Google Maps location search URL for verified directions
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chaiwallaaa+Cafe+Near+IIT+Bhubaneswar+Gate+Jatni+Odisha+752050',
  googleMapsEmbedQuery: 'IIT+Bhubaneswar+Main+Gate+Jatni+Odisha',
};

// Verified menu items explicitly highlighted by the brief, plus café staples
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chicken-grilled-sandwich',
    name: 'Chicken Grilled Sandwich',
    category: 'signature',
    subtitle: 'Signature Toasted Panini',
    description: 'Slow-roasted herb chicken folded into mint mayo and melting cheese, pressed until crackling golden.',
    story: 'Crafted for hunger pangs between lectures. The bread is butter-crisped on the flat grill with distinctive grill marks, sealing in juicy shredded chicken and melted cheese with a touch of green chutney punch.',
    highlights: ['Crispy Grill-Pressed', 'Spiced Herb Chicken', 'Melted Cheese Layer', 'House Mint Relish'],
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=85',
    badge: 'Campus Favorite',
    isKnownSignature: true,
  },
  {
    id: 'lemon-soda-mojito',
    name: 'Lemon Soda Mojito',
    category: 'signature',
    subtitle: 'Chilled Citrus Sparkler',
    description: 'Crushed garden mint, freshly squeezed lime, effervescent chilled soda, and a touch of black salt for that gate-side kick.',
    story: 'The quintessential antidote to afternoon humidity and long lab hours. Freshly muddled mint leaves mixed with tart lime juice, iced to perfection, and topped with fizzy club soda.',
    highlights: ['Fresh Muddled Mint', 'Odisha Lemon Squeeze', 'Kala Namak Fizz', 'Served Extra Iced'],
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=85',
    badge: 'Chilled Punch',
    isKnownSignature: true,
  },
  {
    id: 'crispy-fried-chicken',
    name: 'Crispy Fried Chicken (2 Pcs)',
    category: 'signature',
    subtitle: 'Double-Crunch Hot Bites',
    description: 'Two pieces of crunch-coated tender chicken seasoned with cracked black pepper and paprika, fried fresh per order.',
    story: 'Never batch-fried and kept under a lamp. Each order drops straight into hot oil for that loud, shattering crunch that gives way to tender, steaming chicken inside.',
    highlights: ['2 Generous Pieces', 'Shattering Crust', 'Made Fresh to Order', 'Pepper & Paprika Rub'],
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=85',
    badge: 'Crunch Specialist',
    isKnownSignature: true,
  },
  {
    id: 'kadak-cutting-chai',
    name: 'Kadak Cutting Chai',
    category: 'chai',
    subtitle: 'The Soul of Chaiwallaaa',
    description: 'Slow-simmered Assam tea leaves steeped with fresh crushed ginger and green cardamom in velvety whole milk.',
    story: 'Served piping hot in the iconic fluted glass tumbler. Brewed slowly until thick, rich caramel-hued, and aromatic. The glass stays warm in your hands as conversations stretch into the night.',
    highlights: ['Fresh Adrak & Elaichi', 'Full Cream Milk Simmer', 'Traditional Cutting Glass', 'Brewed Fresh Continuously'],
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85',
    badge: 'The Benchmark',
    isKnownSignature: false,
  },
  {
    id: 'masala-kullhad-chai',
    name: 'Earthen Kullhad Chai',
    category: 'chai',
    subtitle: 'Clay Cup Infusion',
    description: 'Robust spiced milk tea poured into sun-baked terracotta kullhads for that unmistakable earthy aroma (saunda pan).',
    story: 'There is something elemental about drinking hot spiced chai from raw unglazed clay. The porous terracotta absorbs heat while imparting a delicate earthy note found nowhere else.',
    highlights: ['Terracotta Kullhad', 'Clove & Cinnamon Infusion', 'Earthy Saunda Flavor', 'Hand-Crafted Cup'],
    imageUrl: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=1000&q=85',
    isKnownSignature: false,
  },
  {
    id: 'artisan-hot-coffee',
    name: 'Frothy Hot Coffee',
    category: 'drinks',
    subtitle: 'South Indian Style Foam',
    description: 'Whipped dark roast coffee froth pulled with boiling steamed milk, producing a thick golden head of velvety crema.',
    story: 'The late-night coding staple for students who need that rich caffeine punch. Whipped patiently to dissolve fine sugar before hot milk cascades from height.',
    highlights: ['Rich Crema Head', 'Dark Roasted Blend', 'Velvety Steamed Milk', 'Late Night Fuel'],
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
    isKnownSignature: false,
  },
  {
    id: 'peri-peri-fries',
    name: 'Peri Peri Tossed Fries',
    category: 'bites',
    subtitle: 'Golden Potato Crunch',
    description: 'Skinny cut potatoes deep-fried to crisp perfection and vigorously shaken in a zesty, smoky peri-peri spice blend.',
    story: 'The ultimate table shareable. Delivered in a greaseproof cone while still sizzling, dusted with fiery African bird’s eye chili seasoning that begs for a cold sip of soda.',
    highlights: ['Fiery Spice Dust', 'Sizzling Hot', 'Crisp Edge Texture', 'Best Shared'],
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=85',
    isKnownSignature: false,
  },
  {
    id: 'bun-maska-toast',
    name: 'Toasted Bun Maska',
    category: 'bites',
    subtitle: 'Warm Buttered Pillow',
    description: 'Soft bakery bun sliced, generously slathered with salted butter, and toasted on the tawa until edges turn golden.',
    story: 'The inseparable partner to a glass of hot cutting chai. Dunk a corner into your glass, let the butter melt slightly into the warm tea, and take that first heavenly bite.',
    highlights: ['Salted Butter Spread', 'Soft Pillow Crumb', 'Crisp Tawa Crust', 'Ideal Chai Dip'],
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85',
    isKnownSignature: false,
  },
];

// Hangout atmosphere visual narrative - authentic Chaiwallaaa photographs
export const HANGOUT_PHOTOS: AtmospherePhoto[] = [
  {
    id: 'twilight-terrace-wide',
    title: 'Twilight Terrace',
    caption: 'The outdoor crushed gravel terrace with traditional thatched umbrella cabanas, colourful seating, warm fairy lights, and the elevated illuminated Chaiwallaaa tower.',
    imageUrl: '/assets/chaiwallaaa-terrace.svg',
    tag: 'Twilight Terrace',
    aspect: 'landscape',
  },
  {
    id: 'evening-ambience',
    title: 'Evening Ambience',
    caption: 'Original nighttime photograph featuring warm illuminated Edison bulbs, fairy lights, and relaxed outdoor seating under the open Odisha sky.',
    imageUrl: '/assets/chaiwallaaa-evening-ambience.svg',
    tag: 'Evening Ambience',
    aspect: 'landscape',
  },
  {
    id: 'cafe-atmosphere-blue-table',
    title: 'Café Atmosphere',
    caption: 'Authentic food and drink spread on the vibrant blue terrace table: cutting chai in fluted glasses, grilled sandwich, and golden snacks with outdoor bokeh.',
    imageUrl: '/assets/chaiwallaaa-cafe-atmosphere.svg',
    tag: 'Café Atmosphere',
    aspect: 'landscape',
  },
  {
    id: 'brand-identity-neon',
    title: 'Brand Identity',
    caption: 'The original illuminated Chaiwallaaa neon sign with electric blue halo, amber typography, green leaf accents, and the "Ambience Aroma Artisan" motto.',
    imageUrl: '/assets/chaiwallaaa-neon-logo.svg',
    tag: 'Brand Identity',
    aspect: 'landscape',
  },
];

export const VIBE_MOODS = [
  {
    label: 'Post-Lab Exhaustion',
    recommendation: 'Kadak Cutting Chai + Chicken Grilled Sandwich',
    reason: 'Instant neural recharge and protein-packed crunch.',
  },
  {
    label: 'Hot Afternoon Slump',
    recommendation: 'Lemon Soda Mojito + Peri Peri Fries',
    reason: 'Icy effervescence with spicy potato snap.',
  },
  {
    label: 'Late-Night Gossip & Laughs',
    recommendation: 'Crispy Fried Chicken (2 Pcs) + Earthen Kullhad Chai',
    reason: 'Shattering crunch followed by grounding terracotta warmth.',
  },
  {
    label: 'Rainy Odisha Dusk',
    recommendation: 'Kadak Cutting Chai + Toasted Bun Maska',
    reason: 'The timeless comfort dip that makes time freeze.',
  },
];
