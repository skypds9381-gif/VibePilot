import React, { useState } from 'react';
import { 
  Film, 
  Trophy, 
  Shuffle, 
  Flame, 
  Newspaper, 
  Calendar, 
  MessageSquare, 
  Headphones, 
  Menu, 
  X,
  Sparkles,
  Popcorn,
  UtensilsCrossed,
  BookOpen
} from 'lucide-react';

interface CinemaHeaderProps {
  currentTab: 'mood' | 'boxoffice' | 'news' | 'calendar' | 'debate' | 'ost' | 'worldcup' | 'catalog' | 'roulette' | 'snacks';
  onSelectTab: (tab: 'mood' | 'boxoffice' | 'news' | 'calendar' | 'debate' | 'ost' | 'worldcup' | 'catalog' | 'roulette' | 'snacks') => void;
  onOpenRoulette: () => void;
}

export const CinemaHeader: React.FC<CinemaHeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenRoulette,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileSelect = (tab: 'mood' | 'boxoffice' | 'news' | 'calendar' | 'debate' | 'ost' | 'worldcup' | 'catalog' | 'roulette' | 'snacks') => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'mood' as const, label: '무드 추천', icon: Sparkles, color: 'text-amber-400' },
    { id: 'boxoffice' as const, label: '박스오피스', icon: Flame, color: 'text-red-400' },
    { id: 'news' as const, label: '실시간 뉴스', icon: Newspaper, color: 'text-orange-400', badge: 'LIVE' },
    { id: 'calendar' as const, label: '개봉 D-DAY', icon: Calendar, color: 'text-yellow-400' },
    { id: 'debate' as const, label: '끝장 토론', icon: MessageSquare, color: 'text-sky-400' },
    { id: 'ost' as const, label: 'OST 감상실', icon: Headphones, color: 'text-purple-400' },
    { id: 'worldcup' as const, label: '16강 월드컵', icon: Trophy, color: 'text-amber-400' },
    { id: 'catalog' as const, label: '명작 50선', icon: BookOpen, color: 'text-emerald-400' },
    { id: 'roulette' as const, label: '팝콘 룰렛', icon: Popcorn, color: 'text-pink-400' },
    { id: 'snacks' as const, label: '야식 페어링', icon: UtensilsCrossed, color: 'text-rose-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0B10]/95 backdrop-blur-md border-b border-amber-950/40 text-stone-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Zone 1: Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black font-bold shadow-md shadow-amber-500/20">
            <Film className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-950" />
          </div>
          <button 
            onClick={() => handleMobileSelect('mood')}
            className="text-left group transition-transform active:scale-95"
          >
            <span className="text-base sm:text-lg md:text-xl font-bold tracking-wider text-amber-100 font-serif block group-hover:text-amber-400 transition-colors">
              무드매거진 <span className="text-[10px] font-mono font-normal text-amber-400/80 tracking-widest hidden sm:inline">MOOD MAGAZINE</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Desktop Navigation Links (Only visible on wide screens) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span>{item.label}</span>
                {item.badge && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quick Action & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenRoulette}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 rounded-lg shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">즉시 </span>
            <span>룰렛</span>
          </button>

          {/* Mobile Hamburger Toggle Button (모바일에서만 보임) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-stone-900 text-amber-400 hover:bg-stone-800 border border-amber-900/30 transition-colors flex items-center justify-center"
            aria-label="무드매거진 전체 메뉴 열기"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (스크롤바 없이 한눈에 들어오는 2열 카드 메뉴) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0B10] border-t border-amber-900/40 px-3 py-4 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="flex items-center justify-between text-xs px-2 py-1 rounded bg-stone-900/80 text-stone-400 border border-stone-800">
            <span>현재 선택 메뉴:</span>
            <span className="font-bold text-amber-400">
              {navItems.find(i => i.id === currentTab)?.label || '무드 추천'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMobileSelect(item.id)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'bg-stone-950 text-stone-300 border-stone-800/80 hover:border-amber-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
                  <div className="overflow-hidden">
                    <p className="font-bold truncate">{item.label}</p>
                    <p className="text-[10px] text-stone-500 truncate">
                      {item.id === 'mood' && '상황별 영화 AI'}
                      {item.id === 'boxoffice' && '실시간 순위'}
                      {item.id === 'news' && '연예가 최신 뉴스'}
                      {item.id === 'calendar' && '디데이 카운트다운'}
                      {item.id === 'debate' && '찬반 투표 광장'}
                      {item.id === 'ost' && '명작 사운드트랙'}
                      {item.id === 'worldcup' && '토너먼트 대결'}
                      {item.id === 'catalog' && '엄선 아카이브'}
                      {item.id === 'roulette' && '랜덤 뽑기'}
                      {item.id === 'snacks' && '영화관 매점 꿀조합'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
