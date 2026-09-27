import { VibeBattleShowcase } from './VibeBattleShowcase';
import { VibeBeginnerVending } from './VibeBeginnerVending';
import { VibePortfolioPdfStudio } from './VibePortfolioPdfStudio';
import React, { useState } from 'react';
import { VibeHeader, VibeTabType } from './VibeHeader';
import { VibePromptGenerator } from './VibePromptGenerator';
import { VibePlayground } from './VibePlayground';
import { VibeMultimediaStudio } from './VibeMultimediaStudio';
import { VibeDebugger } from './VibeDebugger';
import { VibeCurriculum } from './VibeCurriculum';
import { VibeIterationStudio } from './VibeIterationStudio';
import { VibeDeployGuide } from './VibeDeployGuide';
import { VibeOfficeDataStudio } from './VibeOfficeDataStudio';
import { VibeGamesStudio } from './VibeGamesStudio';
import { VibeCertificateStudio } from './VibeCertificateStudio';
import { VibeGuideModal } from './VibeGuideModal';
import { VibeQrModal } from './VibeQrModal';
import { VibeCheatSheetModal } from './VibeCheatSheetModal';
import { VibeTimerModal } from './VibeTimerModal';
import { Film } from 'lucide-react';

interface VibeAppProps {
  onSwitchToCinema?: () => void;
}

export const VibeApp: React.FC<VibeAppProps> = ({ onSwitchToCinema }) => {
  const [activeTab, setActiveTab] = useState<VibeTabType>('generator');
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [sharedPlaygroundCode, setSharedPlaygroundCode] = useState<string | undefined>();

  const handleSendToPlayground = (code: string) => {
    setSharedPlaygroundCode(code);
    setActiveTab('playground');
  };

  return (
    <div className={`min-h-screen linear-canvas text-slate-100 flex flex-col font-sans transition-all relative overflow-x-hidden selection:bg-cyan-500 selection:text-black antialiased ${
      isProjectorMode ? 'contrast-125' : ''
    }`}>
      {/* High-Tech Cyber Laser Beams */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[350px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
      {/* Vibe Studio Navigation Bar (Refactored Zero-Scroll Cluster) */}
      <VibeHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isProjectorMode={isProjectorMode}
        onToggleProjectorMode={() => setIsProjectorMode(!isProjectorMode)}
        onOpenQuickGuide={() => setIsGuideOpen(true)}
        onOpenQrModal={() => setIsQrOpen(true)}
        onOpenCheatSheetModal={() => setIsCheatSheetOpen(true)}
        onOpenTimerModal={() => setIsTimerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {activeTab === 'generator' && (
          <VibePromptGenerator
            onSendToPlayground={handleSendToPlayground}
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'playground' && (
          <VibePlayground
            initialCode={sharedPlaygroundCode}
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'multimedia' && (
          <VibeMultimediaStudio
            onLoadCodeToPlayground={handleSendToPlayground}
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'games' && (
          <VibeGamesStudio
            onLoadGameToPlayground={handleSendToPlayground}
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'deploy' && (
          <VibeDeployGuide
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'iteration' && (
          <VibeIterationStudio
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'office' && (
          <VibeOfficeDataStudio
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'debugger' && (
          <VibeDebugger
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'curriculum' && (
          <VibeCurriculum
            onSelectProjectToPlayground={handleSendToPlayground}
            isProjectorMode={isProjectorMode}
          />
        )}

        {activeTab === 'certificate' && (
          <VibeCertificateStudio
            isProjectorMode={isProjectorMode}
          />
        )}
        {activeTab === 'battle' && (
          <VibeBattleShowcase
            isProjectorMode={isProjectorMode}
          />
        )}
        {activeTab === 'beginner' && (
          <VibeBeginnerVending
            isProjectorMode={isProjectorMode}
          />
        )}
        {activeTab === 'portfolio' && (
          <VibePortfolioPdfStudio
            isProjectorMode={isProjectorMode}
          />
        )}
      </main>

      {/* Footer & Mode Switcher */}
      <footer className="w-full bg-[#0a0c16]/80 backdrop-blur-xl border-t border-white/5 py-6 px-4 print:hidden relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">VibePilot</span>
            <span>·</span>
            <span>컴퓨터 강사를 위한 바이브코딩 올인원 교육 & 실습 스튜디오</span>
          </div>

          <div className="flex items-center gap-4">
            {onSwitchToCinema && (
              <button
                onClick={onSwitchToCinema}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 flex items-center gap-1.5 transition-colors"
                title="기존 영화 박스오피스 앱으로 전환"
              >
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>무드매거진(영화앱) 보기</span>
              </button>
            )}
            <span className="font-mono text-slate-600">Built for AI Instructors</span>
          </div>
        </div>
      </footer>

      {/* Guide Modal */}
      <VibeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Student Smartphone Instant QR Modal */}
      <VibeQrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

      {/* Printable A4 Cheat Sheet Modal */}
      <VibeCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      {/* Classroom Practice Live Timer Modal */}
      <VibeTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />
    </div>
  );
};
