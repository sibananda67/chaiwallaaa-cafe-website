import React, { useEffect } from 'react';
import { MenuItem, CAFE_INFO } from '../data/cafeData';
import { X, Sparkles, MapPin, Coffee, CheckCircle2 } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop with frosted crystal blur */}
      <div
        className="absolute inset-0 bg-[#100C0A]/85 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Card with Crystal Glass & Bevel */}
      <div className="relative w-full max-w-2xl crystal-glass-card text-[#FFF0DC] rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-10 animate-in fade-in zoom-in-95 duration-200 crystal-bevel">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full crystal-glass hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/15 hover:border-[#D99445] focus:outline-none cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Side */}
          <div className="relative h-56 md:h-full min-h-[260px] bg-[#100C0A]">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201510] via-transparent to-black/25" />
            
            {item.badge && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#D99445] to-[#E86B32] text-[#100C0A] shadow-md border border-[#FFC56E]/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  {item.badge}
                </span>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[#D99445] font-semibold">
                {item.subtitle}
              </span>
              <h3 className="font-editorial text-2xl font-bold leading-tight drop-shadow">
                {item.name}
              </h3>
            </div>
          </div>

          {/* Editorial Content Side */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#27D7FF] font-semibold uppercase tracking-wider mb-2">
                <span>Culinary Profile</span>
                <span>·</span>
                <span>Cooked To Order</span>
              </div>

              <p className="text-sm text-[#FFF0DC]/80 font-normal leading-relaxed mb-4">
                {item.story}
              </p>

              {/* Highlights List */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D99445]">
                  What makes it distinct:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#FFF0DC] p-1.5 rounded-lg bg-white/5 border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#40E58B] shrink-0" />
                      <span className="font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pair Recommendation */}
              <div className="p-3.5 rounded-xl crystal-glass border border-white/10 flex items-start gap-2.5">
                <Coffee className="w-4 h-4 text-[#D99445] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">
                    Tastes best paired with:
                  </p>
                  <p className="text-xs text-[#FFF0DC]/70">
                    A steaming glass of Kadak Cutting Chai or chilled Lemon Soda Mojito.
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Footer */}
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-[#FFF0DC]/60">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#27D7FF]" />
                <span>{CAFE_INFO.shortAddress}</span>
              </div>
              <span className="font-medium text-white">Dine-In & Takeaway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
