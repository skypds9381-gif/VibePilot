import React from 'react';
import { 
  X, 
  Sparkles, 
  Zap, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Compass,
  Cpu
} from 'lucide-react';

interface VibeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VibeGuideModal: React.FC<VibeGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0F131E] border border-indigo-500/30 rounded-2xl max-w-2xl w-full p-6 text-slate-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">
              컴퓨터 강사님을 위한 바이브코딩(Vibe Coding) 강의 지침서
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs leading-relaxed text-slate-300">
          
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 space-y-1.5">
            <p className="font-bold text-white text-sm">💡 바이브코딩이란 무엇인가요?</p>
            <p className="text-slate-300">
              전 테슬라 AI 디렉터 안드레이 카파시(Andrej Karpathy)가 정의한 새로운 프로그래밍 방식입니다.
              개발자가 문법 규칙을 직접 타이핑하는 대신, <strong>"AI에게 목적과 감성(Vibe)을 자연어로 지시하고 피드백을 주고받으며 소프트웨어를 완성"</strong>하는 패러다임입니다.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-white text-sm">🎯 초보 수강생 대상 강의 진행 3단계 공식</p>
            
            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3 rounded-xl prism-card rounded-3xl border-white/10 space-y-1">
                <span className="font-bold text-indigo-400 font-mono">STEP 1. 명확한 기획 (What & Why)</span>
                <p className="text-slate-400">
                  "계산기 만들어줘"는 실패합니다. [프롬프트 스튜디오]에서 타겟, 핵심 기능 3가지, 비주얼 톤을 채워 넣어 구체적인 요구사항을 던지게 하세요.
                </p>
              </div>

              <div className="p-3 rounded-xl prism-card rounded-3xl border-white/10 space-y-1">
                <span className="font-bold text-emerald-400 font-mono">STEP 2. 브라우저 즉시 시각화 (Aha! Moment)</span>
                <p className="text-slate-400">
                  VS Code나 복잡한 설치 없이, 생성된 단일 HTML 코드를 [라이브 샌드박스]에 붙여넣어 10초 만에 화면에 뜨는 감동을 선사하세요.
                </p>
              </div>

              <div className="p-3 rounded-xl prism-card rounded-3xl border-white/10 space-y-1">
                <span className="font-bold text-rose-400 font-mono">STEP 3. 에러를 두려워하지 않는 대화법 (Iterative Feedback)</span>
                <p className="text-slate-400">
                  코드가 안 돌아갈 땐 [에러 응급실]에 에러 화면을 그대로 넣고 AI에게 역질문하는 방법을 가르치세요. "에러는 실패가 아니라 AI와의 대화 주제"임을 깨닫게 됩니다.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#090b14]/90 rounded-xl border border-white/10 space-y-1">
            <p className="font-bold text-white">✨ 강사용 빔프로젝터 모드 팁</p>
            <p className="text-slate-400">
              상단 우측의 <strong>[프로젝터 모드]</strong> 버튼을 누르면 빔프로젝터나 Zoom 화면 공유에 최적화된 고대비 대형 폰트로 전환되어 교실 맨 뒷자리 학생도 선명하게 볼 수 있습니다.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 aurora-button rounded-2xl font-bold text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20"
          >
            확인했습니다
          </button>
        </div>

      </div>
    </div>
  );
};
