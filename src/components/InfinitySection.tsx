import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { confetti } from '../utils/confetti';
import { RECIPIENT_NAME } from '../data/birthdayData';

export const InfinitySection: React.FC = () => {
  const [loveCount, setLoveCount] = useState(0);
  const [isBursting, setIsBursting] = useState(false);

  const handleReleaseLove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isBursting) return;
    setIsBursting(true);
    setLoveCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti.burst({
      count: 35,
      origin: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      },
      shapes: ['heart', 'star']
    });

    setTimeout(() => {
      setIsBursting(false);
    }, 350);
  };

  return (
    <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-[#2E1A29] via-[#3B1E34] to-[#2E1A29] text-white relative overflow-hidden my-8 rounded-3xl sm:rounded-[3rem] shadow-2xl mx-2 sm:mx-6">
      {/* Background celestial stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-12 left-1/4 text-amber-200 text-xs animate-ping">✨</div>
        <div className="absolute bottom-16 right-1/4 text-pink-200 text-xs animate-ping">⭐</div>
        <div className="absolute top-1/2 left-10 text-pink-300 text-xs">✨</div>
        <div className="absolute bottom-20 left-16 text-purple-300 text-xs">⭐</div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Subtle kicker */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-300 bg-white/10 backdrop-blur-md border border-pink-400/30 px-3.5 py-1 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>COSMIC BESTIE TIMELINE</span>
        </div>

        {/* Giant Animated SVG Infinity Symbol */}
        <div className="relative w-64 sm:w-80 h-32 sm:h-40 my-4 flex items-center justify-center">
          <svg
            viewBox="0 0 300 150"
            className="w-full h-full drop-shadow-[0_0_25px_rgba(244,114,182,0.6)]"
            fill="none"
            stroke="url(#infinityGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          >
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#FDA4AF" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
            {/* Elegant Lemniscate / Infinity curve */}
            <path
              d="M 150 75 C 190 20, 260 20, 260 75 C 260 130, 190 130, 150 75 C 110 20, 40 20, 40 75 C 40 130, 110 130, 150 75 Z"
              className="animate-pulse"
            />
          </svg>

          {/* Central Heart badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pink-500/80 backdrop-blur-sm border border-white/60 flex items-center justify-center shadow-lg animate-bounce">
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
        </div>

        {/* Main Quotes */}
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-pink-100 mb-3 mt-4">
          NOT JUST FRIENDS. A LITTLE PIECE OF FOREVER. ♾️💗
        </h2>

        <p className="text-base sm:text-xl text-pink-200/90 font-script mb-8 max-w-xl mx-auto">
          “Some friendships make ordinary days feel special.”
        </p>

        {/* Release Love Button */}
        <button
          onClick={handleReleaseLove}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>RELEASE A LITTLE LOVE ✨</span>
        </button>

        {loveCount > 0 && (
          <div className="mt-4 text-xs text-pink-300 font-medium animate-in fade-in">
            {loveCount} sparks of unconditional love beamed to {RECIPIENT_NAME}!
          </div>
        )}
      </div>
    </section>
  );
};
