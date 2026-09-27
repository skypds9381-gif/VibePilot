import React, { useState } from 'react';
import { 
  MessageSquare, 
  Flame, 
  ThumbsUp, 
  ThumbsDown, 
  Send, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Users,
  Award,
  Vote,
  Film
} from 'lucide-react';

interface DebateTopic {
  id: string;
  movieTitle: string;
  question: string;
  description: string;
  sideA: { text: string; count: number };
  sideB: { text: string; count: number };
}

interface ReviewComment {
  id: string;
  movieTitle: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  time: string;
  likes: number;
  badge?: string;
}

const INITIAL_DEBATES: DebateTopic[] = [
  {
    id: 'deb-01',
    movieTitle: '암살자(들)',
    question: '암살자(들) 후반부 충격 반전과 결말, 당신의 선택은?',
    description: '1974년 사건을 모티브로 펼쳐진 마지막 20분 추격과 유해진·박해일의 최후 선택에 대해 관객들의 찬반이 뜨겁게 갈리고 있습니다.',
    sideA: { text: '역대급 카타르시스 & 묵직한 여운 (호)', count: 1420 },
    sideB: { text: '충격적이긴 하나 개연성이 조금 아쉽다 (불호)', count: 380 }
  },
  {
    id: 'deb-02',
    movieTitle: '타짜: 벨제붑의 노래',
    question: '타짜 4는 2006년 오리지널 타짜 1편의 명성을 이을 만한가?',
    description: '20년 만에 돌아온 타짜 완결편! 변요한과 노재원의 살벌한 화투판 텐션에 대한 관객들의 평가.',
    sideA: { text: '1편의 팽팽한 긴장감을 완벽 계승했다', count: 980 },
    sideB: { text: '조승우·김혜수의 원작 1편 벽은 여전히 높다', count: 620 }
  },
  {
    id: 'deb-03',
    movieTitle: '인턴',
    question: '최민식X한소희의 한국판 인턴, 할리우드 원작보다 더 울컥했다?',
    description: '로버트 드니로와 앤 해서웨이의 원작 대비 한국적 정서와 부모-자식 같은 멘토링이 주는 감동.',
    sideA: { text: '한국 정서 가미되어 훨씬 눈물나고 따뜻했다', count: 1250 },
    sideB: { text: '원작 특유의 담백함이 더 좋았다', count: 310 }
  }
];

const INITIAL_COMMENTS: ReviewComment[] = [
  {
    id: 'rev-01',
    movieTitle: '암살자(들)',
    author: '극장1열성애자',
    rating: 5,
    comment: '유해진 눈빛 연기가 그냥 스크린을 씹어먹습니다. 총소리 사운드 디자인 돌비관에서 들으면 심장 떨어짐.',
    time: '15분 전',
    likes: 42,
    badge: '실관람 인증'
  },
  {
    id: 'rev-02',
    movieTitle: '타짜: 벨제붑의 노래',
    author: '화투장인',
    rating: 4,
    comment: '청불이라 수위 걱정했는데 긴장감 조율이 미쳤습니다. 변요한 배우 진짜 인생 캐릭터 경신했네요.',
    time: '32분 전',
    likes: 29,
    badge: '골든에그 94%'
  },
  {
    id: 'rev-03',
    movieTitle: '오디세이',
    author: '놀란신봉자',
    rating: 5,
    comment: '1,100만 넘은 이유가 있음. 놀란 감독은 극장에서 영화를 봐야 하는 이유를 증명하는 사람이다.',
    time: '1시간 전',
    likes: 67,
    badge: '3회차 N차관람'
  },
  {
    id: 'rev-04',
    movieTitle: '인턴',
    author: '가을바람',
    rating: 5,
    comment: '추석에 부모님 모시고 봤는데 엄마 아빠 두 분 다 펑펑 우셨어요. 최민식 배우님 연기는 국보급.',
    time: '2시간 전',
    likes: 51,
    badge: '가족관람 추천'
  }
];

