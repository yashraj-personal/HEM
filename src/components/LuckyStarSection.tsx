import React, { useState } from 'react';
import { Sparkles, Star, RotateCcw } from 'lucide-react';
import { RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

interface LuckyStar {
  id: number;
  label: string;
  color: string;
  gradient: string;
  fortune: string;
  subtext: string;
}

const STARS: LuckyStar[] = [
  {
    id: 1,
    label: "Star of Radiance ✨",
    color: "from-amber-300 to-yellow-500",
    gradient: "bg-amber-50 border-amber-200 text-amber-950",
    fortune: "Your smile will effortlessly open doors you thought were locked forever.",
    subtext: "Expect surprising good news before the month ends!"
  },
  {
    id: 2,
    label: "Star of Serenity 🕊️",
    color: "from-pink-300 to-rose-400",
    gradient: "bg-rose-50 border-rose-200 text-rose-950",
    fortune: "Peace will replace overthinking, and clarity will arrive like morning sunshine.",
    subtext: "Trust your gut feelings; they are 100% accurate."
  },
  {
    id: 3,
    label: "Star of Abundance 🌸",
    color: "from-purple-300 to-indigo-400",
    gradient: "bg-purple-50 border-purple-200 text-purple-950",
    fortune: "Every effort you invested in yourself will return with double the victory.",
    subtext: "Success and sweet triumphs are destined for you."
  },
  {
    id: 4,
    label: "Star of Adventure 🚀",
    color: "from-rose-400 to-pink-500",
    gradient: "bg-pink-50 border-pink-200 text-pink-950",
    fortune: "A spontaneous trip or memory with your bestie will become an all-time classic.",
    subtext: "Pack your favorite outfit and be ready for endless giggles!"
  },
  {
    id: 5,
    label: "Star of Pure Love 💖",
    color: "from-fuchsia-400 to-pink-500",
    gradient: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-950",
    fortune: "You are destined to be surrounded by people who cherish your soul deeply.",
    subtext: "You will never have to beg for love or respect."
  },
  {
    id: 6,
    label: "Star of Dreams 🌟",
    color: "from-emerald-300 to-teal-400",
    gradient: "bg-emerald-50 border-emerald-200 text-emerald-950",
    fortune: "That one wish you secretly whispered before sleeping is quietly coming true.",
    subtext: "Keep believing in your own magic, Hemali!"
  }
];

export const LuckyStarSection: React.FC = () => {
  const [openedStars, setOpenedStars] = useState<{ [id: number]: boolean }>({});
  const [activeFortune, setActiveFortune] = useState<LuckyStar | null>(null);

  const handleOpenStar = (star: LuckyStar) => {
    setOpenedStars((prev) => ({
      ...prev,
      [star.id]: true
    }));
    setActiveFortune(star);
    confetti.burstStars();
  };

  const handleReset = () => {
    setOpenedStars({});
    setActiveFortune(null);
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>COSMIC BIRTHDAY FORTUNES · 6 LUCKY STARS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            HEMALI'S ORIGAMI LUCKY STARS ⭐
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Tap each lucky origami star to unfold your cosmic prophecy for 2026!
          </p>
        </div>

        {/* 6 Origami Stars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-2xl mx-auto">
          {STARS.map((star) => {
            const isOpened = !!openedStars[star.id];
            return (
              <button
                key={star.id}
                onClick={() => handleOpenStar(star)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group relative ${
                  isOpened
                    ? 'bg-white border-pink-300 shadow-md scale-98'
                    : 'bg-white/80 hover:bg-white border-pink-200 hover:border-pink-400 shadow-lg hover:scale-105'
                }`}
              >
                {/* Glowing Star Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${star.color} text-white flex items-center justify-center text-2xl shadow-md mb-2 transition-transform ${
                    isOpened ? 'scale-90' : 'group-hover:rotate-12 group-hover:scale-110 animate-pulse'
                  }`}
                >
                  ⭐
                </div>

                <span className="text-xs font-bold text-rose-950 font-display">
                  {star.label}
                </span>

                <span className="text-[10px] text-pink-500 font-medium mt-1">
                  {isOpened ? 'Unfolded ✓' : 'Tap to Unfold ✨'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Revealed Active Fortune Card */}
        {activeFortune && (
          <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl max-w-lg mx-auto animate-in zoom-in-95 duration-300 ${activeFortune.gradient}`}>
            <div className="flex items-center justify-center gap-2 text-xs uppercase font-extrabold tracking-wider text-pink-600 mb-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>{activeFortune.label}</span>
            </div>

            <p className="text-lg sm:text-xl font-bold font-display leading-snug my-2">
              “{activeFortune.fortune}”
            </p>

            <p className="text-xs opacity-80 italic mt-3 pt-3 border-t border-current/20">
              {activeFortune.subtext}
            </p>
          </div>
        )}

        {/* Reset button */}
        {Object.keys(openedStars).length > 0 && (
          <div className="mt-8">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-pink-600 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Fold stars back up</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
