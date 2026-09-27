import React, { useState } from 'react';
import { 
  Gamepad2, 
  Copy, 
  Check, 
  Play, 
  Sparkles, 
  Trophy, 
  ArrowRight,
  Flame,
  Zap,
  Code
} from 'lucide-react';
import { GAME_PRESETS, GamePreset } from '../../data/vibe/extraVibeData';

interface VibeGamesStudioProps {
  onLoadGameToPlayground: (code: string) => void;
  isProjectorMode?: boolean;
}

export const VibeGamesStudio: React.FC<VibeGamesStudioProps> = ({
  onLoadGameToPlayground,
  isProjectorMode = false
}) => {
  const [selectedGame, setSelectedGame] = useState<GamePreset>(GAME_PRESETS[0]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Intro Banner */}
      <div className="rounded-[24px] border border-pink-900/40 bg-gradient-to-br from-pink-950/40 via-slate-900 to-slate-950 p-5 sm:p-6 shadow-xl">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono font-bold">
            <Gamepad2 className="w-3.5 h-3.5 text-pink-400" />
            <span>10-MIN MINI GAME ARCADE PACK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            수강생 눈빛이 초롱초롱해지는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300">10분 미니 레트로 웹게임 팩</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            학생들의 집중력이 흐려질 때 꺼내드는 마법의 치트키! 
            <strong>"우리가 게임을 소비하는 사람에서, AI에게 지시해서 게임을 직접 만드는 창작자"</strong>로 바뀌는 짜릿한 경험을 선사합니다.
          </p>
        </div>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GAME_PRESETS.map((game) => {
          const isSelected = selectedGame.id === game.id;
          return (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`cursor-pointer rounded-[24px] border p-5 transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900/90 border-pink-400 shadow-lg shadow-pink-500/10 ring-1 ring-pink-400/50'
                  : 'bg-slate-900/50 border-white/[0.12] hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-950 border border-pink-500/40 text-pink-300 font-mono">
                    {game.genre}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    플레이 타임: {game.playTime}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base">
                  {game.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {game.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.12] flex items-center justify-between text-xs text-pink-400 font-semibold">
                <span>게임 제작 명세 & 프롬프트</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Game Details */}
      <div className="apple-glass-card border-white/[0.12] rounded-[20px] p-6 shadow-xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.12] pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-pink-400 font-mono">
              [오늘의 실습 미니게임]
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {selectedGame.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {selectedGame.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => onLoadGameToPlayground(selectedGame.sampleHtml)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>샌드박스에서 즉시 플레이 🕹️</span>
            </button>

            <button
              onClick={() => handleCopyPrompt(selectedGame.prompt)}
              className="px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl shadow-md shadow-pink-600/20 flex items-center gap-1.5 transition-all"
            >
              {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPrompt ? '복사됨' : '제작 프롬프트 복사'}</span>
            </button>
          </div>
        </div>

        {/* Teaching Guide */}
        <div className="bg-[#121214]/80 rounded-xl p-4 border border-pink-500/20 text-xs space-y-1">
          <p className="font-bold text-pink-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-pink-400" />
            <span>수업 활용 과제 아이디어:</span>
          </p>
          <p className="text-slate-300 leading-relaxed">
            "학생 여러분, [샌드박스에서 즉시 플레이]를 누르고 한번 해보세요! 그리고 각자 Claude에게 
            <strong className="text-pink-300"> '사과를 먹을 때마다 뱀 속도가 빨라지게 해줘'</strong> 또는 
            <strong className="text-pink-300"> '황금 사과를 먹으면 50점 보너스를 주게 해줘'</strong> 라고 명령해서 나만의 게임 룰을 만들어보세요!"
          </p>
        </div>

        {/* Prompt Container */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 font-mono">
              AI에게 던져줄 게임 생성 원본 프롬프트
            </span>
          </div>
          <div className="bg-[#121214] p-4 rounded-xl border border-white/[0.12] font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
            {selectedGame.prompt}
          </div>
        </div>

      </div>

    </div>
  );
};
