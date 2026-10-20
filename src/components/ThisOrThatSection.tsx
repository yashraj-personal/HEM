import React, { useState } from 'react';
import { Sparkles, RotateCcw, Heart, Check } from 'lucide-react';
import { THIS_OR_THAT_PAIRS } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

export const ThisOrThatSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animatingChoice, setAnimatingChoice] = useState<'A' | 'B' | null>(null);

  const totalPairs = THIS_OR_THAT_PAIRS.length;
  const currentPair = THIS_OR_THAT_PAIRS[currentIndex];

  const handlePick = (choiceText: string, choiceSide: 'A' | 'B') => {
    if (animatingChoice) return;
    setAnimatingChoice(choiceSide);

    setTimeout(() => {
      const nextChoices = [...selectedChoices, choiceText];
      setSelectedChoices(nextChoices);
      setAnimatingChoice(null);

      if (currentIndex < totalPairs - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsCompleted(true);
        confetti.burstHearts();
      }
    }, 350);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedChoices([]);
    setIsCompleted(false);
    setAnimatingChoice(null);
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-pink-50/40 to-transparent">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200/80 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>PLAYFUL VIBE CHECK · 8 ROUNDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            BESTIE EDITION: THIS OR THAT 🎀
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Pick your favourite bestie ritual in each round!
          </p>
        </div>

        {/* Game Box */}
        <div className="bg-white/95 backdrop-blur-md border border-pink-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {!isCompleted ? (
            <div>
              {/* Progress */}
              <div className="flex items-center justify-between text-xs font-semibold text-pink-600 mb-2">
                <span>ROUND {currentIndex + 1} OF {totalPairs}</span>
                <span>{currentIndex} PICKS MADE</span>
              </div>
              <div className="w-full h-1.5 bg-pink-100 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalPairs) * 100}%` }}
                />
              </div>

              {/* Pair comparison cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-4">
                {/* Option A */}
                <button
                  onClick={() => handlePick(currentPair.optionA.text, 'A')}
                  className={`p-6 sm:p-8 rounded-2xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer group ${
                    animatingChoice === 'A'
                      ? 'bg-pink-100 border-pink-500 scale-102 ring-4 ring-pink-300/40 shadow-lg'
                      : 'bg-pink-50/50 hover:bg-pink-50 border-pink-200 hover:border-pink-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-115 transition-transform">
                    {currentPair.optionA.icon}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-rose-950 font-display">
                    {currentPair.optionA.text}
                  </span>
                  <span className="text-xs text-pink-500 font-medium mt-2 opacity-80 group-hover:opacity-100">
                    Tap to Choose
                  </span>
                </button>

                {/* Option B */}
                <button
                  onClick={() => handlePick(currentPair.optionB.text, 'B')}
                  className={`p-6 sm:p-8 rounded-2xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer group ${
                    animatingChoice === 'B'
                      ? 'bg-pink-100 border-pink-500 scale-102 ring-4 ring-pink-300/40 shadow-lg'
                      : 'bg-purple-50/40 hover:bg-purple-50/60 border-purple-200 hover:border-purple-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-115 transition-transform">
                    {currentPair.optionB.icon}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-rose-950 font-display">
                    {currentPair.optionB.text}
                  </span>
                  <span className="text-xs text-purple-600 font-medium mt-2 opacity-80 group-hover:opacity-100">
                    Tap to Choose
                  </span>
                </button>
              </div>

              <p className="text-xs text-rose-400 mt-4">
                No wrong answers between soul sisters!
              </p>
            </div>
          ) : (
            /* Completed Screen */
            <div className="py-4 animate-in zoom-in-95 duration-400">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-300" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-950 font-display mb-2">
                YOUR BESTIE VIBE IS UNMATCHED! 💗
              </h3>
              <p className="text-rose-900/80 text-sm mb-6 max-w-md mx-auto">
                Here is the magical ritual list crafted from your choices today:
              </p>

              {/* Summary of picks */}
              <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mb-8">
                {selectedChoices.map((choice, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-pink-50/80 border border-pink-100 text-xs font-semibold text-rose-900 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <span className="truncate">{choice}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>PLAY AGAIN</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
