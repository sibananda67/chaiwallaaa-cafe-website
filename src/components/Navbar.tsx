import React, { useState, useEffect } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { AmbientAudio } from './AmbientAudio';
import { ChaiwallaaaLogo } from './ChaiwallaaaLogo';
import { Compass, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'crystal-glass-smoky border-b border-white/10 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.7)] crystal-bevel'
          : 'bg-[#100C0A]/40 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Original authoritative logo (compact, preserving aspect ratio) */}
        <button
          onClick={() => handleNavClick('hero')}
          className="focus:outline-none flex items-center transition-transform hover:opacity-95"
          aria-label="Chaiwallaaa Café home"
        >
          <ChaiwallaaaLogo variant="navbar" />
        </button>

        {/* Center: Clean desktop navigation links with crystal pill container */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-inner">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-xs uppercase tracking-wider font-semibold text-[#FFF0DC]/80 hover:text-[#D99445] hover:bg-white/5 rounded-xl px-3.5 py-1.5 transition-all"
          >
            The Pour
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className="text-xs uppercase tracking-wider font-semibold text-[#FFF0DC]/80 hover:text-[#D99445] hover:bg-white/5 rounded-xl px-3.5 py-1.5 transition-all"
          >
            The Menu
          </button>
          <button
            onClick={() => handleNavClick('terrace')}
            className="text-xs uppercase tracking-wider font-semibold text-[#FFF0DC]/80 hover:text-[#27D7FF] hover:bg-white/5 rounded-xl px-3.5 py-1.5 transition-all"
          >
            Twilight Terrace
          </button>
          <button
            onClick={() => handleNavClick('visit')}
            className="text-xs uppercase tracking-wider font-semibold text-[#FFF0DC]/80 hover:text-[#40E58B] hover:bg-white/5 rounded-xl px-3.5 py-1.5 transition-all"
          >
            Find Us
          </button>
        </nav>

        {/* Right: Audio toggle + Get Directions */}
        <div className="hidden sm:flex items-center gap-3">
          <AmbientAudio />

          <a
            href={CAFE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D99445] to-[#E86B32] text-[#100C0A] transition-all shadow-[0_4px_16px_rgba(217,148,69,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_6px_22px_rgba(217,148,69,0.5)] hover:-translate-y-0.5 border border-[#FFC56E]/40"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <AmbientAudio />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#FFF0DC] hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#100C0A] border-b border-[#201510] px-5 py-5 space-y-3 animate-in slide-in-from-top-3 duration-200">
          <button
            onClick={() => handleNavClick('hero')}
            className="block w-full text-left font-editorial text-lg text-white py-1.5 border-b border-white/5"
          >
            The Pour
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className="block w-full text-left font-editorial text-lg text-white py-1.5 border-b border-white/5"
          >
            The Menu
          </button>
          <button
            onClick={() => handleNavClick('terrace')}
            className="block w-full text-left font-editorial text-lg text-[#27D7FF] py-1.5 border-b border-white/5"
          >
            Twilight Terrace
          </button>
          <button
            onClick={() => handleNavClick('visit')}
            className="block w-full text-left font-editorial text-lg text-[#40E58B] py-1.5 border-b border-white/5"
          >
            Find Us (Closes at 11 PM)
          </button>
          <div className="pt-2">
            <a
              href={CAFE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#D99445] text-[#100C0A]"
            >
              <Compass className="w-4 h-4" />
              Open In Google Maps
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
