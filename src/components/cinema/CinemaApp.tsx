import React, { useState } from 'react';
import { CinemaHeader } from './CinemaHeader';
import { MoodMatcher } from './MoodMatcher';
import { WorldCupGame } from './WorldCupGame';
import { MovieCatalog } from './MovieCatalog';
import { BoxOfficeLive } from './BoxOfficeLive';
import { MovieNewsFeed } from './MovieNewsFeed';
import { UpcomingMoviesCalendar } from './UpcomingMoviesCalendar';
import { CinemaTalkStation } from './CinemaTalkStation';
import { CinemaOstPlayer } from './CinemaOstPlayer';
import { SnackPairingGuide } from './SnackPairingGuide';
import { RouletteModal } from './RouletteModal';
import { TicketModal } from './TicketModal';
import { MovieDetailModal } from './MovieDetailModal';
import { MovieItem } from '../../data/movieDatabase';
import { Film, Shuffle, Trophy, UtensilsCrossed, Star, Calendar, MessageSquare, Headphones } from 'lucide-react';
import heroMarqueeImg from '../../assets/images/cinema_hero_marquee_1790324329258.jpg';
import popcornConcessionImg from '../../assets/images/cinema_popcorn_concession_1790324342869.jpg';

export const CinemaApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'mood' | 'boxoffice' | 'news' | 'calendar' | 'debate' | 'ost' | 'worldcup' | 'catalog' | 'roulette' | 'snacks'>('mood');
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  const [ticketMovie, setTicketMovie] = useState<MovieItem | null>(null);
  const [detailMovie, setDetailMovie] = useState<MovieItem | null>(null);

  const handleOpenTicket = (movie: MovieItem) => {
    setTicketMovie(movie);
  };

  const handleSelectDetail = (movie: MovieItem) => {
    setDetailMovie(movie);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Cinematic Top Bar */}
      <CinemaHeader
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'roulette') {
            setIsRouletteOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        onOpenRoulette={() => setIsRouletteOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8 space-y-10">
        {currentTab === 'mood' && (
          <div className="space-y-12">
            {/* Hero Magazine Section */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl space-y-4 text-center md:text-left z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono tracking-wider">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  <span>CURATED CINEMA ISSUE #08</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-stone-100 leading-tight">
                  오늘 밤, 당신의 감정에 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                    가장 깊게 스며들 영화 한 편
                  </span>
                </h1>
                <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                  알고리즘 추천의 피로에서 벗어나세요. 지금 이 순간 당신이 느끼는 무드(비 내리는 센치함, 도파민 충전, 깊은 여운)에 맞춘 50편의 엄선작과 전용 스낵 페어링을 선물합니다.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('mood-selector');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-sm rounded-lg shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
                  >
                    오늘의 기분 선택하기
                  </button>
                  <button
                    onClick={() => setIsRouletteOpen(true)}
                    className="px-4 py-2.5 bg-stone-800/90 hover:bg-stone-700/80 text-stone-200 text-sm font-medium rounded-lg border border-stone-700 transition-colors flex items-center gap-2"
                  >
                    <Shuffle className="w-4 h-4 text-amber-400" />
                    랜덤 영화 돌리기
                  </button>
                </div>
              </div>

              {/* Decorative Hero Poster */}
              <div className="relative w-full max-w-xs md:max-w-sm aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-stone-700/60 shrink-0 group">
                <img
                  src={heroMarqueeImg}
                  alt="Cinema Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">Midnight Theater</p>
                  <p className="text-sm font-semibold text-stone-100">영화는 어두운 방에서 마주하는 또 다른 우주입니다.</p>
                </div>
              </div>
            </div>

            {/* Mood Matcher Interactive */}
            <div id="mood-selector">
              <MoodMatcher
                onOpenTicket={handleOpenTicket}
                onSelectDetail={handleSelectDetail}
              />
            </div>
          </div>
        )}

        {currentTab === 'boxoffice' && (
          <BoxOfficeLive onSelectDetail={handleSelectDetail} />
        )}

        {currentTab === 'news' && (
          <MovieNewsFeed />
        )}

        {currentTab === 'calendar' && (
          <UpcomingMoviesCalendar />
        )}

        {currentTab === 'debate' && (
          <CinemaTalkStation />
        )}

        {currentTab === 'ost' && (
          <CinemaOstPlayer />
        )}

        {currentTab === 'worldcup' && (
          <WorldCupGame onSelectDetail={handleSelectDetail} />
        )}

        {currentTab === 'catalog' && (
          <MovieCatalog
            onOpenTicket={handleOpenTicket}
            onSelectDetail={handleSelectDetail}
          />
        )}

        {currentTab === 'snacks' && (
          <SnackPairingGuide onSelectDetail={handleSelectDetail} />
        )}
      </main>

      {/* Floating Bottom Quick Actions */}
      <aside aria-label="빠른 메뉴" className="fixed bottom-6 right-6 z-30 flex flex-col gap-2">
        <button
          onClick={() => setIsRouletteOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-neutral-950 flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 active:scale-95 transition-transform border border-amber-300"
          title="영화 팝콘 룰렛"
        >
          <Shuffle className="w-5 h-5" />
        </button>
      </aside>

      {/* Modals */}
      <RouletteModal
        isOpen={isRouletteOpen}
        onClose={() => setIsRouletteOpen(false)}
        onOpenTicket={handleOpenTicket}
        onSelectDetail={handleSelectDetail}
      />

      <TicketModal
        movie={ticketMovie}
        onClose={() => setTicketMovie(null)}
      />

      <MovieDetailModal
        movie={detailMovie}
        onClose={() => setDetailMovie(null)}
        onOpenTicket={(movie) => {
          setDetailMovie(null);
          setTicketMovie(movie);
        }}
      />

      {/* Cinema Footer */}
      <footer className="mt-auto border-t border-stone-800/80 bg-[#08090D] py-10 px-4 text-center text-xs text-stone-500 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Film className="w-4 h-4 text-amber-500" />
          <span className="font-serif font-bold text-stone-300 text-sm tracking-wider">무드매거진 MOOD MAGAZINE</span>
        </div>
        <p className="max-w-md mx-auto text-stone-400 leading-relaxed">
          국내외 영화 50선 큐레이션, 실시간 박스오피스, D-DAY 개봉 캘린더, OST 감상실 & 영화 야식 페어링 가이드
        </p>
        <p className="text-stone-600 font-mono">
          &copy; {new Date().getFullYear()} MOOD MAGAZINE. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
