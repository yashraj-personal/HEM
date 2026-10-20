import React, { useState } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

const CHEERS = [
  `Happy Birthday ${RECIPIENT_NAME}! 🎂`,
  "Besties today, tomorrow and forever! ♾️💗",
  "You deserve all the happiness in the world! 💖",
  "Keep shining, gorgeous girl! ✨",
  "Sending you 1,000,000 warm bestie hugs! 🫂",
  "You're my forever chosen sister! 🌸"
];

export const BestieMascot: React.FC = () => {
  const [cheerIndex, setCheerIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleTapMascot = () => {
    setIsWaving(true);
    setCheerIndex((prev) => (prev + 1) % CHEERS.length);
    setShowBubble(true);
    confetti.burstHearts();
    setTimeout(() => setIsWaving(false), 600);
  };

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-4 left-4 z-40 w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 border border-pink-300 text-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
        title="Open Mascot"
      >
        🧸
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start select-none">
      {/* Speech Bubble */}
      {showBubble && (
        <div className="relative mb-2 max-w-[200px] bg-white border-2 border-pink-200 rounded-2xl p-2.5 shadow-xl text-left animate-in zoom-in-95 duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-pink-100 hover:bg-pink-200 text-rose-800 text-[10px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-2.5 h-2.5" />
          </button>
          <div className="text-[11px] font-bold text-rose-950 font-display leading-tight">
            {CHEERS[cheerIndex]}
          </div>
          <div className="text-[9px] text-pink-500 font-medium mt-0.5">
            Tap bear for more! 💕
          </div>
          {/* Bubble Tail */}
          <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white border-r-2 border-b-2 border-pink-200 rotate-45" />
        </div>
      )}

      {/* Cute CSS Cartoon Bear / Mascot */}
      <div
        onClick={handleTapMascot}
        className={`relative cursor-pointer group transition-transform ${
          isWaving ? 'scale-110 -translate-y-2' : 'hover:scale-105'
        }`}
        title="Tap me for a bestie cheer!"
      >
        {/* Floating Heart balloon */}
        <div className="absolute -top-5 -right-2 text-base animate-bounce">
          🎈
        </div>

        {/* Mascot Avatar Card */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-200 to-rose-200 border-2 border-white shadow-lg flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform">
          🧸
        </div>

        {/* Dismiss Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-white border border-pink-200 text-rose-400 hover:text-rose-700 text-[9px] flex items-center justify-center cursor-pointer shadow-xs"
          title="Minimize mascot"
        >
          <X className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>
  );
};
