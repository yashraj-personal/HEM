import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, Timer, Trophy } from 'lucide-react';
import { MemoryCard } from '../types';
import { confetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

interface MemoryGameSectionProps {
  onGameWon: () => void;
}

const SYMBOLS = ['💗', '🎀', '🌸', '⭐', '🦋', '🎂'];

export const MemoryGameSection: React.FC<MemoryGameSectionProps> = ({ onGameWon }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Initialize and shuffle 6 pairs = 12 cards
  const initializeGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const pairList = [...SYMBOLS, ...SYMBOLS];
    // Fisher-Yates shuffle
    for (let i = pairList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairList[i], pairList[j]] = [pairList[j], pairList[i]];
    }

    const initialCards: MemoryCard[] = pairList.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }));

    setCards(initialCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedCount(0);
    setIsLocked(false);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setIsGameWon(false);
  };

  useEffect(() => {
    initializeGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer runner
  useEffect(() => {
    if (isTimerRunning && !isGameWon) {
      timerRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isGameWon]);

  const handleCardClick = (index: number) => {
    // Prevent clicking if locked, already flipped, or matched
    if (isLocked) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    // Start timer on first move
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    // Play subtle soft chime
    musicBox.playChime(659.25, 0.04);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If 2 cards are flipped, evaluate
    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].symbol === cards[secondIdx].symbol) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            return updated;
          });
          setFlippedIndices([]);
          setIsLocked(false);
          const newMatched = matchedCount + 1;
          setMatchedCount(newMatched);

          // Check Win Condition
          if (newMatched === SYMBOLS.length) {
            setIsGameWon(true);
            setIsTimerRunning(false);
            onGameWon();
            confetti.burst({
              count: 65,
              shapes: ['heart', 'star', 'rect']
            });
          }
        }, 350);
      } else {
        // NO MATCH -> flip back after short delay
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 850);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-purple-50/40 to-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/80 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>BRAIN & MEMORY CHALLENGE · 6 PAIRS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            MATCH THE BESTIE PAIRS 🎀
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Flip, match, and unlock that unstoppable bestie brainpower!
          </p>
        </div>

        {/* Game Stats Bar */}
        <div className="max-w-md mx-auto flex items-center justify-between bg-white/80 backdrop-blur-sm border border-pink-200/90 rounded-2xl px-5 py-3 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-900">
            <Timer className="w-4 h-4 text-pink-500" />
            <span>Time: {formatTime(timerSeconds)}</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-rose-900">
            <span>Moves: </span>
            <span className="text-pink-600 font-bold">{moves}</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-rose-900">
            <span>Pairs: </span>
            <span className="text-purple-600 font-bold">{matchedCount}/6</span>
          </div>
        </div>

        {/* 12 Cards Grid (3 cols on small mobile, 4 cols on tablet/desktop) */}
        <div className="max-w-lg mx-auto grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {cards.map((card, idx) => {
            const isRevealed = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                disabled={isRevealed || isLocked}
                aria-label={`Card ${idx + 1}`}
                className="aspect-square relative rounded-2xl perspective-1000 focus:outline-hidden focus:ring-2 focus:ring-pink-400 cursor-pointer disabled:cursor-default"
              >
                <div
                  className={`w-full h-full relative transition-transform duration-500 transform-style-3d ${
                    isRevealed ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Card Back (Hidden state) */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200 border-2 border-white shadow-md flex items-center justify-center hover:scale-102 transition-transform select-none">
                    <span className="text-2xl opacity-60">✨</span>
                  </div>

                  {/* Card Front (Revealed state) */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 flex items-center justify-center text-3xl sm:text-4xl shadow-md select-none transition-colors ${
                      card.isMatched
                        ? 'bg-pink-100/90 border-pink-400 ring-2 ring-pink-300/60'
                        : 'bg-white border-pink-200'
                    }`}
                  >
                    <span>{card.symbol}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Win Modal / Banner */}
        {isGameWon && (
          <div className="max-w-md mx-auto bg-white/95 border-2 border-pink-300 rounded-3xl p-6 sm:p-8 text-center shadow-xl animate-in zoom-in-95 duration-400">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl">
              <Trophy className="w-8 h-8 text-pink-500" />
            </div>

            <h3 className="text-2xl font-black text-rose-950 font-display mb-1">
              BESTIE BRAIN UNLOCKED! 🧠💗
            </h3>

            <p className="text-pink-600 font-script text-lg mb-4">
              “Every little match deserves a celebration!”
            </p>

            <div className="bg-pink-50 rounded-2xl p-4 flex items-center justify-around text-xs sm:text-sm font-semibold text-rose-900 mb-6">
              <div>Total Moves: <span className="text-pink-600 font-bold">{moves}</span></div>
              <div>Time Taken: <span className="text-purple-600 font-bold">{formatTime(timerSeconds)}</span></div>
            </div>

            <button
              onClick={initializeGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        )}

        {/* Quick Reset Button if playing */}
        {!isGameWon && (
          <div className="text-center">
            <button
              onClick={initializeGame}
              className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-pink-600 font-medium py-1.5 px-3 rounded-full hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset & Reshuffle Cards</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
