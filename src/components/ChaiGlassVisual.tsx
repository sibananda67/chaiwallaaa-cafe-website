import React from 'react';

interface ChaiGlassVisualProps {
  className?: string;
  onClick?: () => void;
}

export const ChaiGlassVisual: React.FC<ChaiGlassVisualProps> = ({ className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}
    >
      {/* Twilight Sunset Ambient Halo */}
      <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-[#B95432]/30 via-[#C98245]/35 to-[#FFF5E8]/20 blur-3xl animate-pulse-warmth pointer-events-none" />

      {/* Floating Steam Trails (Layered CSS animations) */}
      <div className="absolute -top-24 sm:-top-32 inset-x-0 h-40 pointer-events-none flex justify-center items-end overflow-visible">
        {/* Steam Wisp 1 */}
        <div className="w-12 h-28 bg-gradient-to-t from-white/35 via-white/20 to-transparent rounded-full blur-md animate-steam-1 transform -translate-x-3" />
        {/* Steam Wisp 2 */}
        <div className="w-16 h-36 bg-gradient-to-t from-white/40 via-[#FFF5E8]/25 to-transparent rounded-full blur-lg animate-steam-2 transform translate-x-2" />
        {/* Steam Wisp 3 */}
        <div className="w-10 h-24 bg-gradient-to-t from-[#FFF5E8]/30 via-white/15 to-transparent rounded-full blur-md animate-steam-3 transform -translate-x-6" />
      </div>

      {/* The Iconic Indian Cutting Chai Glass Composition */}
      <div className="relative w-48 sm:w-60 md:w-72 aspect-[3/4] transition-transform duration-500 group-hover:scale-[1.03]">
        {/* Deep Ground Shadow for Physical Grounding */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-[#241710]/40 rounded-[100%] blur-xl transform scale-y-50" />
        
        {/* Photographic Cutting Chai Presentation Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-food-deep border border-[#C98245]/20 bg-gradient-to-b from-[#FFF5E8]/90 via-[#241710]/10 to-[#241710]/40">
          <img
            src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=90"
            alt="Kadak Indian Cutting Chai"
            className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="eager"
          />

          {/* Golden Twilight Rim Highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#241710]/70 via-transparent to-[#FFF5E8]/30 pointer-events-none" />

          {/* Authentic Cutting Glass Rim Reflections */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-3 w-1 bg-gradient-to-b from-white/50 via-white/20 to-transparent blur-[1px] pointer-events-none" />

          {/* Subtle Bottom Accent Strip */}
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-none">
            <span className="font-editorial text-xs sm:text-sm text-[#FFF5E8] tracking-widest uppercase font-semibold drop-shadow-md">
              Kadak Cutting
            </span>
            <span className="text-[10px] text-[#DCEFF5] font-medium bg-[#241710]/60 backdrop-blur-sm px-2 py-0.5 rounded">
              Piping Hot
            </span>
          </div>
        </div>

        {/* Small floating spice note: Green Cardamom (Elaichi) & Tea Leaves */}
        <div className="absolute -left-6 top-1/3 p-2 bg-[#FFF5E8]/95 backdrop-blur-md rounded-xl border border-[#C98245]/30 shadow-lg -rotate-6 hidden sm:flex items-center gap-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#B95432] animate-ping" />
          <span className="text-xs font-semibold text-[#241710]">Fresh Elaichi & Adrak</span>
        </div>

        {/* Small floating spice note: Simmered with full cream milk */}
        <div className="absolute -right-6 bottom-16 p-2 bg-[#241710]/90 backdrop-blur-md rounded-xl border border-[#C98245]/40 shadow-xl rotate-3 hidden sm:flex items-center gap-2 pointer-events-none">
          <span className="text-[11px] font-medium text-[#FFF5E8]">Simmered Slow in Brass</span>
        </div>
      </div>
    </div>
  );
};
