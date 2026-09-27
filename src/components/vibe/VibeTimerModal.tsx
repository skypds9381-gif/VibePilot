import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Bell, 
  Flame, 
  Volume2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface VibeTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VibeTimerModal: React.FC<VibeTimerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(300); // Default 5 mins (300s)
  const [isActive, setIsActive] = useState<boolean>(false);
  const [missionText, setMissionText] = useState<string>('각자 웹앱에 [다크모드] 또는 [CSV 복사 버튼] 달아보기!');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((sec) => sec - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      // Play ding sound using Web Audio API
      playAlarmSound();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  if (!isOpen) return null;

  const playAlarmSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.error(e);
    }
  };

  const setTimerPreset = (minutes: number) => {
    setIsActive(false);
    setSecondsLeft(minutes * 60);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(300);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0F131E] border border-rose-500/40 rounded-[24px] max-w-lg w-full p-6 text-center space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
            <Timer className="w-3.5 h-3.5 text-rose-400" />
            <span>수업 현장 실습 카운트다운 타이머</span>
          </div>
          <h3 className="text-xl font-black text-white">
            실습 미션 라이브 타이머 ⏱️
          </h3>
        </div>

        {/* Mission Input Banner */}
        <div className="bg-[#0a0c14] p-3 rounded-[24px] border border-white/[0.12] space-y-1 text-left">
          <label className="text-[11px] font-bold text-slate-400 font-mono flex items-center gap-1">
            <Flame className="w-3 h-3 text-rose-400" />
            <span>현재 실습 미션 (칠판에 크게 노출됨):</span>
          </label>
          <input
            type="text"
            value={missionText}
            onChange={(e) => setMissionText(e.target.value)}
            className="w-full bg-slate-900 text-white font-bold text-xs sm:text-sm px-3 py-2 rounded-xl border border-white/[0.12] focus:outline-none focus:border-rose-400"
          />
        </div>

        {/* Big Neon Digital Clock */}
        <div className={`py-6 px-4 rounded-[24px] border-2 transition-all ${
          secondsLeft <= 30 && isActive
            ? 'bg-rose-950/40 border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.3)] animate-pulse'
            : 'bg-[#0a0c14] border-white/[0.12]'
        }`}>
          <div className="font-mono text-6xl sm:text-7xl font-black text-white tracking-widest drop-shadow-md">
            {timeFormatted}
          </div>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            {isActive ? '⏳ 실습이 진행 중입니다!' : (secondsLeft === 0 ? '🔔 실습 종료! 손을 떼주세요!' : '대기 중')}
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setTimerPreset(3)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.12] text-slate-300 font-mono text-xs font-bold transition-colors"
          >
            3분 (초간단)
          </button>
          <button
            onClick={() => setTimerPreset(5)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.12] text-slate-300 font-mono text-xs font-bold transition-colors"
          >
            5분 (표준)
          </button>
          <button
            onClick={() => setTimerPreset(10)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.12] text-slate-300 font-mono text-xs font-bold transition-colors"
          >
            10분 (심화)
          </button>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={toggleTimer}
            className={`px-6 py-3 rounded-[20px] font-black text-sm flex items-center gap-2 shadow-lg transition-all ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/25'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isActive ? '일시 정지' : '실습 시작!'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="px-4 py-3 rounded-[20px] bg-slate-900 hover:bg-slate-800 border border-white/[0.12] text-slate-300 font-bold text-sm flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>리셋</span>
          </button>
        </div>

      </div>
    </div>
  );
};
