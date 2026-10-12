import React, { useEffect, useState } from 'react';

export const LiquidGlassAura: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);

    // Detect touch-only devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
    }

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const animate = () => {
      // Smooth easing (lerp)
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      mq.removeEventListener('change', handler);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  // Disable on mobile or reduced-motion
  if (isTouch || prefersReducedMotion || !visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-30 transition-opacity duration-300 select-none"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Outer ambient liquid refraction aura */}
      <div
        className="w-[380px] h-[380px] rounded-full blur-[70px] opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(39,215,255,0.3) 0%, rgba(165,107,255,0.2) 35%, rgba(217,148,69,0.15) 60%, transparent 80%)',
        }}
      />
      {/* Crisp inner crystal glint */}
      <div
        className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-white/40 blur-[2px] opacity-60"
      />
    </div>
  );
};
