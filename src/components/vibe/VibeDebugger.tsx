import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Copy, 
  Check, 
  Sparkles, 
  Wand2, 
  Terminal, 
  HelpCircle, 
  ArrowRight,
  RotateCcw,
  Bug,
  AlertTriangle
} from 'lucide-react';
import { VIBE_ERROR_EXAMPLES, ErrorExample } from '../../data/vibe/vibeLessons';

interface VibeDebuggerProps {
  isProjectorMode?: boolean;
}

export const VibeDebugger: React.FC<VibeDebuggerProps> = ({
  isProjectorMode = false
}) => {
  const [errorLog, setErrorLog] = useState(VIBE_ERROR_EXAMPLES[0].badLog);
  const [errorContext, setErrorContext] = useState('파이썬 엑셀 자동화 코드를 실행했을 때 터미널에 출력된 에러');
  const [copied, setCopied] = useState(false);

  // Synthesized Reverse Feedback Prompt
  const fixPrompt = React.useMemo(() => {
    return `[바이브코딩 에러 긴급 해결 요청]

방금 당신이 작성해준 코드를 실행했더니 다음과 같은 에러가 발생했습니다.

📌 발생한 에러 로그:
\`\`\`
${errorLog.trim() || '에러 로그가 입력되지 않았습니다.'}
\`\`\`

📌 실행 환경 및 상황:
- ${errorContext}

📌 요청 사항:
1. 초보 수강생도 바로 이해할 수 있게, 이 에러가 왜 발생했는지 [한 문장]으로 쉽게 원인을 설명해주세요.
2. 코드를 처음부터 길게 다시 출력하지 말고, [어느 파일의 몇 번째 줄을 어떻게 고치면 되는지] 명확한 Before / After 수정 스니펫을 제시해주세요.
3. 동일한 실수를 방지하는 1줄 팁을 알려주세요.`;
  }, [errorLog, errorContext]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fixPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectExample = (example: ErrorExample) => {
    setErrorLog(example.badLog);
    setErrorContext(example.friendlyExplanation);
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Intro Banner */}
      <div className="rounded-2xl border border-rose-900/40 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>AI ERROR RESCUE & REFINER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              터미널 시뻘건 에러가 떴을 때! <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-yellow-400">AI 역질문 번역기</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              수강생들이 가장 당황하는 순간은 코드가 멈추고 붉은 에러가 쏟아질 때입니다. 
              에러 화면을 복사해 넣기만 하면, AI가 군말 없이 <strong>정확히 틀린 줄만 핀포인트로 고쳐주는 수정 요청 프롬프트</strong>를 자동 완성합니다.
            </p>
          </div>

          {/* Quick FAQ / Common Mistakes */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <span className="text-[11px] font-bold text-slate-400">수업 단골 에러 불러오기:</span>
            <div className="flex flex-wrap gap-1.5">
              {VIBE_ERROR_EXAMPLES.map((ex) => (
                <button
                  key={ex.title}
                  onClick={() => handleSelectExample(ex)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500 text-xs text-slate-200 transition-all text-left truncate max-w-[200px]"
                  title={ex.title}
                >
                  ⚠️ {ex.category}: {ex.title.split('(')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editor & Generated Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Input Error Log (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Bug className="w-4 h-4 text-rose-400" />
                <span>에러 로그 입력</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Traceback Log</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                터미널이나 브라우저 콘솔에 뜬 에러 내용 붙여넣기
              </label>
              <textarea
                value={errorLog}
                onChange={(e) => setErrorLog(e.target.value)}
                rows={7}
                placeholder="예: IndentationError: unexpected indent..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-rose-200 font-mono focus:outline-none focus:border-rose-500 leading-relaxed resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                어떤 작업을 하다가 발생했나요? (간략한 상황)
              </label>
              <input
                type="text"
                value={errorContext}
                onChange={(e) => setErrorContext(e.target.value)}
                placeholder="예: 버튼을 눌렀는데 화면이 반응이 없고 콘솔에 뜸"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>강사용 설명 꿀팁:</span>
              </p>
              <p className="leading-relaxed">
                "초보자분들은 에러를 보면 무서워하지만, AI 시대의 에러 로그는 '정답으로 가는 내비게이션'입니다.
                에러 전체를 그대로 AI에게 던져주는 습관이 바이브코딩의 핵심입니다."
              </p>
            </div>

          </div>
        </div>

        {/* Right: AI Fix Prompt (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex-1 flex flex-col shadow-lg space-y-3">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  AI에게 보낼 수정 요청 프롬프트
                </h3>
              </div>

              <button
                onClick={handleCopy}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  copied
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사 완료!' : '수정 프롬프트 복사'}</span>
              </button>
            </div>

            <div className="flex-1 min-h-[300px] bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {fixPrompt}
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              이 프롬프트를 복사하여 대화 중이던 Cursor / Claude 채팅에 붙여넣으면, AI가 전체 코드를 다시 치지 않고 <strong className="text-white">정확히 틀린 부분만 Before/After로 고쳐줍니다.</strong>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
