import React, { useState, useMemo, useEffect } from 'react';
import { 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles, 
  Star, 
  Users, 
  Tv, 
  ExternalLink, 
  RefreshCw, 
  Ticket, 
  Film,
  Building,
  Calendar,
  Layers,
  CheckCircle2,
  Camera,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  X,
  Palette,
  Key,
  Globe2,
  Check
} from 'lucide-react';
import { REALTIME_BOX_OFFICE, BOX_OFFICE_STATS, BoxOfficeMovie } from '../../data/boxOfficeData';
import { MovieItem } from '../../data/movieDatabase';
import { KobisApiKeyModal } from './KobisApiKeyModal';
import { getFallbackPoster, DEFAULT_MOVIE_POSTERS, fetchTmdbPoster } from '../../data/defaultPosters';

interface BoxOfficeLiveProps {
  onOpenTicket: (movie: MovieItem) => void;
  onSelectDetail: (movie: MovieItem) => void;
}

// Helper to format audience count cleanly (preventing 2-line wraps on mobile)
function formatAudienceCount(num: number, isShort = false): string {
  if (isShort && num >= 10000) {
    const man = Math.floor(num / 10000);
    const rest = Math.floor((num % 10000) / 1000);
    if (man >= 1000) {
      return `${(num / 10000).toFixed(0)}만`;
    }
    return rest > 0 ? `${man}.${rest}만` : `${man}만`;
  }
  return num.toLocaleString();
}