export const CinemaTalkStation: React.FC = () => {
  const [debates, setDebates] = useState<DebateTopic[]>(INITIAL_DEBATES);
  const [userDebateVotes, setUserDebateVotes] = useState<Record<string, 'A' | 'B'>>(() => {
    try {
      const saved = localStorage.getItem('cinema_debate_votes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [comments, setComments] = useState<ReviewComment[]>(() => {
    try {
      const saved = localStorage.getItem('cinema_talk_comments');
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  const [selectedMovieForReview, setSelectedMovieForReview] = useState('암살자(들)');
  const [authorInput, setAuthorInput] = useState('익명 영화광');
  const [commentInput, setCommentInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);

  const handleVoteDebate = (debateId: string, side: 'A' | 'B') => {
    if (userDebateVotes[debateId] === side) return; // already voted this side

    const previousVote = userDebateVotes[debateId];
    setDebates((prev) =>
      prev.map((d) => {
        if (d.id !== debateId) return d;
        let newA = d.sideA.count;
        let newB = d.sideB.count;

        if (previousVote === 'A') newA--;
        if (previousVote === 'B') newB--;

        if (side === 'A') newA++;
        if (side === 'B') newB++;

        return {
          ...d,
          sideA: { ...d.sideA, count: newA },
          sideB: { ...d.sideB, count: newB }
        };
      })
    );

    const updatedVotes = { ...userDebateVotes, [debateId]: side };
    setUserDebateVotes(updatedVotes);
    try {
      localStorage.setItem('cinema_debate_votes', JSON.stringify(updatedVotes));
    } catch {
      // ignore
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newRev: ReviewComment = {
      id: `rev-${Date.now()}`,
      movieTitle: selectedMovieForReview,
      author: authorInput.trim() || '익명 관객',
      rating: ratingInput,
      comment: commentInput.trim(),
      time: '방금 전',
      likes: 1,
      badge: '방금 등록'
    };

    const updated = [newRev, ...comments];
    setComments(updated);
    try {
      localStorage.setItem('cinema_talk_comments', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setCommentInput('');
  };

  const handleLikeComment = (revId: string) => {
    const updated = comments.map((c) =>
      c.id === revId ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updated);
    try {
      localStorage.setItem('cinema_talk_comments', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section className="p-5 md:p-8 rounded-3xl bg-gradient-to-b from-[#0F111A] via-[#0C0E16] to-[#0A0B10] border border-amber-900/30 shadow-2xl relative space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-[11px] font-mono font-bold animate-pulse">
              LIVE DEBATE
            </span>
            <span className="text-xs font-mono text-stone-400">
              실관람객 팝콘 평점 & 끝장 토론장
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-2.5">
            <MessageSquare className="w-7 h-7 text-amber-400" />
            <span>시네마 톡 스테이션 & 끝장 토론</span>
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1">
            관객들의 뜨거운 찬반 토론에 투표하고, 솔직담백한 실시간 한줄평을 나눠보세요!
          </p>
        </div>
      </div>

      {/* Part 1: Weekly End-Game Debates (끝장 토론 배틀) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Vote className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-serif font-bold text-white">
            금주의 극장가 찬반 끝장 토론 (실시간 투표)
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {debates.map((debate) => {
            const total = debate.sideA.count + debate.sideB.count;
            const percentA = total > 0 ? Math.round((debate.sideA.count / total) * 100) : 50;
            const percentB = 100 - percentA;
            const userVote = userDebateVotes[debate.id];

            return (
              <div
                key={debate.id}
                className="p-5 rounded-2xl bg-[#121420] border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                      {debate.movieTitle}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      총 {total.toLocaleString()}명 참여
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-serif mb-2 leading-snug">
                    {debate.question}
                  </h4>
                  <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                    {debate.description}
                  </p>

                  {/* Percentage Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-stone-900 overflow-hidden flex mb-2 shadow-inner">
                    <div
                      style={{ width: `${percentA}%` }}
                      className="bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                    />
                    <div
                      style={{ width: `${percentB}%` }}
                      className="bg-gradient-to-r from-stone-600 to-stone-500 transition-all duration-500"
                    />
                  </div>

                  <div className="flex justify-between text-xs font-mono mb-4">
                    <span className="text-amber-400 font-bold">{percentA}%</span>
                    <span className="text-stone-400 font-bold">{percentB}%</span>
                  </div>
                </div>

                {/* Vote Buttons */}
                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <button
                    onClick={() => handleVoteDebate(debate.id, 'A')}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between ${
                      userVote === 'A'
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800'
                    }`}
                  >
                    <span className="truncate pr-2">A. {debate.sideA.text}</span>
                    <span className="font-mono font-bold shrink-0">{debate.sideA.count}표</span>
                  </button>

                  <button
                    onClick={() => handleVoteDebate(debate.id, 'B')}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between ${
                      userVote === 'B'
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800'
                    }`}
                  >
                    <span className="truncate pr-2">B. {debate.sideB.text}</span>
                    <span className="font-mono font-bold shrink-0">{debate.sideB.count}표</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Realtime Audience Reviews & Live Comments */}
      <div className="pt-6 border-t border-stone-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-serif font-bold text-white">
              실시간 관객 팝콘 한줄평 ({comments.length}개)
            </h3>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleAddReview} className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-stone-800 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedMovieForReview}
              onChange={(e) => setSelectedMovieForReview(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="암살자(들)">암살자(들)</option>
              <option value="타짜: 벨제붑의 노래">타짜: 벨제붑의 노래</option>
              <option value="오디세이">오디세이</option>
              <option value="인턴">인턴</option>
              <option value="어벤져스: 엔드게임">어벤져스: 엔드게임</option>
            </select>

            <input
              type="text"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              placeholder="닉네임"
              className="w-28 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white"
            />

            {/* Popcorn Rating 1-5 */}
            <div className="flex items-center gap-1 bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-700">
              <span className="text-xs text-stone-400 mr-1">팝콘:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRatingInput(star)}
                  className={`text-sm transition-transform hover:scale-125 ${
                    star <= ratingInput ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  🍿
                </button>
              ))}
              <span className="text-xs font-mono font-bold text-amber-400 ml-1">
                {ratingInput}점
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="영화에 대한 솔직한 한줄평과 후기를 남겨주세요..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center gap-1.5 shadow-md shadow-amber-500/20 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>등록</span>
            </button>
          </div>
        </form>

        {/* Comments Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {comments.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-xl bg-[#121420] border border-stone-800/80 hover:border-stone-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-300 font-serif">
                      {rev.movieTitle}
                    </span>
                    <span className="text-stone-600">·</span>
                    <span className="text-stone-300 font-medium">
                      {rev.author}
                    </span>
                    {rev.badge && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {rev.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} className="text-xs">🍿</span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-stone-200 leading-relaxed mb-3">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-800/60">
                <span>{rev.time}</span>
                <button
                  onClick={() => handleLikeComment(rev.id)}
                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>공감 {rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
