import React, { useRef, useState, useEffect } from 'react';

interface CrystalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'amber' | 'cyan' | 'violet' | 'multi' | 'gold';
  tilt?: boolean;
  shimmer?: boolean;
  intensity?: 'subtle' | 'medium' | 'high';
}

export const CrystalCard: React.FC<CrystalCardProps> = ({
  children,
  className = '',
  glowColor = 'amber',
  tilt = true,
  shimmer = true,
  intensity = 'medium',
  onClick,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setMousePos({ x: xPercent, y: yPercent });

    if (tilt) {
      // Gentle tilt: max 5-7 degrees to keep it elegant and comfortable
      const rotY = ((x / rect.width) - 0.5) * 8;
      const rotX = -((y / rect.height) - 0.5) * 8;
      setRotate({ x: rotX, y: rotY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Border glow styles based on selected color mode
  const glowBorderClass = {
    amber: 'hover:border-[#D99445]/60 hover:shadow-[0_8px_32px_rgba(217,148,69,0.22)]',
    cyan: 'hover:border-[#27D7FF]/60 hover:shadow-[0_8px_32px_rgba(39,215,255,0.22)]',
    violet: 'hover:border-[#A56BFF]/60 hover:shadow-[0_8px_32px_rgba(165,107,255,0.22)]',
    gold: 'hover:border-[#FFC56E]/60 hover:shadow-[0_8px_32px_rgba(255,197,110,0.25)]',
    multi: 'hover:border-[#27D7FF]/60 hover:shadow-[0_8px_36px_rgba(39,215,255,0.18),0_0_24px_rgba(165,107,255,0.14)]',
  }[glowColor];

  const spotGlowGradient = {
    amber: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(217,148,69,0.16) 0%, rgba(232,107,50,0.06) 45%, transparent 75%)',
    cyan: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(39,215,255,0.18) 0%, rgba(165,107,255,0.06) 45%, transparent 75%)',
    violet: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(165,107,255,0.18) 0%, rgba(39,215,255,0.06) 45%, transparent 75%)',
    gold: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,197,110,0.18) 0%, rgba(217,148,69,0.07) 45%, transparent 75%)',
    multi: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(39,215,255,0.15) 0%, rgba(165,107,255,0.12) 30%, rgba(217,148,69,0.06) 55%, transparent 75%)',
  }[glowColor];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: !prefersReducedMotion && tilt && isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-2px)`
          : undefined,
        transition: isHovered
          ? 'transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
          : 'transform 0.4s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        ['--mouse-x' as any]: `${mousePos.x}%`,
        ['--mouse-y' as any]: `${mousePos.y}%`,
      }}
      className={`relative rounded-2xl crystal-glass crystal-bevel border border-white/12 transition-all duration-300 ${glowBorderClass} ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Light Spot on Glass */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: spotGlowGradient,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Glass Light Streak Reflection (Slow moving or on hover) */}
      {shimmer && !prefersReducedMotion && (
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none overflow-hidden ${
            isHovered ? 'opacity-100' : 'opacity-40'
          } transition-opacity duration-500`}
        >
          <div className="crystal-light-streak w-[200%] h-full absolute -top-1/2 -left-1/2 pointer-events-none" />
        </div>
      )}

      {/* Fine Crystal Prism Edge Highlight (Top/Left beveled refraction) */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border-t border-l border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]" />

      {/* Children content kept sharp & above refractions */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
