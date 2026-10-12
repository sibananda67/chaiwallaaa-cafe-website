import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem, VIBE_MOODS } from '../data/cafeData';
import { Sparkles, Info, Compass, ArrowRight } from 'lucide-react';
import { CrystalCard } from './CrystalCard';

interface SignatureMenuProps {
  onSelectItem: (item: MenuItem) => void;
}

export const SignatureMenu: React.FC<SignatureMenuProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'signature' | 'chai' | 'bites' | 'drinks'>('all');
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const sandwichItem = MENU_ITEMS.find((i) => i.id === 'chicken-grilled-sandwich') || MENU_ITEMS[0];
  const mojitoItem = MENU_ITEMS.find((i) => i.id === 'lemon-soda-mojito') || MENU_ITEMS[1];
  const chickenItem = MENU_ITEMS.find((i) => i.id === 'crispy-fried-chicken') || MENU_ITEMS[2];

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-[#100C0A] text-[#FFF0DC] overflow-hidden">
      {/* Nightfall Neon Atmospheric Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#D99445]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#27D7FF]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-glass border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#D99445] mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#27D7FF]" />
              <span>Made Fresh On Order</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              THE ARTISAN SIPS <br />
              <span className="italic font-normal text-gradient-amber">& CRISPY BITES.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#FFF0DC]/70 max-w-md font-normal leading-relaxed">
            Transition from the kettle into fresh, made-to-order comfort. Sandwiches pressed golden on the grill, chicken fried to shatter, and chai steeped fresh continuously.
          </p>
        </div>

        {/* Category Controls - Crystal Glass Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-14 pb-4 border-b border-white/10">
          <span className="text-xs font-semibold text-[#FFF0DC]/40 uppercase tracking-wider mr-2">
            Selection:
          </span>
          {[
            { id: 'all', label: 'All Offerings' },
            { id: 'signature', label: 'The Signature Trio' },
            { id: 'chai', label: 'Chai & Kullhad' },
            { id: 'bites', label: 'Crispy Bites' },
            { id: 'drinks', label: 'Coffee & Cool Sips' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#D99445] to-[#E86B32] text-[#100C0A] font-bold shadow-[0_4px_16px_rgba(217,148,69,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-[#FFC56E]/40'
                  : 'crystal-glass text-[#FFF0DC]/75 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ----------------- ASYMMETRICAL SIGNATURE TRIO ----------------- */}
        <div className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
              Signature Trio Showcase
            </h3>
            <span className="text-xs text-[#FFF0DC]/50 italic">
              Tap any item to inspect culinary details
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Primary Feature 1: Chicken Grilled Sandwich */}
            <div className="lg:col-span-7">
              <CrystalCard
                onClick={() => onSelectItem(sandwichItem)}
                glowColor="amber"
                tilt={true}
                className="p-6 sm:p-8 cursor-pointer group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D99445] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFC56E]" />
                      Signature #01
                    </span>
                    <span className="text-xs font-medium text-[#FFF0DC]/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                      {sandwichItem.subtitle}
                    </span>
                  </div>

                  <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#D99445] transition-colors">
                    {sandwichItem.name}
                  </h4>

                  <p className="text-sm text-[#FFF0DC]/75 max-w-lg mb-6 leading-relaxed">
                    {sandwichItem.description}
                  </p>
                </div>

                {/* Food Photo Container - Sharp, natural photo inside crystal-glass card */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-cinematic-food bg-[#100C0A] group-hover:scale-[1.01] transition-transform duration-500 border border-white/10">
                  <img
                    src={sandwichItem.imageUrl}
                    alt={sandwichItem.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100C0A] via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-medium text-[#FFF0DC]/90">Melted Cheese & Mint Relish</span>
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D99445] to-[#E86B32] text-[#100C0A] px-3 py-1 rounded-lg font-bold text-[11px] shadow-md border border-[#FFC56E]/40">
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </CrystalCard>
            </div>

            {/* Right Column: Signatures 2 & 3 */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Signature 2: Lemon Soda Mojito */}
              <div className="flex-1">
                <CrystalCard
                  onClick={() => onSelectItem(mojitoItem)}
                  glowColor="cyan"
                  tilt={true}
                  className="p-5 sm:p-6 cursor-pointer group h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#27D7FF]">
                        Signature #02
                      </span>
                      <span className="text-[11px] font-medium text-[#40E58B] bg-[#40E58B]/10 px-2.5 py-0.5 rounded-full border border-[#40E58B]/30 backdrop-blur-sm">
                        Iced & Sparkling
                      </span>
                    </div>

                    <h4 className="font-editorial text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-[#27D7FF] transition-colors">
                      {mojitoItem.name}
                    </h4>

                    <p className="text-xs text-[#FFF0DC]/70 mb-3 line-clamp-2">
                      {mojitoItem.description}
                    </p>
                  </div>

                  <div className="relative aspect-[16/8] rounded-xl overflow-hidden shadow-sm group-hover:scale-[1.01] transition-transform duration-500 border border-white/10">
                    <img
                      src={mojitoItem.imageUrl}
                      alt={mojitoItem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-white text-[11px] font-medium">
                      Fresh Muddled Mint · Kala Namak
                    </span>
                  </div>
                </CrystalCard>
              </div>

              {/* Signature 3: Crispy Fried Chicken (2 Pieces) */}
              <div className="flex-1">
                <CrystalCard
                  onClick={() => onSelectItem(chickenItem)}
                  glowColor="amber"
                  tilt={true}
                  className="p-5 sm:p-6 cursor-pointer group h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E86B32]">
                        Signature #03
                      </span>
                      <span className="text-[11px] font-medium text-[#D99445] bg-[#D99445]/15 px-2.5 py-0.5 rounded-full border border-[#D99445]/30 backdrop-blur-sm">
                        2 Hot Pieces
                      </span>
                    </div>

                    <h4 className="font-editorial text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-[#E86B32] transition-colors">
                      {chickenItem.name}
                    </h4>

                    <p className="text-xs text-[#FFF0DC]/70 mb-3 line-clamp-2">
                      {chickenItem.description}
                    </p>
                  </div>

                  <div className="relative aspect-[16/8] rounded-xl overflow-hidden shadow-sm group-hover:scale-[1.01] transition-transform duration-500 border border-white/10">
                    <img
                      src={chickenItem.imageUrl}
                      alt={chickenItem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-white text-[11px] font-medium">
                      Double-Crunch Coating · Pepper Rub
                    </span>
                  </div>
                </CrystalCard>
              </div>

            </div>

          </div>
        </div>

        {/* ----------------- FULL SELECTION GRID ----------------- */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-editorial text-2xl font-bold text-white">
              Chaiwallaaa Complete Selection
            </h3>
            <span className="text-xs text-[#FFF0DC]/60 uppercase tracking-wider font-semibold px-3 py-1 rounded-full crystal-glass border border-white/10">
              {filteredItems.length} Offerings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <CrystalCard
                key={item.id}
                onClick={() => onSelectItem(item)}
                glowColor={item.category === 'drinks' ? 'cyan' : item.category === 'chai' ? 'amber' : 'gold'}
                tilt={true}
                className="p-4 sm:p-5 cursor-pointer group"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3.5 bg-[#100C0A] border border-white/10">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#100C0A]/85 backdrop-blur-md text-[#D99445] border border-[#D99445]/30 shadow-md">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99445] block mb-1">
                    {item.subtitle}
                  </span>
                  <h4 className="font-editorial text-base sm:text-lg font-bold text-white group-hover:text-[#D99445] transition-colors mb-1.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#FFF0DC]/65 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#FFF0DC]/40 text-[11px]">Fresh to order</span>
                  <span className="font-semibold text-[#D99445] group-hover:text-[#FFC56E] flex items-center gap-1 transition-colors">
                    <span>Inspect</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </CrystalCard>
            ))}
          </div>
        </div>

        {/* ----------------- CAMPUS MOOD MATCHER ----------------- */}
        <div className="mt-20">
          <CrystalCard glowColor="multi" tilt={false} className="p-6 sm:p-8">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D99445] mb-2">
                <Compass className="w-3.5 h-3.5 text-[#27D7FF]" />
                <span>Campus Mood Matcher</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold text-white mb-3">
                What are you craving right now?
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF0DC]/75 mb-5 leading-relaxed">
                Select your current mood and we will tell you the exact pair to order the moment you step up to the counter.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {VIBE_MOODS.map((mood, idx) => (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMoodIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedMoodIndex === idx
                        ? 'bg-gradient-to-r from-[#D99445] to-[#E86B32] text-[#100C0A] font-bold shadow-md border border-[#FFC56E]/40'
                        : 'crystal-glass text-[#FFF0DC]/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#100C0A]/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-md">
                <div>
                  <span className="text-[11px] uppercase font-semibold text-[#D99445] block mb-0.5">
                    The Recommended Order
                  </span>
                  <p className="font-editorial text-lg sm:text-xl font-bold text-white">
                    {VIBE_MOODS[selectedMoodIndex].recommendation}
                  </p>
                  <p className="text-xs text-white/60 mt-0.5">
                    {VIBE_MOODS[selectedMoodIndex].reason}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#FFF0DC]/60 shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  <Info className="w-3.5 h-3.5 text-[#27D7FF]" />
                  <span>Dine-In & Takeaway at Gate</span>
                </div>
              </div>
            </div>
          </CrystalCard>
        </div>

      </div>
    </section>
  );
};
