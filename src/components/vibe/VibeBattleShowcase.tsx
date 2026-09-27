import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  ThumbsUp, 
  ExternalLink, 
  Sparkles, 
  Send, 
  Medal, 
  Crown, 
  CheckCircle2, 
  Clock, 
  User, 
  Tag, 
  Layers,
  Heart,
  Share2,
  Code2
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  rank: number;
  title: string;
  author: string;
  role: string;
  duration: string;
  votes: number;
  tags: string[];
  description: string;
  techStack: string;
  previewColor: string;
  demoUrl?: string;
  vibePromptSnippet: string;
}

const INITIAL_SHOWCASE: ShowcaseItem[] = [
  {
    id: 'battle-1',
    rank: 1,
    title: '🍕 우리 동네 야식 룰렛 & 즉시 배달 주문서',
    author: '김민지',
    role: '비전공자 / 마케터',
    duration: '9분 30초 완성',
    votes: 142,
    tags: ['룰렛게임', '카카오페이 UI', '배달앱'],
    description: '결정장애 친구들을 위해 제작한 야식 랜덤 룰렛! 룰렛 당첨 시 메뉴 칼로리와 카카오페이 가짜 결제 영수증까지 10분 만에 뚝딱 완성했습니다.',
    techStack: 'HTML5 Canvas + Tailwind + 바이브코딩',
    previewColor: 'from-amber-500/20 via-orange-600/10 to-transparent border-amber-500/40',
    demoUrl: 'https://ais-dev-wqw7y25ace6vuipjne5tyw-127538981527.asia-east1.run.app',
    vibePromptSnippet: '10초 안에 돌아가는 야식 원판 룰렛 만들고 결과 나오면 폭죽 이펙트와 가짜 결제 모달 띄워줘.'
  },
  {
    id: 'battle-2',
    rank: 2,
    title: '📊 스타트업 3초 급여 명세서 & 실질 실수령액 계산기',
    author: '이진우',
    role: '인사총무 2년차',
    duration: '8분 45초 완성',
    votes: 128,
    tags: ['급여계산', '세금자동공제', 'PDF출력'],
    description: '4대 보험과 근로소득세 요율을 실시간으로 차감하여 실제 통장에 꽂히는 실수령액을 시각화하고 PDF로 저장할 수 있는 계산기입니다.',
    techStack: 'React + Chart.js + Tailwind CSS',
    previewColor: 'from-cyan-500/20 via-blue-600/10 to-transparent border-cyan-500/40',
    vibePromptSnippet: '기본급과 식대를 입력하면 4대보험 자동 공제하고 실수령액 원형 도넛 차트로 보여주는 실무 앱 만들어줘.'
  },
  {
    id: 'battle-3',
    rank: 3,
    title: '🎵 빗소리와 함께 듣는 로파이(Lo-Fi) 무드 타이머',
    author: '박수현',
    role: '취업준비생',
    duration: '10분 00초 완성',
    votes: 95,
    tags: ['오디오WebAPI', '뽀모도로', '레트로감성'],
    description: '집중이 안 될 때 켜두는 25분 뽀모도로 타이머. 창문에 흐르는 빗방울 애니메이션과 빗소리 노이즈 앰비언트 사운드를 탑재했습니다.',
    techStack: 'Web Audio API + CSS Canvas Rain',
    previewColor: 'from-indigo-500/20 via-purple-600/10 to-transparent border-indigo-500/40',
    vibePromptSnippet: '빗소리 ASMR 재생 버튼이 있고 25분 카운트다운 타이머와 감성적인 다크모드 배경을 가진 로파이 타이머 만들어줘.'
  },
  {
    id: 'battle-4',
    rank: 4,
    title: '🐱 집사를 위한 우리 냥이 생애주기 건강 알림장',
    author: '최예은',
    role: '디자이너',
    duration: '7분 10초 완성',
    votes: 79,
    tags: ['반려동물', '일정알림', '로컬저장'],
    description: '반려묘 생년월일을 넣으면 예방접종 주기, 심장사상충 복용일, 체중 변화 그래프를 깔끔한 파스텔톤으로 기록해 줍니다.',
    techStack: 'LocalStorage + Tailwind + 아이콘',
    previewColor: 'from-rose-500/20 via-pink-600/10 to-transparent border-rose-500/40',
    vibePromptSnippet: '고양이 생일 입력하면 접종 주기 체크리스트 나오고 완료 버튼 누르면 로컬 저장되는 핑크빛 집사 앱 만들어줘.'
  }
];

interface VibeBattleShowcaseProps {
  isProjectorMode?: boolean;
}

