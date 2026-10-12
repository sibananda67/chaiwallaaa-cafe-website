import React from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { ChaiwallaaaLogo } from './ChaiwallaaaLogo';
import { ArrowUp, Compass } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative bg-[#0B0807] text-[#FFF0DC] pt-16 pb-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Brand & Tagline Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10 gap-6">
          <div>
            <div className="mb-3">
              <ChaiwallaaaLogo variant="footer" />
            </div>
            
            <p className="font-['Caveat',cursive] text-xl sm:text-2xl text-[#D99445] font-bold mt-1">
              “{CAFE_INFO.brandQuote}”
            </p>
          </div>

          <div className="space-y-2 md:text-right">
            <p className="text-[11px] uppercase tracking-wider text-[#27D7FF] font-semibold">
              The Verified Location
            </p>
            <p className="text-sm text-[#FFF0DC]/85 font-medium max-w-sm md:ml-auto">
              {CAFE_INFO.address}
            </p>
            <div>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold tracking-wider text-[#D99445] hover:text-[#E86B32] transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Open Google Maps Directions &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF0DC]/50">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Chaiwallaaa Café.</span>
            <span>·</span>
            <span>Jatni, Odisha</span>
            <span>·</span>
            <span>Closes at {CAFE_INFO.closingTimeStr}</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[#D99445]">Ambience</span>
              <span>·</span>
              <span className="text-[#27D7FF]">Aroma</span>
              <span>·</span>
              <span className="text-[#40E58B]">Artisan</span>
            </div>

            <button
              onClick={onScrollToTop}
              className="inline-flex items-center gap-1 text-[#FFF0DC]/70 hover:text-[#D99445] transition-colors font-medium p-1 focus:outline-none"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
