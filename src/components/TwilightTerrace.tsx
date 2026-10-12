import React, { useState } from 'react';
import { Sparkles, MapPin, Maximize2, X, Compass, Eye, Check } from 'lucide-react';
import { CrystalCard } from './CrystalCard';
import { CrystalButton } from './CrystalButton';
import { CAFE_INFO } from '../data/cafeData';

interface CafePhoto {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  src: string;
  fallbackSrc: string;
  tags: string[];
  hotspots?: { id: number; label: string; top: string; left: string; color: string }[];
}

export const TwilightTerrace: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [activeSpotlight, setActiveSpotlight] = useState<number>(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<CafePhoto | null>(null);
  const [customPhotos, setCustomPhotos] = useState<{ [key: string]: string }>({});

  const cafePhotos: CafePhoto[] = [
    {
      id: 'terrace-wide',
      title: 'Twilight Terrace',
      subtitle: 'Outdoor Gravel Courtyard & Thatched Cabanas',
      badge: 'Main Café Terrace',
      description:
        'The wide outdoor gravel terrace located right outside the IIT Bhubaneswar main entry gate. Featuring traditional thatched palm parasols, colourful orange, yellow, and blue chairs, warm hanging Edison fairy lights, potted banana palms, and the elevated two-story steel tower crowned by the illuminated Chaiwallaaa neon sign under the open Jatni evening sky.',
      src: customPhotos['terrace-wide'] || '/assets/chaiwallaaa-terrace.svg',
      fallbackSrc: '/assets/chaiwallaaa-terrace.png',
      tags: ['Outdoor Gravel Terrace', 'Thatched Umbrellas', 'Colourful Tables', 'Fairy Lights', 'Elevated Signboard'],
      hotspots: [
        { id: 1, label: '01 Thatched Cabanas', top: '34%', left: '22%', color: '#D99445' },
        { id: 2, label: '02 Two-Story Neon Tower', top: '24%', left: '68%', color: '#27D7FF' },
        { id: 4, label: '04 Crushed Gravel Seating', top: '68%', left: '50%', color: '#E86B32' },
      ],
    },
    {
      id: 'evening-ambience',
      title: 'Evening Ambience',
      subtitle: 'Warm Hanging Bulbs & Intimate Night Seating',
      badge: 'Nighttime Atmosphere',
      description:
        'Authentic nighttime photograph capturing the warm overhead festoon string bulbs and hanging Edison lights illuminating rustic outdoor seating. A soothing amber canopy where students unwind and evening conversations flourish under the cool breeze.',
      src: customPhotos['evening-ambience'] || '/assets/chaiwallaaa-evening-ambience.svg',
      fallbackSrc: '/assets/chaiwallaaa-evening-ambience.png',
      tags: ['Edison Bulbs', 'Fairy Light Canopy', 'Rustic Seating', 'Twilight Dusk'],
    },
    {
      id: 'cafe-atmosphere',
      title: 'Café Atmosphere',
      subtitle: 'Food & Drinks on the Iconic Blue Table',
      badge: 'Signature Spread',
      description:
        'Original photograph showing food and drinks on the signature cobalt blue outdoor terrace table: piping hot cutting chai in traditional faceted glasses with rising steam, toasted chicken grilled sandwich with grill marks, crispy fries, and relish dips with terrace bokeh in the background.',
      src: customPhotos['cafe-atmosphere'] || '/assets/chaiwallaaa-cafe-atmosphere.svg',
      fallbackSrc: '/assets/chaiwallaaa-cafe-atmosphere.png',
      tags: ['Blue Table', 'Cutting Chai Tumblers', 'Grilled Panini', 'Outdoor Table Spread'],
    },
    {
      id: 'brand-identity',
      title: 'Brand Identity',
      subtitle: 'The Original Illuminated Chaiwallaaa Neon Signboard',
      badge: 'Authoritative Logo',
      description:
        'The authoritative original Chaiwallaaa illuminated neon sign: circular C emblem with teapot and steaming tea illustration, creamy white and golden-amber lettering, bright green tea-leaf accents, electric blue halo glow, and the founding tagline: Ambience Aroma Artisan.',
      src: customPhotos['brand-identity'] || '/assets/chaiwallaaa-neon-logo.svg',
      fallbackSrc: '/assets/chaiwallaaa-neon-logo.png',
      tags: ['Original Neon Sign', 'Ambience Aroma Artisan', 'Electric Blue Halo', 'Tea Leaf Accents'],
    },
  ];

  const currentPhoto = cafePhotos[selectedPhotoIndex];

  const terraceFeatures = [
    {
      title: 'Thatched Umbrella Cabanas',
      badge: 'Rustic Seating',
      description:
        'Traditional thatched palm-leaf parasols wrapped in warm Edison fairy lights. Provides cool shade during Odisha afternoons and an intimate golden glow when night falls.',
      highlight: 'Warm incandescent bulbs draped under every umbrella',
    },
    {
      title: 'The Two-Story Neon Tower',
      badge: 'Campus Landmark',
      description:
        'A steel viewing platform crowned by the iconic Chaiwallaaa neon sign. Standing tall above the terrace, illuminating the Jatni skyline in electric cyan and amber.',
      highlight: 'Panoramic view of the evening campus breeze',
    },
    {
      title: 'Festoon Lights & Prayer Flags',
      badge: 'Open-Air Canopy',
      description:
        'Vibrant Himalayan prayer flags and overhead string bulbs stretched between blue steel beams, creating a relaxed atmosphere for long conversations.',
      highlight: 'Soft twilight sky framed by hanging bulbs',
    },
    {
      title: 'Crushed Gravel Courtyard',
      badge: 'Student Hangout',
      description:
        'Colorful orange, yellow, and blue tables nestled on clean river gravel, surrounded by potted plants, candle lanterns, and lush tropical banana leaves.',
      highlight: 'Spacious outdoor layout with zero rush',
    },
  ];

  return (
    <section id="terrace" className="relative py-24 sm:py-32 bg-[#100C0A] text-[#FFF0DC] overflow-hidden">
      {/* Twilight Ambient Nightfall Accents */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#201510] to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-[#D99445]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-[500px] h-[500px] bg-[#27D7FF]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-glass border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#27D7FF] mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#27D7FF]" />
              <span>The Real Chaiwallaaa Experience</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
              TWILIGHT TERRACE. <br />
              <span className="italic font-normal text-gradient-amber">
                FAIRY LIGHTS & OPEN SKY.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#FFF0DC]/70 max-w-md font-normal leading-relaxed">
            Directly opposite the IIT Bhubaneswar entry gate. Step onto the crushed gravel terrace under thatched cabanas and watch the sunset sky surrender to glowing neon.
          </p>
        </div>

        {/* Authentic Photo Navigation Pills - Crystal Glass */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8 pb-3 border-b border-white/10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#27D7FF] mr-2 hidden sm:inline-block">
            Authentic Photographs:
          </span>
          {cafePhotos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                selectedPhotoIndex === index
                  ? 'bg-gradient-to-r from-[#27D7FF] to-[#A56BFF] text-[#100C0A] shadow-[0_4px_20px_rgba(39,215,255,0.35)] font-bold border border-white/30 scale-102'
                  : 'crystal-glass text-[#FFF0DC]/75 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{photo.title}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedPhotoIndex === index ? 'bg-[#100C0A]/20 text-[#100C0A]' : 'bg-white/10 text-[#FFF0DC]/60'
              }`}>
                0{index + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Real Café Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-14">
          
          {/* Main Visual: Real Café Photographic Atmosphere with Crystal Glass Frame */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group min-h-[440px] sm:min-h-[540px] bg-[#201510] flex flex-col justify-end crystal-bevel">
            {/* Real Unaltered Photo */}
            <img
              key={currentPhoto.src}
              src={currentPhoto.src}
              onError={(e) => {
                if (e.currentTarget.src !== currentPhoto.fallbackSrc) {
                  e.currentTarget.src = currentPhoto.fallbackSrc;
                }
              }}
              alt={`${currentPhoto.title} - ${currentPhoto.subtitle}`}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />

            {/* Restrained Crystal Reflection Shimmer on image frame edge */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)]" />

            {/* Gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#100C0A] via-[#100C0A]/25 to-black/30 pointer-events-none" />

            {/* Top Bar on Image: Category Badge & Expand Action */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="text-xs font-bold tracking-wide uppercase px-3.5 py-1.5 rounded-full crystal-glass-smoky border border-white/15 text-[#27D7FF] shadow-md">
                {currentPhoto.badge}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxPhoto(currentPhoto)}
                  className="p-2 rounded-xl crystal-glass hover:bg-[#27D7FF] text-white hover:text-[#100C0A] border border-white/15 transition-all shadow-md cursor-pointer"
                  aria-label="View Fullscreen"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Pins (shown on Twilight Terrace photo) */}
            {currentPhoto.hotspots && currentPhoto.hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{ top: spot.top, left: spot.left }}
                className="absolute z-10"
              >
                <button
                  onClick={() => setActiveSpotlight(spot.id === 4 ? 3 : spot.id === 2 ? 1 : 0)}
                  className="p-1 rounded-full hover:scale-115 transition-transform cursor-pointer"
                  aria-label={spot.label}
                >
                  <span
                    style={{ backgroundColor: spot.color }}
                    className="block w-6 h-6 rounded-full text-[#100C0A] text-[11px] font-black flex items-center justify-center shadow-lg ring-4 ring-black/40 animate-pulse"
                  >
                    0{spot.id}
                  </span>
                </button>
              </div>
            ))}

            {/* Bottom Crystal Information Overlay with "Find Your Chai Spot" CTA */}
            <div className="relative z-10 m-4 sm:m-6 p-5 sm:p-6 rounded-2xl crystal-glass-smoky border border-white/15 backdrop-blur-xl shadow-2xl crystal-bevel">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  {currentPhoto.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-[#FFF0DC]/90 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* "Find Your Chai Spot" Button */}
                <CrystalButton
                  onClick={() => {
                    const el = document.getElementById('visit');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="primary-amber"
                  size="sm"
                  icon={<Compass className="w-3.5 h-3.5" />}
                >
                  Find Your Chai Spot
                </CrystalButton>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold text-white mb-2 drop-shadow">
                {currentPhoto.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-[#FFF0DC]/85 max-w-2xl leading-relaxed">
                {currentPhoto.description}
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Highlights Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="text-xs uppercase font-bold tracking-wider text-[#D99445] px-1 mb-1">
                Terrace Architectural Highlights:
              </div>

              {terraceFeatures.map((feat, idx) => (
                <CrystalCard
                  key={idx}
                  onClick={() => {
                    setActiveSpotlight(idx);
                    setSelectedPhotoIndex(0);
                  }}
                  glowColor={activeSpotlight === idx && selectedPhotoIndex === 0 ? 'amber' : 'multi'}
                  tilt={true}
                  className={`p-4 cursor-pointer transition-all ${
                    activeSpotlight === idx && selectedPhotoIndex === 0
                      ? 'border-[#D99445]/80 ring-1 ring-[#D99445]/40 shadow-lg'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        activeSpotlight === idx && selectedPhotoIndex === 0 ? 'text-[#D99445]' : 'text-[#FFF0DC]/50'
                      }`}
                    >
                      0{idx + 1}. {feat.badge}
                    </span>
                    {activeSpotlight === idx && selectedPhotoIndex === 0 && (
                      <span className="w-2 h-2 rounded-full bg-[#27D7FF] shadow-[0_0_8px_#27D7FF]" />
                    )}
                  </div>

                  <h4 className="font-editorial text-base sm:text-lg font-bold text-white mb-1">
                    {feat.title}
                  </h4>

                  <p className="text-xs text-[#FFF0DC]/70 leading-relaxed mb-2">
                    {feat.description}
                  </p>

                  <div className="text-[11px] font-medium text-[#27D7FF] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>{feat.highlight}</span>
                  </div>
                </CrystalCard>
              ))}
            </div>

            {/* Location Crystal Card */}
            <div className="p-4 rounded-xl crystal-glass border border-[#27D7FF]/30 flex items-center gap-3 shadow-lg">
              <MapPin className="w-5 h-5 text-[#27D7FF] shrink-0" />
              <div className="text-xs text-[#FFF0DC]/80">
                <span className="font-bold text-white block">Actual Café Location:</span>
                Near IIT Bhubaneswar entry gate, Jatni, Odisha 752050.
              </div>
            </div>
          </div>

        </div>

        {/* Gallery Grid: The 4 Authentic Chaiwallaaa Photographs */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#27D7FF] mb-1">
                Visual Archive
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                Authentic Café Gallery
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#FFF0DC]/70 max-w-md">
              Real photographs showcasing Chaiwallaaa’s open terrace, evening lights, outdoor seating spread, and illuminated sign.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cafePhotos.map((photo, idx) => (
              <CrystalCard
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                glowColor={selectedPhotoIndex === idx ? 'cyan' : 'multi'}
                tilt={true}
                className={`cursor-pointer overflow-hidden flex flex-col ${
                  selectedPhotoIndex === idx
                    ? 'border-[#27D7FF] ring-2 ring-[#27D7FF]/40 shadow-xl'
                    : 'border-white/10'
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <img
                    src={photo.src}
                    onError={(e) => {
                      if (e.currentTarget.src !== photo.fallbackSrc) {
                        e.currentTarget.src = photo.fallbackSrc;
                      }
                    }}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100C0A] via-transparent to-transparent pointer-events-none" />

                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 crystal-glass-smoky text-[#27D7FF] font-bold text-xs px-2.5 py-1 rounded-lg border border-white/10">
                    0{idx + 1}
                  </div>

                  {/* Quick Expand Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxPhoto(photo);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg crystal-glass text-white/80 hover:text-[#100C0A] hover:bg-[#27D7FF] opacity-0 group-hover:opacity-100 transition-all border border-white/10 cursor-pointer"
                    aria-label={`View ${photo.title} full screen`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#D99445] mb-1">
                      {photo.badge}
                    </div>
                    <h4 className="font-editorial text-lg font-bold text-white group-hover:text-[#27D7FF] transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-[#FFF0DC]/70 line-clamp-2 mt-1">
                      {photo.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#FFF0DC]/60">
                    <span className="font-semibold text-[#27D7FF]">Click to inspect</span>
                    <span>Chaiwallaaa IIT BBS</span>
                  </div>
                </div>
              </CrystalCard>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full crystal-glass-smoky rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[90vh] crystal-bevel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-[#27D7FF] tracking-wider block mb-0.5">
                  {lightboxPhoto.badge}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                  {lightboxPhoto.title}
                </h3>
              </div>

              <button
                onClick={() => setLightboxPhoto(null)}
                className="p-2 rounded-full crystal-glass hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo View */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] bg-black/60 flex items-center justify-center overflow-hidden p-2">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Footer Caption */}
            <div className="p-4 sm:p-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/40">
              <p className="text-xs sm:text-sm text-[#FFF0DC]/85 max-w-2xl">
                {lightboxPhoto.description}
              </p>
              <div className="text-xs text-[#27D7FF] font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#40E58B]" />
                <span>Original Chaiwallaaa Photograph</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
