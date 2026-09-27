import React from 'react';
import { 
  X, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Zap, 
  Layers, 
  Flame, 
  BookOpen,
  Keyboard
} from 'lucide-react';
import { CURSOR_SHORTCUTS } from '../../data/vibe/extraVibeData';

interface VibeCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VibeCheatSheetModal: React.FC<VibeCheatSheetModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#0b0f19] border border-indigo-500/40 rounded-3xl max-w-3xl w-full p-6 text-slate-200 shadow-2xl space-y-5 my-auto max-h-[92vh] overflow-y-auto print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">
              [수강생 배포용] 바이브코딩 A4 1장 핵심 치트시트
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>A4 인쇄 / PDF 저장</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas (A4 Styled) */}
        <div className="p-6 bg-slate-950 rounded-3xl border border-white/10 space-y-5 print:p-0 print:border-none print:bg-white print:text-black">
          
          {/* Header of Cheat Sheet */}
          <div className="flex items-center justify-between border-b-2 border-indigo-500 pb-3">
            <div>
              <h1 className="text-xl font-black text-white print:text-black">
                VIBEPILOT · 바이브코딩(Vibe Coding) 핵심 공식 요약집
              </h1>
              <p className="text-xs text-slate-400 print:text-gray-600 mt-0.5">
                코딩 몰라도 말로 소프트웨어를 완성하는 AI 프롬프트 엔지니어링 치트시트
              </p>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/40 print:bg-gray-100 print:text-black">
              2026 OFFICIAL GUIDE
            </span>
          </div>

          {/* Section 1: 5-Step Formula */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-indigo-400 print:text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎯 1. 실패 없는 바이브 프롬프트 5단계 공식</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              <div className="p-2.5 rounded-lg prism-card border-white/10 print:bg-gray-50 print:border-gray-300 space-y-1">
                <span className="font-bold text-amber-400 print:text-amber-700">① 역할 지정</span>
                <p className="text-[11px] text-slate-400 print:text-gray-600">"너는 최고 수준의 UI/UX 안목을 지닌 프론트엔드 엔지니어다"</p>
              </div>
              <div className="p-2.5 rounded-lg prism-card border-white/10 print:bg-gray-50 print:border-gray-300 space-y-1">
                <span className="font-bold text-emerald-400 print:text-emerald-700">② 목적/타겟</span>
                <p className="text-[11px] text-slate-400 print:text-gray-600">"직장인의 2026 연봉 실수령액 계산기 개발"</p>
              </div>
              <div className="p-2.5 rounded-lg prism-card border-white/10 print:bg-gray-50 print:border-gray-300 space-y-1">
                <span className="font-bold text-cyan-400 print:text-cyan-700">③ 핵심 기능 3가지</span>
                <p className="text-[11px] text-slate-400 print:text-gray-600">콤마 서식, 4대보험 공제, 결과 엑셀 다운로드</p>
              </div>
              <div className="p-2.5 rounded-lg prism-card border-white/10 print:bg-gray-50 print:border-gray-300 space-y-1">
                <span className="font-bold text-pink-400 print:text-pink-700">④ 비주얼 바이브</span>
                <p className="text-[11px] text-slate-400 print:text-gray-600">"토스 스타일의 다크 슬레이트 핀테크 테마"</p>
              </div>
              <div className="p-2.5 rounded-lg prism-card border-white/10 print:bg-gray-50 print:border-gray-300 space-y-1">
                <span className="font-bold text-purple-400 print:text-purple-700">⑤ 제약사항</span>
                <p className="text-[11px] text-slate-400 print:text-gray-600">"단일 index.html 파일 완성형 전체 코드로 제공"</p>
              </div>
            </div>
          </div>

          {/* Section 2: Cursor Shortcuts */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-cyan-400 print:text-cyan-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>⌨️ 2. Cursor & Windsurf 핵심 단축키 4선</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CURSOR_SHORTCUTS.map((sc) => (
                <div key={sc.key} className="p-2.5 rounded-lg prism-card border-white/10 print:bg-gray-50 print:border-gray-300 flex items-start gap-2.5">
                  <div className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white font-mono text-[11px] font-bold shrink-0 print:bg-white print:text-black">
                    {sc.key.split('(')[0].trim()}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-200 print:text-black text-xs">{sc.action}</p>
                    <p className="text-[11px] text-slate-400 print:text-gray-600 leading-tight">{sc.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Error Emergency Response */}
          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 print:bg-rose-50 print:border-rose-300 text-xs space-y-1.5">
            <h2 className="font-bold text-rose-300 print:text-rose-800 flex items-center gap-1.5">
              <span>🚨 3. 빨간 에러 떴을 때 AI 역질문 황금 템플릿</span>
            </h2>
            <p className="font-mono text-[11px] text-slate-300 print:text-gray-800 bg-slate-950 print:bg-white p-2.5 rounded-lg border border-white/10 print:border-gray-300">
              "방금 준 코드를 돌렸더니 [에러 로그 복사본] 이 발생했어. 코드 전체를 다시 치지 말고, <strong>어느 파일 몇 번째 줄을 어떻게 고치면 되는지 Before/After로 딱 1줄만</strong> 수정해줘!"
            </p>
          </div>

          {/* Footer of Sheet */}
          <div className="text-center text-[10px] text-slate-500 print:text-gray-500 pt-2 border-t border-white/10 print:border-gray-300 font-mono">
            VibePilot Educator Hub · Designed for Modern Software Education
          </div>

        </div>

      </div>
    </div>
  );
};
