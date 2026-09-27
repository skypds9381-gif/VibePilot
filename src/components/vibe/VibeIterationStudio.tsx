import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Copy, 
  Check, 
  ArrowRight, 
  Code, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Lightbulb,
  FileSpreadsheet,
  Smartphone,
  Eye
} from 'lucide-react';
import { ITERATION_RECIPES, IterationRecipe } from '../../data/vibe/advancedVibeData';

interface VibeIterationStudioProps {
  isProjectorMode?: boolean;
}

export const VibeIterationStudio: React.FC<VibeIterationStudioProps> = ({
  isProjectorMode = false
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<IterationRecipe>(ITERATION_RECIPES[0]);
  const [copied, setCopied] = useState(false);
  const [customRequirement, setCustomRequirement] = useState('');

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Intro Banner */}
      <div className="rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 p-5 sm:p-6 shadow-xl">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI TIKI-TAKA ITERATION RECIPES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            바이브코딩의 꽃, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">"티키타카 수정 지시어" 치트시트</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            AI가 첫 번째로 준 코드가 100% 마음에 들지 않아도 당황하지 마세요. 
            <strong>"어떻게 말해야 AI가 기존 코드를 망가뜨리지 않고 원하는 기능만 쏙 추가해주는지"</strong> 실무에서 가장 자주 쓰는 수정 레시피를 모았습니다.
          </p>
        </div>
      </div>

      {/* Grid of Iteration Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ITERATION_RECIPES.map((recipe) => {
          const isSelected = selectedRecipe.id === recipe.id;
          return (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className={`cursor-pointer rounded-3xl border p-4 transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                  : 'bg-slate-900/50 border-white/10 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                  {recipe.category}
                </span>

                <h3 className="font-bold text-white text-sm line-clamp-2">
                  {recipe.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {recipe.situation}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>지시어 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Iteration Detail */}
      <div className="prism-card rounded-3xl border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-cyan-400 font-mono">
              [상황별 실전 피드백 공식]
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {selectedRecipe.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              💡 {selectedRecipe.situation}
            </p>
          </div>

          <button
            onClick={() => handleCopyPrompt(selectedRecipe.promptToAi)}
            className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all self-start md:self-auto"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '복사 완료!' : '수정 요청문 복사'}</span>
          </button>
        </div>

        {/* Teaching Tip */}
        <div className="bg-[#090b14]/90/80 rounded-xl p-4 border border-cyan-500/20 flex items-start gap-3 text-xs">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-white">🎓 강사용 지도 꿀팁 (Teaching Point):</p>
            <p className="text-slate-300 leading-relaxed">
              {selectedRecipe.instructorTip}
            </p>
          </div>
        </div>

        {/* Before Context vs Prompt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 bg-[#090b14]/90 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <span>⚠️ 기존 문제 상태</span>
            </span>
            <p className="text-slate-300 leading-relaxed font-mono">
              {selectedRecipe.beforeCodeContext}
            </p>
            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-500">
              초보자들은 코드가 마음에 안 들면 "다시 해줘"라고 말해서 기존 기능까지 다 날려먹습니다. 
              <strong className="text-slate-300"> "기존 코드는 유지하고 이 부분만 추가해줘"</strong>라고 명시하는 것이 비결입니다.
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#090b14]/90 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 font-mono">
                AI(Claude / Cursor) 채팅창에 그대로 붙여넣을 2차 지시어
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-white/10 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {selectedRecipe.promptToAi}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
