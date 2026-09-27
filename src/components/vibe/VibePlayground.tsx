import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Sparkles, 
  Code2, 
  Eye, 
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  FileCode,
  Download
} from 'lucide-react';
import { DEFAULT_SALARY_HTML, DEFAULT_TIMER_HTML } from '../../data/vibe/starterCode';

interface VibePlaygroundProps {
  initialCode?: string;
  isProjectorMode?: boolean;
}

export const VibePlayground: React.FC<VibePlaygroundProps> = ({
  initialCode,
  isProjectorMode = false
}) => {
  const [code, setCode] = useState<string>(initialCode || DEFAULT_SALARY_HTML);
  const [viewDevice, setViewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'split' | 'code' | 'preview'>('split');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update iframe on code change
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  }, [code]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = (sampleType: 'salary' | 'timer') => {
    if (sampleType === 'salary') {
      setCode(DEFAULT_SALARY_HTML);
    } else {
      setCode(DEFAULT_TIMER_HTML);
    }
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4' : ''}`}>
      
      {/* Playground Top Bar */}
      <div className="prism-card border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        
        {/* Left: Presets & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-white text-sm">
              라이브 샌드박스 (Live Preview)
            </h3>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 border-l border-white/10 pl-3">
            <span className="text-xs text-slate-400">샘플 즉시 실행:</span>
            <button
              onClick={() => handleLoadSample('salary')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors"
            >
              💰 급여계산기
            </button>
            <button
              onClick={() => handleLoadSample('timer')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors"
            >
              ⏱️ 강의실 타이머
            </button>
          </div>
        </div>

        {/* Center: View Switcher (Desktop/Tablet/Mobile) */}
        <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setViewDevice('desktop')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
              viewDevice === 'desktop' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="데스크톱 뷰 (100%)"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>PC</span>
          </button>
          <button
            onClick={() => setViewDevice('tablet')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
              viewDevice === 'tablet' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="태블릿 뷰 (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>태블릿</span>
          </button>
          <button
            onClick={() => setViewDevice('mobile')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
              viewDevice === 'mobile' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="모바일 뷰 (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>모바일</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Split / Code / Preview Toggle on Mobile */}
          <div className="flex lg:hidden items-center bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              코드
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              결과
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? '복사됨' : 'HTML 복사'}</span>
          </button>

          <button
            onClick={handleDownloadHtml}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="index.html로 내보내기"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">다운로드</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 text-xs transition-colors"
            title={isFullscreen ? '전체화면 종료' : '전체화면'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Main Sandbox Area */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 ${isFullscreen ? 'h-[calc(100vh-100px)]' : 'min-h-[580px]'}`}>
        
        {/* Left: Code Editor (5 cols) */}
        <div className={`lg:col-span-5 flex flex-col prism-card border-white/10 rounded-2xl overflow-hidden shadow-lg ${
          activeTab === 'preview' ? 'hidden lg:flex' : 'flex'
        }`}>
          <div className="bg-slate-950 px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              <span>index.html (실시간 코드 수정 가능)</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {code.length.toLocaleString()} 자
            </span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-slate-950 text-slate-200 p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/50 selection:bg-indigo-500/30 overflow-y-auto"
            placeholder="AI가 생성한 전체 HTML 코드를 여기에 붙여넣으면 즉시 우측에 렌더링됩니다..."
            spellCheck={false}
          />
        </div>

        {/* Right: Live Preview Frame (7 cols) */}
        <div className={`lg:col-span-7 flex flex-col prism-card border-white/10 rounded-2xl overflow-hidden shadow-lg ${
          activeTab === 'code' ? 'hidden lg:flex' : 'flex'
        }`}>
          <div className="bg-slate-950 px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">브라우저 실행 화면</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (iframeRef.current) {
                    iframeRef.current.srcdoc = code;
                  }
                }}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>화면 다시 로드</span>
              </button>
            </div>
          </div>

          {/* Iframe Viewport Container */}
          <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-auto">
            <div
              className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white ${
                viewDevice === 'desktop'
                  ? 'w-full'
                  : viewDevice === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[390px]'
              }`}
            >
              <iframe
                ref={iframeRef}
                title="Vibe Sandbox Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-modals allow-same-origin allow-forms allow-downloads"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
