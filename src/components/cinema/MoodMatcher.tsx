import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Star, 
  Clock, 
  Film, 
  Ticket, 
  Tv, 
  RotateCcw, 
  Filter, 
  ChevronRight,
  UtensilsCrossed,
  Flame,
  Check
} from 'lucide-react';
import { 
  MovieItem, 
  MOVIE_DATABASE, 
  MOOD_OPTIONS, 
  MoodOption, 
  OTT_PLATFORMS 
} from '../../data/movieDatabase';

interface MoodMatcherProps {
  onOpenTicket: (movie: MovieItem) => void;
  onSelectDetail: (movie: MovieItem) => void;
}

export const MoodMatcher: React.FC<MoodMatcherProps> = ({
  onOpenTicket,
  onSelectDetail
}) => {
  // Filters
  const [selectedMood, setSelectedMood] = useState<MoodOption['id']>('action_thrill');
  const [selectedOtts, setSelectedOtts] = useState<string[]>(['netflix', 'tving', 'coupang']);
  const [companion, setCompanion] = useState<'solo' | 'couple' | 'friends'>('solo');

  // Toggle OTT selection
  const toggleOtt = (id: string) => {
    setSelectedOtts((prev) => 
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  // Filter movies based on selected mood & OTTs
  const matchedMovies = useMemo(() => {
    let pool = MOVIE_DATABASE.filter((m) => m.moods.includes(selectedMood));

    // If OTTs are filtered, rank movies available on those OTTs higher
    if (selectedOtts.length > 0) {
      pool = [...pool].sort((a, b) => {
        const aHasOtt = a.otts.some((o) => selectedOtts.includes(o));
        const bHasOtt = b.otts.some((o) => selectedOtts.includes(o));
        if (aHasOtt && !bHasOtt) return -1;
        if (!aHasOtt && bHasOtt) return 1;
        return b.rating - a.rating;
      });
    }

    // Fallback if empty
    if (pool.length === 0) {
      return MOVIE_DATABASE.slice(0, 3);
    }
    return pool;
  }, [selectedMood, selectedOtts]);

  const topPick = matchedMovies[0];
  const runnerUps = matchedMovies.slice(1, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Welcome / Marquee Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-900/40 bg-[#0E0F17] shadow-2xl p-6 md:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-widest uppercase mb-3">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>오늘 밤 맞춤 영화 추천 시스템</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            오늘 당신의 기분에 딱 맞는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
              인생 영화 한 편
            </span>
          </h1>
          <p className="text-sm md:text-base text-stone-300 leading-relaxed">
            30분 동안 넷플릭스 목록만 뒤적이지 마세요.<br className="hidden sm:inline" />
            지금 끌리는 감정과 OTT를 탭하면 바로 틀어볼 1위 영화를 1초 만에 찾아드립니다.
          </p>
        </div>
      </div>

      {/* STEP 1: 기분 (Mood) 선택 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">1</span>
            <span>오늘 밤 어떤 감정이 끌리시나요?</span>
          </h3>
          <span className="text-xs font-mono text-stone-400">택 1</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOOD_OPTIONS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/10'
                    : 'border-stone-800 bg-[#12141D] hover:border-stone-700 text-stone-300'
                }`}
              >
                <div>
                  <span className="text-2xl mb-2 block">{mood.emoji}</span>
                  <h4 className={`text-sm font-bold mb-1 ${isSelected ? 'text-amber-200' : 'text-stone-100'}`}>
                    {mood.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                    {mood.tagline}
                  </p>
                </div>
                {isSelected && (
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>선택됨</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 2: OTT 플랫폼 필터 */}
      <section className="p-5 rounded-2xl bg-[#11131C] border border-stone-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-serif font-bold text-stone-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">2</span>
            <span>내가 구독 중인 OTT 플랫폼</span>
          </h3>
          <span className="text-xs text-stone-400">구독 중인 서비스를 모두 골라보세요</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {OTT_PLATFORMS.map((ott) => {
            const isChecked = selectedOtts.includes(ott.id);
            return (
              <button
                key={ott.id}
                onClick={() => toggleOtt(ott.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  isChecked
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5" />}
                <span>{ott.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* TOP PICK: 오늘의 1위 추천작 */}
      {topPick && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                RECOMMENDED BEST
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
                오늘 밤을 위한 원픽 (1위)
              </h2>
            </div>
          </div>

          {/* Top Pick Grand Card */}
          <div className={`p-6 md:p-8 rounded-3xl bg-gradient-to-r ${topPick.posterBg} border-2 border-amber-500/40 shadow-2xl relative overflow-hidden`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Info Column */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-amber-300 border border-amber-500/30">
                    {topPick.highlightTag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-black/40 text-stone-300">
                    {topPick.vibe}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-1 tracking-wide">
                    {topPick.title}
                  </h3>
                  <p className="text-sm text-stone-300 italic">
                    {topPick.originalTitle} ({topPick.year}) · {topPick.genre.join(', ')}
                  </p>
                </div>

                {/* Score & Specs */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-200">
                  <span className="flex items-center gap-1 text-amber-400 font-bold bg-black/40 px-2.5 py-1 rounded">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {topPick.rating} / 10
                  </span>
                  <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded">
                    <Clock className="w-4 h-4 text-stone-400" />
                    {topPick.runtime}분
                  </span>
                  <span className="bg-black/40 px-2.5 py-1 rounded text-stone-300">
                    감독: {topPick.director}
                  </span>
                </div>

                {/* Synopsis */}
                <p className="text-sm md:text-base text-stone-100 leading-relaxed max-w-2xl">
                  {topPick.synopsis}
                </p>

                {/* Famous Quote */}
                <div className="p-3.5 rounded-xl bg-black/50 border-l-4 border-amber-400 text-amber-200 font-serif italic text-xs md:text-sm">
                  {topPick.famousLine}
                </div>

                {/* OTT platforms */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-stone-400 font-mono">시청 가능:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {topPick.otts.map((ottId) => {
                      const ott = OTT_PLATFORMS.find((p) => p.id === ottId);
                      return (
                        <span
                          key={ottId}
                          className="px-2 py-0.5 rounded text-[11px] font-bold bg-black/70 text-amber-200 border border-stone-700"
                        >
                          {ott?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={() => onOpenTicket(topPick)}
                    className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4 text-stone-950" />
                    <span>영화 티켓 발권하기</span>
                  </button>
                  <button
                    onClick={() => onSelectDetail(topPick)}
                    className="px-5 py-3 rounded-xl text-sm font-medium text-stone-200 hover:text-white bg-black/60 hover:bg-black/80 border border-stone-700 transition-colors flex items-center gap-1.5"
                  >
                    <Film className="w-4 h-4" />
                    <span>상세 정보 & 예고편</span>
                  </button>
                </div>
              </div>

              {/* Right Snack Column */}
              <div className="lg:col-span-4 bg-black/60 rounded-2xl p-5 border border-stone-800 backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                  <span>오늘 밤 추천 야식 조합</span>
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-amber-200">
                    {topPick.snackPairing.food}
                  </h4>
                  <p className="text-xs text-amber-400/90 font-medium">
                    + {topPick.snackPairing.drink}
                  </p>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {topPick.snackPairing.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RUNNER UPS: 함께 고민해볼 후보작 (2~3위) */}
      {runnerUps.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-serif font-bold text-stone-200">
              이 영화도 당신 취향 저격! (후보작 3편)
            </h3>
            <span className="text-xs text-stone-400">카드를 눌러 상세 보기</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {runnerUps.map((movie) => (
              <div
                key={movie.id}
                onClick={() => onSelectDetail(movie)}
                className={`group cursor-pointer p-5 rounded-2xl bg-gradient-to-b ${movie.posterBg} border border-stone-800 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-black/60 text-amber-300 text-[11px] font-mono">
                      {movie.genre[0]}
                    </span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {movie.rating}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {movie.title}
                  </h4>
                  <p className="text-xs text-stone-400 italic mb-2">
                    {movie.originalTitle} ({movie.year})
                  </p>

                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-3">
                    {movie.synopsis}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                  <span>⏱️ {movie.runtime}분</span>
                  <span className="text-amber-300 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    보기 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
