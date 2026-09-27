import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Copy, 
  Check, 
  Play, 
  Code2, 
  Layers, 
  Lightbulb,
  Award
} from 'lucide-react';
import { VIBE_CURRICULUM, VibeChallenge } from '../../data/vibe/vibeLessons';

interface VibeCurriculumProps {
  onSelectProjectToPlayground: (code: string) => void;
  isProjectorMode?: boolean;
}

export const VibeCurriculum: React.FC<VibeCurriculumProps> = ({
  onSelectProjectToPlayground,
  isProjectorMode = false
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<VibeChallenge>(VIBE_CURRICULUM[0]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Banner */}
      <div className="rounded-[24px] border border-purple-900/40 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 p-5 sm:p-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>10-MINUTE VIBE CHALLENGES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            강의실 실습 전용 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300">10분 미니 프로젝트 챌린지 덱</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            비전공자와 컴퓨터 초보자도 10분 만에 "내가 진짜 소프트웨어를 만들었어!"라는 성취감을 느끼게 만드는 엄선된 실습 코스입니다.
            요구사항 기획부터 프롬프트 완성, 즉석 테스트까지 단계별로 진행할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Grid of Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {VIBE_CURRICULUM.map((challenge, index) => {
          const isSelected = selectedChallenge.id === challenge.id;
          return (
            <div
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className={`cursor-pointer rounded-[24px] border p-4 transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900/90 border-purple-500 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/50'
                  : 'bg-slate-900/50 border-white/[0.12] hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-purple-300 border border-slate-700 font-mono">
                    CHALLENGE 0{index + 1}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {challenge.timeEstimate}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm line-clamp-1">
                  {challenge.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {challenge.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.12] text-xs font-medium">
                <span className="text-slate-500 font-mono">{challenge.category}</span>
                <span className="text-purple-400 flex items-center gap-1">
                  <span>상세 보기</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Challenge Detail Card */}
      <div className="linear-card rounded-2xl border-white/[0.12] rounded-[20px] p-6 shadow-xl space-y-6">
        
        {/* Header of Detail */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.12] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-950 border border-purple-500/40 text-purple-300">
                {selectedChallenge.level} 코스
              </span>
              <span className="text-xs text-slate-400 font-mono">
                소요시간 {selectedChallenge.timeEstimate}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {selectedChallenge.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {selectedChallenge.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyPrompt(selectedChallenge.quickPrompt)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition-all"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? '프롬프트 복사됨' : '실습 프롬프트 복사'}</span>
            </button>
          </div>
        </div>

        {/* Instructor Note Card */}
        <div className="bg-[#0a0c14]/80 rounded-xl p-4 border border-purple-500/20 flex items-start gap-3 text-xs">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-white">🎓 강사용 지도 가이드 (Teaching Point):</p>
            <p className="text-slate-300 leading-relaxed">
              {selectedChallenge.instructorNote}
            </p>
          </div>
        </div>

        {/* Requirements Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2 bg-[#0a0c14] p-4 rounded-xl border border-white/[0.12]">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>핵심 구현 스펙</span>
            </p>
            <ul className="space-y-1.5 text-slate-300 pl-4 list-disc">
              {selectedChallenge.vibeFormula.keyFeatures.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 bg-[#0a0c14] p-4 rounded-xl border border-white/[0.12]">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>디자인 & 기술 조건</span>
            </p>
            <div className="space-y-2 text-slate-300">
              <p><strong className="text-slate-400">기술스택:</strong> {selectedChallenge.vibeFormula.techStack}</p>
              <p><strong className="text-slate-400">비주얼 톤:</strong> {selectedChallenge.vibeFormula.designVibe}</p>
              <p><strong className="text-slate-400">제약사항:</strong> {selectedChallenge.vibeFormula.constraints.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Complete Prompt Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">수강생에게 제공할 AI 프롬프트 전문</span>
            <span className="text-[11px] text-slate-500 font-mono">One-Shot Prompt</span>
          </div>
          <div className="bg-[#0a0c14] p-4 rounded-xl border border-white/[0.12] font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
            {selectedChallenge.quickPrompt}
          </div>
        </div>

      </div>

    </div>
  );
};
