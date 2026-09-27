import React, { useState } from 'react';
import { 
  Video, 
  Music, 
  Presentation, 
  Sparkles, 
  Code2, 
  Copy, 
  Check, 
  Play, 
  Download, 
  ExternalLink, 
  Flame, 
  Layers,
  ArrowRight,
  Gift
} from 'lucide-react';
import { MULTIMEDIA_RECIPES, MultimediaRecipe } from '../../data/vibe/multimediaVibeData';

interface VibeMultimediaStudioProps {
  onLoadCodeToPlayground: (code: string) => void;
  isProjectorMode?: boolean;
}

export const VibeMultimediaStudio: React.FC<VibeMultimediaStudioProps> = ({
  onLoadCodeToPlayground,
  isProjectorMode = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ppt' | 'music' | 'video'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRecipes = selectedCategory === 'all' 
    ? MULTIMEDIA_RECIPES 
    : MULTIMEDIA_RECIPES.filter(r => r.category === selectedCategory);

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const proAiTools = [
    {
      category: 'ppt',
      toolName: 'Gamma AI (감마)',
      url: 'https://gamma.app',
      freeBadge: '400 크레딧 무료 (약 10회 생성)',
      highlightColor: 'from-amber-500 to-orange-500',
      tagBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      oneLiner: '주제 1줄만 치면 10장 프레젠테이션 웹 슬라이드가 10초 만에 완성 & PPT/PDF 무료 내보내기',
      curriculumHook: '수업 때 학생들이 가장 환호하는 도구 1위! 디자인 노가다에서 영원히 해방됩니다.'
    },
    {
      category: 'music',
      toolName: 'Suno AI (수노)',
      url: 'https://suno.ai',
      freeBadge: '매일 50 크레딧(10곡) 매일 무료 리필',
      highlightColor: 'from-purple-500 to-indigo-500',
      tagBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      oneLiner: '가사나 분위기만 적으면 K-POP, 힙합, 재즈 보컬과 반주가 완벽하게 들어간 음원 생성',
      curriculumHook: '웹앱/게임/유튜브 영상의 고품질 BGM을 저작권 걱정 없이 하루에 10곡씩 무료 생성!'
    },
    {
      category: 'video',
      toolName: 'Vrew (브루)',
      url: 'https://vrew.voyagerx.com',
      freeBadge: '매월 AI 음성 1만 자 & 자막 120분 무료',
      highlightColor: 'from-rose-500 to-pink-500',
      tagBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      oneLiner: '텍스트만 입력하면 AI 성우 목소리, 관련 영상 자료, 예능 폰트 자막까지 원클릭 쇼츠 자동 제작',
      curriculumHook: '한국 기업(보이저엑스) 제작으로 한글 발음과 자막 디자인이 국내 최고 수준입니다.'
    }
  ];

  return (
    <div className={`space-y-8 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Intro Hero Banner */}
      <div className="rounded-3xl border border-violet-900/40 bg-gradient-to-br from-violet-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>2026 MULTIMEDIA & GENERATIVE CREATIVE SUITE</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            멀티미디어 창작 스튜디오: <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300">PPT · 음악 · 영상</span>
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            바이브 코딩으로 <strong>브라우저 내부에서 파일을 실시간으로 구워내는 원리(PoC)</strong>를 배우고, 
            실무에서는 <strong>무료 초고화질 상용 AI(감마, 수노, 브루)</strong>를 연계하여 1인 크리에이티브 스튜디오를 완성하세요!
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 relative z-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            전체 보기 (3종)
          </button>
          <button
            onClick={() => setSelectedCategory('ppt')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              selectedCategory === 'ppt'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>파워포인트 (PPT)</span>
          </button>
          <button
            onClick={() => setSelectedCategory('music')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              selectedCategory === 'music'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>음악·효과음 (BGM)</span>
          </button>
          <button
            onClick={() => setSelectedCategory('video')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              selectedCategory === 'video'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>쇼츠·릴스 영상 (Video)</span>
          </button>
        </div>
      </div>

      {/* TOP: 3 Major Professional Free AI Tools Direct Access Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white">
              실무 & 강의용 3대 무료 상용 AI 도구 (원클릭 바로가기)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">100% 가입 즉시 무료 사용 가능</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {proAiTools.map((tool, idx) => (
            <div 
              key={idx}
              className="prism-card border-white/10 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl relative group transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${tool.tagBg}`}>
                    {tool.freeBadge}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                    {tool.toolName}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">
                    {tool.oneLiner}
                  </p>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/10 text-[11px] text-slate-400 leading-normal">
                  <span className="text-violet-400 font-bold">💡 강의 시연 팁: </span>
                  {tool.curriculumHook}
                </div>
              </div>

              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 rounded-xl text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all bg-gradient-to-r ${tool.highlightColor} hover:brightness-110 shadow-lg`}
              >
                <span>{tool.toolName} 사이트 열기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-black text-white">
            바이브 코딩 원리 체험 (브라우저 자체 파일 렌더링 PoC)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          "외장 프로그램 없이 브라우저 메모리만으로 .pptx / .wav / .webm 파일을 어떻게 굽는가?"를 직접 확인하는 교육용 실습 코드입니다.
        </p>
      </div>

      {/* Recipe Cards List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="prism-card border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 hover:border-slate-700 transition-colors"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                    recipe.category === 'ppt'
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      : recipe.category === 'music'
                      ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                  }`}>
                    {recipe.categoryLabel}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {recipe.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {recipe.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onLoadCodeToPlayground(recipe.sampleCode)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>샌드박스에서 즉시 체험 🚀</span>
                </button>
              </div>
            </div>

            {/* Pain Point vs Solution Hook */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-1.5">
                <div className="text-rose-400 font-bold flex items-center gap-1.5">
                  <span>😫 기존 수강생들의 고통 (Pain Point)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {recipe.painPoint}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 space-y-1.5">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span>⚡ 바이브코딩 해결책 (Solution)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {recipe.solutionSummary}
                </p>
              </div>
            </div>

            {/* Teaching Hook (Teacher's Tip) */}
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0">
                <Flame className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-indigo-300">강사 전용 오프닝 멘트 꿀팁:</span>
                <p className="text-slate-200 italic font-medium leading-relaxed">
                  {recipe.teachingHook}
                </p>
              </div>
            </div>

            {/* Prompt to AI & Tech Stack */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>AI에게 던질 완성형 바이브 프롬프트 (클릭 시 복사):</span>
                </span>
                <span className="font-mono text-[11px] text-slate-500">{recipe.techStack}</span>
              </div>

              <div className="relative">
                <pre className="bg-slate-950 p-4 rounded-3xl border border-white/10 text-xs font-mono text-slate-300 whitespace-pre-wrap overflow-x-auto max-h-48 leading-relaxed">
                  {recipe.promptToAi}
                </pre>
                <button
                  onClick={() => handleCopyPrompt(recipe.id, recipe.promptToAi)}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  {copiedId === recipe.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>프롬프트 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Key Action Steps */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="font-bold text-slate-400">핵심 파이프라인:</span>
              {recipe.keyActionSteps.map((step, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#090b14]/90 border border-white/10 text-slate-300">
                  {idx + 1}. {step}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
