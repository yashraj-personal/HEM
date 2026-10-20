import React, { useState } from 'react';
import { Sparkles, Heart, Utensils, RotateCcw } from 'lucide-react';
import { RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

export const CakeCuttingSection: React.FC = () => {
  const [isCut, setIsCut] = useState(false);
  const [bitesShared, setBitesShared] = useState(0);

  const handleCutCake = () => {
    setIsCut(true);
    musicBox.playSealChime();
    confetti.burst({
      count: 70,
      shapes: ['star', 'heart', 'circle'],
      colors: ['#F472B6', '#FBBF24', '#FDA4AF', '#C084FC', '#FFF1F2']
    });
  };

  const handleShareBite = () => {
    setBitesShared((prev) => prev + 1);
    confetti.burstHearts();
  };

  const handleReset = () => {
    setIsCut(false);
    setBitesShared(0);
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-rose-50/50 to-transparent">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-white border border-rose-200/80 px-3.5 py-1 rounded-full mb-3 shadow-xs">
            <Utensils className="w-3.5 h-3.5 text-rose-500" />
            <span>INTERACTIVE CAKE CUTTING CEREMONY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            CUT YOUR BIRTHDAY CAKE, HEMALI! 🎂✨
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            No birthday is complete without slicing the sweetest cake in the world!
          </p>
        </div>

        {/* Cake Cutting Stage Card */}
        <div className="bg-white/95 border-2 border-pink-200 rounded-3xl p-6 sm:p-10 shadow-xl max-w-xl mx-auto flex flex-col items-center relative overflow-hidden">
          {/* Pure CSS Round Cake & Slice */}
          <div className="relative my-6 select-none flex flex-col items-center">
            {/* Cake Plate */}
            <div className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-gradient-to-br from-pink-100 via-white to-pink-200 border-4 border-white shadow-2xl flex items-center justify-center">
              {/* Outer decorative scalloped border */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-pink-300/60" />

              {/* Main Cake Sponge */}
              <div className="relative w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-gradient-to-br from-rose-300 via-pink-200 to-rose-200 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden">
                {/* Strawberry cream swirls */}
                <div className="absolute inset-4 rounded-full border-4 border-white/70" />

                {/* Center Inscription */}
                <div className="text-center z-10">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-rose-800">
                    HAPPY BIRTHDAY
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-rose-950 font-display">
                    {RECIPIENT_NAME} 💗
                  </div>
                  <div className="text-xs text-rose-600 font-script font-bold mt-0.5">
                    14 • 10 • 2026
                  </div>
                </div>

                {/* Cake Cut Wedge Visualization when sliced */}
                {isCut && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100/90 border-l-2 border-b-2 border-pink-400 animate-in fade-in zoom-in origin-bottom-left" />
                )}
              </div>
            </div>

            {/* Cake Knife Icon */}
            {!isCut && (
              <button
                onClick={handleCutCake}
                className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🔪 Tap to Cut the Cake! 🎂</span>
              </button>
            )}
          </div>

          {/* Sliced Cake Result & Feeding Bestie */}
          {isCut && (
            <div className="w-full pt-4 border-t border-pink-100 animate-in zoom-in-95 duration-300 flex flex-col items-center">
              {/* Lifted Slice on Plate */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 w-full mb-4">
                <div className="text-4xl mb-2 animate-bounce">🍰</div>
                <h3 className="text-lg font-bold text-rose-950 font-display mb-1">
                  Here is your first sweet bite, {RECIPIENT_NAME}! 🍓
                </h3>
                <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed max-w-md mx-auto">
                  “May your new year be layered with sweetness, crowned with happiness, and sprinkled with endless giggles!”
                </p>
              </div>

              {/* Feed Bestie Button */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleShareBite}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Feed Your Bestie a Bite! 🍓 ({bitesShared})</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-full border border-pink-200 text-rose-700 hover:bg-pink-50 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Cake</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