export const VibeBattleShowcase: React.FC<VibeBattleShowcaseProps> = ({ isProjectorMode = false }) => {
  const [items, setItems] = useState<ShowcaseItem[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_battle_showcase');
      return saved ? JSON.parse(saved) : INITIAL_SHOWCASE;
    } catch {
      return INITIAL_SHOWCASE;
    }
  });

  const [votedMap, setVotedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('vibe_battle_voted');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('수강생 / 코딩 첫날');
  const [newDuration, setNewDuration] = useState('9분 50초 완성');
  const [newDesc, setNewDesc] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [newTags, setNewTags] = useState('10분실습, 바이브코딩');

  const handleVote = (id: string) => {
    if (votedMap[id]) return;

    const nextVoted = { ...votedMap, [id]: true };
    setVotedMap(nextVoted);

    const nextItems = items.map(item => {
      if (item.id === id) {
        return { ...item, votes: item.votes + 1 };
      }
      return item;
    }).sort((a, b) => b.votes - a.votes)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));

    setItems(nextItems);
    try {
      localStorage.setItem('vibe_battle_voted', JSON.stringify(nextVoted));
      localStorage.setItem('vibe_battle_showcase', JSON.stringify(nextItems));
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const newItem: ShowcaseItem = {
      id: `battle-${Date.now()}`,
      rank: items.length + 1,
      title: newTitle.trim(),
      author: newAuthor.trim(),
      role: newRole.trim(),
      duration: newDuration.trim(),
      votes: 1,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      description: newDesc.trim() || '수업 시간에 바이브코딩으로 10분 만에 구현한 멋진 결과물입니다!',
      techStack: 'HTML + Tailwind + AI 바이브코딩',
      previewColor: 'from-emerald-500/20 via-teal-600/10 to-transparent border-emerald-500/40',
      vibePromptSnippet: newPrompt.trim() || '프롬프트 입력만으로 완성된 결과물입니다.'
    };

    const next = [newItem, ...items].sort((a, b) => b.votes - a.votes).map((it, idx) => ({ ...it, rank: idx + 1 }));
    setItems(next);
    try {
      localStorage.setItem('vibe_battle_showcase', JSON.stringify(next));
    } catch {
      // ignore
    }

    setIsSubmitOpen(false);
    setNewTitle('');
    setNewAuthor('');
    setNewDesc('');
    setNewPrompt('');
  };

  return (
    <div className={`space-y-8 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>LIVE SHOWCASE & VOTING BATTLE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              🏆 10분 실습 자랑 배틀 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">(명예의 전당)</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              수업 시간 10분 실습 타이머가 끝나면, 수강생들이 직접 완성한 웹앱을 등록하고 투표하는 실시간 배틀 쇼케이스입니다! 
              동료들의 기발한 아이디어와 프롬프트를 확인하고 좋아요를 눌러 명예의 전당 1위를 가려보세요!
            </p>
          </div>

          <button
            onClick={() => setIsSubmitOpen(true)}
            className="px-5 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all self-start sm:self-auto shrink-0"
          >
            <Flame className="w-4 h-4 fill-slate-950" />
            <span>내 10분 작품 등록하기</span>
          </button>
        </div>
      </div>

      {/* Register Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">명예의 전당 작품 출품하기</h3>
              </div>
              <button 
                onClick={() => setIsSubmitOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">작품 제목 (웹앱 이름)</label>
                <input
                  type="text"
                  required
                  placeholder="예: 🍕 우리 동네 야식 룰렛"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">제작자 이름 / 닉네임</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 김민지"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">소속 / 배경</label>
                  <input
                    type="text"
                    placeholder="예: 비전공자 / 마케터"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">작품 소개 (어떤 기능이 있나요?)</label>
                <textarea
                  rows={2}
                  placeholder="예: 룰렛을 돌려 야식을 정하고 카카오페이 가짜 결제까지 구현했습니다."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">내가 쓴 핵심 프롬프트 1줄</label>
                <input
                  type="text"
                  placeholder="예: 10초 회전 룰렛 만들고 결과 나오면 폭죽 터지는 애니메이션 줘."
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>배틀 등록하기</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => {
          const isTop3 = item.rank <= 3;
          const hasVoted = votedMap[item.id];

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 bg-slate-900/80 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/50 hover:shadow-xl ${
                item.rank === 1
                  ? 'border-amber-400/60 bg-gradient-to-br from-amber-950/30 to-slate-900 shadow-amber-500/10 shadow-lg'
                  : item.rank === 2
                  ? 'border-slate-500/40 bg-gradient-to-br from-slate-800/30 to-slate-900'
                  : item.rank === 3
                  ? 'border-amber-700/40 bg-gradient-to-br from-amber-950/20 to-slate-900'
                  : 'border-slate-800'
              }`}
            >
              <div>
                {/* Header: Rank + Votes */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                      item.rank === 1 
                        ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/30'
                        : item.rank === 2
                        ? 'bg-slate-300 text-slate-950'
                        : item.rank === 3
                        ? 'bg-amber-700 text-amber-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.rank === 1 ? '👑 1' : item.rank}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </span>
                  </div>

                  {/* Vote Button */}
                  <button
                    onClick={() => handleVote(item.id)}
                    disabled={hasVoted}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                      hasVoted
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 cursor-default'
                        : 'bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 border border-slate-700 active:scale-95'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasVoted ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
                    <span>{item.votes} 표</span>
                  </button>
                </div>

                {/* Title & Author */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 mb-3">
                  <span className="text-slate-200 font-semibold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    {item.author}
                  </span>
                  <span>•</span>
                  <span>{item.role}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-3">
                  {item.description}
                </p>

                {/* Key Prompt */}
                <div className="text-[11px] bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-2.5 text-indigo-200 font-mono mb-3">
                  <div className="text-[10px] text-indigo-400 font-bold flex items-center gap-1 mb-1">
                    <Code2 className="w-3 h-3" />
                    <span>핵심 바이브 프롬프트</span>
                  </div>
                  "{item.vibePromptSnippet}"
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[10px] text-slate-500">{item.techStack}</span>
                <span className="text-amber-400 font-semibold text-[11px]">
                  {item.rank === 1 ? '🥇 주간 명예의 전당 1위' : '실전 작품 인증'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
