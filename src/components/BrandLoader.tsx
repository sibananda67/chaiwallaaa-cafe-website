import React, { useEffect, useState } from 'react';
import { ChaiwallaaaLogo } from './ChaiwallaaaLogo';

interface BrandLoaderProps {
  onLoaded: () => void;
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({ onLoaded }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        onLoaded();
      }, 500);
    }, 900);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#100C0A] transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute w-[350px] h-[350px] bg-[#D99445]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Clean authoritative logo without distortion */}
      <div className="relative mb-5 transform transition-transform">
        <ChaiwallaaaLogo variant="hero" />
      </div>

      <p className="font-editorial text-base sm:text-lg text-[#FFF0DC]/90 font-medium tracking-wide">
        Ek Cup Chai, Aur Sab Set Ho Jaaye.
      </p>

      {/* Subtle loader bar */}
      <div className="w-28 h-1 bg-white/10 rounded-full overflow-hidden mt-6">
        <div className="w-full h-full bg-[#D99445] animate-[shimmer_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};
