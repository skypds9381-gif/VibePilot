import React, { useState } from 'react';
import { 
  Wand2, 
  Copy, 
  Check, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  ChevronRight, 
  Flame, 
  ArrowRight,
  Send,
  Lightbulb,
  Smile,
  BookOpen
} from 'lucide-react';
import { copyTextToClipboard } from '../../utils/clipboard';

interface PromptItem {
  id: string;
  category: 'first-words' | 'styling' | 'fix' | 'magic-features';
  categoryLabel: string;
  userThought: string; // 문과생/초보자가 머릿속으로 하는 생각
  vibePrompt: string; // AI가 알아듣는 정제된 1초 바이브 프롬프트
  whyItWorks: string; // 왜 이렇게 말해야 찰떡같이 알아듣는지 해설
  badge?: string;
}

const BEGINNER_PROMPTS: PromptItem[] = [
  {
    id: 'bv-1',
    category: 'first-words',
    categoryLabel: '🐣 첫 시작 말문 트이기',
    userThought: '"코딩 1도 모르는데 계산기 같은 거 하나 만들어보고 싶어요..."',
    vibePrompt: 'HTML과 Tailwind CSS만 사용해서, 숫자를 누르면 소리와 함께 계산 결과가 화면에 애니메이션으로 뜨는 모던한 계산기 웹앱을 하나의 파일로 완성해줘. 디자인은 다크모드 애플 스타일로 해줘.',
    whyItWorks: '기술 스택(HTML/Tailwind)과 단일 파일 조건, 디자인 톤앤매너(애플 스타일)를 명시해 초보자가 파일 연결로 고생하지 않게 해줍니다.',
    badge: '가장 많이 쓰는 말문'
  },
  {
    id: 'bv-2',
    category: 'first-words',
    categoryLabel: '🐣 첫 시작 말문 트이기',
    userThought: '"친구들이랑 재미로 할 수 있는 룰렛이나 제비뽑기 없을까요?"',
    vibePrompt: '참가자 이름을 쉼표로 입력하고 [돌리기]를 누르면 3초 동안 원판이 회전하다가 1명을 뽑아주는 당첨 룰렛 웹을 만들어줘. 당첨 순간 폭죽 이펙트(confetti)를 화면 전체에 터뜨려줘.',
    whyItWorks: '입력 방식(쉼표 구분), 시간(3초), 시각적 보상(confetti 폭죽)을 구체적으로 지시하여 완성도 높은 게임을 바로 만듭니다.',
    badge: '실습 10분 인기'
  },
  {
    id: 'bv-3',
    category: 'styling',
    categoryLabel: '🎨 디자인 예쁘게 만들기',
    userThought: '"만들긴 했는데 디자인이 너무 90년대 홈페이지 같아요 ㅠㅠ"',
    vibePrompt: '현재 디자인이 너무 투박해. 토스(Toss)나 에어비앤비처럼 둥근 모서리(rounded-[20px]), 부드러운 그림자(shadow-xl), 세련된 여백과 고대비 폰트를 적용해서 현대적인 핀테크 앱 느낌으로 전면 리디자인해줘.',
    whyItWorks: '레퍼런스 브랜드(토스/에어비앤비)와 구체적 CSS 키워드(rounded-[20px], shadow-xl)를 던져주면 AI가 감각적인 디자인 시스템을 일괄 적용합니다.'
  },
  {
    id: 'bv-4',
    category: 'styling',
    categoryLabel: '🎨 디자인 예쁘게 만들기',
    userThought: '"배경이 너무 밋밋해서 심심해요."',
    vibePrompt: '배경에 은은하게 움직이는 보라색과 시안색 그라데이션 블러(mesh gradient)를 깔아주고, 카드 컴포넌트에는 반투명 유리 효과(Glassmorphism: bg-white/10 backdrop-blur-md)를 줘서 미래적인 느낌을 줘.',
    whyItWorks: '글래스모피즘과 블러 효과 키워드를 주면 초보자 코드도 단숨에 실리콘밸리 스타트업 랜딩페이지처럼 바뀝니다.'
  },
  {
    id: 'bv-5',
    category: 'fix',
    categoryLabel: '🛠️ 버튼이나 기능 안 될 때',
    userThought: '"버튼 눌렀는데 아무 반응이 없고 먹통이에요."',
    vibePrompt: '지금 [결과 확인] 버튼을 클릭해도 아무런 이벤트가 발생하지 않아. 버튼의 onClick 핸들러가 정상 연결되었는지 확인하고, 클릭 시 사용자 입력값을 유효성 검사한 뒤 토스트 팝업으로 결과를 띄우도록 수정해줘.',
    whyItWorks: '어떤 버튼인지 명시하고, 단순 동작뿐 아니라 "유효성 검사 + 토스트 알림"까지 요청해 UX를 살려줍니다.',
    badge: '먹통 해결 치트키'
  },
  {
    id: 'bv-6',
    category: 'fix',
    categoryLabel: '🛠️ 버튼이나 기능 안 될 때',
    userThought: '"새로고침하면 내가 적어둔 메모가 다 사라져요!"',
    vibePrompt: '사용자가 입력하거나 체크한 모든 데이터가 브라우저의 localStorage에 자동 저장되게 해줘. 그래서 페이지를 새로고침하거나 브라우저를 껐다 켜도 기존 입력 상태가 100% 복구되어야 해.',
    whyItWorks: '데이터베이스(DB) 서버 없이도 사용자의 컴퓨터에 영구 저장하는 비법이 바로 localStorage 연동입니다.'
  },
  {
    id: 'bv-7',
    category: 'magic-features',
    categoryLabel: '🪄 1초 만에 감동 주는 기능',
    userThought: '"모바일 폰에서 카톡으로 친구한테 공유하고 싶어요."',
    vibePrompt: '스마트폰 브라우저에서 [공유하기] 버튼을 누르면 Web Share API(navigator.share)를 호출해서 카카오톡이나 문자 메시지로 현재 페이지 링크가 바로 공유되도록 만들어줘.',
    whyItWorks: 'Web Share API 키워드 하나로 모바일 네이티브 공유창을 그대로 호출할 수 있습니다.'
  },
  {
    id: 'bv-8',
    category: 'magic-features',
    categoryLabel: '🪄 1초 만에 감동 주는 기능',
    userThought: '"결과물을 종이나 PDF로 깔끔하게 저장하고 싶어요."',
    vibePrompt: '[PDF / 인쇄하기] 버튼을 추가해줘. 클릭 시 window.print()를 실행하되, 인쇄 시에는 불필요한 네비게이션 버튼들을 숨기고(@media print) A4 용지 규격에 딱 맞춰 영수증처럼 단정하게 출력되도록 print 전용 스타일을 넣어줘.',
    whyItWorks: '인쇄 시 불필요한 UI 숨김 처리(@media print)를 자동으로 작성해주어 완벽한 A4 문서를 뽑아냅니다.'
  }
];

