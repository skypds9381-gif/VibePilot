import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Wand2, 
  HelpCircle, 
  BookOpen, 
  Play, 
  ShieldAlert, 
  Monitor, 
  MessageSquare,
  Rocket,
  FileSpreadsheet,
  Gamepad2,
  Video,
  QrCode,
  Printer,
  Timer,
  Award, Trophy, FileText,
  ChevronDown,
  Layers,
  Zap,
  LayoutGrid,
  Menu,
  X
} from 'lucide-react';

export type VibeTabType = 
  | 'generator' 
  | 'playground' 
  | 'multimedia'
  | 'games'
  | 'iteration' 
  | 'office' 
  | 'deploy' 
  | 'debugger' 
  | 'curriculum'
  | 'certificate'
  | 'battle'
  | 'beginner'
  | 'portfolio';

interface VibeHeaderProps {
  activeTab: VibeTabType;
  onSelectTab: (tab: VibeTabType) => void;
  isProjectorMode: boolean;
  onToggleProjectorMode: () => void;
  onOpenQuickGuide: () => void;
  onOpenQrModal: () => void;
  onOpenCheatSheetModal: () => void;
  onOpenTimerModal: () => void;
}

export const VibeHeader: React.FC<VibeHeaderProps> = ({
  activeTab,
  onSelectTab,
  isProjectorMode,
  onToggleProjectorMode,
  onOpenQuickGuide,
  onOpenQrModal,
  onOpenCheatSheetModal,
  onOpenTimerModal
}) => {
  const [isCreativeDropdownOpen, setIsCreativeDropdownOpen] = useState(false);
  const [isWorkflowDropdownOpen, setIsWorkflowDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCreativeDropdownOpen(false);
        setIsWorkflowDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCreativeActive = ['multimedia', 'games'].includes(activeTab);
  const isWorkflowActive = ['office', 'iteration', 'debugger', 'curriculum', 'certificate', 'battle', 'beginner', 'portfolio'].includes(activeTab);

  const getCreativeLabel = () => {
    if (activeTab === 'multimedia') return 'PPT·영상·음악';
    if (activeTab === 'games') return '10분 미니게임';
    return '창작 실습 팩';
  };

  const getWorkflowLabel = () => {
    if (activeTab === 'beginner') return '초보자 말문트임';
    if (activeTab === 'battle') return '실습 배틀 쇼케이스';
    if (activeTab === 'portfolio') return '포트폴리오 PDF';
    if (activeTab === 'office') return '엑셀·데이터';
    if (activeTab === 'iteration') return '티키타카 수정';
    if (activeTab === 'debugger') return '에러 응급실';
    if (activeTab === 'curriculum') return '커리큘럼';
    if (activeTab === 'certificate') return '수료증 발급';
    return '강의·실무 도구';
  };

  const handleMobileNavClick = (tab: VibeTabType) => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070913]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand Logo */}
        <div 
          className="flex items-center gap-2 sm:gap-2.5 shrink-0 cursor-pointer" 
          onClick={() => handleMobileNavClick('generator')}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-sans">
                VibePilot
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-200 font-bold hidden md:inline-block shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                💎 Diamond Aurora
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Menu (Zero Scrollbar on Desktop, hidden on Mobile) */}
        <nav className="hidden lg:flex items-center bg-white/[0.04] backdrop-blur-md p-1 rounded-xl border border-white/10 text-xs gap-1 shadow-inner">
          
          {/* 1. 프롬프트 마스터 */}
          <button
            onClick={() => onSelectTab('generator')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'generator'
                ? 'aurora-button text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">프롬프트</span>
          </button>

          {/* 2. 코드 샌드박스 */}
          <button
            onClick={() => onSelectTab('playground')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'playground'
                ? 'aurora-button text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold">샌드박스</span>
          </button>

          {/* 3. 창작 실습 팩 (드롭다운: PPT·영상·음악, 미니게임) */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCreativeDropdownOpen(!isCreativeDropdownOpen);
                setIsWorkflowDropdownOpen(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                isCreativeActive
                  ? 'aurora-button text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              <span className="font-semibold">{getCreativeLabel()}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
            </button>

            {isCreativeDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-56 bg-[#0f1123]/95 backdrop-blur-2xl border border-purple-500/30 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 shadow-[0_15px_50px_rgba(0,0,0,0.7)]">
                <button
                  onClick={() => {
                    onSelectTab('multimedia');
                    setIsCreativeDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'multimedia' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Video className="w-4 h-4 text-violet-400" />
                  <div>
                    <p className="font-bold">PPT · 영상 · 음악</p>
                    <p className="text-[10px] text-slate-400 opacity-90">감마, 수노, 브루 & .pptx 생성</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('games');
                    setIsCreativeDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'games' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Gamepad2 className="w-4 h-4 text-pink-400" />
                  <div>
                    <p className="font-bold">10분 미니게임 팩</p>
                    <p className="text-[10px] text-slate-400 opacity-90">룰렛, 스네이크, 점프 점수판</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 4. 1분 배포 */}
          <button
            onClick={() => onSelectTab('deploy')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'deploy'
                ? 'aurora-button text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">1분 배포</span>
          </button>

          {/* 5. 강의·실무 도구 (드롭다운) */}
          <div className="relative">
            <button
              onClick={() => {
                setIsWorkflowDropdownOpen(!isWorkflowDropdownOpen);
                setIsCreativeDropdownOpen(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                isWorkflowActive
                  ? 'aurora-button text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">{getWorkflowLabel()}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
            </button>

            {isWorkflowDropdownOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-56 bg-[#0f1123]/95 backdrop-blur-2xl border border-purple-500/30 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 shadow-[0_15px_50px_rgba(0,0,0,0.7)]">
                <button
                  onClick={() => {
                    onSelectTab('office');
                    setIsWorkflowDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'office' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="font-bold">엑셀·실무 자동화</p>
                    <p className="text-[10px] text-slate-400 opacity-90">미수금 대시보드, 연차 계산</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('iteration');
                    setIsWorkflowDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'iteration' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="font-bold">티키타카 수정 레시피</p>
                    <p className="text-[10px] text-slate-400 opacity-90">2차 지시어, 고대비, 저장</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('debugger');
                    setIsWorkflowDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'debugger' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <div>
                    <p className="font-bold">에러 응급실</p>
                    <p className="text-[10px] text-slate-400 opacity-90">빨간 에러 즉시 번역 & 처방</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('curriculum');
                    setIsWorkflowDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'curriculum' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-bold">수업 커리큘럼</p>
                    <p className="text-[10px] text-slate-400 opacity-90">초중급 단계별 강의 교안</p>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-800" />

                <button
                  onClick={() => {
                    onSelectTab('certificate');
                    setIsWorkflowDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'certificate' ? 'bg-amber-600 text-white' : 'text-amber-300 hover:bg-slate-800'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="font-bold">수강생 수료증 발급</p>
                    <p className="text-[10px] text-slate-400 opacity-90">이름 입력 시 금박 수료증 인쇄</p>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-800" />

                {/* 1. 10분 실습 자랑 배틀 */}
                <button
                  onClick={() => {
                    onSelectTab('battle');
                    setIsWorkflowDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'battle' ? 'bg-indigo-600 text-white' : 'text-amber-300 hover:bg-slate-800'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="font-bold">🏆 10분 실습 자랑 배틀</p>
                    <p className="text-[10px] text-slate-400 opacity-90">명예의 전당 & 실시간 수강생 투표</p>
                  </div>
                </button>

                {/* 2. 초보자 말문 트임기 */}
                <button
                  onClick={() => {
                    onSelectTab('beginner');
                    setIsWorkflowDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'beginner' ? 'bg-indigo-600 text-white' : 'text-cyan-300 hover:bg-slate-800'
                  }`}
                >
                  <Wand2 className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="font-bold">🪄 초보자 말문 트임기</p>
                    <p className="text-[10px] text-slate-400 opacity-90">문과생/비전공자 전용 1초 자판기</p>
                  </div>
                </button>

                {/* 3. 원클릭 포트폴리오 PDF */}
                <button
                  onClick={() => {
                    onSelectTab('portfolio');
                    setIsWorkflowDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                    activeTab === 'portfolio' ? 'bg-indigo-600 text-white' : 'text-emerald-300 hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-bold">📄 원클릭 포트폴리오 PDF</p>
                    <p className="text-[10px] text-slate-400 opacity-90">취준생·직장인 이직 1장 출력</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* 실습 라이브 타이머 */}
          <button
            onClick={onOpenTimerModal}
            className="p-1.5 sm:p-2 rounded-xl bg-white/[0.05] hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="실습 라이브 타이머"
          >
            <Timer className="w-4 h-4" />
            <span className="hidden xl:inline">실습 타이머</span>
          </button>

          {/* 폰 QR */}
          <button
            onClick={onOpenQrModal}
            className="p-1.5 sm:p-2 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="학생 스마트폰 접속용 칠판 QR 생성"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden xl:inline">폰 QR</span>
          </button>

          {/* A4 치트시트 */}
          <button
            onClick={onOpenCheatSheetModal}
            className="p-1.5 sm:p-2 rounded-xl bg-white/[0.05] hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="A4 1장 학생 배포용 치트시트 인쇄"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden xl:inline">A4 치트시트</span>
          </button>

          {/* 프로젝터 모드 토글 (화면 클 때만) */}
          <button
            onClick={onToggleProjectorMode}
            className={`hidden sm:flex p-2 rounded-xl border text-xs font-medium transition-all items-center gap-1.5 ${
              isProjectorMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
            title="빔프로젝터 / 화면 공유 최적화 모드"
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* 가이드 물음표 */}
          <button
            onClick={onOpenQuickGuide}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium flex items-center transition-colors"
            title="바이브코딩 핵심 가이드"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
          </button>

          {/* Mobile Hamburger Button (모바일에서만 표시) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors flex items-center justify-center shadow-md shadow-indigo-600/30"
            aria-label="모바일 전체 메뉴 열기"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Drawer / Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          
          {/* Current Active Badge on Mobile */}
          <div className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">현재 보고 있는 탭:</span>
            <span className="font-bold text-indigo-400">
              {activeTab === 'generator' && '프롬프트 마스터'}
              {activeTab === 'playground' && '실시간 샌드박스'}
              {activeTab === 'multimedia' && 'PPT · 영상 · 음악'}
              {activeTab === 'games' && '10분 미니게임'}
              {activeTab === 'deploy' && '1분 무료 배포'}
              {activeTab === 'office' && '엑셀·실무 자동화'}
              {activeTab === 'iteration' && '티키타카 수정'}
              {activeTab === 'debugger' && '에러 응급실'}
              {activeTab === 'curriculum' && '수업 커리큘럼'}
              {activeTab === 'certificate' && '수료증 발급'}
              {activeTab === 'battle' && '10분 실습 자랑 배틀'}
              {activeTab === 'beginner' && '초보자 말문 트임기'}
              {activeTab === 'portfolio' && '원클릭 포트폴리오 PDF'}
            </span>
          </div>

          {/* Mobile Menu Grid (1열 & 2열 혼합) */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            
            {/* Core 1 */}
            <button
              onClick={() => handleMobileNavClick('generator')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'generator'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="font-bold">프롬프트</p>
                <p className="text-[10px] text-slate-400 opacity-80">요구서 자동완성</p>
              </div>
            </button>

            {/* Core 2 */}
            <button
              onClick={() => handleMobileNavClick('playground')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'playground'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <p className="font-bold">샌드박스</p>
                <p className="text-[10px] text-slate-400 opacity-80">실시간 코드 실행</p>
              </div>
            </button>

            {/* Multimedia */}
            <button
              onClick={() => handleMobileNavClick('multimedia')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'multimedia'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Video className="w-4 h-4 text-violet-400 shrink-0" />
              <div>
                <p className="font-bold">PPT·영상·음악</p>
                <p className="text-[10px] text-slate-400 opacity-80">Gamma·Suno·Vrew</p>
              </div>
            </button>

            {/* Mini Games */}
            <button
              onClick={() => handleMobileNavClick('games')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'games'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-pink-400 shrink-0" />
              <div>
                <p className="font-bold">10분 미니게임</p>
                <p className="text-[10px] text-slate-400 opacity-80">룰렛·스네이크</p>
              </div>
            </button>

            {/* 1 min Deploy */}
            <button
              onClick={() => handleMobileNavClick('deploy')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'deploy'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Rocket className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold">1분 무료 배포</p>
                <p className="text-[10px] text-slate-400 opacity-80">Vercel·Netlify</p>
              </div>
            </button>

            {/* Office Automation */}
            <button
              onClick={() => handleMobileNavClick('office')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'office'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold">엑셀·실무</p>
                <p className="text-[10px] text-slate-400 opacity-80">미수금·연차계산</p>
              </div>
            </button>

            {/* Iteration */}
            <button
              onClick={() => handleMobileNavClick('iteration')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'iteration'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="font-bold">티키타카 수정</p>
                <p className="text-[10px] text-slate-400 opacity-80">2차 프롬프트</p>
              </div>
            </button>

            {/* Error Hospital */}
            <button
              onClick={() => handleMobileNavClick('debugger')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'debugger'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <p className="font-bold">에러 응급실</p>
                <p className="text-[10px] text-slate-400 opacity-80">오류 번역 & 처방</p>
              </div>
            </button>

            {/* Curriculum */}
            <button
              onClick={() => handleMobileNavClick('curriculum')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'curriculum'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold">수업 교안</p>
                <p className="text-[10px] text-slate-400 opacity-80">초중급 커리큘럼</p>
              </div>
            </button>

            {/* Certificate */}
            <button
              onClick={() => handleMobileNavClick('certificate')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'certificate'
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                  : 'bg-slate-900 text-amber-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold">수료증 발급</p>
                <p className="text-[10px] text-slate-400 opacity-80">즉시 인쇄/PDF</p>
              </div>
            </button>
          </div>

          {/* Quick Actions in Mobile Drawer */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>수업 보조 도구</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTimerModal();
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 text-rose-400 border border-slate-800 flex items-center gap-1 font-semibold"
              >
                <Timer className="w-3.5 h-3.5" />
                <span>타이머</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQrModal();
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800 flex items-center gap-1 font-semibold"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>폰 QR</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCheatSheetModal();
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 text-amber-400 border border-slate-800 flex items-center gap-1 font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>치트시트</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
