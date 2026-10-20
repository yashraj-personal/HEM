import React, { useState } from 'react';
import { Sparkles, Gift, Heart, Smile, Cake, ChevronUp } from 'lucide-react';
import { GIFT_BOX_DATA } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

interface GiftBoxesProps {
  onAllGiftsOpened: () => void;
}

export const GiftBoxesSection: React.FC<GiftBoxesProps> = ({ onAllGiftsOpened }) => {
  const [openedBoxes, setOpenedBoxes] = useState<{ [id: number]: boolean }>({});

  const handleToggleBox = (id: number) => {
    const isCurrentlyOpen = !!openedBoxes[id];
    const newOpened = {
      ...openedBoxes,
      [id]: !isCurrentlyOpen
    };
    setOpenedBoxes(newOpened);

    if (!isCurrentlyOpen) {
      confetti.burst({
        count: 45,
        shapes: ['heart', 'star', 'rect']
      });

      // Check if all 3 are opened
      if (Object.keys(newOpened).filter((k) => newOpened[Number(k)]).length === GIFT_BOX_DATA.length) {
        onAllGiftsOpened();
      }
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-rose-50/40 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200/80 px-3 py-1 rounded-full mb-3">
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>SPECIAL SURPRISE PACKAGES · 3 BOXES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            THE BESTIE GIFT BOXES 🎁
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Three handpicked presents wrapped in love. Tap each one to open!
          </p>
        </div>

        {/* 3 Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {GIFT_BOX_DATA.map((gift) => {
            const isOpen = !!openedBoxes[gift.id];
            return (
              <div
                key={gift.id}
                className="bg-white/90 border border-pink-200/90 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center relative overflow-hidden group"
              >
                {/* Box Illustration (Closed vs Opened) */}
                <div
                  onClick={() => handleToggleBox(gift.id)}
                  className="w-28 h-28 my-4 relative cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  aria-label={`${gift.title}: ${isOpen ? 'Opened' : 'Closed, tap to open'}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleBox(gift.id);
                    }
                  }}
                >
                  {!isOpen ? (
                    /* Closed Box */
                    <div className="w-full h-full relative group-hover:scale-105 transition-transform">
                      {/* Box Body */}
                      <div className={`absolute inset-x-2 bottom-0 h-20 bg-gradient-to-br ${gift.boxColor} rounded-2xl shadow-md flex items-center justify-center`}>
                        {/* Vertical Ribbon */}
                        <div className={`w-5 h-full ${gift.ribbonColor} shadow-xs`} />
                        {/* Horizontal Ribbon */}
                        <div className={`absolute inset-x-0 h-4 ${gift.ribbonColor} shadow-xs`} />
                      </div>
                      {/* Box Lid */}
                      <div className={`absolute inset-x-0 top-3 h-8 bg-gradient-to-r ${gift.lidColor} rounded-xl shadow-sm flex items-center justify-center`}>
                        <div className={`w-5 h-full ${gift.ribbonColor}`} />
                      </div>
                      {/* Ribbon Bow on top */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
                        🎀
                      </div>
                    </div>
                  ) : (
                    /* Opened Box */
                    <div className="w-full h-full relative animate-in zoom-in-95 duration-300">
                      {/* Lifted Lid tilted */}
                      <div className={`absolute -top-3 left-1 w-20 h-6 bg-gradient-to-r ${gift.lidColor} rounded-lg shadow-sm -rotate-15`}>
                        <span className="text-xs">🎀</span>
                      </div>
                      {/* Open Box Container */}
                      <div className={`absolute inset-x-2 bottom-0 h-20 bg-gradient-to-br ${gift.boxColor} rounded-2xl shadow-inner flex items-center justify-center border-t-4 border-white/60`}>
                        <span className="text-4xl animate-bounce">{gift.accent}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-rose-950 font-display mb-1">
                  {gift.title}
                </h3>
                <p className="text-xs text-rose-800/70 mb-4">
                  {gift.subtitle}
                </p>

                {/* Content Reveal / Toggle */}
                {!isOpen ? (
                  <button
                    onClick={() => handleToggleBox(gift.id)}
                    className="mt-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Unwrap Gift</span>
                  </button>
                ) : (
                  <div className="mt-auto w-full pt-3 border-t border-pink-100 animate-in fade-in">
                    <div className="text-xs font-bold text-pink-600 mb-2">
                      {gift.revealTitle}
                    </div>
                    <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed bg-pink-50/70 p-3 rounded-xl mb-3">
                      {gift.revealMessage}
                    </p>
                    <button
                      onClick={() => handleToggleBox(gift.id)}
                      className="text-[11px] text-rose-500 hover:text-pink-600 font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronUp className="w-3 h-3" />
                      <span>Close box</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
