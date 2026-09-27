import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Table, 
  Briefcase, 
  Layers, 
  Download, 
  PieChart,
  Lightbulb
} from 'lucide-react';
import { OFFICE_WORKFLOWS, OfficeDataWorkflow } from '../../data/vibe/advancedVibeData';

interface VibeOfficeDataStudioProps {
  isProjectorMode?: boolean;
}

export const VibeOfficeDataStudio: React.FC<VibeOfficeDataStudioProps> = ({
  isProjectorMode = false
}) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<OfficeDataWorkflow>(OFFICE_WORKFLOWS[0]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSampleData, setCopiedSampleData] = useState(false);

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopySampleData = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSampleData(true);
    setTimeout(() => setCopiedSampleData(false), 2000);
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Intro Banner */}
      <div className="rounded-3xl border border-amber-900/40 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-5 sm:p-6 shadow-xl">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
            <span>EXCEL & PYTHON REAL-WORLD WORKFLOWS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            직장인 수강생이 열광하는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">엑셀 & 업무 자동화 바이브 덱</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            "VLOOKUP 함수 외우는 건 지겹지만, 엑셀 파일을 넣으면 <strong>미수금 대시보드와 연차 계산기를 10분 만에 뽑아주는 웹앱</strong>은 모두가 배우고 싶어 합니다!" 
            사무직·경리·영업 실무자를 위한 킬러 예제입니다.
          </p>
        </div>
      </div>

      {/* Workflow Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {OFFICE_WORKFLOWS.map((wf) => {
          const isSelected = selectedWorkflow.id === wf.id;
          return (
            <div
              key={wf.id}
              onClick={() => setSelectedWorkflow(wf)}
              className={`cursor-pointer rounded-3xl border p-4 transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900/90 border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                  : 'bg-slate-900/50 border-white/10 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">
                  {wf.targetRole}
                </span>

                <h3 className="font-bold text-white text-sm line-clamp-2">
                  {wf.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {wf.problem}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>프로젝트 명세 열기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Workflow Detailed Card */}
      <div className="prism-card border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 font-mono">
              [{selectedWorkflow.targetRole} 실무 자동화]
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {selectedWorkflow.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              📌 {selectedWorkflow.problem}
            </p>
          </div>

          <button
            onClick={() => handleCopyPrompt(selectedWorkflow.vibePrompt)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all self-start md:self-auto"
          >
            {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPrompt ? '프롬프트 복사됨' : '실무 프롬프트 복사'}</span>
          </button>
        </div>

        {/* Expected Output */}
        <div className="bg-slate-950/80 rounded-xl p-4 border border-amber-500/20 flex items-start gap-3 text-xs">
          <PieChart className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-white">결과 산출물:</p>
            <p className="text-slate-300 leading-relaxed font-semibold">
              {selectedWorkflow.expectedOutput}
            </p>
          </div>
        </div>

        {/* Two Columns: Sample Data & Prompt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Sample CSV Data */}
          <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-amber-400" />
                <span>수업용 샘플 CSV 데이터셋</span>
              </span>
              <button
                onClick={() => handleCopySampleData(selectedWorkflow.sampleDataPreview)}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                {copiedSampleData ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>데이터 복사</span>
              </button>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-white/10 font-mono text-[11px] text-slate-300 whitespace-pre overflow-x-auto leading-relaxed">
              {selectedWorkflow.sampleDataPreview}
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              학생들에게 "메모장에 이 데이터를 넣고 .csv로 저장해서 웹앱에 던져보세요"라고 실습시킬 수 있습니다.
            </p>
          </div>

          {/* Prompt */}
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
            <span className="font-bold text-emerald-400 font-mono">
              Claude / Cursor 투입용 원샷(One-Shot) 프롬프트
            </span>
            <div className="p-3 bg-slate-900 rounded-lg border border-white/10 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {selectedWorkflow.vibePrompt}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
