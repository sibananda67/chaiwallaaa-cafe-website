import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { MapPin, Navigation, Clock, Check, Copy, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { CrystalCard } from './CrystalCard';
import { CrystalButton } from './CrystalButton';

export const VisitSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const currentHour = new Date().getHours();
  const isOpenNow = currentHour >= CAFE_INFO.openingHour && currentHour < CAFE_INFO.closingHour;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CAFE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="visit" className="relative py-24 sm:py-32 bg-[#100C0A] text-[#FFF0DC] overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#D99445]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-glass border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#27D7FF] mb-3 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#27D7FF]" />
            <span>Your Next Chai Stop</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-3">
            VISIT CHAIWALLAAA. <br />
            <span className="italic font-normal text-gradient-amber">
              IIT BHUBANESWAR GATE.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#FFF0DC]/70 leading-relaxed">
            Located right near the main entry gate of IIT Bhubaneswar in Jatni, Odisha. Step in under the warm fairy lights for fresh cutting chai, grilled sandwiches, and conversation that lasts until closing.
          </p>
        </div>

        {/* Location & Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5">
            <CrystalCard glowColor="amber" tilt={true} className="p-6 sm:p-8 h-full flex flex-col justify-between">
              <div className="space-y-5">
                
                {/* Live Status Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isOpenNow ? 'bg-[#40E58B] shadow-[0_0_8px_#40E58B]' : 'bg-[#E86B32]'
                      }`}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      {isOpenNow ? 'Open Now' : 'Closed for the Night'}
                    </span>
                  </div>
                  <span className="text-xs text-[#FFF0DC]/70">
                    Closes at {CAFE_INFO.closingTimeStr}
                  </span>
                </div>

                {/* Café Name & Address */}
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-1.5">
                    {CAFE_INFO.name} Café
                  </h3>
                  <p className="text-sm text-[#FFF0DC]/80 leading-relaxed">
                    {CAFE_INFO.address}
                  </p>
                </div>

                {/* Copy Address Button */}
                <div>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider crystal-glass hover:bg-white/15 text-[#FFF0DC] border border-white/10 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#40E58B]" />
                        <span className="text-[#40E58B]">Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D99445]" />
                        <span>Copy Full Address</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Available Services */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FFF0DC]/50">
                    Available Services:
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-[#FFF0DC]">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                      <UtensilsCrossed className="w-3.5 h-3.5 text-[#D99445]" />
                      <span>Dine-In (Outdoor Seating)</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#27D7FF]" />
                      <span>Takeaway</span>
                    </div>
                  </div>
                </div>

                {/* Operating Hours Note */}
                <div className="pt-4 border-t border-white/10 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#D99445] mt-0.5 shrink-0" />
                  <div className="text-xs text-[#FFF0DC]/70 leading-relaxed">
                    <span className="font-semibold text-white block">
                      Verified Schedule:
                    </span>
                    Open daily for students, faculty & visitors · Closes at 11:00 PM per listing.
                  </div>
                </div>
              </div>

              {/* Primary Get Directions CTA */}
              <div className="pt-6">
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <CrystalButton
                    variant="primary-amber"
                    size="md"
                    className="w-full"
                    icon={<Navigation className="w-4 h-4" />}
                  >
                    Get Directions in Google Maps
                  </CrystalButton>
                </a>
              </div>
            </CrystalCard>
          </div>

          {/* Right Interactive Map / Location Preview */}
          <div className="lg:col-span-7">
            <CrystalCard glowColor="cyan" tilt={false} className="p-2.5 sm:p-3 overflow-hidden h-full">
              <div className="relative w-full h-80 sm:h-96 md:h-full min-h-[380px] rounded-xl overflow-hidden bg-[#100C0A] border border-white/10">
                <iframe
                  title="Chaiwallaaa Café location near IIT Bhubaneswar"
                  src="https://maps.google.com/maps?q=IIT+Bhubaneswar+Gate+Jatni+Odisha&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 filter contrast-105 invert-[88%] hue-rotate-180"
                  loading="lazy"
                  allowFullScreen
                />

                <div className="absolute top-3 left-3 crystal-glass-smoky text-[#FFF0DC] p-3 rounded-xl shadow-lg border border-white/15 max-w-xs pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#27D7FF] shadow-[0_0_8px_#27D7FF]" />
                    <span className="font-editorial text-sm font-bold text-white">
                      Chaiwallaaa Café
                    </span>
                  </div>
                  <p className="text-[11px] text-[#FFF0DC]/70 mt-0.5 leading-tight">
                    Near IIT Bhubaneswar Entry Gate, Jatni, Odisha
                  </p>
                </div>

                <div className="absolute bottom-3 inset-x-3 crystal-glass-smoky text-[#FFF0DC] p-3 rounded-xl border border-white/15 flex items-center justify-between text-xs backdrop-blur-md">
                  <span>Distance from campus gate: ~1-2 mins walk</span>
                  <a
                    href={CAFE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D99445] hover:text-[#FFC56E] font-bold flex items-center gap-1"
                  >
                    <span>Open Maps</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </CrystalCard>
          </div>

        </div>

      </div>
    </section>
  );
};
