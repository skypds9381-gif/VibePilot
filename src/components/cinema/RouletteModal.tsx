import React, { useState, useEffect } from 'react';
import { X, Shuffle, Star, Ticket, Film, Sparkles, Play } from 'lucide-react';
import { MovieItem, MOVIE_DATABASE } from '../../data/movieDatabase';

interface RouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTicket: (movie: MovieItem) => void;
  onSelectDetail: (movie: MovieItem) => void;
}

export const RouletteModal: React.FC<RouletteModalProps> = ({
  isOpen,
  onClose,
  onOpenTicket,
  onSelectDetail
}) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [tempTitle, setTempTitle] = useState('행운의 영화를 뽑아보세요!');

  // Synthesize pleasant mechanical clicking sound for roulette
  const playClick = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio optional
    }
  };

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedMovie(null);

    let counter = 0;
    const totalSteps = 25;
    const intervalTime = 60;

    const interval = setInterval(() => {
      counter++;
      const randomIdx = Math.floor(Math.random() * MOVIE_DATABASE.length);
      setTempTitle(MOVIE_DATABASE[randomIdx].title);
      playClick();

      if (counter >= totalSteps) {
        clearInterval(interval);
        const finalWinner = MOVIE_DATABASE[Math.floor(Math.random() * MOVIE_DATABASE.length)];
        setSelectedMovie(finalWinner);
        setTempTitle(finalWinner.title);
        setSpinning(false);
      }
    }, intervalTime);
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedMovie(null);
      setTempTitle('행운의 영사기를 돌려보세요!');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#11131C] border border-amber-900/40 rounded-3xl shadow-2xl overflow-hidden text-stone-100 text-center">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#0C0E14]">
          <div className="flex items-center gap-2">
            <Shuffle className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-amber-300">
              POP-CORN ROULETTE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-1">
              결정장애 즉시 탈출! 영사기 룰렛
            </h3>
            <p className="text-xs text-stone-400">
              오늘 밤 운명이 골라주는 영화 한 편을 만나보세요.
            </p>
          </div>

          {/* Reel Display Window */}
          <div className="p-6 rounded-2xl bg-black border-2 border-amber-500/40 shadow-inner flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-stone-900 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-stone-900 to-transparent pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-mono text-amber-400/80 mb-2">
              <Film className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
              <span>{spinning ? '35mm 필름 고속 회전 중...' : 'NOW READY'}</span>
            </div>

            <div className={`text-2xl md:text-3xl font-serif font-bold text-amber-200 transition-transform ${
              spinning ? 'scale-105 blur-[0.5px]' : 'scale-100'
            }`}>
              {tempTitle}
            </div>

            {selectedMovie && (
              <p className="text-xs text-stone-400 mt-2 italic animate-in fade-in">
                {selectedMovie.originalTitle} ({selectedMovie.year}) · 평점 {selectedMovie.rating}
              </p>
            )}
          </div>

          {/* Winner details if stopped */}
          {selectedMovie && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-left space-y-2 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold font-mono">
                  🍿 {selectedMovie.highlightTag}
                </span>
                <span className="text-stone-300">⏱️ {selectedMovie.runtime}분</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed">
                {selectedMovie.synopsis}
              </p>
              <div className="text-[11px] text-amber-300/90 pt-1">
                추천 야식: {selectedMovie.snackPairing.food} + {selectedMovie.snackPairing.drink}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleSpin}
              disabled={spinning}
              className={`px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                spinning
                  ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-stone-950 hover:brightness-110 active:scale-95 shadow-amber-500/20'
              }`}
            >
              <Shuffle className="w-4 h-4 text-stone-950" />
              <span>{spinning ? '추첨 중...' : selectedMovie ? '다시 돌리기' : '룰렛 돌리기 (SPIN)'}</span>
            </button>

            {selectedMovie && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTicket(selectedMovie);
                }}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 border border-stone-700 transition-colors flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>티켓 발권하기</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
