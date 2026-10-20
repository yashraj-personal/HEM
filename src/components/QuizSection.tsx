import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, RECIPIENT_NAME } from '../data/birthdayData';
import { confetti } from '../utils/confetti';

interface QuizSectionProps {
  onQuizCompleted: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onQuizCompleted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number }>({});
  const [showWarning, setShowWarning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const isSelected = userAnswers[currentQ.id] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
    setShowWarning(false);
  };

  const handleNext = () => {
    if (!isSelected) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed quiz
      setIsCompleted(true);
      onQuizCompleted();
      confetti.burst({
        count: 70,
        shapes: ['heart', 'star', 'rect'],
        colors: ['#F472B6', '#FBBF24', '#C084FC', '#34D399', '#FDA4AF']
      });
    }
  };

  const handlePrev = () => {
    setShowWarning(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleReplay = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setShowWarning(false);
  };

  const score = calculateScore();

  return (
    <section id="games" className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200/80 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>INTERACTIVE CHALLENGE · 7 QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            HOW WELL DO YOU KNOW YOUR BESTIE? 👀
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Let's test that bestie energy! (A celebration of our core friendship values)
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white/95 backdrop-blur-md border border-pink-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {!isCompleted ? (
            <div>
              {/* Progress Bar & Header */}
              <div className="flex items-center justify-between text-xs font-semibold text-pink-600 mb-3">
                <span>QUESTION {currentIndex + 1} OF {totalQuestions}</span>
                <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}% COMPLETE</span>
              </div>
              <div className="w-full h-2 bg-pink-100 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-rose-950 mb-6 font-display">
                {currentQ.question}
              </h3>

              {/* 4 Selectable Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  const active = userAnswers[currentQ.id] === idx;
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        active
                          ? 'bg-pink-50 border-pink-500 text-rose-950 ring-2 ring-pink-400/30 font-medium'
                          : 'bg-white hover:bg-pink-50/50 border-pink-100 text-rose-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            active
                              ? 'bg-pink-500 text-white'
                              : 'bg-pink-100/70 text-pink-700'
                          }`}
                        >
                          {optionLetters[idx]}
                        </span>
                        <span className="text-sm sm:text-base">{option}</span>
                      </div>
                      {active && (
                        <CheckCircle className="w-5 h-5 text-pink-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Friendly Warning if skipped */}
              {showWarning && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Please select an option before moving to the next question, bestie! 💗</span>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl border border-pink-200 text-rose-700 hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
                >
                  <span>{currentIndex === totalQuestions - 1 ? 'Finish Quiz 🎉' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 animate-in zoom-in-95 duration-400">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center text-4xl shadow-xl shadow-pink-500/20">
                <Award className="w-10 h-10" />
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL BESTIE SCORE</span>
              </div>

              <h3 className="text-3xl font-extrabold text-rose-950 font-display mb-2">
                BESTIE BRAINPOWER: {score} / {totalQuestions}! 💖
              </h3>

              <p className="text-rose-900/80 text-sm sm:text-base max-w-md mx-auto mb-6">
                {score === totalQuestions
                  ? `Flawless 100%! You and ${RECIPIENT_NAME} are on the exact same wavelength. Soul sisters through and through!`
                  : `Incredible score! Our bestie bond is grounded in genuine trust, endless laughter, and absolute love.`}
              </p>

              {/* Badge Certificate Card */}
              <div className="max-w-sm mx-auto p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👑</span>
                  <div>
                    <div className="text-xs uppercase tracking-wide font-bold text-pink-600">
                      HONORARY BADGE
                    </div>
                    <div className="text-sm font-bold text-rose-950">
                      Certified Elite Bestie of {RECIPIENT_NAME}
                    </div>
                    <div className="text-[11px] text-rose-500">
                      Friendship energy verified 100% genuine
                    </div>
                  </div>
                </div>
              </div>

              {/* Replay Button */}
              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-pink-200 hover:bg-pink-50 text-rose-900 font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-pink-500" />
                <span>Play Quiz Again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
