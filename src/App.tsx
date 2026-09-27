import React, { useState, useEffect } from 'react';
import { VibeApp } from './components/vibe/VibeApp';
import { CinemaApp } from './components/cinema/CinemaApp';

export default function App() {
  // Allow toggling between VibePilot (Instructor mode) and Mood Magazine (Cinema mode)
  // Default to VibePilot for the instructor!
  const [appMode, setAppMode] = useState<'vibe' | 'cinema'>(() => {
    try {
      const saved = localStorage.getItem('active_app_mode');
      return saved === 'cinema' ? 'cinema' : 'vibe';
    } catch {
      return 'vibe';
    }
  });

  const handleSwitchToCinema = () => {
    setAppMode('cinema');
    try {
      localStorage.setItem('active_app_mode', 'cinema');
    } catch {}
  };

  const handleSwitchToVibe = () => {
    setAppMode('vibe');
    try {
      localStorage.setItem('active_app_mode', 'vibe');
    } catch {}
  };

  if (appMode === 'cinema') {
    return (
      <div className="relative">
        {/* Floating Quick Return Button to VibePilot for Instructor */}
        <button
          onClick={handleSwitchToVibe}
          className="fixed bottom-4 right-4 z-50 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold text-xs rounded-full shadow-2xl border border-indigo-400/40 flex items-center gap-2 transition-transform active:scale-95"
          title="컴퓨터 강사용 바이브코딩 스튜디오로 복귀"
        >
          <span>⚡ 바이브코딩 강사 스튜디오</span>
        </button>
        <CinemaApp />
      </div>
    );
  }

  return <VibeApp onSwitchToCinema={handleSwitchToCinema} />;
}
