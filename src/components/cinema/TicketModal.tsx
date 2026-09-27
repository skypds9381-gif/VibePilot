import React, { useState } from 'react';
import { X, Copy, Check, Ticket, Share2, Film, Star, Clock } from 'lucide-react';
import { MovieItem } from '../../data/movieDatabase';

interface TicketModalProps {
  movie: MovieItem | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ movie, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [seat] = useState(() => {
    const rows = ['C', 'D', 'E', 'F', 'G', 'H'];
    const row = rows[Math.floor(Math.random() * rows.length)];
    const num = Math.floor(Math.random() * 12) + 1;
    return `${row}-${num.toString().padStart(2, '0')}`;
  });
  const [ticketNo] = useState(() => Math.floor(10000000 + Math.random() * 90000000).toString());

  if (!movie) return null;

  const handleCopyTicket = async () => {
    const text = `🎟️ [CINEMA NIGHT 입장권]\n🎬 영화: ${movie.title} (${movie.year})\n⭐️ 평점: ${movie.rating} / 10\n⏱️ 러닝타임: ${movie.runtime}분\n📍 좌석: SCREEN 07 · ${seat}\n🍿 추천 야식: ${movie.snackPairing.food} + ${movie.snackPairing.drink}\n💬 명대사: ${movie.famousLine}\n\n오늘 밤 영화 티켓이 발권되었습니다! 🍿`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden text-stone-100">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>VIP Admission Pass</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vintage Ticket Body */}
        <div className="p-6 bg-gradient-to-b from-[#1C1814] to-[#121110] relative">
          {/* Ticket Frame */}
          <div className="border border-amber-700/40 rounded-xl p-5 bg-[#171412] shadow-inner relative overflow-hidden">
            {/* Top Cine Branding */}
            <div className="flex items-center justify-between border-b border-dashed border-amber-800/40 pb-3 mb-4">
              <div>
                <span className="text-[10px] tracking-widest text-amber-400/80 font-mono block">CINEMA ARCHIVE</span>
                <h4 className="text-sm font-serif font-bold text-amber-100 tracking-wider">PREMIER TICKET</h4>
              </div>
              <div className="text-right font-mono text-[11px] text-stone-400">
                <span>NO. {ticketNo.slice(0, 4)}-{ticketNo.slice(4)}</span>
              </div>
            </div>

            {/* Movie Title & Info with Poster */}
            <div className="flex items-start gap-3.5 mb-4">
              {movie.posterImg && (
                <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0 border border-amber-500/40 shadow-md bg-stone-900">
                  <img
                    src={movie.posterImg}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-xs text-amber-500 font-mono block mb-1">NOW SHOWING</span>
                <h3 className="text-2xl font-bold font-serif text-white tracking-wide mb-1">
                  {movie.title}
                </h3>
                <p className="text-xs text-stone-400 italic truncate">
                  {movie.originalTitle} · {movie.year}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-800 text-center text-xs font-mono">
              <div className="bg-stone-900/60 p-2 rounded">
                <span className="text-[10px] text-stone-500 block">THEATER</span>
                <span className="font-bold text-amber-200">HALL 07</span>
              </div>
              <div className="bg-stone-900/60 p-2 rounded">
                <span className="text-[10px] text-stone-500 block">SEAT</span>
                <span className="font-bold text-amber-400">{seat}</span>
              </div>
              <div className="bg-stone-900/60 p-2 rounded">
                <span className="text-[10px] text-stone-500 block">SCORE</span>
                <span className="font-bold text-amber-200 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {movie.rating}
                </span>
              </div>
            </div>

            {/* Quote & Pairing */}
            <div className="my-3 text-xs text-stone-300">
              <p className="italic text-amber-200/90 font-serif mb-2">
                {movie.famousLine}
              </p>
              <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-1">
                <span className="text-amber-500">🍿 추천 페어링:</span>
                <span>{movie.snackPairing.food} & {movie.snackPairing.drink}</span>
              </div>
            </div>

            {/* Barcode Mock */}
            <div className="mt-4 pt-3 border-t border-dashed border-stone-800 flex flex-col items-center">
              <div className="h-9 w-full flex items-center justify-center gap-[2px] opacity-80">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-stone-300"
                    style={{
                      width: i % 4 === 0 ? '3px' : i % 2 === 0 ? '1px' : '2px',
                      opacity: i % 5 === 0 ? 0.9 : 0.6
                    }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono tracking-widest text-stone-500 mt-1">
                ADMIT ONE · VALID TONIGHT
              </span>
            </div>
          </div>
        </div>

        {/* Action footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex gap-3">
          <button
            onClick={handleCopyTicket}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                <span>티켓 정보 복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-950" />
                <span>티켓 텍스트 복사</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
