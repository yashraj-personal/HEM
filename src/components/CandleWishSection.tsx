import React, { useState } from 'react';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import { RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

interface CandleWishSectionProps {
  onAllCandlesBlown: () => void;
}

const TOTAL_CANDLES = 5;

const WISH_PROMPTS = [
  "Wish 1: For limitless happiness & giggles 🌸",
  "Wish 2: For bold dreams coming true ✨",
  "Wish 3: For serene peace of mind 🕊️",
  "Wish 4: For endless exciting adventures 🚀",
  "Wish 5: For our forever bestie bond 💖"
];

export const CandleWishSection: React.FC<CandleWishSectionProps> = ({ onAllCandlesBlown }) => {
  // Array of 5 booleans, true = lit, false = extinguished
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [isCompleted, setIsCompleted] = useState(false);

  const extinguishedCount = candles.filter((c) => !c).length;

  const handleCandleClick = (index: number) => {
    if (!candles[index]) return; // already blown out

    const nextCandles = [...candles];
    nextCandles[index] = false;
    setCandles(nextCandles);

    // Play gentle extinguish puff sound
    musicBox.playCandlePuff();

    // Small star sparkle
    confetti.burstStars();

    const newExtinguished = nextCandles.filter((c) => !c).length;
    if (newExtinguished === TOTAL_CANDLES) {
      setIsCompleted(true);
      onAllCandlesBlown();
      confetti.burst({
        count: 75,
        shapes: ['star', 'heart', 'circle'],
        colors: ['#FBBF24', '#F472B6', '#EC4899', '#FEF08A', '#FDA4AF']
      });
    }
  };

  const handleRelight = () => {
    setCandles([true, true, true, true, true]);
    setIsCompleted(false);
  };

  return (
    <section id="candles" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200/80 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>INTERACTIVE CANDLE WISH CEREMONY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            MAKE 5 LITTLE WISHES FOR YOUR NEW YEAR ✨
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Tap each candle flame to extinguish it and seal your private wish!
          </p>
        </div>

        {/* Counter Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-pink-200 shadow-xs mb-8 text-sm font-bold text-rose-900">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
          <span>Wishes made: {extinguishedCount} / {TOTAL_CANDLES}</span>
        </div>

        {/* Current wish prompt hint */}
        <div className="text-xs text-pink-600 font-medium mb-6 h-5">
          {extinguishedCount < TOTAL_CANDLES
            ? WISH_PROMPTS[extinguishedCount]
            : "All 5 wishes released into the universe! 🌟"}
        </div>

        {/* Interactive Cake with 5 Candles */}
        <div className="relative max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-b from-white/95 to-pink-50/70 border border-pink-200 shadow-xl flex flex-col items-center">
          {/* 5 Candles Row */}
          <div className="flex justify-center items-end gap-5 sm:gap-7 mb-2 relative z-10">
            {candles.map((isLit, idx) => (
              <button
                key={idx}
                onClick={() => handleCandleClick(idx)}
                aria-label={`Candle ${idx + 1}: ${isLit ? 'Lit, tap to extinguish' : 'Extinguished'}`}
                className="flex flex-col items-center group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-pink-300 rounded-lg p-1 transition-transform hover:scale-105"
              >
                {/* Flame or smoke puff */}
                <div className="h-7 flex items-end justify-center">
                  {isLit ? (
                    <div className="w-3.5 h-5 bg-gradient-to-t from-amber-400 via-yellow-300 to-amber-100 rounded-[50%_50%_35%_35%] animate-flicker shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                  ) : (
                    <div className="text-xs text-neutral-400 font-script animate-in fade-in zoom-in">
                      💨
                    </div>
                  )}
                </div>

                {/* Wick */}
                <div className="w-0.5 h-1.5 bg-neutral-700" />

                {/* Candle Stick */}
                <div
                  className={`w-3.5 h-12 rounded-t-sm border-x shadow-xs transition-colors ${
                    isLit
                      ? 'bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 border-pink-300'
                      : 'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 border-neutral-300 opacity-60'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="w-64 sm:w-80 h-14 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 rounded-t-2xl border-t-2 border-white shadow-inner flex items-center justify-around px-4 relative">
            <div className="absolute top-0 inset-x-0 h-2.5 bg-white/80 rounded-full" />
            <span className="text-xs">🍓</span>
            <span className="text-xs font-bold text-rose-800 tracking-wider">WISHES FOR HEMALI</span>
            <span className="text-xs">🍓</span>
          </div>

          {/* Cake Bottom Tier */}
          <div className="w-72 sm:w-92 h-16 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 rounded-t-3xl border-t-2 border-white shadow-md flex items-center justify-around px-6 relative">
            <div className="absolute top-0 inset-x-0 h-3 bg-white/90 rounded-full" />
            <span className="text-sm">🌸</span>
            <span className="text-sm">✨</span>
            <span className="text-sm">🎀</span>
            <span className="text-sm">✨</span>
            <span className="text-sm">🌸</span>
          </div>

          {/* Cake Plate */}
          <div className="w-80 sm:w-104 h-4 bg-gradient-to-r from-rose-100 via-white to-rose-100 rounded-full shadow-md -mt-1 border border-pink-200" />

          {/* Completion Celebration Message */}
          {isCompleted && (
            <div className="mt-8 p-5 bg-gradient-to-br from-pink-50 to-amber-50/60 border border-pink-200 rounded-2xl w-full text-center animate-in zoom-in-95 duration-400">
              <h3 className="text-xl sm:text-2xl font-black text-rose-950 font-display mb-1">
                May your wishes turn into beautiful realities, {RECIPIENT_NAME}. 💗
              </h3>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-600 mb-4 font-sans">
                YOUR NEXT CHAPTER WILL BE BEAUTIFUL.
              </p>

              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-rose-900 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                <span>LIGHT THE CANDLES AGAIN</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
