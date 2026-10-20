/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { HeartRain } from './components/HeartRain';
import { ClickSparkles } from './components/ClickSparkles';
import { CursorTrail } from './components/CursorTrail';
import { BestieMascot } from './components/BestieMascot';
import { Navigation } from './components/Navigation';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HeroSection } from './components/HeroSection';
import { CakeCuttingSection } from './components/CakeCuttingSection';
import { BraceletSection } from './components/BraceletSection';
import { LetterSection } from './components/LetterSection';
import { ContractSection } from './components/ContractSection';
import { QuizSection } from './components/QuizSection';
import { MemoryGameSection } from './components/MemoryGameSection';
import { LuckyStarSection } from './components/LuckyStarSection';
import { CandleWishSection } from './components/CandleWishSection';
import { ThisOrThatSection } from './components/ThisOrThatSection';
import { ComplimentMachine } from './components/ComplimentMachine';
import { InfinitySection } from './components/InfinitySection';
import { WishGeneratorSection } from './components/WishGeneratorSection';
import { GiftBoxesSection } from './components/GiftBoxesSection';
import { BirthdayWallSection } from './components/BirthdayWallSection';
import { GrandFinaleModal } from './components/GrandFinaleModal';
import { FooterSection } from './components/FooterSection';
import { MilestonesModal } from './components/MilestonesModal';
import { SenderModal } from './components/SenderModal';
import { YouTubeMusicPlayer } from './components/YouTubeMusicPlayer';
import { Milestone, MilestoneId } from './types';
import { DEFAULT_SENDER_NAME } from './data/birthdayData';
import { musicBox } from './utils/audioSynth';

