import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { DEFAULT_SENDER_NAME } from '../data/birthdayData';

interface SenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSenderName: string;
  onSaveSenderName: (name: string) => void;
}

export const SenderModal: React.FC<SenderModalProps> = ({
  isOpen,
  onClose,
  currentSenderName,
  onSaveSenderName
}) => {
  const [name, setName] = useState(currentSenderName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSaveSenderName(name.trim());
    } else {
      onSaveSenderName(DEFAULT_SENDER_NAME);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Customize Sender Name"
    >
      <div
        className="max-w-sm w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 relative animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-rose-900 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <h3 className="text-lg font-bold text-rose-950 font-display">
            Customize Sender Name
          </h3>
        </div>

        <p className="text-xs text-rose-800/70 mb-5">
          This updates the signature on Hemali's birthday letter, promises, and finale dispatches.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-rose-900 mb-1.5">
              Sender Name (Default: “{DEFAULT_SENDER_NAME}”)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Your Bestie, Diya, Ananya..."
              maxLength={30}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-hidden focus:ring-2 focus:ring-pink-400 text-sm font-semibold text-rose-950 bg-pink-50/40"
              autoFocus
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => {
                setName(DEFAULT_SENDER_NAME);
                onSaveSenderName(DEFAULT_SENDER_NAME);
                onClose();
              }}
              className="text-xs text-rose-500 hover:text-pink-600 underline cursor-pointer"
            >
              Reset to Default
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-md hover:from-pink-600 hover:to-rose-600 flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Name</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
