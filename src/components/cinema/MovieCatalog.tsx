import React, { useState, useMemo } from 'react';
import { Search, Star, Clock, Film, Ticket, Filter, ChevronRight, Check } from 'lucide-react';
import { MovieItem, MOVIE_DATABASE, OTT_PLATFORMS } from '../../data/movieDatabase';

interface MovieCatalogProps {
  onOpenTicket: (movie: MovieItem) => void;
  onSelectDetail: (movie: MovieItem) => void;
}

export const MovieCatalog: React.FC<MovieCatalogProps> = ({
  onOpenTicket,
  onSelectDetail
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<'all' | '한국' | '해외'>('all');
  const [selectedOtt, setSelectedOtt] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체 장르' },
    { id: 'suzy', name: '🌸 수지(Suzy) 컬렉션' },
    { id: 'action', name: '액션/스릴' },
    { id: 'romance', name: '로맨스/멜로' },
    { id: 'thriller', name: '미스터리/반전' },
    { id: 'comedy', name: '코미디/킬링' },
    { id: 'scifi', name: 'SF/판타지' },
    { id: 'drama', name: '인생 감동' },
    { id: 'animation', name: '애니메이션' },
    { id: 'healing', name: '힐링/푸드' },
  ];

  const filteredMovies = useMemo(() => {
    return MOVIE_DATABASE.filter((movie) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = movie.title.toLowerCase().includes(q) || movie.originalTitle.toLowerCase().includes(q);
        const matchesDirector = movie.director.toLowerCase().includes(q);
        const matchesCast = movie.cast.some((actor) => actor.toLowerCase().includes(q));
        const matchesGenre = movie.genre.some((g) => g.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDirector && !matchesCast && !matchesGenre) {
          return false;
        }
      }

      // Suzy Special Filter
      if (selectedCategory === 'suzy') {
        return movie.cast.some((actor) => actor.includes('수지') || actor.includes('배수지'));
      }

      // Category
      if (selectedCategory !== 'all' && movie.category !== selectedCategory) {
        return false;
      }

      // Country
      if (selectedCountry !== 'all' && movie.country !== selectedCountry) {
        return false;
      }

      // OTT
      if (selectedOtt !== 'all' && !movie.otts.includes(selectedOtt as any)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedCountry, selectedOtt]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Catalog Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
            CURATED MASTERPIECE ARCHIVE
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
            시네마 나이트 50선 전편 둘러보기
          </h2>
          <p className="text-xs md:text-sm text-stone-400 mt-1">
            한국 천만 영화, 칸/오스카 수상작, 올타임 레전드 명작 50편을 한자리에 모았습니다.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="영화, 배우, 감독, 장르 검색..."
            className="w-full bg-[#141620] border border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Filter Section (Clean wrapping for mobile and desktop, zero horizontal scroll cutoffs) */}
      <div className="space-y-3 bg-stone-950/60 p-3 sm:p-4 rounded-2xl border border-stone-800/80">
        
        {/* Row 1: Country & OTT Platform Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Country */}
          <div className="flex items-center gap-1 p-1 bg-stone-900/90 rounded-xl border border-stone-800 text-xs">
            {(['all', '한국', '해외'] as const).map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCountry === country
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {country === 'all' ? '전체 국가' : country === '한국' ? '🇰🇷 한국' : '🌎 해외'}
              </button>
            ))}
          </div>

          {/* OTT filter with clean wrapping */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedOtt('all')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedOtt === 'all'
                  ? 'bg-stone-800 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200 bg-stone-900/60 border border-stone-800'
              }`}
            >
              전체 OTT
            </button>
            {OTT_PLATFORMS.map((ott) => (
              <button
                key={ott.id}
                onClick={() => setSelectedOtt(selectedOtt === ott.id ? 'all' : ott.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedOtt === ott.id
                    ? `${ott.color} shadow-sm font-bold`
                    : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {ott.name}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Genre/Theme Categories - Full Multiline Wrap */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-xl transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm'
                  : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
        <span>총 {filteredMovies.length}편의 명작</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-amber-400 hover:underline"
          >
            검색어 초기화
          </button>
        )}
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="py-16 text-center text-stone-400 space-y-3">
          <Film className="w-10 h-10 mx-auto text-stone-600 animate-pulse" />
          <p className="text-sm">조건에 맞는 영화를 찾지 못했습니다.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedCountry('all');
              setSelectedOtt('all');
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700"
          >
            필터 전체 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className={`p-5 rounded-2xl bg-gradient-to-b ${movie.posterBg} border border-stone-800 hover:border-amber-400/80 hover:shadow-xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-black/60 text-amber-300 text-[10px] font-mono">
                      {movie.country === '한국' ? '🇰🇷 한국' : '🌎 해외'}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {movie.genre[0]}
                    </span>
                    {movie.cast.some((actor) => actor.includes('수지')) && (
                      <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-bold">
                        🌸 수지 출연
                      </span>
                    )}
                  </div>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {movie.rating}
                  </span>
                </div>

                <div className="flex gap-3.5 mb-3 items-start">
                  {movie.posterImg && (
                    <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0 border border-stone-700/80 shadow-md bg-stone-900 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={movie.posterImg}
                        alt={movie.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-serif font-bold text-white mb-0.5 group-hover:text-amber-200 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-stone-400 italic mb-1.5 truncate">
                      {movie.originalTitle} ({movie.year}) · {movie.director}
                    </p>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {movie.synopsis}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border-l-2 border-amber-400 text-amber-200/90 font-serif italic text-[11px] mb-3">
                  {movie.famousLine}
                </div>
              </div>

              <div>
                {/* Snack brief */}
                <div className="text-[11px] text-stone-400 border-t border-white/10 pt-2.5 mb-3 flex items-center gap-1">
                  <span className="text-amber-400">🍿 추천:</span>
                  <span className="truncate">{movie.snackPairing.food}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectDetail(movie)}
                    className="flex-1 py-2 rounded-lg text-xs font-medium text-stone-300 hover:text-white bg-black/40 hover:bg-black/60 border border-stone-700/60 transition-colors flex items-center justify-center gap-1"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>상세정보</span>
                  </button>
                  <button
                    onClick={() => onOpenTicket(movie)}
                    className="py-2 px-3 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors flex items-center justify-center gap-1"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>티켓 발권</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