const INITIAL_MILESTONES: Milestone[] = [
  { id: 'welcome_opened', label: 'Opened Welcome Surprise', icon: '🎁', unlocked: false },
  { id: 'letter_read', label: 'Unfolded Bestie Letter', icon: '💌', unlocked: false },
  { id: 'contract_sealed', label: 'Sealed Friendship Contract', icon: '🤝', unlocked: false },
  { id: 'quiz_completed', label: 'Mastered Bestie Quiz', icon: '👑', unlocked: false },
  { id: 'memory_won', label: 'Matched Bestie Pairs', icon: '🧠', unlocked: false },
  { id: 'candles_blown', label: 'Extinguished 5 Wishes', icon: '✨', unlocked: false },
  { id: 'gifts_opened', label: 'Unwrapped 3 Gift Boxes', icon: '🎀', unlocked: false },
  { id: 'finale_viewed', label: 'Viewed Grand Finale', icon: '🎉', unlocked: false }
];

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [senderName, setSenderName] = useState<string>(() => {
    return localStorage.getItem('hemali_bestie_sender') || DEFAULT_SENDER_NAME;
  });
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [milestoneToast, setMilestoneToast] = useState<string | null>(null);

  // Global Heart Rain Shower State
  const [isHeartRainActive, setIsHeartRainActive] = useState(false);

  // YouTube Song State (starts at 20 seconds)
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  // Modals
  const [isFinaleOpen, setIsFinaleOpen] = useState(false);
  const [isMilestonesModalOpen, setIsMilestonesModalOpen] = useState(false);
  const [isSenderModalOpen, setIsSenderModalOpen] = useState(false);

  // Auto-start music on first tap anywhere on the screen!
  useEffect(() => {
    const handleFirstTapAnywhere = () => {
      setIsSongPlaying(true);
    };

    window.addEventListener('click', handleFirstTapAnywhere, { once: true });
    window.addEventListener('touchstart', handleFirstTapAnywhere, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstTapAnywhere);
      window.removeEventListener('touchstart', handleFirstTapAnywhere);
    };
  }, []);

  // Unlock milestone helper
  const unlockMilestone = (id: MilestoneId) => {
    setMilestones((prev) => {
      const target = prev.find((m) => m.id === id);
      if (target && !target.unlocked) {
        setMilestoneToast(`Surprise Unlocked: ${target.label} ${target.icon}`);
        setTimeout(() => setMilestoneToast(null), 3500);
        return prev.map((m) => (m.id === id ? { ...m, unlocked: true } : m));
      }
      return prev;
    });
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    unlockMilestone('welcome_opened');
  };

  const handleSaveSenderName = (name: string) => {
    setSenderName(name);
    localStorage.setItem('hemali_bestie_sender', name);
  };

  const handleResetMilestones = () => {
    setMilestones(INITIAL_MILESTONES);
    setIsMilestonesModalOpen(false);
  };

  const handleRestartExperience = () => {
    setIsFinaleOpen(false);
    setShowWelcome(true);
    setMilestones(INITIAL_MILESTONES);
    setIsSongPlaying(false);
    setIsHeartRainActive(false);
    musicBox.stop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCandles = () => {
    const el = document.getElementById('candles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLetter = () => {
    const el = document.getElementById('letter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleHeartRain = () => {
    setIsHeartRainActive((prev) => !prev);
  };

  const handleToggleSong = () => {
    setIsSongPlaying((prev) => !prev);
    if (!isSongPlaying) {
      musicBox.stop();
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-pink-200 selection:text-rose-900">
      {/* Background Ambient Effects */}
      <BackgroundEffects />

      {/* Tap-Anywhere Sparkle & Floating Heart Burst Effect */}
      <ClickSparkles />

      {/* Subtle Global Cursor & Touch Trail Effect (Hearts & Stars) */}
      <CursorTrail />

      {/* Global CSS Heart Rain Shower */}
      <HeartRain
        isActive={isHeartRainActive}
        durationMs={9500}
        onFinish={() => setIsHeartRainActive(false)}
      />

      {/* Interactive Bestie Cheer Mascot */}
      <BestieMascot />

      {/* Secret Welcome Screen (Scene 1 & 2) */}
      {showWelcome && (
        <WelcomeScreen
          onComplete={handleWelcomeComplete}
          senderName={senderName}
          onStartMusic={() => setIsSongPlaying(true)}
        />
      )}

      {/* Main Website Navigation Header */}
      <Navigation
        milestones={milestones}
        senderName={senderName}
        onOpenSenderModal={() => setIsSenderModalOpen(true)}
        onOpenMilestonesModal={() => setIsMilestonesModalOpen(true)}
        isHeartRainActive={isHeartRainActive}
        onToggleHeartRain={handleToggleHeartRain}
        isSongPlaying={isSongPlaying}
        onToggleSong={handleToggleSong}
      />

      {/* Main Sections Content */}
      <main className="flex-1 relative z-10">
        {/* Scene 3: Grand Birthday Hero */}
        <HeroSection
          onScrollToCandles={scrollToCandles}
          onScrollToLetter={scrollToLetter}
        />

        {/* Interactive Cake Cutting Ceremony (100% Pure CSS) */}
        <CakeCuttingSection />

        {/* Interactive Bestie Friendship Bracelet Studio */}
        <BraceletSection />

        {/* Scene 4: A Letter from Your Bestie (With Typewriter Typing Effect) */}
        <LetterSection
          senderName={senderName}
          onLetterOpened={() => unlockMilestone('letter_read')}
        />

        {/* Scene 5: Our Bestie Promise (Contract) */}
        <ContractSection
          senderName={senderName}
          onContractSealed={() => unlockMilestone('contract_sealed')}
        />

        {/* Scene 6: The Bestie Quiz Game */}
        <QuizSection
          onQuizCompleted={() => unlockMilestone('quiz_completed')}
        />

        {/* Scene 7: The Friendship Memory Game */}
        <MemoryGameSection
          onGameWon={() => unlockMilestone('memory_won')}
        />

        {/* Cosmic Origami Lucky Stars */}
        <LuckyStarSection />

        {/* Scene 8: The Candle Wish Game */}
        <CandleWishSection
          onAllCandlesBlown={() => unlockMilestone('candles_blown')}
        />

        {/* Scene 9: Bestie Would You Rather */}
        <ThisOrThatSection />

        {/* Scene 10: The Compliment Machine */}
        <ComplimentMachine />

        {/* Scene 11: The Friendship Infinity Universe */}
        <InfinitySection />

        {/* Scene 12: The Birthday Wish Generator */}
        <WishGeneratorSection
          onWishGenerated={() => {}}
        />

        {/* Scene 13: The Bestie Gift Box */}
        <GiftBoxesSection
          onAllGiftsOpened={() => unlockMilestone('gifts_opened')}
        />

        {/* Scene 14: The Birthday Wall */}
        <BirthdayWallSection
          senderName={senderName}
        />
      </main>

      {/* Scene 17 & Climax Trigger Footer */}
      <FooterSection
        onOpenFinale={() => {
          setIsFinaleOpen(true);
          unlockMilestone('finale_viewed');
        }}
        senderName={senderName}
      />

      {/* YouTube Music Player Floating Controller (Plays from 0:20 with spinning vinyl record) */}
      <YouTubeMusicPlayer
        videoId="EatzcaVJRMs"
        startSeconds={20}
        isPlaying={isSongPlaying}
        onTogglePlay={handleToggleSong}
      />

      {/* Scene 15: Grand Birthday Finale Modal */}
      <GrandFinaleModal
        isOpen={isFinaleOpen}
        onClose={() => setIsFinaleOpen(false)}
        senderName={senderName}
        onRestartExperience={handleRestartExperience}
      />

      {/* Milestones Tracker Modal */}
      <MilestonesModal
        isOpen={isMilestonesModalOpen}
        onClose={() => setIsMilestonesModalOpen(false)}
        milestones={milestones}
        onResetMilestones={handleResetMilestones}
      />

      {/* Sender Customization Modal */}
      <SenderModal
        isOpen={isSenderModalOpen}
        onClose={() => setIsSenderModalOpen(false)}
        currentSenderName={senderName}
        onSaveSenderName={handleSaveSenderName}
      />

      {/* Milestone Toast Notification */}
      {milestoneToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-rose-950/90 text-white border border-pink-400 px-4 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <span>✨</span>
          <span>{milestoneToast}</span>
        </div>
      )}
    </div>
  );
}
