import React, { useState } from 'react';
import { Sparkles, Heart, Copy, Check } from 'lucide-react';
import { COMPLIMENTS, RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

export const ComplimentMachine: React.FC = () => {
  const [currentCompliment, setCurrentCompliment] = useState<string>(
    "Your smile deserves its own spotlight. ✨"
  );
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPumping, setIsPumping] = useState<boolean>(false);

  const handleDispense = () => {
    setIsPumping(true);
    let newIndex = Math.floor(Math.random() * COMPLIMENTS.length);
    // Avoid consecutive repeats
    if (newIndex === lastIndex) {
      newIndex = (newIndex + 1) % COMPLIMENTS.length;
    }

    setLastIndex(newIndex);
    setCurrentCompliment(COMPLIMENTS[newIndex]);
    setIsCopied(false);

    confetti.burstHearts();

    setTimeout(() => {
      setIsPumping(false);
    }, 400);
  };

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentCompliment);
      } else {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = currentCompliment;
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
    <section id="compliments" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200/80 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>INSTANT HAPPINESS GENERATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            THE BESTIE COMPLIMENT MACHINE 💗
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Whenever you need a reminder of how marvelous you are, pull the lever!
          </p>
        </div>

        {/* Machine Housing */}
        <div className="relative max-w-md mx-auto bg-white/95 border-2 border-pink-200 rounded-3xl p-6 sm:p-9 shadow-xl">
          {/* Top Decorative Dispenser Dome */}
          <div className="relative w-28 h-20 mx-auto -mt-14 mb-4 rounded-t-full bg-gradient-to-b from-pink-300 via-rose-200 to-white border-2 border-b-0 border-pink-300 shadow-inner flex items-center justify-center">
            <span className={`text-4xl transition-transform ${isPumping ? 'scale-125' : 'scale-100'}`}>
              💌
            </span>
          </div>

          {/* Screen / Display */}
          <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 border border-pink-200 rounded-2xl p-6 mb-6 shadow-inner min-h-[140px] flex flex-col justify-center items-center relative overflow-hidden">
            <span className="text-xs uppercase tracking-wider font-bold text-pink-400 mb-2">
              DISPATCH FOR {RECIPIENT_NAME}
            </span>

            <p className="text-base sm:text-lg font-bold text-rose-950 font-display animate-in fade-in duration-300 leading-snug">
              “{currentCompliment}”
            </p>
          </div>

          {/* Action Button & Copy */}
          <div className="space-y-3">
            <button
              onClick={handleDispense}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>GIVE ME A BESTIE COMPLIMENT 💗</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl border border-pink-200 hover:bg-pink-50 text-rose-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied to clipboard! ✨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pink-500" />
                  <span>Copy this compliment</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 text-[11px] text-rose-400">
            Over 20+ heartfelt affirmations carefully curated for you
          </div>
        </div>
      </div>
    </section>
  );
};
