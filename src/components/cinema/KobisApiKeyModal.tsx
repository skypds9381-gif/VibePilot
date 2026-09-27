import React, { useState } from 'react';
import { X, Key, Check, ExternalLink, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface KobisApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
  onTestKey: (key: string) => Promise<boolean>;
}

export const KobisApiKeyModal: React.FC<KobisApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
  onTestKey,
}) => {
  const [inputVal, setInputVal] = useState(apiKey);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; msg: string } | null>(null);

  if (!isOpen) return null;

  const handleTestAndSave = async () => {
    const trimmed = inputVal.trim();
    if (!trimmed) {
      onSaveKey('');
      setTestResult({ success: true, msg: 'API 키가 해제되어 큐레이션 모드로 전환되었습니다.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    try {
      const ok = await onTestKey(trimmed);
      if (ok) {
        onSaveKey(trimmed);
        setTestResult({ success: true, msg: '인증 성공! 실시간 영진위(KOBIS) 박스오피스로 연결되었습니다.' });
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setTestResult({ success: false, msg: '유효하지 않은 KOBIS API 키입니다. 키 값을 다시 확인해 주세요.' });
      }
    } catch {
      setTestResult({ success: false, msg: '서버와 통신할 수 없습니다.' });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#12131A] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 text-stone-200 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">영화진흥위원회(KOBIS) API 연동</h3>
              <p className="text-xs text-stone-400">매일 전국 극장 실시간 박스오피스 자동 갱신</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-stone-900/80 rounded-xl p-4 border border-stone-800 space-y-2.5 text-xs text-stone-300">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>무료 API 키 발급 방법 (1분 소요)</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-stone-400 leading-relaxed">
            <li>
              <a
                href="https://www.kobis.or.kr/kobisopenapi/homepg/main/main.do"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline font-medium inline-flex items-center gap-1"
              >
                KOBIS 오픈API 사이트 <ExternalLink className="w-3 h-3 inline" />
              </a>
              에 접속하여 무료 회원가입/로그인합니다.
            </li>
            <li>상단 메뉴의 <strong>[키발급/관리]</strong>에서 무료 키를 즉시 발급받습니다.</li>
            <li>발급받은 32자리 키를 아래 입력창에 넣고 연동을 완료하세요!</li>
          </ol>
        </div>

        {/* Input Form */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-300 block">KOBIS API KEY</label>
          <div className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="예: f5eef3421c602c6cb7ea224104795888"
              className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500 font-mono tracking-wide"
            />
          </div>
          <p className="text-[11px] text-stone-500">
            * 키를 입력하지 않거나 비워두면 무드매거진 엄선 박스오피스 라인업으로 자동 운영됩니다.
          </p>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                : 'bg-rose-950/40 text-rose-300 border border-rose-800/50'
            }`}
          >
            {testResult.success ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{testResult.msg}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors"
          >
            닫기
          </button>
          <button
            onClick={handleTestAndSave}
            disabled={isTesting}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 active:scale-95 text-neutral-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isTesting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
            <span>연동 및 저장하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
