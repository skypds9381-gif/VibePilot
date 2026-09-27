import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Smartphone, 
  Copy, 
  Check, 
  Sparkles, 
  Share2,
  ExternalLink
} from 'lucide-react';

interface VibeQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUrl?: string;
}

export const VibeQrModal: React.FC<VibeQrModalProps> = ({
  isOpen,
  onClose,
  defaultUrl = window.location.href
}) => {
  const [url, setUrl] = useState(defaultUrl);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Use reliable public QR code SVG/PNG generator
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(url)}&bgcolor=020617&color=38bdf8`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0F131E] border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 text-center space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>수강생 스마트폰 즉석 실행 QR</span>
          </div>
          <h3 className="text-xl font-black text-white">
            카메라로 찍으면 폰에서 즉시 열립니다! 📱
          </h3>
          <p className="text-xs text-slate-400">
            빔프로젝터에 띄워두고 수강생들에게 스마트폰 카메라를 켜게 하세요.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex justify-center p-4 bg-slate-950 rounded-2xl border-2 border-cyan-500/30 shadow-inner">
          <img
            src={qrApiUrl}
            alt="Vibe App QR Code"
            className="w-56 h-56 rounded-xl shadow-lg transition-transform hover:scale-105"
          />
        </div>

        {/* URL Input & Copy */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="QR로 변환할 웹사이트 주소..."
              className="bg-transparent text-xs text-slate-200 flex-1 px-2 focus:outline-none font-mono"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사됨' : '복사'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            💡 Tiiny.host나 Vercel 배포 주소를 넣으면 그 주소로 QR이 즉시 다시 그려집니다.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-800 transition-colors"
        >
          닫기
        </button>

      </div>
    </div>
  );
};