interface VibeBeginnerVendingProps {
  isProjectorMode?: boolean;
}

export const VibeBeginnerVending: React.FC<VibeBeginnerVendingProps> = ({ isProjectorMode = false }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '전체 보기' },
    { id: 'first-words', label: '🐣 첫 시작 말문' },
    { id: 'styling', label: '🎨 디자인 성형' },
    { id: 'fix', label: '🛠️ 먹통·에러 해결' },
    { id: 'magic-features', label: '🪄 공유·PDF 마법' },
  ];

  const filtered = selectedCat === 'all' 
    ? BEGINNER_PROMPTS 
    : BEGINNER_PROMPTS.filter(p => p.category === selectedCat);

  const handleCopy = async (id: string, text: string) => {
    await copyTextToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className={`space-y-8 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[24px] border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
              <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>NON-PROGRAMMER 1-SEC PROMPT VENDING MACHINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              🪄 초보자 말문 트임기 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">(문과생·비전공자 전용)</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              "AI에게 뭐라고 말해야 할지 모르겠어요..." 걱정 끝! 
              머릿속에 떠오른 답답한 일상어 생각을 클릭하면, <strong>Cursor / Claude / ChatGPT가 1초 만에 찰떡같이 알아듣는 황금 바이브 프롬프트</strong>로 즉시 자판기처럼 뽑아줍니다!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-xs space-y-1.5 shrink-0 sm:max-w-xs">
            <div className="text-indigo-400 font-bold flex items-center gap-1">
              <Smile className="w-4 h-4" />
              <span>강의 팁: 꿀팁 전수</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              수강생들에게 "코딩 용어 몰라도 됩니다. 이 자판기에서 상황에 맞는 문장을 골라 그대로 복사해 붙여넣으세요!"라고 안내하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCat === c.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-white/[0.12]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => {
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-[24px] border border-white/[0.12] bg-slate-900/90 hover:border-indigo-500/40 p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group shadow-lg space-y-4"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-indigo-400">
                    {item.categoryLabel}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* User's natural thought */}
                <div className="p-3 rounded-xl bg-[#07080f]/90 border border-white/[0.12]/80">
                  <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />
                    내가 머릿속으로 하는 생각:
                  </p>
                  <p className="text-sm font-semibold text-slate-200 italic">
                    {item.userThought}
                  </p>
                </div>

                {/* AI prompt transformation */}
                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 relative group/prompt">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      AI가 1초 만에 알아듣는 마법 주문:
                    </span>
                    <button
                      onClick={() => handleCopy(item.id, item.vibePrompt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'linear-btn-primary rounded-xl font-bold text-white shadow-sm'
                      }`}
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? '복사 완료!' : '복사'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-200 leading-relaxed break-words">
                    {item.vibePrompt}
                  </p>
                </div>

                {/* Why it works */}
                <div className="text-[11px] text-slate-400 flex items-start gap-1.5 pt-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p><span className="text-slate-300 font-semibold">왜 잘 먹힐까?</span> {item.whyItWorks}</p>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-2 border-t border-white/[0.12] flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500">Claude · Cursor · ChatGPT 100% 호환</span>
                <button
                  onClick={() => handleCopy(item.id, item.vibePrompt)}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>프롬프트 복사하기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
