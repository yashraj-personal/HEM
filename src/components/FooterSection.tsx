import React, { useState } from 'react';
import { Heart, Sparkles, Share2, Copy, Check } from 'lucide-react';
import { RECIPIENT_NAME, BIRTHDAY_DATE, CORE_THEME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

interface FooterSectionProps {
  onOpenFinale: () => void;
  senderName: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenFinale, senderName }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleShare = async () => {
    const shareData = {
      title: `Hemali: My Bestie Forever 🎂💗`,
      text: `Happy Birthday Hemali! A special birthday surprise crafted just for you 💗`,
      url: window.location.href
    };

    if (navigator?.share) {
      try {
        await navigator.share(shareData);
        setShareFeedback("Shared successfully! 💗");
        setTimeout(() => setShareFeedback(null), 3000);
      } catch {
        // User cancelled or unsupported
      }
    } else {
      // Fallback: Copy URL
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(window.location.href);
        }
        setCopiedLink(true);
        setShareFeedback("Website link copied to clipboard! 💌");
        setTimeout(() => {
          setCopiedLink(false);
          setShareFeedback(null);
        }, 3000);
      } catch {
        setShareFeedback("Could not copy link automatically.");
        setTimeout(() => setShareFeedback(null), 3000);
      }
    }
  };

  const handleCopyWish = async () => {
    const text = `Happy Birthday Hemali! 💗🎂 May your year be filled with pure joy, peace, and dreams that come true! Forever your bestie, ${senderName} 💌`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
      setShareFeedback("Birthday message copied to clipboard! 💌");
      setTimeout(() => setShareFeedback(null), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <footer id="finale" className="pt-16 pb-20 px-4 bg-gradient-to-b from-transparent via-pink-100/60 to-pink-200/50 border-t border-pink-200/80 relative">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Grand Finale Call-to-Action */}
        <div className="bg-white/95 border-2 border-pink-300 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-xl w-full mb-14 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center text-3xl shadow-md">
            👑
          </div>

          <div className="text-xs uppercase tracking-widest font-extrabold text-pink-500 mb-1">
            THE CLIMAX OF OUR SURPRISE
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-950 font-display mb-3">
            One Final Memory Awaits You ✨
          </h3>

          <p className="text-sm sm:text-base text-rose-900/80 mb-6">
            Whenever you are ready for the grand emotional revelation, tap below:
          </p>

          <button
            onClick={() => {
              confetti.burstHearts();
              onOpenFinale();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>HEMALI, ONE LAST SURPRISE… 💗</span>
          </button>
        </div>

        {/* Personalized Sharing Options */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={handleCopyWish}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-pink-200 hover:bg-pink-50 text-rose-900 font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4 text-pink-500" />
            <span>Copy Birthday Wish</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-pink-200 hover:bg-pink-50 text-rose-900 font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-pink-500" />
            <span>Share This Website</span>
          </button>
        </div>

        {shareFeedback && (
          <div className="mb-6 px-4 py-2 bg-pink-100/90 border border-pink-300 rounded-full text-xs font-semibold text-rose-900 animate-in fade-in flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{shareFeedback}</span>
          </div>
        )}

        {/* Core Theme Quote */}
        <div className="my-6 max-w-lg">
          <p className="text-xl sm:text-2xl font-bold font-script text-pink-700">
            “{CORE_THEME}”
          </p>
        </div>

        {/* Signature */}
        <div className="text-xs text-rose-900/60 font-medium space-y-1">
          <div>Crafted with infinite love for {RECIPIENT_NAME} on {BIRTHDAY_DATE}</div>
          <div className="text-pink-600 font-semibold">From {senderName} with all my heart 💗</div>
        </div>
      </div>
    </footer>
  );
};
