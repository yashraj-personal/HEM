import React from 'react';
import { X, Trophy, CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import { Milestone } from '../types';

interface MilestonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestones: Milestone[];
  onResetMilestones: () => void;
}

export const MilestonesModal: React.FC<MilestonesModalProps> = ({
  isOpen,
  onClose,
  milestones,
  onResetMilestones
}) => {
  if (!isOpen) return null;

  const completedCount = milestones.filter((m) => m.unlocked).length;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Friendship Discoveries Tracker"
    >
      <div
        className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 relative animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-rose-900 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-950 font-display">
              Bestie Surprises Discovered
            </h3>
            <div className="text-xs text-pink-600 font-semibold">
              {completedCount} of {milestones.length} Milestones Achieved
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-pink-100 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300"
            style={{ width: `${(completedCount / milestones.length) * 100}%` }}
          />
        </div>

        {/* Milestone List */}
        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 mb-6">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`p-3 rounded-2xl border flex items-center justify-between text-xs sm:text-sm font-semibold transition-colors ${
                milestone.unlocked
                  ? 'bg-pink-50/70 border-pink-200 text-rose-950'
                  : 'bg-neutral-50/60 border-neutral-200 text-neutral-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{milestone.icon}</span>
                <span>{milestone.label}</span>
              </div>
              {milestone.unlocked ? (
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-neutral-300 shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-pink-100">
          <button
            onClick={onResetMilestones}
            className="text-xs text-rose-500 hover:text-pink-600 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset progress</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Got It! 💗
          </button>
        </div>
      </div>
    </div>
  );
};
