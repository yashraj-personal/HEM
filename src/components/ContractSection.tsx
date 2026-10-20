import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { FRIENDSHIP_PROMISES, RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

interface ContractSectionProps {
  senderName: string;
  onContractSealed: () => void;
}

export const ContractSection: React.FC<ContractSectionProps> = ({
  senderName,
  onContractSealed
}) => {
  const [isSealed, setIsSealed] = useState(false);

  const handleSeal = () => {
    setIsSealed(true);
    onContractSealed();
    confetti.burst({
      count: 65,
      shapes: ['heart', 'star', 'rect'],
      colors: ['#F472B6', '#EC4899', '#FBBF24', '#FDA4AF', '#C084FC']
    });
    musicBox.playSealChime();
  };

  return (
    <section id="promises" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-pink-50/50 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-white border border-pink-200/80 px-3 py-1 rounded-full mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
            <span>BINDING BOND OF AFFECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            OUR FRIENDSHIP CONTRACT 🤝💗
          </h2>
          <p className="text-pink-700/80 text-sm sm:text-base font-medium">
            Officially besties. Permanently annoying each other.
          </p>
        </div>

        {/* Contract Parchment Card */}
        <div className="bg-white/90 backdrop-blur-sm border border-pink-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Background watermark */}
          <div className="absolute right-4 bottom-4 text-pink-100/40 text-9xl font-display pointer-events-none select-none">
            ♾️
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-pink-100 pb-4 mb-8 gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-pink-500">
                Official Bestie Charter
              </span>
              <h3 className="text-lg font-bold text-rose-950">
                Between {RECIPIENT_NAME} & {senderName}
              </h3>
            </div>
            <div className="text-xs text-rose-500/80 bg-pink-50 px-3 py-1 rounded-full border border-pink-200/60">
              Validity: Infinite & Non-Transferable
            </div>
          </div>

          {/* 8 Promise Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {FRIENDSHIP_PROMISES.map((promise) => (
              <div
                key={promise.id}
                className="p-4 rounded-2xl bg-gradient-to-br from-pink-50/60 to-rose-50/40 border border-pink-100/90 hover:border-pink-300 transition-colors flex items-start gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-pink-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                  {promise.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-pink-500 uppercase tracking-wider">
                      {promise.badge}
                    </span>
                    <span className="text-xs text-rose-300">·</span>
                    <h4 className="text-sm font-bold text-rose-950">
                      {promise.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-900/80 leading-snug">
                    {promise.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Seal Button / Stamped State */}
          <div className="pt-6 border-t border-pink-100 flex flex-col items-center text-center">
            {!isSealed ? (
              <div>
                <button
                  onClick={handleSeal}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>SEAL OUR BESTIE CONTRACT 💗</span>
                </button>
                <p className="text-xs text-rose-400 mt-2">
                  Click to stamp this agreement forever
                </p>
              </div>
            ) : (
              <div className="animate-stamp flex flex-col items-center">
                {/* Official Wax / Digital Stamp */}
                <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xl border-2 border-white/60">
                  <CheckCircle2 className="w-6 h-6 text-amber-300" />
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-widest font-bold text-pink-100">
                      OFFICIALLY VERIFIED
                    </div>
                    <div className="text-base sm:text-lg font-black tracking-wide font-display">
                      CONTRACT SEALED. BESTIES FOREVER. ♾️
                    </div>
                  </div>
                </div>
                <p className="text-xs font-medium text-pink-700 mt-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>Sealed in our hearts on October 14, 2026</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