export const BoxOfficeLive: React.FC<BoxOfficeLiveProps> = ({
  onOpenTicket,
  onSelectDetail
}) => {
  const [filterMode, setFilterMode] = useState<'daily' | 'booking' | 'total'>('daily');
  const [posterStyle, setPosterStyle] = useState<'theater' | 'ai'>('theater');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // KOBIS API Integration state
  const [kobisKey, setKobisKey] = useState<string>(() => {
    try {
      return localStorage.getItem('kobis_api_key') || '';
    } catch {
      return '';
    }
  });
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [liveMovies, setLiveMovies] = useState<BoxOfficeMovie[] | null>(null);
  const [liveStats, setLiveStats] = useState<{
    source: string;
    updatedAt: string;
    isLive: boolean;
  }>({
    source: BOX_OFFICE_STATS.source,
    updatedAt: BOX_OFFICE_STATS.updatedAt,
    isLive: false,
  });

  const [selectedTheaterMovie, setSelectedTheaterMovie] = useState<BoxOfficeMovie | null>(null);
  
  // Custom poster URL overrides saved to localStorage
  const [customPosters, setCustomPosters] = useState<Record<string, string>>({});
  const [editingPosterMovie, setEditingPosterMovie] = useState<BoxOfficeMovie | null>(null);
  const [inputPosterUrl, setInputPosterUrl] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Load custom posters from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('custom_boxoffice_posters');
      if (saved) {
        setCustomPosters(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch real KOBIS data (supports server default key or custom user key)
  const fetchKobisData = async (keyToUse = kobisKey, isSilent = false) => {
    if (!isSilent) setIsRefreshing(true);

    try {
      const url = keyToUse 
        ? `/api/boxoffice/live?key=${encodeURIComponent(keyToUse)}`
        : `/api/boxoffice/live`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.isLiveKobis && data.movies && data.movies.length > 0) {
        // Enriched movies with accurate individual posters
        const enriched = data.movies.map((m: any, idx: number) => {
          const rank = m.rank || (idx + 1);
          const poster = getFallbackPoster(m.title, rank);
          return {
            ...m,
            posterImg: customPosters[m.title] || poster,
          };
        });

        setLiveMovies(enriched);
        setLiveStats({
          source: data.source || '영화진흥위원회 KOBIS 공식 실시간 집계',
          updatedAt: `실시간 연동 완료 (${new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })})`,
          isLive: true,
        });
        return true;
      } else {
        if (!isSilent) {
          console.warn('KOBIS fallback or error:', data.error);
        }
        return false;
      }
    } catch (e) {
      console.error('Failed to fetch KOBIS data', e);
      return false;
    } finally {
      if (!isSilent) setIsRefreshing(false);
    }
  };

  // Auto sync on mount for both mobile & desktop
  useEffect(() => {
    fetchKobisData(kobisKey, true);
  }, [kobisKey]);

  const handleSaveCustomPoster = (movieTitle: string, url: string) => {
    const updated = { ...customPosters, [movieTitle]: url.trim() };
    if (!url.trim()) {
      delete updated[movieTitle];
    }
    setCustomPosters(updated);
    try {
      localStorage.setItem('custom_boxoffice_posters', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setEditingPosterMovie(null);
    setInputPosterUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, movieTitle: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('이미지 파일(JPG, PNG, WebP)만 업로드 가능합니다.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('이미지 크기는 최대 2MB까지 지원합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      handleSaveCustomPoster(movieTitle, base64);
      setUploadError('');
    };
    reader.onerror = () => {
      setUploadError('이미지를 읽는 중 오류가 발생했습니다.');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveKobisKey = (newKey: string) => {
    setKobisKey(newKey);
    try {
      if (newKey) {
        localStorage.setItem('kobis_api_key', newKey);
      } else {
        localStorage.removeItem('kobis_api_key');
      }
    } catch {
      // ignore
    }
    fetchKobisData(newKey);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (kobisKey) {
      await fetchKobisData(kobisKey);
    } else {
      await new Promise(r => setTimeout(r, 600));
      setLiveStats({
        source: BOX_OFFICE_STATS.source,
        updatedAt: `방금 갱신됨 (${new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })})`,
        isLive: false,
      });
    }
    setIsRefreshing(false);
  };

  // Base movie list is either live KOBIS data or curated fallback
  const baseMovies = liveMovies || REALTIME_BOX_OFFICE;

  // Filter & sort
  const sortedMovies = useMemo(() => {
    return [...baseMovies].sort((a, b) => {
      if (filterMode === 'booking') return b.bookingRate - a.bookingRate;
      if (filterMode === 'total') return b.audiAcc - a.audiAcc;
      return a.rank - b.rank; // default daily rank
    });
  }, [baseMovies, filterMode]);

  return (
    <div className="space-y-8">
      {/* Top Banner / Ticker Header */}
      <div className="relative overflow-hidden rounded-2xl border border-red-900/40 bg-gradient-to-br from-[#1A0A0A] via-[#100A0E] to-[#0A0B10] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                LIVE BOX OFFICE TOP 10
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                liveStats.isLive 
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 flex items-center gap-1' 
                  : 'bg-stone-800/80 text-stone-300 border-stone-700'
              }`}>
                {liveStats.isLive && <Check className="w-3 h-3 text-emerald-400" />}
                {liveStats.isLive ? '영진위 KOBIS 실시간 자동 연동 중' : '무드매거진 큐레이션 모드'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-stone-100 tracking-tight">
              대한민국 극장가 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-400 to-yellow-400">실시간 관객 점유율</span>
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              영화진흥위원회 KOBIS 통합전산망 기반으로 전국 주요 멀티플렉스(CGV, 롯데시네마, 메가박스)의 관객수, 예매율, 상영 스크린수를 실시간으로 제공합니다.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-stone-400 font-mono">
              <span className="text-stone-300">{liveStats.source}</span>
              <span>•</span>
              <span className="text-amber-400">{liveStats.updatedAt}</span>
            </div>
          </div>

          {/* Quick Stats Block & KOBIS Key trigger */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-stone-400 font-medium">일일 총 관객 집계</p>
                <p className="text-lg font-bold text-stone-100 font-mono">
                  {baseMovies.reduce((acc, m) => acc + m.audiCnt, 0).toLocaleString()}명
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                  liveStats.isLive
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500/50'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>{liveStats.isLive ? 'KOBIS 키 설정됨' : '영진위 API 자동연동'}</span>
              </button>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                title="데이터 즉시 새로고침"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                <span className="hidden sm:inline">새로고침</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Tabs & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        {/* Sort modes */}
        <div className="flex items-center gap-1.5 bg-stone-900/90 p-1 rounded-xl border border-stone-800 self-start">
          <button
            onClick={() => setFilterMode('daily')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              filterMode === 'daily'
                ? 'bg-amber-500 text-black font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>일별 관객순</span>
          </button>
          <button
            onClick={() => setFilterMode('booking')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              filterMode === 'booking'
                ? 'bg-amber-500 text-black font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>실시간 예매율순</span>
          </button>
          <button
            onClick={() => setFilterMode('total')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              filterMode === 'total'
                ? 'bg-amber-500 text-black font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>누적 관객순</span>
          </button>
        </div>

        {/* Visual View Switcher */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1 bg-stone-900/80 p-1 rounded-xl border border-stone-800 text-xs">
            <span className="text-[11px] text-stone-400 px-2 font-medium">포스터 모드:</span>
            <button
              onClick={() => setPosterStyle('theater')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                posterStyle === 'theater'
                  ? 'bg-stone-800 text-amber-400 border border-amber-500/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>극장 포스터</span>
            </button>
            <button
              onClick={() => setPosterStyle('ai')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                posterStyle === 'ai'
                  ? 'bg-stone-800 text-amber-400 border border-amber-500/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Palette className="w-3 h-3" />
              <span>레트로 아트</span>
            </button>
          </div>
        </div>
      </div>

      {/* Box Office Ranking Grid */}
      <div className="grid grid-cols-1 gap-4">
        {sortedMovies.map((movie, index) => {
          const displayRank = movie.rank || (index + 1);
          const isTop3 = displayRank <= 3;
          const customUrl = customPosters[movie.title];
          const resolvedPoster = customUrl || movie.posterImg || getFallbackPoster(movie.title, displayRank);

          return (
            <div
              key={`${movie.title}-${displayRank}`}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:border-amber-500/40 group ${
                isTop3
                  ? 'bg-gradient-to-r from-stone-900/90 via-[#151620]/90 to-stone-900/80 border-stone-800'
                  : 'bg-stone-900/50 border-stone-800/80 hover:bg-stone-900/70'
              }`}
            >
              <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                {/* Left: Rank & Title & Quick Badges */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                  {/* Rank Badge */}
                  <div className="flex flex-col items-center justify-center shrink-0 w-12 sm:w-14 text-center">
                    <span
                      className={`text-3xl sm:text-4xl font-black font-serif italic ${
                        displayRank === 1
                          ? 'text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 drop-shadow-md'
                          : displayRank === 2
                          ? 'text-stone-300'
                          : displayRank === 3
                          ? 'text-amber-600'
                          : 'text-stone-500'
                      }`}
                    >
                      {String(displayRank).padStart(2, '0')}
                    </span>
                    
                    {/* Rank change indicator */}
                    <div className="mt-1 flex items-center text-[10px] font-mono font-bold">
                      {movie.rankChange === 'NEW' && (
                        <span className="px-1.5 py-0.5 rounded bg-red-600/30 text-red-400 border border-red-500/40">NEW</span>
                      )}
                      {movie.rankChange === 'SAME' && (
                        <span className="text-stone-500 flex items-center">
                          <Minus className="w-3 h-3" />
                        </span>
                      )}
                      {movie.rankChange === 'UP' && (
                        <span className="text-red-400 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                          {movie.rankChangeAmount}
                        </span>
                      )}
                      {movie.rankChange === 'DOWN' && (
                        <span className="text-blue-400 flex items-center">
                          <TrendingDown className="w-3 h-3 mr-0.5" />
                          {movie.rankChangeAmount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Poster */}
                  <div className="relative w-16 sm:w-20 aspect-[2/3] rounded-lg overflow-hidden shrink-0 shadow-md border border-stone-800 group/poster bg-stone-950">
                    {posterStyle === 'theater' && resolvedPoster ? (
                      <img
                        src={resolvedPoster}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${movie.posterBg} p-2 flex flex-col justify-between text-left`}>
                        <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[8px] font-bold">
                          🎬
                        </div>
                        <p className="text-[9px] font-serif font-bold text-stone-200 line-clamp-2 leading-tight">
                          {movie.title}
                        </p>
                      </div>
                    )}

                    {/* Change poster button on hover */}
                    <button
                      onClick={() => {
                        setEditingPosterMovie(movie);
                        setInputPosterUrl(customPosters[movie.title] || '');
                        setUploadError('');
                      }}
                      className="absolute inset-0 bg-black/70 opacity-0 group-hover/poster:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-[10px] text-amber-300 font-medium"
                      title="포스터 이미지 변경 또는 업로드"
                    >
                      <Camera className="w-4 h-4" />
                      <span>포스터 변경</span>
                    </button>
                  </div>

                  {/* Title & Meta Details */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-stone-800 text-stone-300 border border-stone-700">
                        {movie.ageLimit}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-stone-100 hover:text-amber-400 transition-colors truncate">
                        {movie.title}
                      </h3>
                      <span className="text-xs text-stone-500 font-mono hidden sm:inline">
                        {movie.originalTitle}
                      </span>
                      {movie.isMilestone && (
                        <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-medium">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          {movie.isMilestone}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-400 line-clamp-1 leading-relaxed">
                      {movie.highlight}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400 font-mono pt-0.5">
                      <span>개봉 {movie.openDate}</span>
                      <span>스크린 {movie.screenCnt.toLocaleString()}개</span>
                      <span>상영 {movie.showCnt.toLocaleString()}회</span>
                      <span className="text-amber-400 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Box Office Key Numbers & Direct Action */}
                <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between md:justify-end gap-3 sm:gap-5 pt-3 md:pt-0 border-t border-stone-800/80 md:border-none">
                  <div className="flex items-center justify-around sm:justify-end gap-3 sm:gap-6 text-center sm:text-right font-mono bg-stone-950/40 sm:bg-transparent py-1.5 px-2 rounded-xl sm:p-0 border border-stone-800/40 sm:border-none">
                    <div className="min-w-0">
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider whitespace-nowrap">일일 관객</p>
                      <p className="text-xs sm:text-sm md:text-base font-bold text-amber-400 whitespace-nowrap">
                        <span className="hidden xs:inline">{movie.audiCnt.toLocaleString()}명</span>
                        <span className="xs:hidden">{formatAudienceCount(movie.audiCnt, true)}명</span>
                      </p>
                    </div>

                    <div className="w-px h-6 bg-stone-800 sm:hidden" />

                    <div className="min-w-0">
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider whitespace-nowrap">누적 관객</p>
                      <p className="text-xs sm:text-sm md:text-base font-bold text-stone-100 whitespace-nowrap">
                        <span className="hidden xs:inline">{movie.audiAcc.toLocaleString()}명</span>
                        <span className="xs:hidden">{formatAudienceCount(movie.audiAcc, true)}명</span>
                      </p>
                    </div>

                    <div className="w-px h-6 bg-stone-800 sm:hidden" />

                    <div className="min-w-0">
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider whitespace-nowrap">예매율</p>
                      <p className="text-xs sm:text-sm md:text-base font-bold text-red-400 whitespace-nowrap">
                        {movie.bookingRate}%
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedTheaterMovie(movie)}
                      className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Building className="w-3.5 h-3.5 text-amber-400" />
                      <span>예매 링크</span>
                    </button>

                    <button
                      onClick={() => {
                        const movieItem: MovieItem = {
                          id: `bo_${movie.rank}`,
                          title: movie.title,
                          year: 2026,
                          genre: movie.genre,
                          director: movie.director,
                          runtime: 120,
                          rating: movie.rating,
                          moodTag: '도파민 충전',
                          oneLineReview: movie.highlight,
                          synopsis: `${movie.title} - ${movie.highlight}`,
                          recommendedSnack: '오리지널 & 카라멜 반반 팝콘 + 콜라',
                          snackReason: '실시간 박스오피스 최상위 흥행작에 어울리는 정통 극장 간식',
                          posterBg: movie.posterBg,
                          quote: movie.highlight,
                          highlightScene: '극장 대형 스크린에서 확인하는 최고의 클라이맥스',
                          trailerSearchTerm: `${movie.title} 영화 예고편`,
                          customPosterUrl: resolvedPoster,
                          posterImg: resolvedPoster,
                        };
                        onOpenTicket(movieItem);
                      }}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 active:scale-95 text-neutral-950 text-xs font-bold rounded-lg shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>티켓 발권</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multiplex Booking Direct Popover Modal */}
      {selectedTheaterMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#12131A] border border-amber-500/30 rounded-2xl max-w-md w-full p-6 text-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-stone-100 text-base">
                  『{selectedTheaterMovie.title}』 빠른 예매
                </h4>
              </div>
              <button
                onClick={() => setSelectedTheaterMovie(null)}
                className="text-stone-400 hover:text-stone-100 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              원하시는 극장을 선택하시면 각 멀티플렉스 공식 예매 페이지로 즉시 연결됩니다.
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                href={selectedTheaterMovie.bookingUrls.cgv}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-stone-200 transition-colors font-medium text-sm group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>CGV 빠른 예매</span>
                </span>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-red-400" />
              </a>

              <a
                href={selectedTheaterMovie.bookingUrls.lotte}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 border border-rose-800/40 text-stone-200 transition-colors font-medium text-sm group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>롯데시네마 빠른 예매</span>
                </span>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-rose-400" />
              </a>

              <a
                href={selectedTheaterMovie.bookingUrls.megabox}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-950/30 hover:bg-purple-900/40 border border-purple-800/40 text-stone-200 transition-colors font-medium text-sm group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span>메가박스 빠른 예매</span>
                </span>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-purple-400" />
              </a>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setSelectedTheaterMovie(null)}
                className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Poster Upload / URL Change Modal */}
      {editingPosterMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#12131A] border border-amber-500/30 rounded-2xl max-w-md w-full p-6 text-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-stone-100 text-base">
                  『{editingPosterMovie.title}』 포스터 변경
                </h4>
              </div>
              <button
                onClick={() => setEditingPosterMovie(null)}
                className="text-stone-400 hover:text-stone-100 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-stone-400">
                원하는 공식 포스터 이미지 웹 주소(URL)를 입력하거나, PC/스마트폰에 저장된 이미지 파일을 직접 업로드해 교체할 수 있습니다.
              </p>

              {/* Method 1: File Upload */}
              <div className="border border-stone-800 bg-stone-900/60 p-4 rounded-xl space-y-2 text-center">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-colors border border-stone-700">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>내 기기에서 이미지 파일 선택</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, editingPosterMovie.title)}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-stone-500">JPG, PNG, WebP 지원 (최대 2MB)</p>
              </div>

              {/* Method 2: Web URL input */}
              <div className="space-y-1.5">
                <label className="text-stone-300 font-medium flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>웹 이미지 주소 (URL) 붙여넣기</span>
                </label>
                <input
                  type="url"
                  value={inputPosterUrl}
                  onChange={(e) => setInputPosterUrl(e.target.value)}
                  placeholder="https://example.com/poster.jpg"
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {uploadError && (
                <p className="text-red-400 text-[11px] font-medium">{uploadError}</p>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleSaveCustomPoster(editingPosterMovie.title, '')}
                  className="text-stone-500 hover:text-stone-300 text-xs underline"
                >
                  기본 포스터로 복원
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingPosterMovie(null)}
                    className="px-3 py-1.5 text-stone-400 hover:text-stone-200"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleSaveCustomPoster(editingPosterMovie.title, inputPosterUrl)}
                    className="px-4 py-1.5 bg-amber-500 text-neutral-950 font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    저장하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KOBIS API Key Setup Modal */}
      <KobisApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={kobisKey}
        onSaveKey={handleSaveKobisKey}
        onTestKey={async (key) => {
          return await fetchKobisData(key);
        }}
      />
    </div>
  );
};
