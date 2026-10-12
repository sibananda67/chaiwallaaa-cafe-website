import React, { useState } from 'react';

interface ChaiwallaaaLogoProps {
  className?: string;
  variant?: 'navbar' | 'hero' | 'footer';
}

export const ChaiwallaaaLogo: React.FC<ChaiwallaaaLogoProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const [imgSrc, setImgSrc] = useState<string>('/assets/chaiwallaaa-neon-logo.svg');

  // Candidate assets in prioritized order:
  // 1. Authoritative neon logo asset
  // 2. User-provided raster PNG if placed in assets or public
  const handleImgError = () => {
    if (imgSrc === '/assets/chaiwallaaa-neon-logo.svg') {
      setImgSrc('/assets/neon-logo.svg');
    }
  };

  const containerSizing = {
    navbar: 'h-8 sm:h-9 md:h-10 max-w-[160px] sm:max-w-[200px]',
    hero: 'h-11 sm:h-13 md:h-16 max-w-[240px] sm:max-w-[300px]',
    footer: 'h-10 sm:h-12 md:h-14 max-w-[220px] sm:max-w-[260px]',
  }[variant];

  return (
    <div
      className={`inline-flex items-center justify-start relative select-none ${containerSizing} ${className}`}
    >
      <img
        src={imgSrc}
        alt="Chaiwallaaa - Ambience Aroma Artisan"
        onError={handleImgError}
        className="w-full h-full object-contain object-left pointer-events-none drop-shadow-[0_2px_12px_rgba(56,169,255,0.25)]"
        loading="eager"
      />
    </div>
  );
};
