import React from 'react';
import { HANGOUT_PHOTOS } from '../data/cafeData';
import { Heart, Sparkles, Coffee } from 'lucide-react';

export const HangoutStory: React.FC = () => {
  return (
    <section id="story" className="relative py-24 sm:py-32 bg-[#241710] text-[#FFF5E8] overflow-hidden">
      {/* Warm Ambient Glow Effects */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#B95432]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-[#C98245]/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Intro: Editorial Typography */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C98245] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atmosphere & Culture</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            NOT JUST A <br />
            <span className="italic text-[#C98245] font-normal">CHAI BREAK.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#FFF5E8]/80 font-normal leading-relaxed">
            Step through the IIT Bhubaneswar entry gate after dusk and the rhythm changes immediately. The hum of algorithms and laboratory logs dissolves into the clink of glass tumblers, the aroma of crushed ginger hitting boiling milk, and laughter carried by the Jatni night breeze.
          </p>
        </div>

        {/* Asymmetrical Photo-Led Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start mb-20">
          
          {/* Main Large Visual: Evening fairy lights outdoor seating */}
          <div className="md:col-span-7 relative group">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={HANGOUT_PHOTOS[0].imageUrl}
                alt={HANGOUT_PHOTOS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241710] via-transparent to-black/20" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase font-bold text-[#C98245] tracking-wider block mb-1">
                  {HANGOUT_PHOTOS[0].tag}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-white mb-2">
                  {HANGOUT_PHOTOS[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                  {HANGOUT_PHOTOS[0].caption}
                </p>
              </div>
            </div>

            {/* Handwritten Floating Note */}
            <div className="absolute -bottom-5 right-6 bg-[#FFF5E8] text-[#241710] px-4 py-2 rounded-xl shadow-xl -rotate-2 hidden sm:block border border-[#C98245]/30">
              <span className="font-['Caveat',cursive] text-lg font-bold text-[#B95432]">
                "One cup turned into two hours..."
              </span>
            </div>
          </div>

          {/* Right Column Visuals: Lifestyle & Chai closeups */}
          <div className="md:col-span-5 space-y-6">
            {/* Visual 2: Friends laughing over chai */}
            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={HANGOUT_PHOTOS[1].imageUrl}
                  alt={HANGOUT_PHOTOS[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241710]/90 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] uppercase font-bold text-[#C98245] tracking-wider block mb-0.5">
                    {HANGOUT_PHOTOS[1].tag}
                  </span>
                  <h4 className="font-editorial text-lg font-bold text-white">
                    {HANGOUT_PHOTOS[1].title}
                  </h4>
                  <p className="text-xs text-white/75 mt-0.5">
                    {HANGOUT_PHOTOS[1].caption}
                  </p>
                </div>
              </div>

              {/* Handwritten Floating Note */}
              <div className="absolute -top-3 -left-3 bg-[#C98245] text-white px-3 py-1 rounded-lg shadow-lg rotate-3 text-xs font-['Caveat',cursive] text-base font-bold hidden sm:block">
                The real campus debrief happens here
              </div>
            </div>

            {/* Visual 3: Simmering Brass Pot */}
            <div className="relative group">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-md">
                <img
                  src={HANGOUT_PHOTOS[2].imageUrl}
                  alt={HANGOUT_PHOTOS[2].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241710]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
                  <span className="font-bold text-[#C98245]">{HANGOUT_PHOTOS[2].title}: </span>
                  <span>{HANGOUT_PHOTOS[2].caption}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillars of Chaiwallaaa Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C98245] mb-4">
              <Coffee className="w-5 h-5" />
            </div>
            <h4 className="font-editorial text-xl font-bold mb-2">Simmered in Real Time</h4>
            <p className="text-sm text-[#FFF5E8]/75 leading-relaxed">
              We do not use instant concentrates or pre-brewed thermoses. The kettle bubbles continuously with fresh ginger, cardamom, and Assam dust.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#B95432] mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-editorial text-xl font-bold mb-2">Fairy Lights & Open Sky</h4>
            <p className="text-sm text-[#FFF5E8]/75 leading-relaxed">
              Outdoor seating designed for conversation. Pull up a stool, breathe the evening breeze, and watch the campus sunset surrender to twilight.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#DCEFF5] mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-editorial text-xl font-bold mb-2">The Unplanned Hangout</h4>
            <p className="text-sm text-[#FFF5E8]/75 leading-relaxed">
              You walk in saying "just five minutes for one chai," and before you know it, two plates of grilled sandwiches and four conversations have passed.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
