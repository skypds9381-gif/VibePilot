import React, { useState } from 'react';
import { Trophy, Star, Sparkles, RotateCcw, Ticket, Film, Swords, ChevronRight, Check } from 'lucide-react';
import { MovieItem, MOVIE_DATABASE, WORLDCUP_THEMES, WorldCupTheme } from '../../data/movieDatabase';

interface WorldCupGameProps {
  onOpenTicket: (movie: MovieItem) => void;
  onSelectDetail: (movie: MovieItem) => void;
}

export const WorldCupGame: React.FC<WorldCupGameProps> = ({
  onOpenTicket,
  onSelectDetail
}) => {
  // Game states: 'INTRO' | 'PLAYING' | 'CHAMPION'
  const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'CHAMPION'>('INTRO');
  const [selectedThemeId, setSelectedThemeId] = useState<string>('alltime');
  
  // Current tournament pool
  const [currentRoundMovies, setCurrentRoundMovies] = useState<MovieItem[]>([]);
  const [nextRoundMovies, setNextRoundMovies] = useState<MovieItem[]>([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [champion, setChampion] = useState<MovieItem | null>(null);

  // Play synthesized chime using Web Audio API
  const playChime = (freq = 440) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio context might be restricted
    }
  };

  // Start 16-round tournament with selected theme filter
  const startTournament = (themeId = selectedThemeId) => {
    const theme = WORLDCUP_THEMES.find((t) => t.id === themeId) || WORLDCUP_THEMES[0];
    let pool = MOVIE_DATABASE.filter(theme.filter);

    // If pool is less than 16, supplement with top-rated movies
    if (pool.length < 16) {
      const remainder = MOVIE_DATABASE.filter((m) => !pool.some((p) => p.id === m.id));
      pool = [...pool, ...remainder];
    }

    // Shuffle and pick exactly 16
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 16);
    setCurrentRoundMovies(shuffled);
    setNextRoundMovies([]);
    setMatchIndex(0);
    setChampion(null);
    setGameState('PLAYING');
    playChime(520);
  };

  // User chooses candidate A or B
  const handleSelectWinner = (winner: MovieItem) => {
    playChime(660);
    const updatedNextRound = [...nextRoundMovies, winner];

    // If there are more matches in the current round
    if (matchIndex + 2 < currentRoundMovies.length) {
      setNextRoundMovies(updatedNextRound);
      setMatchIndex(matchIndex + 2);
    } else {
      // Current round finished!
      if (updatedNextRound.length === 1) {
        // We have a grand champion!
        setChampion(updatedNextRound[0]);
        setGameState('CHAMPION');
        playChime(880);
      } else {
        // Proceed to next round (e.g. 16 -> 8, 8 -> 4, 4 -> 2)
        setCurrentRoundMovies(updatedNextRound);
        setNextRoundMovies([]);
        setMatchIndex(0);
      }
    }
  };

  const getRoundLabel = (totalInRound: number) => {
    if (totalInRound === 16) return '16강';
    if (totalInRound === 8) return '8강';
    if (totalInRound === 4) return '준결승 4강';
    if (totalInRound === 2) return '결승전 (FINAL)';
    return `${totalInRound}강`;
  };

  // INTRO SCREEN
  if (gameState === 'INTRO') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[#10121A] border border-amber-900/40 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-red-950/20 pointer-events-none" />

          {/* Trophy Header */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-0.5 shadow-xl shadow-amber-500/20">
            <div className="w-full h-full bg-[#141622] rounded-2xl flex items-center justify-center">
              <Trophy className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 block mb-2">
            CINEMATIC TOURNAMENT
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide mb-4">
            오늘 밤 영화 이상형 월드컵 16강
          </h2>
          <p className="text-sm md:text-base text-stone-300 max-w-xl mx-auto leading-relaxed mb-6">
            고민할 시간 없이 직관으로 둘 중 더 끌리는 영화를 탭하세요!<br />
            원하는 테마를 고르고 1위 인생작을 찾아보세요.
          </p>

          {/* Theme Selection Grid */}
          <div className="max-w-2xl mx-auto mb-8 text-left space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block text-center">
              월드컵 테마 선택 (택 1)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WORLDCUP_THEMES.map((theme) => {
                const isSelected = selectedThemeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedThemeId(theme.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 text-white shadow-md shadow-amber-500/10'
                        : 'border-stone-800 bg-[#141622] text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-amber-100 flex items-center gap-1.5 mb-0.5">
                        <span>{theme.title}</span>
                      </div>
                      <p className="text-[11px] text-stone-400">
                        {theme.desc}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => startTournament(selectedThemeId)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-stone-950 shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Swords className="w-5 h-5 text-stone-950" />
              <span>선택한 테마로 16강 시작하기</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-center gap-6 text-xs text-stone-400 font-mono">
            <span>⏱️ 소요 시간: 약 1분</span>
            <span>·</span>
            <span>🎬 총 16편 토너먼트 매칭</span>
            <span>·</span>
            <span>🎟️ 1위 선정 시 티켓 발권</span>
          </div>
        </div>
      </div>
    );
  }

  // CHAMPION VICTORY SCREEN
  if (gameState === 'CHAMPION' && champion) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-in zoom-in-95 duration-300">
        <div className="bg-[#11131C] border-2 border-amber-500/60 rounded-3xl p-6 md:p-10 text-center shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-radial-at-t from-amber-500/15 via-transparent to-black pointer-events-none" />

          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold tracking-wider mb-4 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Grand Champion · 최종 우승작</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
            {champion.title}
          </h2>
          <p className="text-sm text-stone-400 italic mb-6">
            {champion.originalTitle} ({champion.year}) · 감독 {champion.director}
          </p>

          {/* Champion Highlight Box */}
          <div className={`max-w-lg mx-auto p-6 rounded-2xl bg-gradient-to-b ${champion.posterBg} border border-amber-500/30 text-left shadow-xl mb-6 relative`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-black/60 text-amber-300 border border-amber-500/30">
                {champion.highlightTag}
              </span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {champion.rating} / 10
              </span>
            </div>

            <p className="text-stone-200 text-sm leading-relaxed mb-4">
              {champion.synopsis}
            </p>

            <div className="p-3 rounded-lg bg-black/50 border-l-2 border-amber-400 text-amber-200 font-serif italic text-xs mb-3">
              {champion.famousLine}
            </div>

            <div className="text-xs text-stone-300 flex items-center gap-1.5 pt-1 border-t border-white/10">
              <span className="text-amber-400">🍿 추천 야식:</span>
              <span>{champion.snackPairing.food} + {champion.snackPairing.drink}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenTicket(champion)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4 text-stone-950" />
              <span>우승 기념 티켓 발권하기</span>
            </button>
            <button
              onClick={() => onSelectDetail(champion)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-medium text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
            >
              <Film className="w-4 h-4" />
              <span>상세 정보 및 예고편</span>
            </button>
            <button
              onClick={() => startTournament()}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-medium text-stone-400 hover:text-stone-200 bg-stone-900 border border-stone-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시 하기</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE MATCH SCREEN
  const movieA = currentRoundMovies[matchIndex];
  const movieB = currentRoundMovies[matchIndex + 1];
  const totalInRound = currentRoundMovies.length;
  const currentMatchNum = Math.floor(matchIndex / 2) + 1;
  const totalMatchesInRound = totalInRound / 2;

  if (!movieA || !movieB) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Tournament Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
              {getRoundLabel(totalInRound)}
            </span>
            <span className="text-sm font-semibold text-stone-300">
              {currentMatchNum} / {totalMatchesInRound} 매치
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            둘 중 오늘 밤 더 끌리는 영화를 터치하세요!
          </p>
        </div>

        <button
          onClick={() => startTournament()}
          className="self-start sm:self-auto text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>처음부터 다시 시작</span>
        </button>
      </div>

      {/* VS Match Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* Center VS Badge */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 items-center justify-center text-black font-black text-lg shadow-2xl shadow-amber-500/30 border-2 border-stone-900 pointer-events-none">
          VS
        </div>

        {/* Card A */}
        <button
          onClick={() => handleSelectWinner(movieA)}
          className={`group text-left p-6 md:p-8 rounded-3xl bg-gradient-to-b ${movieA.posterBg} border-2 border-stone-700/60 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 active:scale-[0.98] transition-all duration-200 relative overflow-hidden flex flex-col justify-between min-h-[380px]`}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-black/60 text-amber-300 border border-amber-500/30">
                {movieA.highlightTag}
              </span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {movieA.rating}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
              {movieA.title}
            </h3>
            <p className="text-xs text-stone-300 mb-3 italic">
              {movieA.originalTitle} ({movieA.year}) · {movieA.genre.join(', ')}
            </p>

            <p className="text-xs md:text-sm text-stone-200 line-clamp-3 leading-relaxed mb-4">
              {movieA.synopsis}
            </p>

            <div className="p-3 rounded-xl bg-black/40 border-l-2 border-amber-400 text-amber-200/90 font-serif italic text-xs">
              {movieA.famousLine}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-300 relative z-10">
            <span className="font-mono text-amber-400">⏱️ {movieA.runtime}분</span>
            <div className="flex items-center gap-1 font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
              <span>이 영화 선택하기</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </button>

        {/* Card B */}
        <button
          onClick={() => handleSelectWinner(movieB)}
          className={`group text-left p-6 md:p-8 rounded-3xl bg-gradient-to-b ${movieB.posterBg} border-2 border-stone-700/60 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 active:scale-[0.98] transition-all duration-200 relative overflow-hidden flex flex-col justify-between min-h-[380px]`}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-black/60 text-amber-300 border border-amber-500/30">
                {movieB.highlightTag}
              </span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {movieB.rating}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
              {movieB.title}
            </h3>
            <p className="text-xs text-stone-300 mb-3 italic">
              {movieB.originalTitle} ({movieB.year}) · {movieB.genre.join(', ')}
            </p>

            <p className="text-xs md:text-sm text-stone-200 line-clamp-3 leading-relaxed mb-4">
              {movieB.synopsis}
            </p>

            <div className="p-3 rounded-xl bg-black/40 border-l-2 border-amber-400 text-amber-200/90 font-serif italic text-xs">
              {movieB.famousLine}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-300 relative z-10">
            <span className="font-mono text-amber-400">⏱️ {movieB.runtime}분</span>
            <div className="flex items-center gap-1 font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
              <span>이 영화 선택하기</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
