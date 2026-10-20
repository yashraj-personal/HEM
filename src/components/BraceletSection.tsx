import React, { useState } from 'react';
import { Sparkles, Heart, RotateCcw, Check } from 'lucide-react';
import { RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

interface CharmBead {
  id: string;
  symbol: string;
  color: string;
  label: string;
}

const AVAILABLE_CHARMS: CharmBead[] = [
  { id: 'b-h', symbol: 'H', color: 'bg-pink-400 text-white', label: 'H' },
  { id: 'b-e', symbol: 'E', color: 'bg-rose-400 text-white', label: 'E' },
  { id: 'b-m', symbol: 'M', color: 'bg-purple-400 text-white', label: 'M' },
  { id: 'b-a', symbol: 'A', color: 'bg-amber-400 text-white', label: 'A' },
  { id: 'b-l', symbol: 'L', color: 'bg-fuchsia-400 text-white', label: 'L' },
  { id: 'b-i', symbol: 'I', color: 'bg-pink-400 text-white', label: 'I' },
  { id: 'b-heart', symbol: '💖', color: 'bg-rose-200 text-rose-800', label: 'Heart' },
  { id: 'b-flower', symbol: '🌸', color: 'bg-pink-200 text-pink-800', label: 'Bloom' },
  { id: 'b-star', symbol: '⭐', color: 'bg-amber-200 text-amber-800', label: 'Star' },
  { id: 'b-bow', symbol: '🎀', color: 'bg-rose-200 text-rose-800', label: 'Bow' },
  { id: 'b-crown', symbol: '👑', color: 'bg-yellow-200 text-yellow-800', label: 'Queen' },
  { id: 'b-inf', symbol: '♾️', color: 'bg-purple-200 text-purple-800', label: 'Forever' }
];

const DEFAULT_BEADS: CharmBead[] = [
  AVAILABLE_CHARMS[9], // 🎀
  AVAILABLE_CHARMS[0], // H
  AVAILABLE_CHARMS[1], // E
  AVAILABLE_CHARMS[2], // M
  AVAILABLE_CHARMS[3], // A
  AVAILABLE_CHARMS[4], // L
  AVAILABLE_CHARMS[5], // I
  AVAILABLE_CHARMS[6], // 💖
  AVAILABLE_CHARMS[11] // ♾️
];

export const BraceletSection: React.FC = () => {
  const [threadedBeads, setThreadedBeads] = useState<CharmBead[]>(DEFAULT_BEADS);
  const [isWorn, setIsWorn] = useState(false);

  const handleAddBead = (charm: CharmBead) => {
    if (threadedBeads.length >= 14) return;
    setThreadedBeads([...threadedBeads, charm]);
    musicBox.playChime(783.99, 0.05);
  };

  const handleRemoveBead = (index: number) => {
    const updated = [...threadedBeads];
    updated.splice(index, 1);
    setThreadedBeads(updated);
  };

  const handleTieBracelet = () => {
    setIsWorn(true);
    musicBox.playSealChime();
    confetti.burst({
      count: 65,
      shapes: ['heart', 'star']
    });
  };

  const handleReset = () => {
    setThreadedBeads(DEFAULT_BEADS);
    setIsWorn(false);
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-purple-50/40 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-white border border-purple-200/80 px-3.5 py-1 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>DIY BESTIE FRIENDSHIP BRACELET</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            THREAD OUR BESTIE BRACELET 🎀✨
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Customize our eternal friendship wristband with pastel beads and charms!
          </p>
        </div>

        {/* Bracelet Display Box */}
        <div className="bg-white/95 border-2 border-pink-200 rounded-3xl p-6 sm:p-10 shadow-xl max-w-2xl mx-auto">
          {/* Golden Cord & Threaded Beads */}
          <div className="relative py-10 flex items-center justify-center min-h-[120px] overflow-x-auto">
            {/* Golden Silk Cord line */}
            <div className="absolute inset-x-4 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 rounded-full shadow-xs -z-0" />

            {/* Threaded Beads Row */}
            <div className="flex items-center gap-1.5 sm:gap-2 z-10 px-4 py-2">
              {threadedBeads.map((bead, idx) => (
                <button
                  key={`${bead.id}-${idx}`}
                  onClick={() => handleRemoveBead(idx)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${bead.color} border-2 border-white shadow-md flex items-center justify-center text-xs sm:text-sm font-black transition-transform hover:scale-115 active:scale-95 cursor-pointer relative group`}
                  title="Tap to remove bead"
                >
                  {bead.symbol}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] bg-neutral-800 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Remove
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bead Tray Picker */}
          <div className="mt-4 pt-6 border-t border-pink-100">
            <div className="text-xs font-bold text-rose-950 mb-3">
              Tap beads to add to the bracelet (Max 14 beads):
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto mb-6">
              {AVAILABLE_CHARMS.map((charm) => (
                <button
                  key={charm.id}
                  onClick={() => handleAddBead(charm)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${charm.color} border-2 border-white shadow-sm flex items-center justify-center text-xs sm:text-sm font-black hover:scale-110 active:scale-95 transition-transform cursor-pointer`}
                  title={`Add ${charm.label} bead`}
                >
                  {charm.symbol}
                </button>
              ))}
            </div>

            {/* Bracelet Action Controls */}
            {!isWorn ? (
              <button
                onClick={handleTieBracelet}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center gap-2 mx-auto cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Tie & Wear Our Bestie Bracelet 🎀</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 animate-in zoom-in-95 duration-300">
                <div className="text-xs uppercase font-extrabold text-pink-600 mb-1 flex items-center justify-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>BRACELET TIED WITH LOVE</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-rose-950 font-display">
                  Twin Sister Charm Activated for {RECIPIENT_NAME}! 💖
                </h4>
                <p className="text-xs text-rose-800/80 mt-1">
                  “A golden thread connecting our hearts no matter the distance.”
                </p>
                <button
                  onClick={handleReset}
                  className="mt-3 text-xs text-rose-500 hover:text-pink-600 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restyle Bracelet</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
