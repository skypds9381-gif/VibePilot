import React, { useState } from 'react';
import { 
  Rocket, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Globe, 
  Smartphone, 
  Sparkles, 
  ArrowRight,
  FolderUp,
  Share2,
  Terminal
} from 'lucide-react';
import { DEPLOYMENT_GUIDES, DeploymentGuide } from '../../data/vibe/advancedVibeData';

interface VibeDeployGuideProps {
  isProjectorMode?: boolean;
}

export const VibeDeployGuide: React.FC<VibeDeployGuideProps> = ({
  isProjectorMode = false
}) => {
  const [selectedGuide, setSelectedGuide] = useState<DeploymentGuide>(DEPLOYMENT_GUIDES[0]);

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Intro Banner */}
      <div className="rounded-3xl border border-emerald-900/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-5 sm:p-6 shadow-xl">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            <Rocket className="w-3.5 h-3.5 text-emerald-400" />
            <span>ONE-CLICK ZERO-SERVER DEPLOYMENT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            내 스마트폰과 전 세계에 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">1분 만에 무료 배포하기</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            클로드나 로컬 화면에만 띄워놓고 끝나면 50%짜리 수업입니다.
            <strong>"진짜 인터넷 주소(URL)를 따서 내 폰 카톡으로 전송하고 실행하는 순간"</strong>, 수강생들의 몰입도와 성취감이 10배로 폭발합니다!
          </p>
        </div>
      </div>

      {/* Guide Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEPLOYMENT_GUIDES.map((guide) => {
          const isSelected = selectedGuide.id === guide.id;
          return (
            <div
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className={`cursor-pointer rounded-3xl border p-5 transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900/90 border-emerald-400 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/50'
                  : 'bg-slate-900/50 border-white/10 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono">
                    {guide.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    난이도: {guide.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base">
                  {guide.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {guide.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>단계별 배포 로드맵 열기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Step by Step Visual Card */}
      <div className="prism-card rounded-3xl border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
        
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>{selectedGuide.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {selectedGuide.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={selectedGuide.id === 'tiiny-host' ? 'https://tiiny.host' : 'https://vercel.com'}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <span>{selectedGuide.id === 'tiiny-host' ? 'tiiny.host 바로가기' : 'Vercel 바로가기'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Instructor Script Box */}
        <div className="bg-[#090b14]/90/80 border border-emerald-500/20 rounded-xl p-4 text-xs space-y-1">
          <p className="font-bold text-emerald-300 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>수업 현장 강사님 멘트 가이드:</span>
          </p>
          <p className="text-slate-300 italic">
            {selectedGuide.instructorScript}
          </p>
        </div>

        {/* Step Flow List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedGuide.steps.map((st) => (
            <div key={st.stepNum} className="p-4 rounded-xl bg-[#090b14]/90 border border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center font-mono">
                  {st.stepNum}
                </span>
                <h4 className="font-bold text-white text-xs sm:text-sm">
                  {st.title}
                </h4>
              </div>

              <p className="text-xs text-slate-300 pl-8 leading-relaxed">
                {st.desc}
              </p>

              <div className="ml-8 pt-1 text-[11px] text-emerald-400/90 font-medium">
                💡 {st.actionTip}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
