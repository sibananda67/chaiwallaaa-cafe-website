import React from 'react';
import { ChaiwallaaaLogo } from './ChaiwallaaaLogo';
import { TeaPourEngine } from './TeaPourEngine';
import { CrystalButton } from './CrystalButton';
import { CrystalParticles } from './CrystalParticles';
import { ArrowDown, MapPin, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onFindChaiSpot: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onFindChaiSpot,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#100C0A] text-[#FFF0DC]"
    >
      {/* 1. Cinematic 3D Tea Pouring Experience (Kettle upper-right, glass lower-right) */}
      <div className="absolute inset-0 z-0">
        <TeaPourEngine />
      </div>

      {/* 2. Floating Crystal Particles & Ambient Light Reflections */}
      <CrystalParticles count={28} className="z-10" />

      {/* Subtle diagonal crystal light refraction reflection layer (does not cover tea video) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent" />

      {/* 3. Hero Content Container (Left-aligned, ample negative space) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 sm:pt-32 md:pt-36 pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-xl md:max-w-2xl">
          
          {/* Authoritative Chaiwallaaa Logo: Upper-left region, preserved aspect ratio */}
          <div className="mb-6 sm:mb-8">
            <ChaiwallaaaLogo variant="hero" />
          </div>

          {/* Location Kicker - Crystal glass pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full crystal-glass border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#D99445] mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#27D7FF] shrink-0" />
            <span className="text-[#FFF0DC]/85">Near IIT Bhubaneswar Entry Gate, Jatni</span>
          </div>

          {/* Exact Headline:
              “EK CUP CHAI,
              AUR SAB SET HO JAYE.” */}
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-4">
            <span className="block text-gradient-cream drop-shadow-md">
              EK CUP CHAI,
            </span>
            <span className="block text-gradient-amber italic font-normal drop-shadow-lg text-[1.05em]">
              AUR SAB SET HO JAYE.
            </span>
          </h1>

          {/* Exact Supporting Text:
              “Thodi chai. Thoda sukoon. Aur apno ke saath perfect moments.” */}
          <p className="text-base sm:text-lg md:text-xl font-medium text-[#FFF0DC]/90 mb-5 leading-relaxed">
            Thodi chai. Thoda sukoon. Aur apno ke saath perfect moments.
          </p>

          <p className="text-xs sm:text-sm text-[#FFF0DC]/70 font-normal max-w-lg leading-relaxed mb-8">
            Piping hot Assam chai poured from authentic engraved brass kettles into crystal-clear cutting glasses. Slow down under the evening fairy lights of our Jatni terrace.
          </p>

          {/* Exact CTAs: “EXPLORE THE MENU” & “FIND YOUR CHAI SPOT” with Crystal Glass buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-md sm:max-w-none">
            <CrystalButton
              onClick={onExploreMenu}
              variant="primary-amber"
              size="lg"
            >
              EXPLORE THE MENU
            </CrystalButton>

            <CrystalButton
              onClick={onFindChaiSpot}
              variant="crystal-cyan"
              size="lg"
            >
              FIND YOUR CHAI SPOT
            </CrystalButton>
          </div>

          {/* Operating hours subtle crystal badge */}
          <div className="mt-7 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl crystal-glass border border-white/5 text-xs text-[#FFF0DC]/70 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC56E]" />
            <span>Open daily until {CAFE_INFO.closingTimeStr} · Steamed fresh continuously</span>
          </div>

        </div>
      </div>

      {/* 3. Subtle Bottom Scroll Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full pb-4 sm:pb-6 flex justify-center">
        <button
          onClick={onExploreMenu}
          className="flex flex-col items-center gap-1 text-[11px] uppercase tracking-widest text-[#FFF0DC]/45 hover:text-[#D99445] transition-colors group focus:outline-none"
        >
          <span>Scroll to explore the experience</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D99445]" />
        </button>
      </div>
    </section>
  );
};
