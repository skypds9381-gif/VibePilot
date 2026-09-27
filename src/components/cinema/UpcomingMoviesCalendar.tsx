import React, { useState } from 'react';
import { 
  Calendar, 
  Flame, 
  Bell, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Film,
  Users,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { UPCOMING_MOVIES, calculateDDay, UpcomingMovie } from '../../data/upcomingMoviesData';

export const UpcomingMoviesCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<'all' | '10' | '11' | '12'>('all');
  const [votedMovies, setVotedMovies] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('upcoming_voted_movies');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [subscribedMovies, setSubscribedMovies] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('upcoming_subscribed_movies');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleVote = (movieId: string) => {
    const nextState = !votedMovies[movieId];
    const updated = { ...votedMovies, [movieId]: nextState };
    setVotedMovies(updated);
    try {
      localStorage.setItem('upcoming_voted_movies', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleToggleSubscribe = (movieId: string) => {
    const nextState = !subscribedMovies[movieId];
    const updated = { ...subscribedMovies, [movieId]: nextState };
    setSubscribedMovies(updated);
    try {
      localStorage.setItem('upcoming_subscribed_movies', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const filteredMovies = UPCOMING_MOVIES.filter((movie) => {
    if (selectedMonth === 'all') return true;
    return movie.releaseDate.split('.')[1] === selectedMonth;
  });

  return (
    <section className="p-5 md:p-8 rounded-3xl bg-gradient-to-b from-[#0F111A] via-[#0C0E16] to-[#0A0B10] border border-amber-900/30 shadow-2xl relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold">
              COMING SOON
            </span>
            <span className="text-xs font-mono text-stone-400">
              2026 하반기 극장가 기대작 라인업
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-2.5">
            <Calendar className="w-7 h-7 text-amber-400" />
            <span>개봉 예정작 D-DAY 캘린더 & 기대지수</span>
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1">
            개봉일까지 남은 시간 카운트다운! 가장 보고 싶은 영화에 '기대해요 🔥' 투표를 남겨보세요.
          </p>
        </div>

        {/* Month Filter Tabs */}
        <div className="flex items-center p-1 bg-black/60 border border-stone-800 rounded-xl text-xs">
          <button
            onClick={() => setSelectedMonth('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedMonth === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            전체 일정
          </button>
          <button
            onClick={() => setSelectedMonth('10')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedMonth === '10'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            10월 개봉
          </button>
          <button
            onClick={() => setSelectedMonth('11')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedMonth === '11'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            11월 개봉
          </button>
          <button
            onClick={() => setSelectedMonth('12')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedMonth === '12'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            12월 연말
          </button>
        </div>
      </div>

      {/* Movie Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filteredMovies.map((movie) => {
          const dday = calculateDDay(movie.releaseDate);
          const isVoted = !!votedMovies[movie.id];
          const isSubscribed = !!subscribedMovies[movie.id];
          const currentCount = movie.wantToSeeCount + (isVoted ? 1 : 0);

          return (
            <div
              key={movie.id}
              className={`p-5 rounded-2xl bg-gradient-to-b ${movie.bgGradient} border border-stone-800 hover:border-amber-500/60 transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden`}
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-red-500 opacity-60" />

              <div>
                {/* Header Row: D-Day & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl text-xs font-black font-mono tracking-wider bg-red-600 text-white shadow-md shadow-red-600/30">
                      D-{dday > 0 ? dday : 'DAY'}
                    </span>
                    <span className="text-[11px] font-mono text-stone-300">
                      {movie.releaseDate} 개봉
                    </span>
                  </div>

                  {movie.posterBadge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {movie.posterBadge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-xs text-stone-400 italic mb-3">
                  {movie.originalTitle} · {movie.genre.join(', ')}
                </p>

                {/* Director & Cast */}
                <div className="space-y-1 text-xs text-stone-300 mb-3 p-2.5 rounded-xl bg-black/40 border border-stone-800">
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-500 font-mono">감독:</span>
                    <span className="text-stone-200 font-medium truncate">{movie.director}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-500 font-mono">출연:</span>
                    <span className="text-amber-300 font-bold truncate">{movie.cast.join(', ')}</span>
                  </div>
                </div>

                {/* Synopsis */}
                <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed mb-3">
                  {movie.synopsis}
                </p>

                {/* Expectation Highlight */}
                <div className="p-2.5 rounded-lg bg-amber-950/30 border-l-2 border-amber-400 text-amber-200/90 text-[11px] leading-relaxed mb-4">
                  <span className="font-bold text-amber-400 mr-1">💡 기대포인트:</span>
                  {movie.expectedPoint}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-1">
                  <span>기대지수</span>
                  <span className="font-bold text-red-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                    {currentCount.toLocaleString()}명
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Want to see Vote Button */}
                  <button
                    onClick={() => handleVote(movie.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isVoted
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${isVoted ? 'fill-white' : 'text-red-400'}`} />
                    <span>{isVoted ? '기대중! 🔥' : '보고싶어요'}</span>
                  </button>

                  {/* Notification Alarm */}
                  <button
                    onClick={() => handleToggleSubscribe(movie.id)}
                    title={isSubscribed ? '알림 설정 완료' : '개봉일 알림 받기'}
                    className={`p-2 rounded-xl text-xs font-medium border transition-colors flex items-center justify-center ${
                      isSubscribed
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    {isSubscribed ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                  </button>

                  {/* Teaser Search */}
                  <a
                    href={movie.teaserUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="네이버 예고편 및 정보 검색"
                    className="p-2 rounded-xl text-xs font-medium bg-stone-900 text-stone-400 border border-stone-800 hover:text-white hover:border-stone-700 transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
