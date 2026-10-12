import React, { useRef, useState, useEffect } from 'react';

interface CrystalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary-amber' | 'crystal-cyan' | 'crystal-glass' | 'crystal-violet';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const CrystalButton: React.FC<CrystalButtonProps> = ({
  children,
  variant = 'primary-amber',
  size = 'md',
  icon,
  className = '',
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null);
  const [isRippling, setIsRippling] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs rounded-xl',
    md: 'px-5 py-2.5 text-xs sm:text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-xs sm:text-sm rounded-xl font-bold tracking-wider uppercase',
  }[size];

  const variantClasses = {
    'primary-amber':
      'bg-gradient-to-r from-[#D99445] via-[#E86B32] to-[#D99445] text-[#100C0A] font-bold border border-[#FFC56E]/40 shadow-[0_4px_24px_rgba(217,148,69,0.35),inset_0_1px_1px_rgba(255,255,255,0.45)] hover:shadow-[0_6px_32px_rgba(217,148,69,0.5),inset_0_1px_1px_rgba(255,255,255,0.65)] hover:brightness-105 active:scale-[0.98]',
    'crystal-cyan':
      'crystal-glass text-[#FFF0DC] border border-[#27D7FF]/40 hover:border-[#27D7FF]/80 shadow-[0_4px_20px_rgba(39,215,255,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_28px_rgba(39,215,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-[0.98]',
    'crystal-glass':
      'crystal-glass text-[#FFF0DC] border border-white/15 hover:border-[#FFF0DC]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_26px_rgba(217,148,69,0.2),inset_0_1px_1px_rgba(255,255,255,0.35)] active:scale-[0.98]',
    'crystal-violet':
      'crystal-glass text-[#FFF0DC] border border-[#A56BFF]/40 hover:border-[#A56BFF]/80 shadow-[0_4px_20px_rgba(165,107,255,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_28px_rgba(165,107,255,0.35)] active:scale-[0.98]',
  }[variant];

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setRipplePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 600);
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={`relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none cursor-pointer group select-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Light Spot on Button Face */}
      <span
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 50px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.22), transparent 70%)`,
        }}
      />

      {/* Travelling Light Reflection Streak */}
      <span className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
        <span className="crystal-light-streak-fast absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>

      {/* Ripple Wave on Click */}
      {isRippling && ripplePos && (
        <span
          className="absolute rounded-full pointer-events-none animate-ping bg-white/30"
          style={{
            left: ripplePos.x,
            top: ripplePos.y,
            width: 20,
            height: 20,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Fine Crystal Prism Edge Highlight */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

      {/* Icon and Content */}
      <span className="relative z-10 inline-flex items-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );
};
