import React from 'react';
import { MenuItem } from '../data/cafeData';

interface FloatingFoodCutoutProps {
  item: MenuItem;
  positionClass: string;
  floatAnimationClass: string;
  annotationText?: string;
  annotationPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowSvg?: 'curved-left' | 'curved-right' | 'up' | 'down';
  onSelect: (item: MenuItem) => void;
}

export const FloatingFoodCutout: React.FC<FloatingFoodCutoutProps> = ({
  item,
  positionClass,
  floatAnimationClass,
  annotationText,
  annotationPosition = 'bottom',
  arrowSvg = 'curved-right',
  onSelect,
}) => {
  return (
    <div className={`absolute z-20 ${positionClass}`}>
      <div className={`${floatAnimationClass} relative group cursor-pointer`} onClick={() => onSelect(item)}>
        {/* Soft floating shadow below the cut-out */}
        <div className="absolute -bottom-4 inset-x-4 h-6 bg-[#241710]/25 rounded-full blur-xl group-hover:scale-110 group-hover:bg-[#B95432]/30 transition-all duration-500" />

        {/* Food Photographic Capsule with 3D Depth */}
        <div className="relative w-36 sm:w-44 md:w-52 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#FFF5E8] shadow-food-deep bg-[#FFF5E8] transition-all duration-500 group-hover:scale-105 group-hover:shadow-food-hover">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Editorial Top Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#241710]/80 via-transparent to-black/10 pointer-events-none" />

          {/* Quick Label Overlay */}
          <div className="absolute bottom-2.5 inset-x-3 pointer-events-none text-left">
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#C98245] leading-tight">
              {item.subtitle}
            </p>
            <h4 className="font-editorial text-xs sm:text-sm text-white font-bold leading-snug drop-shadow line-clamp-1">
              {item.name}
            </h4>
          </div>

          {/* Click to inspect affordance */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-[#FFF5E8] text-[#241710] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
              View
            </span>
          </div>
        </div>

        {/* Handcrafted Editorial Annotation with Curved Arrow */}
        {annotationText && (
          <div
            className={`absolute pointer-events-none whitespace-nowrap z-30 transition-transform duration-300 group-hover:-translate-y-1 ${
              annotationPosition === 'top'
                ? '-top-9 left-1/2 -translate-x-1/2'
                : annotationPosition === 'bottom'
                ? '-bottom-8 left-1/2 -translate-x-1/2'
                : annotationPosition === 'left'
                ? 'right-full mr-3 top-1/2 -translate-y-1/2'
                : 'left-full ml-3 top-1/2 -translate-y-1/2'
            }`}
          >
            <div className="flex items-center gap-1.5 bg-[#FFF5E8]/95 px-2.5 py-1 rounded-lg border border-[#C98245]/30 shadow-md">
              <span className="font-['Caveat',cursive] text-sm sm:text-base font-bold text-[#B95432] leading-none">
                {annotationText}
              </span>
              {arrowSvg === 'curved-right' && (
                <svg className="w-4 h-4 text-[#C98245] rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
