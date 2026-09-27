import React from 'react';
import { X, Star, Clock, Ticket, ExternalLink, Play, Tv } from 'lucide-react';
import { MovieItem, OTT_PLATFORMS } from '../../data/movieDatabase';

interface MovieDetailModalProps {
  movie: MovieItem | null;
  onClose: () => void;
  onOpenTicket: (movie: MovieItem) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  onOpenTicket
}) => {
  if (!movie) return null;

  const handleSearchTrailer = () => {
    const query = encodeURIComponent(`${movie.title} 영화 예고편`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#12131A] border border-amber-900/30 rounded-2xl shadow-2xl overflow-hidden text-stone-100 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#0E0F15]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">FILM ARCHIVE</span>
            <span className="text-stone-600">·</span>
            <span className="text-xs text-stone-400">{movie.genre.join(', ')}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Title & Banner */}
          <div className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-r ${movie.posterBg} border border-stone-700/50 relative overflow-hidden shadow-lg flex flex-col sm:flex-row gap-5 items-start`}>
            {movie.posterImg && (
              <div className="w-24 h-36 sm:w-28 sm:h-40 rounded-xl overflow-hidden shrink-0 border border-amber-500/30 shadow-2xl bg-stone-900">
                <img
                  src={movie.posterImg}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
            <div className="relative z-10 flex-1">
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                {movie.highlightTag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mb-1">
                {movie.title}
              </h2>
              <p className="text-sm text-stone-300 mb-4 italic">
                {movie.originalTitle} ({movie.year})
              </p>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-200">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {movie.rating} / 10
                </span>
                <span className="text-stone-400">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-stone-400" />
                  {movie.runtime}분
                </span>
                <span className="text-stone-400">·</span>
                <span>감독: {movie.director}</span>
              </div>
            </div>
          </div>

          {/* Famous Quote */}
          <div className="p-4 rounded-xl bg-amber-950/20 border-l-4 border-amber-500 text-amber-100 font-serif italic text-sm">
            {movie.famousLine}
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider mb-2">
              시놉시스 (줄거리)
            </h4>
            <p className="text-sm leading-relaxed text-stone-200">
              {movie.synopsis}
            </p>
          </div>

          {/* Cast */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider mb-2">
              출연진
            </h4>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((actor, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-lg bg-stone-800 text-stone-200 border border-stone-700/60"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          {/* OTT Streaming Platforms */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-amber-400" />
              지금 시청 가능한 플랫폼
            </h4>
            <div className="flex flex-wrap gap-2">
              {movie.otts.map((ottId) => {
                const ott = OTT_PLATFORMS.find((p) => p.id === ottId);
                if (!ott) return null;
                return (
                  <span
                    key={ottId}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg ${ott.color} shadow-sm`}
                  >
                    {ott.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Recommended Snack & Drink Pairing */}
          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
            <h4 className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-2">
              🍿 대식 쌤의 찰떡 야식 페어링
            </h4>
            <div className="text-sm text-stone-200 mb-1 font-medium">
              <span className="text-amber-300">{movie.snackPairing.food}</span> +{' '}
              <span className="text-amber-300">{movie.snackPairing.drink}</span>
            </div>
            <p className="text-xs text-stone-400">
              {movie.snackPairing.description}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-[#0E0F15] border-t border-stone-800 flex flex-wrap gap-2.5 justify-between">
          <button
            onClick={handleSearchTrailer}
            className="py-2 px-4 rounded-xl text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>유튜브 예고편 검색</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenTicket(movie);
              }}
              className="py-2 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>영화 티켓 발권하기</span>
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl text-xs font-medium text-stone-400 hover:text-white bg-stone-900 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
