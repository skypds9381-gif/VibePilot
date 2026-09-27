import React from 'react';
import { UtensilsCrossed, Star, Film, Ticket, ChevronRight } from 'lucide-react';
import { MOVIE_DATABASE, MovieItem } from '../../data/movieDatabase';

interface SnackPairingGuideProps {
  onOpenTicket: (movie: MovieItem) => void;
  onSelectDetail: (movie: MovieItem) => void;
}

export const SnackPairingGuide: React.FC<SnackPairingGuideProps> = ({
  onOpenTicket,
  onSelectDetail
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold mb-3">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>CINEMA GOURMET PAIRING</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
          영화의 맛을 200% 살리는 야식 페어링
        </h2>
        <p className="text-sm text-stone-300 leading-relaxed">
          어떤 영화를 볼지 정하셨다면, 곁들일 야식과 음료까지 완벽해야 진정한 방구석 영화관입니다.
        </p>
      </div>

      {/* Grid of Movie Pairings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOVIE_DATABASE.map((movie) => (
          <div
            key={movie.id}
            className="rounded-3xl bg-[#11131C] border border-stone-800/80 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10 transition-all"
          >
            <div>
              {/* Snack Highlight Header */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 mb-4">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  RECOMMENDED MENU
                </span>
                <h4 className="text-base font-serif font-bold text-amber-200">
                  {movie.snackPairing.food}
                </h4>
                <p className="text-xs text-amber-400/90 font-medium">
                  + {movie.snackPairing.drink}
                </p>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  {movie.snackPairing.description}
                </p>
              </div>

              {/* Matched Movie */}
              <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                <span>찰떡 궁합 영화</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {movie.rating}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                {movie.title}
              </h3>
              <p className="text-xs text-stone-400 italic mb-2">
                {movie.originalTitle} ({movie.year})
              </p>
              <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                {movie.synopsis}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between">
              <button
                onClick={() => onSelectDetail(movie)}
                className="text-xs text-stone-300 hover:text-white flex items-center gap-1 font-medium"
              >
                <Film className="w-3.5 h-3.5" />
                <span>영화 정보</span>
              </button>
              <button
                onClick={() => onOpenTicket(movie)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition-colors"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>티켓 발권</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
