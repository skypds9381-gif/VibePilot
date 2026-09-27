import React, { useState, useEffect, useRef } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipForward, 
  SkipBack, 
  Sparkles, 
  Music, 
  Disc,
  Sliders,
  Radio,
  Clock
} from 'lucide-react';

interface SoundtrackTrack {
  id: string;
  movieTitle: string;
  trackName: string;
  composer: string;
  mood: string;
  themeType: 'space' | 'jazz' | 'rain' | 'projector' | 'musicbox' | 'popcorn';
  duration: number; // seconds
  quote: string;
  color: string;
}

const TRACKS: SoundtrackTrack[] = [
  {
    id: 'tr-01',
    movieTitle: '오디세이',
    trackName: '웜홀 너머의 대서사 (Cosmic Wormhole)',
    composer: '한스 짐머 & 루드비히 고란손 풍',
    mood: '신비롭고 웅장한 심우주 앰비언스',
    themeType: 'space',
    duration: 180,
    quote: '"우리는 끝을 마주했을 때 비로소 진정한 여정을 시작한다."',
    color: 'from-blue-600 to-indigo-900'
  },
  {
    id: 'tr-02',
    movieTitle: '타짜: 벨제붑의 노래',
    trackName: '심야의 지하 도박장 (Midnight Noir Lounge)',
    composer: '장영규 & 달파란 풍',
    mood: '서늘하고 감각적인 느와르 재즈 피아노',
    themeType: 'jazz',
    duration: 165,
    quote: '"이 판에서 돈은 피보다 진하다. 살고 싶으면 패를 숨겨라."',
    color: 'from-red-600 to-stone-900'
  },
  {
    id: 'tr-03',
    movieTitle: '인턴',
    trackName: '시니어의 따뜻한 조언 (Warm Advice)',
    composer: '정재일 풍',
    mood: '따스하고 다정한 어쿠스틱 오르골 선율',
    themeType: 'musicbox',
    duration: 140,
    quote: '"나이는 숫자에 불과하지만, 인생의 지혜는 누군가의 손을 잡아줍니다."',
    color: 'from-amber-500 to-stone-900'
  },
  {
    id: 'tr-04',
    movieTitle: '심야 시네마 테라피',
    trackName: '35mm 필름 영사기 & 빗소리 ASMR',
    composer: '시네마나이트 오리지널 사운드',
    mood: '추억의 극장 영사기 릴 소리와 창밖 빗소리',
    themeType: 'projector',
    duration: 300,
    quote: '눈을 감고 영화관 1열에 앉아있는 기분을 느껴보세요.',
    color: 'from-emerald-600 to-stone-950'
  },
  {
    id: 'tr-05',
    movieTitle: '달콤한 극장 매점',
    trackName: '카라멜 팝콘 톡톡 ASMR (Cinema Concession)',
    composer: '시네마나이트 매점 사운드',
    mood: '갓 튀겨낸 바삭한 팝콘과 콜라 탄산 소리',
    themeType: 'popcorn',
    duration: 120,
    quote: '바삭바삭 갓 튀긴 팝콘 향기가 방 안에 가득 차오릅니다.',
    color: 'from-yellow-500 to-amber-900'
  }
];

