import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Music } from 'lucide-react';

interface YouTubeMusicPlayerProps {
  videoId?: string;
  startSeconds?: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubeMusicPlayer: React.FC<YouTubeMusicPlayerProps> = ({
  videoId = 'EatzcaVJRMs',
  startSeconds = 20,
  isPlaying,
  onTogglePlay
}) => {
  const [playerReady, setPlayerReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);

  // Load YouTube IFrame API strictly for audio playback (zero video display)
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player('yt-audio-container', {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            start: startSeconds,
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1
          },
          events: {
            onReady: (event: any) => {
              setPlayerReady(true);
              event.target.seekTo(startSeconds, true);
              if (isPlaying) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              // audio state handled cleanly
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }
    };
  }, [videoId, startSeconds]);

  // Sync play state
  useEffect(() => {
    if (!playerRef.current || !playerReady) return;
    try {
      if (isPlaying) {
        const curTime = playerRef.current.getCurrentTime?.() || 0;
        if (curTime < 1) {
          playerRef.current.seekTo(startSeconds, true);
        }
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch {
      // ignore
    }
  }, [isPlaying, playerReady, startSeconds]);

  const handleRestartAt20 = () => {
    if (!playerRef.current) return;
    try {
      playerRef.current.seekTo(startSeconds, true);
      playerRef.current.playVideo();
      if (!isPlaying) onTogglePlay();
    } catch {
      // ignore
    }
  };

  const handleToggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      {/* Hidden iframe element - strictly zero video visible, audio only */}
      <div
        id="yt-audio-container"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          top: '-9999px',
          left: '-9999px'
        }}
        aria-hidden="true"
      />

      {/* Floating Cute Music Pill (Audio Only) */}
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-pink-200/90 shadow-2xl rounded-full p-1.5 pl-2.5 pr-2 text-rose-900 transition-all hover:shadow-pink-300/50">
        {/* Animated Vinyl Icon */}
        <div className="relative w-8 h-8 flex items-center justify-center select-none">
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 border border-neutral-700 flex items-center justify-center shadow-md ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3.5s' }}
          >
            <div className="w-3 h-3 rounded-full bg-pink-500 border border-white/60 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-black" />
            </div>
          </div>

          {/* Equalizer indicator */}
          {isPlaying && (
            <div className="absolute -top-1 -right-1 flex items-end gap-0.5 bg-rose-500/90 px-1 py-0.5 rounded-full">
              <span className="w-0.5 h-2 bg-white animate-pulse" />
              <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-white animate-pulse delay-150" />
            </div>
          )}
        </div>

        {/* Audio Track Info */}
        <div className="text-left hidden sm:block pr-1 select-none">
          <div className="text-[11px] font-bold text-rose-950 flex items-center gap-1">
            <span>Hemali's Song</span>
            <span className="text-[10px] text-pink-500 font-semibold">(from 0:20)</span>
          </div>
          <div className="text-[9px] text-rose-500 font-medium">
            {isPlaying ? '♪ Audio Playing 💗' : 'Tap to Play 🎶'}
          </div>
        </div>

        {/* Play / Pause button */}
        <button
          onClick={onTogglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-95 cursor-pointer ${
            isPlaying
              ? 'bg-rose-500 hover:bg-rose-600'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
          }`}
          title={isPlaying ? 'Pause music' : 'Play music from 0:20'}
          aria-label={isPlaying ? 'Pause music' : 'Play music from 0:20'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Restart from 0:20 */}
        <button
          onClick={handleRestartAt20}
          className="p-1.5 rounded-full text-rose-700 hover:text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer"
          title="Restart song from 0:20"
          aria-label="Restart song from 0:20"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Mute toggle */}
        <button
          onClick={handleToggleMute}
          className="p-1.5 rounded-full text-rose-700 hover:text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
