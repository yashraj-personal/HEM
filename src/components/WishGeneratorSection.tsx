import React, { useState } from 'react';
import { Sparkles, Heart, Copy, Check } from 'lucide-react';
import { BIRTHDAY_WISHES, RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

interface WishGeneratorProps {
  onWishGenerated: () => void;
}

export const WishGeneratorSection: React.FC<WishGeneratorProps> = ({ onWishGenerated }) => {
  const [currentWish, setCurrentWish] = useState<string>(
    "May your smile stay bright even on the hardest days."
  );
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    let nextIndex = Math.floor(Math.random() * BIRTHDAY_WISHES.length);
    if (nextIndex === lastIndex) {
      nextIndex = (nextIndex + 1) % BIRTHDAY_WISHES.length;
    }

    setLastIndex(nextIndex);
    setCurrentWish(BIRTHDAY_WISHES[nextIndex]);
    setIsCopied(false);
    onWishGenerated();

    confetti.burstStars();

    setTimeout(() => {
      setIsGenerating(false);
    }, 350);
  };

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentWish);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentWish;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <section id="wishes" className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>HEAVENLY BLESSINGS · 20+ UNIQUE WISHES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            ONE BIRTHDAY. A MILLION BEAUTIFUL WISHES. 🌸
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Every tap unveils another heartfelt blessing for Hemali's year ahead.
          </p>
        </div>

        {/* Wish Card */}
        <div className="bg-white/95 border-2 border-pink-200/90 rounded-3xl p-7 sm:p-10 shadow-xl max-w-xl mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-2xl mb-4 shadow-xs">
            🌸
          </div>

          <div className="min-h-[110px] flex items-center justify-center w-full px-4 mb-6">
            <p className="text-lg sm:text-xl font-bold text-rose-950 font-display leading-relaxed animate-in fade-in zoom-in-95 duration-300">
              “{currentWish}”
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md shadow-pink-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>GENERATE A WISH FOR {RECIPIENT_NAME.toUpperCase()} ✨</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border border-pink-200 hover:bg-pink-50 text-rose-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-pink-500" />
                  <span>Copy Wish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