export const CinemaOstPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<any>(null);
  const synthTimerRef = useRef<any>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  // Stop web audio nodes
  const stopAudio = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.close();
      } catch {
        // ignore
      }
      audioCtxRef.current = null;
    }
  };

  // Web Audio Synthesizer Engine
  const startAudio = (track: SoundtrackTrack) => {
    stopAudio();

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (track.themeType === 'space') {
        // Ambient cosmic drone chord: 3 sine oscillators with slow LFO
        const freqs = [110, 164.81, 220, 329.63]; // A chord
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const noteGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(400 + idx * 100, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.08, ctx.currentTime);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);
          osc.start();
        });
      } else if (track.themeType === 'jazz') {
        // Noir Jazz chord arpeggio sequencer
        const chords = [
          [220, 261.63, 329.63, 392], // Am7
          [174.61, 220, 261.63, 329.63], // Fmaj7
          [196, 246.94, 293.66, 349.23], // G7
          [164.81, 207.65, 246.94, 329.63] // E7
        ];
        let step = 0;

        synthTimerRef.current = setInterval(() => {
          if (!audioCtxRef.current) return;
          const currentChord = chords[Math.floor(step / 4) % chords.length];
          const freq = currentChord[step % currentChord.length];

          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.12, ctx.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

          osc.connect(noteGain);
          noteGain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);

          step++;
        }, 800);
      } else if (track.themeType === 'musicbox') {
        // Gentle pentatonic music box notes
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
        synthTimerRef.current = setInterval(() => {
          if (!audioCtxRef.current) return;
          const freq = scale[Math.floor(Math.random() * scale.length)];
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.15, ctx.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

          osc.connect(noteGain);
          noteGain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 1.5);
        }, 600);
      } else if (track.themeType === 'projector') {
        // Projector mechanical click + rain filter
        synthTimerRef.current = setInterval(() => {
          if (!audioCtxRef.current) return;
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = 'square';
          osc.frequency.setValueAtTime(80, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.05, ctx.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

          osc.connect(noteGain);
          noteGain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }, 120);
      } else if (track.themeType === 'popcorn') {
        // Random popping sound impulses
        synthTimerRef.current = setInterval(() => {
          if (!audioCtxRef.current) return;
          if (Math.random() > 0.4) {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300 + Math.random() * 500, ctx.currentTime);

            noteGain.gain.setValueAtTime(0.1, ctx.currentTime);
            noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

            osc.connect(noteGain);
            noteGain.connect(masterGain);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
          }
        }, 150);
      }

      // Track playback timer
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= track.duration) {
            return 0; // loop
          }
          return prev + 1;
        });
      }, 1000);
    } catch (e) {
      console.warn('AudioContext not allowed or failed:', e);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio(currentTrack);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    if (isPlaying) {
      startAudio(TRACKS[index]);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    handleSelectTrack(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    handleSelectTrack(prevIdx);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : newVol, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMute ? 0 : volume, audioCtxRef.current.currentTime);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="p-5 md:p-8 rounded-3xl bg-gradient-to-b from-[#0F111A] via-[#0C0E16] to-[#0A0B10] border border-amber-900/30 shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold">
              CINEMA SOUNDTRACK
            </span>
            <span className="text-xs font-mono text-stone-400">
              전설의 명곡 & 심야 극장 앰비언스 감상실
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-2.5">
            <Headphones className="w-7 h-7 text-amber-400" />
            <span>시네마 OST & 심야 앰비언스 플레이어</span>
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1">
            재생 버튼을 누르면 브라우저 실시간 오디오 엔진으로 신비로운 우주 웜홀, 느와르 재즈, 영사기 ASMR이 재생됩니다.
          </p>
        </div>
      </div>

      {/* Player Main Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: Vinyl / Disc Visualizer & Currently Playing Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#121420] border border-stone-800 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl">
          {/* Animated Vinyl Disc */}
          <div className="relative w-44 h-44 mb-5 flex items-center justify-center">
            <div
              className={`w-full h-full rounded-full bg-gradient-to-br from-stone-900 via-neutral-950 to-stone-900 border-4 border-stone-800 shadow-2xl flex items-center justify-center relative ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-4 rounded-full border border-stone-800 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-stone-800 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-stone-800 pointer-events-none" />

              {/* Center Label */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentTrack.color} flex items-center justify-center text-white shadow-inner`}>
                <Disc className="w-8 h-8 text-amber-300" />
              </div>
            </div>

            {/* Glowing Accent */}
            {isPlaying && (
              <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur-md pointer-events-none animate-pulse" />
            )}
          </div>

          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
            {currentTrack.movieTitle}
          </span>
          <h3 className="text-lg font-serif font-bold text-white mb-1">
            {currentTrack.trackName}
          </h3>
          <p className="text-xs text-stone-400 mb-3">
            {currentTrack.composer}
          </p>

          <p className="text-xs text-amber-200/90 italic font-serif px-4 py-2 rounded-xl bg-black/40 border border-stone-800/80 leading-relaxed max-w-sm">
            {currentTrack.quote}
          </p>
        </div>

        {/* Right: Controller & Playlist */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Controls Bar */}
          <div className="p-5 rounded-2xl bg-[#121420] border border-stone-800 space-y-4 shadow-lg">
            {/* Progress Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-stone-400 mb-1.5">
                <span>{formatSec(currentTime)}</span>
                <span className="text-amber-400">{currentTrack.mood}</span>
                <span>{formatSec(currentTrack.duration)}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden cursor-pointer relative">
                <div
                  style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                />
              </div>
            </div>

            {/* Main Buttons */}
            <div className="flex items-center justify-between">
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-amber-400" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20 accent-amber-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Prev / Play / Next */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 transition-colors"
                  title="이전 곡"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                  title={isPlaying ? '정지' : '실시간 사운드 재생'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 transition-colors"
                  title="다음 곡"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                {isPlaying ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE 재생중
                  </span>
                ) : (
                  <span className="text-stone-500">대기중</span>
                )}
              </div>
            </div>
          </div>

          {/* Playlist Track List */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider mb-2">
              트랙 플레이리스트 ({TRACKS.length}곡)
            </h4>

            {TRACKS.map((t, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-md'
                      : 'bg-[#121420] border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs text-stone-500 w-4">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-serif text-white truncate">
                          {t.trackName}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-stone-800 text-stone-400">
                          {t.movieTitle}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 truncate block">
                        {t.mood}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-mono text-stone-500">
                      {formatSec(t.duration)}
                    </span>
                    {isSelected && isPlaying && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
