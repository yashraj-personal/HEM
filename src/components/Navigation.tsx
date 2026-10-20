import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Menu, X, Sparkles, Heart, Award, CloudRain, Music } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';
import { Milestone } from '../types';

interface NavigationProps {
  milestones: Milestone[];
  senderName: string;
  onOpenSenderModal: () => void;
  onOpenMilestonesModal: () => void;
  isHeartRainActive: boolean;
  onToggleHeartRain: () => void;
  isSongPlaying: boolean;
  onToggleSong: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  milestones,
  senderName,
  onOpenSenderModal,
  onOpenMilestonesModal,
  isHeartRainActive,
  onToggleHeartRain,
  isSongPlaying,
  onToggleSong
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioState, setAudioState] = useState({ isPlaying: false, isMuted: false });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return musicBox.subscribe(setAudioState);
  }, []);

  const completedMilestones = milestones.filter(m => m.unlocked).length;

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'LETTER', href: '#letter' },
    { label: 'PROMISES', href: '#promises' },
    { label: 'GAMES', href: '#games' },
    { label: 'COMPLIMENTS', href: '#compliments' },
    { label: 'WISHES', href: '#wishes' },
    { label: 'FINAL SURPRISE', href: '#finale' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-pink-100/70 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Title */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 group text-left"
        >
          <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 fill-pink-400" />
          </span>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide text-rose-950 font-display">
              <span>HEMALI</span>
              <span className="text-pink-400 text-xs font-normal">· 14 OCT 2026</span>
            </div>
            <div className="text-[11px] text-pink-600/80 font-medium tracking-tight">
              From {senderName} 💌
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold tracking-wider text-rose-900/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-pink-600 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-pink-400 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls: Heart Rain + YouTube Song + Milestones + Sender Edit */}
        <div className="flex items-center gap-2">
          {/* Global Heart Rain Toggle Button */}
          <button
            onClick={onToggleHeartRain}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isHeartRainActive
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-300 ring-2 ring-pink-300 animate-pulse'
                : 'bg-white/90 hover:bg-pink-50 border border-pink-300 text-pink-700 hover:text-pink-800'
            }`}
            title="Trigger a shower of falling hearts across the screen!"
            aria-label="Toggle Heart Rain Shower"
          >
            <CloudRain className={`w-3.5 h-3.5 ${isHeartRainActive ? 'text-white' : 'text-pink-500'}`} />
            <span className="hidden sm:inline">
              {isHeartRainActive ? 'Raining Hearts 💗' : 'Heart Rain 🌧️'}
            </span>
            <span className="sm:hidden">
              {isHeartRainActive ? '🌧️💗' : '🌧️'}
            </span>
          </button>

          {/* YouTube Bestie Song Button (from 0:20) */}
          <button
            onClick={onToggleSong}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer ${
              isSongPlaying
                ? 'bg-rose-500 text-white shadow-rose-200'
                : 'bg-pink-50 hover:bg-pink-100/90 text-rose-900 border border-pink-200'
            }`}
            title={isSongPlaying ? 'Pause song' : 'Play song (from 0:20)'}
            aria-label={isSongPlaying ? 'Pause song' : 'Play song from 0:20'}
          >
            <Music className={`w-3.5 h-3.5 ${isSongPlaying ? 'animate-bounce text-white' : 'text-pink-500'}`} />
            <span className="hidden md:inline">
              {isSongPlaying ? 'Song Playing 🎶' : 'Play Song (0:20) 🎵'}
            </span>
          </button>

          {/* Milestone progress button */}
          <button
            onClick={onOpenMilestonesModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-pink-50 border border-pink-200/80 hover:bg-pink-100/80 text-rose-900 text-xs font-medium transition-all"
            title="View discovered surprises"
            aria-label="View surprises progress"
          >
            <Award className="w-3.5 h-3.5 text-pink-500" />
            <span className="font-semibold text-pink-600">{completedMilestones}/8</span>
            <span className="hidden lg:inline text-rose-800/80 text-[11px]">Surprises</span>
          </button>

          {/* Optional Ambient Music Box Synth (secondary/offline chime) */}
          <div className="hidden sm:flex items-center bg-pink-50/90 rounded-full border border-pink-200/70 p-0.5">
            <button
              onClick={() => musicBox.togglePlay()}
              className={`p-1.5 rounded-full transition-colors ${
                audioState.isPlaying
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-rose-700 hover:text-pink-600'
              }`}
              title={audioState.isPlaying ? 'Pause music box chimes' : 'Play music box chimes'}
              aria-label={audioState.isPlaying ? 'Pause music box' : 'Play music box'}
            >
              {audioState.isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Quick Customize Sender Button */}
          <button
            onClick={onOpenSenderModal}
            className="hidden md:flex items-center gap-1 text-xs text-rose-700 hover:text-pink-600 bg-white/70 hover:bg-white border border-pink-200 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
            title="Edit sender name"
          >
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>Customize</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 text-rose-900 hover:text-pink-600 rounded-md cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-md border-b border-pink-100 px-6 py-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 text-sm font-medium text-rose-900">
            {/* Quick Actions in Mobile Drawer */}
            <div className="flex items-center gap-2 pb-2 border-b border-pink-100">
              <button
                onClick={() => {
                  onToggleHeartRain();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-pink-100 text-pink-700 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <CloudRain className="w-3.5 h-3.5" />
                <span>{isHeartRainActive ? 'Stop Heart Rain' : 'Start Heart Rain 🌧️💗'}</span>
              </button>
              <button
                onClick={() => {
                  onToggleSong();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Music className="w-3.5 h-3.5" />
                <span>{isSongPlaying ? 'Pause Song' : 'Play Song (0:20)'}</span>
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-1.5 border-b border-pink-50 hover:text-pink-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSenderModal();
                }}
                className="text-xs text-pink-600 font-medium flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Change sender name (Current: {senderName})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
