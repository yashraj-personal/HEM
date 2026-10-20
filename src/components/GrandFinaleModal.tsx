import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Copy, Check, RotateCcw, X } from 'lucide-react';
import { RECIPIENT_NAME, BIRTHDAY_DATE } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

interface GrandFinaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName: string;
  onRestartExperience: () => void;
}

export const GrandFinaleModal: React.FC<GrandFinaleModalProps> = ({
  isOpen,
  onClose,
  senderName,
  onRestartExperience
}) => {
  const [copied, setCopied] = useState(false);
  const [revealedLines, setRevealedLines] = useState(0);

  const finalLines = [
    `HAPPIEST BIRTHDAY, ${RECIPIENT_NAME.toUpperCase()}! 🎂💗`,
    `To my bestie, my chosen sister, my partner in random laughter, and my forever friend:`,
    `I hope your life is filled with beautiful opportunities, genuine happiness, courage, peaceful moments, and people who love and respect you for who you are.`,
    `Thank you for being a part of my world. I hope we keep making silly memories, sharing honest conversations, celebrating each other's wins, and finding reasons to laugh.`,
    `No matter where life takes us, I will always be grateful for this friendship.`,
    `You deserve the sweetest birthday and a beautiful year ahead.`,
    `BESTIES TODAY. BESTIES TOMORROW. BESTIES FOREVER. ♾️💗`
  ];

  useEffect(() => {
    if (isOpen) {
      setRevealedLines(0);
      confetti.burst({
        count: 85,
        shapes: ['heart', 'star', 'rect', 'circle'],
        colors: ['#F472B6', '#EC4899', '#FBBF24', '#FDA4AF', '#C084FC']
      });

      // Stagger reveal of lines
      const interval = setInterval(() => {
        setRevealedLines((prev) => {
          if (prev < finalLines.length) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 450);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReplay = () => {
    setRevealedLines(0);
    confetti.burst({
      count: 90,
      shapes: ['heart', 'star', 'rect']
    });
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealedLines(count);
      if (count >= finalLines.length) clearInterval(interval);
    }, 450);
  };

  const handleCopyWish = async () => {
    const fullText = finalLines.join('\n\n') + `\n\n— MADE ESPECIALLY FOR YOU, ${RECIPIENT_NAME} 💌\n14 • 10 • 2026\n${senderName}, ALWAYS. 💗`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const t = document.createElement('textarea');
        t.value = fullText;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#251020]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Grand Birthday Finale"
    >
      <div className="max-w-2xl w-full bg-gradient-to-b from-[#FFFDF9] via-white to-pink-50 border-2 border-pink-300 rounded-3xl p-6 sm:p-10 shadow-2xl relative my-auto animate-in zoom-in-95 duration-400 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 text-rose-900 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close Finale Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Huge Illuminated CSS Birthday Cake */}
        <div className="relative mx-auto my-3 flex flex-col items-center select-none scale-90 sm:scale-100">
          <div className="flex gap-4 mb-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-3 h-4 bg-gradient-to-t from-amber-400 to-yellow-200 rounded-full animate-flicker shadow-[0_0_14px_#F59E0B]" />
                <div className="w-0.5 h-1 bg-neutral-700" />
                <div className="w-2.5 h-7 bg-gradient-to-r from-pink-300 to-rose-200 rounded-t-xs" />
              </div>
            ))}
          </div>
          <div className="w-48 h-10 bg-gradient-to-r from-pink-200 via-white to-pink-200 rounded-t-xl border-t border-white shadow-inner flex items-center justify-center text-xs">
            ✨ 👑 ✨
          </div>
          <div className="w-64 h-12 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-2xl border-t-2 border-white shadow-md flex items-center justify-around px-4">
            <span className="text-xs font-black tracking-widest text-rose-950">HEMALI</span>
          </div>
          <div className="w-72 h-3.5 bg-gradient-to-r from-rose-200 via-white to-rose-200 rounded-full -mt-1 shadow-xs" />
        </div>

        {/* Center Animated Name */}
        <div className="my-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-pink-500">
            OCTOBER 14, 2026
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-rose-950 font-display mt-1">
            {RECIPIENT_NAME} 💗
          </h2>
        </div>

        {/* Staggered Line-by-Line Messages */}
        <div className="space-y-3.5 text-rose-950 text-sm sm:text-base leading-relaxed my-6 max-w-lg mx-auto text-center font-sans">
          {finalLines.map((line, idx) => {
            const isVisible = idx < revealedLines;
            return (
              <p
                key={idx}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                } ${
                  idx === 0
                    ? 'text-lg sm:text-xl font-black font-display text-pink-600'
                    : idx === finalLines.length - 1
                    ? 'font-black text-rose-950 font-display text-base sm:text-lg pt-2'
                    : 'text-rose-900/90 font-medium'
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>

        {/* Footer Signatures */}
        <div className="pt-4 border-t border-pink-200/80 my-4 text-xs sm:text-sm font-semibold text-pink-700 flex flex-col items-center gap-1">
          <div>MADE ESPECIALLY FOR YOU, {RECIPIENT_NAME} 💌</div>
          <div className="text-pink-400 text-xs">14 • 10 • 2026</div>
          <div className="text-base font-script font-bold text-rose-900">{senderName}, ALWAYS. 💗</div>
        </div>

        {/* 3 Working Functional Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleReplay}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>REPLAY THE GRAND FINALE 🎉</span>
          </button>

          <button
            onClick={handleCopyWish}
            className="px-5 py-2.5 rounded-full bg-white border border-pink-200 text-rose-900 hover:bg-pink-50 font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Wish Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-pink-500" />
                <span>COPY YOUR BIRTHDAY WISH 💌</span>
              </>
            )}
          </button>

          <button
            onClick={onRestartExperience}
            className="px-5 py-2.5 rounded-full bg-pink-50 border border-pink-200 text-rose-700 hover:bg-pink-100 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>START THE EXPERIENCE AGAIN ♾️</span>
          </button>
        </div>
      </div>
    </div>
  );
};
