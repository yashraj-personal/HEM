import React from 'react';
import { TwinklingCelestialCanvas } from './TwinklingCelestialCanvas';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Interactive Twinkling Starfield with Delayed Cursor Following */}
      <TwinklingCelestialCanvas />

      {/* Soft pastel ambient radial glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-200/35 blur-3xl" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute top-2/3 right-1/4 w-72 h-72 rounded-full bg-amber-100/40 blur-3xl" />

      {/* Floating CSS Hearts & Accents */}
      <div className="hidden sm:block">
        {/* Floating Heart 1 */}
        <div className="absolute top-24 left-[8%] text-pink-300/40 animate-float-slow select-none text-2xl">
          💗
        </div>
        {/* Floating Star 1 */}
        <div className="absolute top-44 right-[12%] text-amber-300/50 animate-float-reverse select-none text-xl">
          ✨
        </div>
        {/* Floating Heart 2 */}
        <div className="absolute top-[48%] left-[5%] text-rose-300/40 animate-float-reverse select-none text-3xl">
          🌸
        </div>
        {/* Floating Butterfly 1 */}
        <div className="absolute top-[62%] right-[7%] text-purple-300/40 animate-float-slow select-none text-2xl">
          🦋
        </div>
        {/* Floating Ribbon / Bow */}
        <div className="absolute top-[80%] left-[10%] text-pink-300/40 animate-float-slow select-none text-xl">
          🎀
        </div>
        {/* Floating Sparkle 2 */}
        <div className="absolute top-[90%] right-[15%] text-amber-300/50 animate-float-reverse select-none text-2xl">
          ⭐
        </div>
      </div>
    </div>
  );
};
