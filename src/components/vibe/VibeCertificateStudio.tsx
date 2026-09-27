import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  Sparkles, 
  Check, 
  Calendar, 
  User, 
  ShieldCheck,
  Building,
  Download
} from 'lucide-react';

interface VibeCertificateStudioProps {
  isProjectorMode?: boolean;
}

export const VibeCertificateStudio: React.FC<VibeCertificateStudioProps> = ({
  isProjectorMode = false
}) => {
  const [studentName, setStudentName] = useState('홍 길 동');
  const [courseTitle, setCourseTitle] = useState('2026 AI 바이브코딩(Vibe Coding) 실전 마스터 과정');
  const [completionDate, setCompletionDate] = useState('2026년 9월 27일');
  const [instructorName, setInstructorName] = useState('바이브코딩 전임 강사');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-base' : 'text-sm'}`}>
      
      {/* Intro Banner */}
      <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-5 sm:p-6 shadow-xl print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL COURSE CERTIFICATE GENERATOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              수강생 감동 500%, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">1초 수료증 자동 발급기</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              수업 마지막 날, 학생 이름을 넣고 <strong>[수료증 인쇄 / PDF 저장]</strong>을 눌러보세요. 
              금박 엠블럼이 들어간 공식 수료증이 완성되어 학생들의 만족도와 포트폴리오 자부심이 수직 상승합니다!
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all self-start sm:self-auto shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>수료증 인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>

      {/* Input Controls (Hidden in Print) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:hidden text-xs">
        <div>
          <label className="block text-slate-400 font-bold mb-1 flex items-center gap-1">
            <User className="w-3 h-3 text-amber-400" />
            <span>수강생 성명</span>
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-bold mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>교육 과정명</span>
          </label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-bold mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-400" />
            <span>수료 일자</span>
          </label>
          <input
            type="text"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-bold mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>지도 강사명</span>
          </label>
          <input
            type="text"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Printable Certificate Canvas (A4 Landscape Layout) */}
      <div className="flex justify-center p-0 sm:p-4">
        <div className="w-full max-w-4xl bg-slate-950 text-slate-100 rounded-3xl border-4 border-amber-500/50 p-8 sm:p-12 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-8 print:border-[#926F34] print:p-12 print:shadow-none print:w-full print:max-w-none print:m-0">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/80 print:border-[#926F34]" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/80 print:border-[#926F34]" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/80 print:border-[#926F34]" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/80 print:border-[#926F34]" />

          {/* Certificate Content */}
          <div className="text-center space-y-6 sm:space-y-8 relative z-10">
            
            {/* Top Badge */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold print:border-[#926F34] print:text-[#926F34]">
                <Award className="w-4 h-4 text-amber-400 print:text-[#926F34]" />
                <span>CERTIFICATE OF COMPLETION</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 tracking-wider font-serif print:text-black print:bg-none">
                수 료 증 서
              </h1>
              <p className="text-xs text-slate-400 print:text-gray-500 font-mono tracking-widest">
                VERIFIED VIBE CODING CREDENTIAL
              </p>
            </div>

            {/* Student Name */}
            <div className="py-2 border-b border-amber-500/30 max-w-xs mx-auto print:border-gray-400">
              <p className="text-2xl sm:text-4xl font-black text-white print:text-black tracking-widest font-serif">
                {studentName}
              </p>
            </div>

            {/* Description Text */}
            <div className="max-w-xl mx-auto space-y-2 text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed font-sans">
              <p>
                위 사람은 <strong>{courseTitle}</strong>을 성실히 이수하였으며,
              </p>
              <p>
                자연어 인공지능 프롬프트 엔지니어링 및 멀티미디어(PPT·영상·음악) 소프트웨어 제작 역량을 완벽히 갖추었음을 인정하여 이 증서를 수여합니다.
              </p>
            </div>

            {/* Gold Seal & Signatures */}
            <div className="pt-6 sm:pt-10 flex items-center justify-between border-t border-slate-800/80 print:border-gray-300 text-xs sm:text-sm">
              <div className="text-left font-mono">
                <p className="text-slate-400 print:text-gray-600 text-xs">수료일자</p>
                <p className="font-bold text-white print:text-black">{completionDate}</p>
              </div>

              {/* Gold Medal Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 flex flex-col items-center justify-center text-slate-950 shadow-xl border-4 border-amber-300/40 print:border-none print:shadow-none">
                <Sparkles className="w-5 h-5 fill-current" />
                <span className="text-[9px] font-black tracking-tighter uppercase font-mono mt-0.5">VERIFIED</span>
              </div>

              <div className="text-right">
                <p className="text-slate-400 print:text-gray-600 text-xs">교육 총괄</p>
                <p className="font-bold text-white print:text-black">{instructorName} (인)</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
