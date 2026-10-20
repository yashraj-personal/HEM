import React, { useState, useEffect, useRef } from 'react';
import { Mail, Heart, Sparkles, ChevronUp, FastForward, RotateCcw } from 'lucide-react';
import { RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

interface LetterSectionProps {
  senderName: string;
  onLetterOpened: () => void;
}

export const LetterSection: React.FC<LetterSectionProps> = ({ senderName, onLetterOpened }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Complete letter text array
  const letterParagraphs = [
    `Dear ${RECIPIENT_NAME},`,
    `Happiest Birthday to my favourite girl, my bestie, and my forever person! 💗🎂`,
    `I honestly don't know how to explain how special our friendship is to me. You're not just a friend I talk to; you're someone I want to share my happiness with, laugh with over the most random things, and make countless beautiful memories with.`,
    `Thank you for being a part of my life. Thank you for the laughs, the silly moments, the little conversations, and all the memories that make our friendship ours.`,
    `I wish you a life full of happiness, confidence, success, peace, genuine people, and dreams that come true. Never let anyone make you feel less than the wonderful person you are.`,
    `No matter how busy life gets or how much things change, I hope we always find our way back to our silly conversations, endless laughter, and our special bestie bond.`,
    `You're my bestie today, my bestie tomorrow, and my bestie forever. No replacement. No expiry date. Just us and our beautiful friendship. 🫂💗`,
    `Happy Birthday, Hemali! Keep smiling, keep shining, and never forget how loved and appreciated you are.`
  ];

  const fullLetterString = letterParagraphs.join('\n\n');

  const startTyping = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTypedLength(0);
    setIsTyping(true);

    let current = 0;
    const total = fullLetterString.length;

    timerRef.current = window.setInterval(() => {
      current += 3; // 3 characters per tick for smooth, lively typing
      if (current >= total) {
        setTypedLength(total);
        setIsTyping(false);
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setTypedLength(current);
      }
    }, 20);
  };

  const handleSkipTyping = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTypedLength(fullLetterString.length);
    setIsTyping(false);
  };

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      onLetterOpened();
      confetti.burstHearts();
      startTyping();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsOpen(false);
      setIsTyping(false);
      setTypedLength(0);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Compute what has been typed so far
  const currentTypedText = fullLetterString.slice(0, typedLength);
  const typedParagraphs = currentTypedText.split('\n\n');

  return (
    <section id="letter" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200/80 px-3 py-1 rounded-full mb-3">
            <Mail className="w-3.5 h-3.5 text-pink-500" />
            <span>HEARTFELT DISPATCH · TYPEWRITER EDITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            A Letter From Your Bestie 💌
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Written with every ounce of love, honest laughter, and forever gratitude.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative flex flex-col items-center">
          {!isOpen ? (
            /* Closed Envelope Card */
            <div
              onClick={handleToggle}
              className="w-full max-w-lg bg-gradient-to-br from-pink-50 to-rose-100/90 border-2 border-pink-200 rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all cursor-pointer group text-center relative overflow-hidden select-none"
            >
              {/* Envelope flap aesthetic */}
              <div className="absolute top-0 inset-x-0 h-24 bg-pink-200/40 rounded-b-[40%] border-b border-pink-200/70" />

              {/* Heart Wax Seal */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-pink-500/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 fill-white" />
              </div>

              <div className="relative z-10">
                <div className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-1 font-sans">
                  FOR THE BEST PERSON
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-950 font-display mb-3">
                  Dear {RECIPIENT_NAME}...
                </h3>
                <p className="text-sm text-rose-900/80 mb-6 max-w-xs mx-auto">
                  Click below to break the seal and watch the letter type out for you!
                </p>

                <button
                  type="button"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-md group-hover:from-pink-600 group-hover:to-rose-600 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>OPEN YOUR LETTER 💌</span>
                </button>
              </div>

              {/* Subtle stamp icon in top right */}
              <div className="absolute top-4 right-4 border-2 border-dashed border-pink-300 rounded p-1.5 rotate-3 opacity-70">
                <div className="text-[10px] font-bold text-pink-500 uppercase">14 OCT</div>
              </div>
            </div>
          ) : (
            /* Opened Letter Card */
            <div className="w-full bg-[#FFFDF9] border border-pink-200/90 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative animate-in fade-in zoom-in-95 duration-400">
              {/* Decorative paper headers */}
              <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-pink-600">
                  <Sparkles className="w-4 h-4" />
                  <span>SPECIAL BIRTHDAY EDITION</span>
                  {isTyping && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full animate-pulse">
                      ✍️ Typing...
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isTyping ? (
                    <button
                      onClick={handleSkipTyping}
                      className="text-xs text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-1 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200 cursor-pointer"
                    >
                      <FastForward className="w-3 h-3" />
                      <span>Skip typing</span>
                    </button>
                  ) : (
                    <button
                      onClick={startTyping}
                      className="text-xs text-rose-500 hover:text-pink-600 flex items-center gap-1 cursor-pointer"
                      title="Replay typing animation"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Re-type</span>
                    </button>
                  )}
                  <div className="text-xs text-rose-400 font-medium ml-1">
                    October 14, 2026
                  </div>
                </div>
              </div>

              {/* Letter Content with Typewriter Rendering */}
              <div className="space-y-4 sm:space-y-5 text-rose-950/90 text-sm sm:text-base leading-relaxed font-sans min-h-[320px]">
                {typedParagraphs.map((paragraph, idx) => {
                  const isCurrentLast = idx === typedParagraphs.length - 1;
                  const isHeading = idx === 0;
                  const isSubHeading = idx === 1;
                  const isHighlight = idx === 4;

                  return (
                    <div
                      key={idx}
                      className={`${
                        isHeading
                          ? 'text-lg sm:text-xl font-bold text-rose-950 font-display'
                          : isSubHeading
                          ? 'font-medium text-pink-800 text-base sm:text-lg'
                          : isHighlight
                          ? 'bg-pink-50/70 border-l-4 border-pink-400 p-3 sm:p-4 rounded-r-xl italic text-rose-900'
                          : idx === 6
                          ? 'font-semibold text-rose-900'
                          : ''
                      }`}
                    >
                      <span>{paragraph}</span>
                      {isTyping && isCurrentLast && (
                        <span className="inline-block w-1.5 h-4 ml-1 bg-pink-500 animate-pulse align-middle" />
                      )}
                    </div>
                  );
                })}

                {/* Sign-off revealed once main body typing is complete or almost complete */}
                {typedLength >= fullLetterString.length * 0.95 && (
                  <div className="pt-6 border-t border-pink-100/80 flex flex-col items-end animate-in fade-in duration-500">
                    <div className="text-sm text-rose-900/80 font-medium">Forever your bestie,</div>
                    <div className="text-2xl sm:text-3xl font-script text-pink-600 font-bold tracking-wide mt-1">
                      {senderName} 💌
                    </div>
                  </div>
                )}
              </div>

              {/* Close / fold back button */}
              <div className="mt-8 pt-4 flex justify-center">
                <button
                  onClick={handleToggle}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-pink-600 py-1.5 px-4 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors cursor-pointer"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Fold letter back into envelope</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
