import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Briefcase, 
  Globe, 
  Plus, 
  Trash2, 
  Calendar,
  Layers,
  Code,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface ProjectEntry {
  id: string;
  name: string;
  period: string;
  role: string;
  description: string;
  techStack: string;
  vibeContribution: string; // 바이브코딩을 활용해 무엇을 해결했는지
  demoUrl: string;
}

export const VibePortfolioPdfStudio: React.FC<{ isProjectorMode?: boolean }> = ({ isProjectorMode = false }) => {
  const [userName, setUserName] = useState('김 바 이 브');
  const [targetRole, setTargetRole] = useState('AI 프로덕트 매니저 & 서비스 기획자');
  const [email, setEmail] = useState('vibe.developer@gmail.com');
  const [phone, setPhone] = useState('010-1234-5678');
  const [githubUrl, setGithubUrl] = useState('github.com/vibe-pilot');
  const [oneLineSummary, setOneLineSummary] = useState('AI 바이브코딩(Vibe Coding)을 활용해 아이디어를 1시간 만에 실제 작동하는 웹 서비스로 구현하는 실전형 기획자입니다.');

  const [skills, setSkills] = useState('Vibe Coding, Cursor, Claude 3.7 Sonnet, React, Tailwind CSS, Vercel 배포, Google AI Studio');

  const [projects, setProjects] = useState<ProjectEntry[]>([
    {
      id: 'proj-1',
      name: '무드 매거진 & 실시간 시네마 나이트 (Mood Magazine)',
      period: '2026.09 (1인 프로젝트 / 2일 완성)',
      role: '기획 & 바이브코딩 개발 전담',
      description: '영화진흥위원회(KOBIS) OpenAPI와 구글 실시간 뉴스를 연동한 하이엔드 영화 큐레이션 웹 플랫폼.',
      techStack: 'React, TypeScript, Tailwind CSS, Express Proxy, Vercel Serverless',
      vibeContribution: '기획부터 KOBIS OpenAPI 프록시 서버 연동, 카카오톡/모바일 최적화까지 AI 도구를 활용해 전 과정을 단독 빌드 및 배포 완료.',
      demoUrl: 'https://mood-magazine.vercel.app'
    },
    {
      id: 'proj-2',
      name: '바이브파일럿 (VibePilot) - AI 바이브코딩 실습 & 강의 스튜디오',
      period: '2026.09 (1인 프로젝트 / 1일 완성)',
      role: '풀스택 프로덕트 기획/개발',
      description: '비전공자와 수강생을 위한 프롬프트 자동완성기, 실시간 샌드박스, 1분 배포 가이드 올인원 교육 플랫폼.',
      techStack: 'React, TypeScript, Web APIs, Tailwind CSS, Git/Vercel',
      vibeContribution: '초보자도 10분 만에 웹앱을 만들 수 있도록 인터랙티브 샌드박스 및 수료증 자동 발급 인쇄 엔진 설계.',
      demoUrl: 'https://ais-dev-wqw7y25ace6vuipjne5tyw-127538981527.asia-east1.run.app'
    }
  ]);

  const handleAddProject = () => {
    const newProj: ProjectEntry = {
      id: `proj-${Date.now()}`,
      name: '새로운 프로젝트 이름',
      period: '2026.09 (1인 프로젝트)',
      role: '기획 및 바이브코딩 개발',
      description: '프로젝트에 대한 간단한 소개를 적어주세요.',
      techStack: 'HTML, Tailwind CSS, Vercel',
      vibeContribution: 'AI 바이브코딩을 활용하여 문제를 해결한 구체적 성과를 기록하세요.',
      demoUrl: 'https://my-app.vercel.app'
    };
    setProjects([...projects, newProj]);
  };

  const handleUpdateProject = (id: string, field: keyof ProjectEntry, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleRemoveProject = (id: string) => {
    if (projects.length <= 1) return;
    setProjects(projects.filter(p => p.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`space-y-8 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      {/* Intro Banner (Print: Hidden) */}
      <div className="rounded-[24px] border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>ONE-CLICK CAREER PORTFOLIO GENERATOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              📄 원클릭 포트폴리오 PDF 생성기 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">(취준생·직장인 이직용)</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              바이브코딩으로 만든 프로젝트들을 이력서에 어떻게 넣어야 할지 막막하셨나요? 
              이름과 링크만 넣고 <strong>[원클릭 PDF 저장 / 인쇄]</strong>를 누르세요. 
              기업 인사담당자와 면접관이 가장 선호하는 <strong>실무 문제해결 중심 1장 포트폴리오</strong>가 완성됩니다!
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all self-start sm:self-auto shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>원클릭 PDF 저장 / 인쇄하기</span>
          </button>
        </div>
      </div>

      {/* Editor Controls (Print: Hidden) */}
      <div className="apple-glass-card border-white/[0.12] rounded-[20px] p-5 sm:p-6 space-y-4 print:hidden text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.12] pb-3">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>포트폴리오 내용 실시간 편집</span>
          </h3>
          <span className="text-slate-400 text-[11px]">입력 즉시 아래 A4 미리보기에 실시간 반영됩니다</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">내 이름</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-[#121214] border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">희망 직무 / 타이틀</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-[#121214] border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">이메일</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121214] border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">연락처</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#121214] border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">1줄 자기소개</label>
          <input
            type="text"
            value={oneLineSummary}
            onChange={(e) => setOneLineSummary(e.target.value)}
            className="w-full bg-[#121214] border border-slate-700 rounded-lg px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">보유 기술 / AI 활용 툴 (쉼표 구분)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full bg-[#121214] border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
          />
        </div>
      </div>

      {/* A4 Paper Document Preview (Print Area) */}
      <div className="bg-[#121214] p-2 sm:p-6 rounded-[20px] flex justify-center">
        <div 
          id="portfolio-document"
          className="bg-white text-slate-900 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-2xl space-y-8 font-sans border border-slate-200"
          style={{ minHeight: '1000px' }}
        >
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold font-mono tracking-widest text-emerald-700 uppercase">
                AI VIBE CODING PORTFOLIO
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
                {userName}
              </h1>
              <p className="text-base sm:text-lg font-bold text-emerald-800 mt-1">
                {targetRole}
              </p>
              <p className="text-xs text-slate-600 mt-2 max-w-xl leading-relaxed">
                {oneLineSummary}
              </p>
            </div>

            <div className="text-right text-xs text-slate-600 font-mono space-y-1 shrink-0">
              <p>📧 {email}</p>
              <p>📱 {phone}</p>
              <p>🔗 {githubUrl}</p>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-2">
            <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-600 rounded-full inline-block" />
              핵심 역량 및 AI 활용 툴 (Core Competencies)
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.split(',').map((sk, sIdx) => (
                <span key={sIdx} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold">
                  {sk.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Project List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-300 pb-1">
              <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-600 rounded-full inline-block" />
                바이브코딩 실전 프로젝트 (Selected Projects)
              </h2>
              <button
                onClick={handleAddProject}
                className="print:hidden text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>프로젝트 추가</span>
              </button>
            </div>

            <div className="space-y-6">
              {projects.map((proj, pIdx) => (
                <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 relative group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {pIdx + 1}
                      </span>
                      <h3 className="font-bold text-base text-slate-950">
                        {proj.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {proj.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {proj.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">담당 역할 & 기술 스택</span>
                      <p className="font-semibold text-slate-900 mt-0.5">{proj.role}</p>
                      <p className="text-slate-600 font-mono text-[11px] mt-0.5">{proj.techStack}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="text-[10px] font-bold text-emerald-800 block uppercase">바이브코딩 핵심 성과</span>
                      <p className="text-slate-800 font-medium text-[11px] mt-0.5">{proj.vibeContribution}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <a 
                      href={proj.demoUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline font-mono text-[11px] flex items-center gap-1 font-semibold"
                    >
                      <span>라이브 데모: {proj.demoUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {projects.length > 1 && (
                      <button
                        onClick={() => handleRemoveProject(proj.id)}
                        className="print:hidden text-rose-500 hover:text-rose-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>삭제</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Official Seal */}
          <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>AI Vibe Coding Verified Portfolio</span>
            </div>
            <span>Generated via VibePilot Diamond Suite</span>
          </div>
        </div>
      </div>
    </div>
  );
};
