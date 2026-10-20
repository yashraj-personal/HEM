import React, { useState, useEffect } from 'react';
import { Sparkles, Pin, Plus, X, Maximize2 } from 'lucide-react';
import { INITIAL_NOTES, RECIPIENT_NAME } from '../data/birthdayData';
import { NoteCard } from '../types';
import { confetti } from '../utils/confetti';

interface BirthdayWallProps {
  senderName: string;
}

export const BirthdayWallSection: React.FC<BirthdayWallProps> = ({ senderName }) => {
  const [notes, setNotes] = useState<NoteCard[]>(INITIAL_NOTES);
  const [selectedNote, setSelectedNote] = useState<NoteCard | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  // Escape key handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNote(null);
        setIsAddingNote(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newCard: NoteCard = {
      id: `custom-note-${Date.now()}`,
      text: newNoteText.trim(),
      author: senderName,
      color: "bg-rose-50 border-rose-200 text-rose-950",
      rotation: Math.random() > 0.5 ? "rotate-2" : "-rotate-2"
    };

    setNotes([newCard, ...notes]);
    setNewNoteText('');
    setIsAddingNote(false);
    confetti.burstHearts();
  };

  return (
    <section className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200/80 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>STICKY AFFIRMATION PINBOARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-display mb-2">
            LITTLE NOTES FOR MY FAVOURITE BESTIE 💌
          </h2>
          <p className="text-rose-900/70 text-sm sm:text-base">
            Click any sticky note to enlarge and reflect on its message.
          </p>
        </div>

        {/* Pinboard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-5 sm:p-7 rounded-2xl border-2 shadow-md hover:shadow-xl transition-all cursor-pointer group relative flex flex-col justify-between min-h-[140px] sm:min-h-[170px] ${note.color} ${note.rotation} hover:rotate-0 hover:scale-102`}
              role="button"
              tabIndex={0}
              aria-label={`Note: ${note.text}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedNote(note);
                }
              }}
            >
              {/* Pushpin at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-pink-400 border-2 border-white shadow-xs flex items-center justify-center text-white">
                <Pin className="w-3 h-3 fill-white" />
              </div>

              {/* Note Content */}
              <p className="text-sm sm:text-base font-bold font-display leading-snug my-auto pt-2">
                “{note.text}”
              </p>

              {/* Author footer */}
              <div className="mt-3 pt-2 border-t border-rose-200/50 flex items-center justify-between text-[11px] opacity-75">
                <span>From: {note.author}</span>
                <Maximize2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Add Note Button */}
        <div className="text-center">
          <button
            onClick={() => setIsAddingNote(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-pink-200 text-rose-900 hover:bg-pink-50 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-pink-500" />
            <span>Pin an Extra Note for {RECIPIENT_NAME}</span>
          </button>
        </div>

        {/* Enlarge Modal */}
        {selectedNote && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedNote(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged note"
          >
            <div
              className={`max-w-md w-full p-8 sm:p-10 rounded-3xl border-2 shadow-2xl relative animate-in zoom-in-95 ${selectedNote.color}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-rose-900 cursor-pointer shadow-xs"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-white mb-4">
                <Pin className="w-4 h-4 fill-white" />
              </div>

              <div className="text-xs uppercase tracking-wider font-bold text-pink-600 mb-2">
                Affirmation for {RECIPIENT_NAME}
              </div>

              <p className="text-xl sm:text-2xl font-extrabold font-display leading-relaxed my-4">
                “{selectedNote.text}”
              </p>

              <div className="mt-6 pt-4 border-t border-rose-200/60 flex items-center justify-between text-xs font-semibold">
                <span>Pinned with love</span>
                <span className="font-script text-lg text-pink-600">{selectedNote.author} 💌</span>
              </div>
            </div>
          </div>
        )}

        {/* Add Note Modal */}
        {isAddingNote && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setIsAddingNote(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Add note"
          >
            <div
              className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 relative animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsAddingNote(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-rose-900 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-rose-950 font-display mb-1">
                Pin a Little Note for {RECIPIENT_NAME} 💌
              </h3>
              <p className="text-xs text-rose-500 mb-4">
                Leave a sweet reminder on the birthday wall.
              </p>

              <form onSubmit={handleAddNote} className="space-y-4">
                <textarea
                  rows={3}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="e.g., You inspire me every single day..."
                  className="w-full p-3 rounded-2xl border border-pink-200 focus:outline-hidden focus:ring-2 focus:ring-pink-400 text-sm text-rose-950 resize-none bg-pink-50/30"
                  autoFocus
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-pink-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Pin Note 📌
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
