import React, { useState } from 'react';
import { MenuItem } from './data/cafeData';
import { BrandLoader } from './components/BrandLoader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SignatureMenu } from './components/SignatureMenu';
import { TwilightTerrace } from './components/TwilightTerrace';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { LiquidGlassAura } from './components/LiquidGlassAura';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#100C0A] text-[#FFF0DC] selection:bg-[#D99445] selection:text-[#100C0A]">
      {/* Brand Entrance Loading Transition */}
      {loading && <BrandLoader onLoaded={() => setLoading(false)} />}

      {/* Global Interactive Liquid Glass Cursor Light Aura */}
      <LiquidGlassAura />

      {/* Global Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* Main Content Area */}
      <main>
        {/* 1. Hero: Physical 3D Tea Pouring Commercial Experience */}
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onFindChaiSpot={() => scrollToSection('terrace')}
        />

        {/* 2. Signature Menu: Floating Food Showcase */}
        <SignatureMenu onSelectItem={(item) => setSelectedItem(item)} />

        {/* 3. The Real Chaiwallaaa Experience: Twilight Café Terrace */}
        <TwilightTerrace />

        {/* 4. Visit Us: Verified Location & Schedule */}
        <VisitSection />
      </main>

      {/* 5. Minimalist Distinctive Footer with Neon Wordmark */}
      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* Interactive Item Inspection Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
