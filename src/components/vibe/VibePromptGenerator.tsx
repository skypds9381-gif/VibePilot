import React, { useState } from 'react';
import { 
  Wand2, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Terminal, 
  Layers, 
  Palette, 
  ShieldCheck, 
  RotateCcw,
  Send,
  Zap,
  BookOpen
} from 'lucide-react';
import { VIBE_PROMPT_PRESETS, PromptPreset } from '../../data/vibe/vibeLessons';

interface VibePromptGeneratorProps {
  onSendToPlayground?: (codePrompt: string) => void;
  isProjectorMode?: boolean;
}

export const VibePromptGenerator: React.FC<VibePromptGeneratorProps> = ({
  onSendToPlayground,
  isProjectorMode = false
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PromptPreset>(VIBE_PROMPT_PRESETS[0]);
  
  // Interactive inputs for the formula
  const [goal, setGoal] = useState('2026 직장인 연봉/월급 실수령액 및 4대보험 자동 계산기');
  const [targetUser, setTargetUser] = useState('연봉 협상을 앞둔 직장인 및 취준생');
  const [feature1, setFeature1] = useState('연봉/월급 라디오 토글 및 실시간 1,000단위 콤마 서식');
  const [feature2, setFeature2] = useState('국민연금, 건강보험, 고용보험, 근로소득세 공제액 상세 표기');
  const [feature3, setFeature3] = useState('세후 실수령액 강조 카드 및 계산 결과 1초 텍스트 복사');
  const [techStyle, setTechStyle] = useState('Tailwind CSS (다크 슬레이트 핀테크 테마) + Vanilla JS');
  const [targetTool, setTargetTool] = useState<'cursor' | 'claude' | 'v0' | 'chatgpt'>('cursor');

  const [copied, setCopied] = useState(false);

  // Generate synthesized Vibe Prompt
  const generatedPrompt = React.useMemo(() => {
    const toolPrefix = targetTool === 'cursor'
      ? '[Cursor Composer 모드 @Web]'
      : targetTool === 'claude'
      ? '[Claude 3.7 Sonnet Artifacts]'
      : targetTool === 'v0'
      ? '[v0.dev UI Block]'
      : '[ChatGPT 4o Code Interpreter]';

    return `${toolPrefix}
당신은 최고 수준의 UI/UX 안목을 지닌 ${selectedPreset.role}입니다.
다음 기획 사양을 충족하는 소프트웨어를 [별도 복잡한 빌드/설치 없이 즉시 브라우저에서 실행 가능한 단일 HTML 파일]로 작성해주세요.

📌 1. 프로젝트 목표 (Core Goal)
- ${goal}
- 주요 대상: ${targetUser}

📌 2. 핵심 기능 요구사항 (Features)
1. ${feature1}
2. ${feature2}
3. ${feature3}

📌 3. 비주얼 감성 & 디자인 바이브 (Design Vibe)
- 스타일: ${techStyle}
- 타이포그래피: 고대비 가독성 높은 폰트, 정갈한 헤어라인 보더, 불필요한 장식 배제
- 인터랙션: 입력값 변경 시 딜레이 없는 실시간 즉각 반응 및 스무스한 전환 효과

📌 4. 바이브코딩 제약 사항 (Constraints)
- 라이브러리는 CDN 단일 스크립트만 사용할 것
- 반응형 웹(모바일 ~ 데스크톱) 완벽 지원
- 잡다한 설명 텍스트 없이, 바로 복사해서 저장할 수 있는 완성된 전체 <!DOCTYPE html> 코드 블록으로만 응답해주세요.`;
  }, [selectedPreset, goal, targetUser, feature1, feature2, feature3, techStyle, targetTool]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickPresetFill = (type: 'calculator' | 'timer' | 'excel' | 'todo') => {
    if (type === 'calculator') {
      setGoal('2026 직장인 연봉/월급 실수령액 및 4대보험 자동 계산기');
      setTargetUser('이직을 준비하는 직장인');
      setFeature1('연봉/월급 전환 토글 및 천 단위 콤마 자동 입력');
      setFeature2('국민연금, 건강보험, 소득세 상세 공제내역 그래프');
      setFeature3('최종 세후 실수령액 거대한 폰트로 강조 표시');
      setTechStyle('토스(Toss) 스타일 다크 슬레이트 & 에메랄드 포인트');
    } else if (type === 'timer') {
      setGoal('강의실 빔프로젝터용 대형 네온 타이머 & 학생 발표 추첨기');
      setTargetUser('수업을 진행하는 컴퓨터 강사 및 수강생');
      setFeature1('5분/10분/15분/25분 원클릭 퀵 프리셋 및 시작/일시정지');
      setFeature2('시간 종료 시 웹 오디오 API를 통한 비프음 알림');
      setFeature3('수강생 명단을 넣고 버튼 누르면 슬롯머신처럼 이름이 롤링되어 당첨되는 룰렛');
      setTechStyle('사이버펑크 네온 시안 & 앰버 다크 테마');
    } else if (type === 'excel') {
      setGoal('브라우저 즉석 CSV/엑셀 파일 드롭 뷰어 & 통계 차트');
      setTargetUser('엑셀 데이터를 빠르게 시각화하고 싶은 실무자');
      setFeature1('서버 업로드 없이 브라우저 단에서 XLSX/CSV 드래그 앤 드롭 파싱');
      setFeature2('합계, 평균, 행 수 자동 통계 요약 카드');
      setFeature3('선택한 컬럼으로 Chart.js 막대/도넛 차트 즉시 렌더링');
      setTechStyle('노션(Notion) 데이터베이스 스타일의 클린 미니멀 그리드');
    } else if (type === 'todo') {
      setGoal('감성적인 우선순위 뽀모도로 투두리스트 (Vibe Planner)');
      setTargetUser('하루 업무 집중이 필요한 1인 프리랜서');
      setFeature1('오늘 해야 할 일 추가/수정/삭제 및 로컬 스토리지 자동 저장');
      setFeature2('우선순위 중요도 태그 및 진행률 프로그레스 바');
      setFeature3('할 일 완료 시 잔잔한 축하 파티클 애니메이션');
      setTechStyle('Linear 앱 스타일의 초고해상도 다크 UI');
    }
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Intro Banner */}
      <div className="rounded-3xl border border-white/10 prism-card rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>VIBE CODING PROMPT STUDIO</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AI가 100% 이해하는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">바이브코딩 황금 프롬프트</span> 생성기
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              "그냥 만들어줘"라고 모호하게 말하면 AI가 엉뚱한 코드를 짭니다. 
              <strong className="text-indigo-300 font-semibold"> [역할 + 프로젝트 목적 + 핵심 기능 3가지 + 디자인 감성 + 제약사항]</strong> 5단계 공식으로 작성하면 원샷(One-Shot)으로 완벽한 소프트웨어가 탄생합니다.
            </p>
          </div>

          {/* Quick Preset Buttons for Lecture */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <span className="text-[11px] font-bold text-slate-400">수업용 원클릭 시연 예제:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleQuickPresetFill('calculator')}
                className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400/50 text-xs text-slate-200 hover:text-white transition-all shadow-sm"
              >
                💰 급여계산기
              </button>
              <button
                onClick={() => handleQuickPresetFill('timer')}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 hover:text-white text-xs text-slate-200 transition-all"
              >
                ⏱️ 수업 타이머
              </button>
              <button
                onClick={() => handleQuickPresetFill('excel')}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/50 hover:text-white text-xs text-slate-200 transition-all"
              >
                📊 엑셀 대시보드
              </button>
              <button
                onClick={() => handleQuickPresetFill('todo')}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/50 hover:text-white text-xs text-slate-200 transition-all"
              >
                📝 감성 플래너
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Editor (Left) & Live Prompt Synthesizer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Prompt Builder (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>프롬프트 빌더 슬롯</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">5-Step Formula</span>
            </div>

            {/* Target Tool Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">사용할 AI 코딩 도구</label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[
                  { id: 'cursor', label: 'Cursor' },
                  { id: 'claude', label: 'Claude' },
                  { id: 'v0', label: 'v0.dev' },
                  { id: 'chatgpt', label: 'ChatGPT' },
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setTargetTool(tool.id as any)}
                    className={`py-2 px-1 text-center rounded-xl font-medium border transition-all ${
                      targetTool === tool.id
                        ? 'bg-indigo-600 text-white border-indigo-400 font-bold shadow'
                        : 'bg-[#090b14]/90 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 1: Project Goal */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold">1</span>
                <span>만들고 싶은 프로젝트 목표</span>
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="예: 2026 직장인 연봉/실수령액 계산기"
                className="w-full bg-[#090b14]/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Slot 2: Target User */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold">2</span>
                <span>주요 사용자 타겟</span>
              </label>
              <input
                type="text"
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
                placeholder="예: 연봉 협상을 앞둔 직장인"
                className="w-full bg-[#090b14]/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Slot 3: Key Features (3 items) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold">3</span>
                <span>핵심 기능 3가지 (기능 명확화)</span>
              </label>
              <input
                type="text"
                value={feature1}
                onChange={(e) => setFeature1(e.target.value)}
                placeholder="기능 1"
                className="w-full bg-[#090b14]/90 border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                value={feature2}
                onChange={(e) => setFeature2(e.target.value)}
                placeholder="기능 2"
                className="w-full bg-[#090b14]/90 border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                value={feature3}
                onChange={(e) => setFeature3(e.target.value)}
                placeholder="기능 3"
                className="w-full bg-[#090b14]/90 border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Slot 4: Design Vibe */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold">4</span>
                <span>디자인 스타일 & 비주얼 바이브</span>
              </label>
              <input
                type="text"
                value={techStyle}
                onChange={(e) => setTechStyle(e.target.value)}
                placeholder="예: 토스 스타일의 다크 슬레이트 & 에메랄드"
                className="w-full bg-[#090b14]/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

          </div>
        </div>

        {/* Right: Real-time Synthesized Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex-1 flex flex-col shadow-lg space-y-3">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  생성된 완성형 바이브 프롬프트
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    copied
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'aurora-button rounded-2xl font-bold text-white font-bold shadow-md shadow-indigo-600/20'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사 완료!' : '프롬프트 복사하기'}</span>
                </button>
              </div>
            </div>

            {/* Prompt View Box */}
            <div className="relative flex-1 min-h-[360px] bg-[#090b14]/90 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {generatedPrompt}
            </div>

            {/* Guidance for Students */}
            <div className="bg-[#090b14]/90/80 border border-indigo-500/20 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-300">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-white">💡 강사님의 바이브코딩 전달 팁:</p>
                <p className="text-slate-400 leading-normal">
                  "학생 여러분, [프롬프트 복사하기]를 눌러 Cursor나 Claude 채팅창에 그대로 붙여넣어 보세요. 
                  우리가 코드를 한 줄도 안 짰는데도, 10초 만에 완벽하게 동작하는 웹앱이 만들어집니다!"
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
