import React from 'react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { RECIPIENT_NAME, BIRTHDAY_DATE } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

interface HeroSectionProps {
  onScrollToCandles: () => void;
  onScrollToLetter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCandles,
  onScrollToLetter
}) => {
  const handleHeroBurst = () => {
    confetti.burst({
      count: 45,
      shapes: ['heart', 'star', 'rect']
    });
  };

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 overflow-hidden">
      {/* Decorative CSS Pastel Balloons floating at sides */}
      <div className="absolute top-24 left-2 sm:left-12 pointer-events-none select-none opacity-80 sm:opacity-100 animate-float-slow">
        {/* Pink Balloon */}
        <div className="relative w-12 sm:w-16 h-16 sm:h-20 bg-gradient-to-br from-pink-300 to-pink-500 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-md">
          {/* Highlight */}
          <div className="absolute top-2 left-2 w-3 sm:w-4 h-6 sm:h-8 rounded-full bg-white/40 -rotate-12" />
          {/* Knot */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-pink-600 rounded-xs" />
          {/* String */}
          <div className="absolute top-full left-1/2 w-[1px] h-12 bg-pink-300/80" />
        </div>
      </div>

      <div className="absolute top-28 right-3 sm:right-16 pointer-events-none select-none opacity-80 sm:opacity-100 animate-float-reverse">
        {/* Lavender Balloon */}
        <div className="relative w-12 sm:w-16 h-16 sm:h-20 bg-gradient-to-br from-purple-300 to-purple-400 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-md">
          <div className="absolute top-2 left-2 w-3 sm:w-4 h-6 sm:h-8 rounded-full bg-white/40 -rotate-12" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-purple-500 rounded-xs" />
          <div className="absolute top-full left-1/2 w-[1px] h-12 bg-purple-300/80" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Birthday Date Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/90 shadow-xs mb-4 text-xs sm:text-sm font-semibold text-rose-800">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span className="tracking-wider uppercase">{BIRTHDAY_DATE}</span>
          <span className="text-pink-400">·</span>
          <span>A CELEBRATION OF PURE FRIENDSHIP</span>
        </div>

        {/* Main Grand Typography */}
        <h2 className="text-sm sm:text-lg uppercase tracking-[0.25em] font-bold text-pink-600 mb-2 font-sans">
          HAPPY BIRTHDAY
        </h2>

        {/* Hemali Centerpiece */}
        <h1
          onClick={handleHeroBurst}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-rose-950 font-display mb-4 cursor-pointer hover:scale-102 transition-transform select-none group"
          title="Click to release love for Hemali!"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
            {RECIPIENT_NAME}
          </span>
          <span className="inline-block ml-3 text-pink-500 animate-pulse">💗</span>
        </h1>

        {/* Bestie Tagline */}
        <p className="text-base sm:text-2xl font-bold text-rose-900 tracking-wide mb-3 font-display">
          MY BESTIE. MY PERSON. MY FOREVER FRIEND.
        </p>

        {/* Supporting Message */}
        <p className="text-lg sm:text-2xl text-pink-700 font-script max-w-xl mx-auto mb-8">
          “Life gave me a friend, but my heart found a sister.”
        </p>

        {/* Centerpiece CSS Cake Illustration */}
        <div className="relative my-4 flex flex-col items-center select-none">
          {/* Floating Ribbons & Sparkles around cake */}
          <div className="absolute -top-6 -left-12 text-pink-300 text-2xl animate-float-slow">🎀</div>
          <div className="absolute -top-4 -right-12 text-amber-300 text-2xl animate-float-reverse">⭐</div>
          <div className="absolute bottom-2 -left-16 text-rose-300 text-xl animate-float-reverse">🌸</div>
          <div className="absolute bottom-4 -right-16 text-purple-300 text-xl animate-float-slow">✨</div>

          {/* Pure CSS 3-Tier Birthday Cake */}
          <div className="relative flex flex-col items-center">
            {/* Candles on Top Tier */}
            <div className="flex gap-4 sm:gap-6 mb-1 items-end z-20">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Candle Flame */}
                  <div className="w-2.5 h-4 sm:w-3 sm:h-5 bg-gradient-to-t from-amber-400 via-yellow-300 to-amber-100 rounded-[50%_50%_35%_35%] animate-flicker shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                  {/* Candle Wick */}
                  <div className="w-0.5 h-1.5 bg-neutral-700" />
                  {/* Candle Stick */}
                  <div className="w-2.5 sm:w-3 h-7 sm:h-9 bg-gradient-to-r from-pink-200 via-white to-pink-300 rounded-t-xs border-x border-pink-300/40" />
                </div>
              ))}
            </div>

            {/* Top Tier */}
            <div className="w-28 sm:w-36 h-10 sm:h-12 bg-gradient-to-r from-pink-200 via-pink-100 to-rose-200 rounded-t-xl border-t-2 border-white shadow-inner flex items-center justify-around px-2 relative z-10">
              {/* Frosting drips */}
              <div className="absolute top-0 inset-x-0 h-2 bg-white/70 rounded-full" />
              <span className="text-xs">🍓</span>
              <span className="text-xs">🌸</span>
              <span className="text-xs">🍓</span>
            </div>

            {/* Middle Tier */}
            <div className="w-40 sm:w-52 h-12 sm:h-14 bg-gradient-to-r from-rose-200 via-pink-100 to-purple-200 rounded-t-xl border-t-2 border-white shadow-inner flex items-center justify-around px-4 relative z-0">
              <div className="absolute top-0 inset-x-0 h-2 bg-white/80 rounded-full" />
              <span className="text-xs">🎀</span>
              <span className="text-xs">💗</span>
              <span className="text-xs">🎀</span>
            </div>

            {/* Bottom Tier */}
            <div className="w-56 sm:w-72 h-14 sm:h-16 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-200 rounded-t-2xl border-t-2 border-white shadow-md flex items-center justify-around px-6 relative">
              <div className="absolute top-0 inset-x-0 h-3 bg-white/90 rounded-full" />
              <span className="text-xs text-rose-800 font-bold tracking-wider">H · E · M · A · L · I</span>
            </div>

            {/* Cake Plate / Stand */}
            <div className="w-64 sm:w-80 h-3.5 bg-gradient-to-r from-rose-200 via-white to-rose-200 rounded-full shadow-md -mt-1 border border-pink-200" />
          </div>
        </div>

        {/* Two Functional CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onScrollToCandles}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-md shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>MAKE A WISH 🎂</span>
          </button>

          <button
            onClick={onScrollToLetter}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/90 hover:bg-white border border-pink-200 text-rose-900 font-bold text-sm sm:text-base shadow-sm hover:shadow active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>DISCOVER OUR BESTIE WORLD ✨</span>
          </button>
        </div>

        {/* Gentle scroll indicator */}
        <button
          onClick={onScrollToLetter}
          className="mt-12 text-rose-400 hover:text-pink-600 transition-colors flex flex-col items-center gap-1 text-xs cursor-pointer"
          aria-label="Scroll down to letter"
        >
          <span>Scroll to read your letter</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
