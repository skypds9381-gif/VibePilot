export interface MultimediaRecipe {
  id: string;
  category: 'ppt' | 'music' | 'video';
  categoryLabel: string;
  title: string;
  badge: string;
  techStack: string;
  painPoint: string;
  solutionSummary: string;
  teachingHook: string;
  promptToAi: string;
  sampleCode: string;
  keyActionSteps: string[];
}

export const MULTIMEDIA_RECIPES: MultimediaRecipe[] = [
  {
    id: 'ppt-generator',
    category: 'ppt',
    categoryLabel: '파워포인트(PPT)',
    title: '주제만 치면 5장 PPT 슬라이드 자동 생성 & .pptx 즉시 다운로드',
    badge: '직장인/대학생 원픽',
    techStack: 'HTML5 + Tailwind CSS + PptxGenJS (CDN 브라우저 라이브러리)',
    painPoint: '발표 전날 밤새 슬라이드 양식 만들고 글머리 기호 붙이느라 3~4시간 야근',
    solutionSummary: '브라우저에서 자바스크립트 무료 라이브러리(PptxGenJS)를 활용하여, 주제만 입력하면 표지, 목차, 본문, 결론 슬라이드가 디자인된 진짜 마이크로소프트 파워포인트 파일(.pptx)로 1초 만에 생성 및 다운로드!',
    teachingHook: '"여러분, 파워포인트 프로그램 안 켜도 웹에서 버튼 한 번 누르면 정품 파워포인트 파일이 뚝딱 다운로드되는 웹앱을 AI로 5분 만에 만들어보겠습니다!"',
    promptToAi: `당신은 프론트엔드 및 문서 자동화 개발 전문가입니다.
주제와 핵심 내용을 입력하면 실제 마이크로소프트 파워포인트(.pptx) 파일로 생성하여 즉시 다운로드해주는 단일 HTML 웹앱을 만들어주세요.

기술 요구사항:
1. PptxGenJS CDN 라이브러리 활용:
   <script src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/libs/jszip.min.js"></script>
   <script src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.min.js"></script>
2. UI: 세련된 슬레이트 다크 테마 (Tailwind CSS)
3. 기능:
   - 발표 주제(Title), 발표자(Author) 입력
   - 버튼 클릭 시 PptxGenJS 인스턴스 생성
   - 슬라이드 1: 메인 다크 네이비 테마 표지 (큰 타이틀, 부제목, 발표자)
   - 슬라이드 2: Executive Summary (3개 핵심 키워드 카드형 배치)
   - 슬라이드 3: Q&A 및 감사합니다 엔딩 슬라이드
   - pptx.writeFile({ fileName: '발표자료.pptx' }) 호출로 즉시 브라우저 다운로드 실행`,
    sampleCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>바이브 PPT 생성기</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- PptxGenJS Bundle (JSZip 포함) -->
  <script src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/libs/jszip.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.min.js"></script>
</head>
<body class="bg-slate-950 text-white min-h-screen p-4 sm:p-6 font-sans flex flex-col items-center justify-center">
  <div class="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
    <div class="text-center space-y-2">
      <span class="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">VIBE OFFICE AUTOMATION</span>
      <h1 class="text-2xl font-black text-white">📊 초고속 PPT 파워포인트 자동 생성기</h1>
      <p class="text-xs text-slate-400">주제만 넣으면 마이크로소프트 정품 .pptx 파일로 즉시 다운로드!</p>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-xs font-bold text-slate-300 mb-1">발표 주제</label>
        <input id="pptTitle" type="text" value="2026 AI 바이브코딩 비즈니스 혁신 전략" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium" />
      </div>
      <div>
        <label class="block text-xs font-bold text-slate-300 mb-1">발표자 / 소속</label>
        <input id="pptAuthor" type="text" value="바이브코딩 전문 강사" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium" />
      </div>

      <button id="btnGenerate" class="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer">
        <span id="btnText">📥 .pptx 파워포인트 파일 생성 & 다운로드</span>
      </button>
      <p id="statusMsg" class="text-center text-xs text-slate-400 font-medium hidden"></p>
    </div>

    <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
      <p class="font-bold text-amber-300">💡 포함되는 슬라이드 구성:</p>
      <ul class="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
        <li>슬라이드 1: 프리미엄 다크 네이비 테마 타이틀 표지</li>
        <li>슬라이드 2: 핵심 요약 (3대 전략 카드)</li>
        <li>슬라이드 3: 기대효과 및 향후 로드맵</li>
        <li>슬라이드 4: Q&A 및 감사합니다 엔딩</li>
      </ul>
    </div>
  </div>

  <script>
    document.getElementById('btnGenerate').addEventListener('click', async () => {
      const btn = document.getElementById('btnGenerate');
      const btnText = document.getElementById('btnText');
      const statusMsg = document.getElementById('statusMsg');

      try {
        if (typeof PptxGenJS === 'undefined') {
          alert('PptxGenJS 라이브러리를 불러오는 중입니다. 2초 후 다시 눌러주세요.');
          return;
        }

        btnText.innerText = '⏳ PPT 파일 빌드 및 다운로드 중...';
        btn.disabled = true;
        statusMsg.classList.remove('hidden');
        statusMsg.innerText = '파워포인트 XML 구조를 패키징하고 있습니다...';

        const title = document.getElementById('pptTitle').value || 'AI 바이브코딩 프레젠테이션';
        const author = document.getElementById('pptAuthor').value || '바이브코더';

        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_WIDE';

        // Slide 1: Cover
        const slide1 = pptx.addSlide();
        slide1.background = { color: '0F172A' };
        slide1.addText(title, {
          x: 1.0, y: 2.2, w: 11.3, h: 1.8,
          fontSize: 34, bold: true, color: 'FFFFFF'
        });
        slide1.addText('Prepared by ' + author, {
          x: 1.0, y: 4.2, w: 11.3, h: 0.8,
          fontSize: 18, color: '38BDF8'
        });

        // Slide 2: Key Points
        const slide2 = pptx.addSlide();
        slide2.background = { color: 'FFFFFF' };
        slide2.addText('Executive Summary', { x: 0.8, y: 0.6, fontSize: 24, bold: true, color: '0F172A' });
        
        slide2.addShape(pptx.ShapeType.rect, { x: 0.8, y: 1.8, w: 3.5, h: 4.0, fill: { color: 'F1F5F9' }, line: { color: 'CBD5E1' } });
        slide2.addText('01. 생산성 혁신\\n\\n기존 코딩 대비 개발 시간 80% 단축', { x: 1.0, y: 2.2, w: 3.1, h: 3.2, fontSize: 14, color: '334155' });
        
        slide2.addShape(pptx.ShapeType.rect, { x: 4.8, y: 1.8, w: 3.5, h: 4.0, fill: { color: 'F1F5F9' }, line: { color: 'CBD5E1' } });
        slide2.addText('02. 비전공자 진입\\n\\n자연어 지시어로 전사 직원 자동화 구현', { x: 5.0, y: 2.2, w: 3.1, h: 3.2, fontSize: 14, color: '334155' });

        slide2.addShape(pptx.ShapeType.rect, { x: 8.8, y: 1.8, w: 3.5, h: 4.0, fill: { color: 'F1F5F9' }, line: { color: 'CBD5E1' } });
        slide2.addText('03. 멀티미디어 완성\\n\\nPPT/영상/음악 자동화 파이프라인 완성', { x: 9.0, y: 2.2, w: 3.1, h: 3.2, fontSize: 14, color: '334155' });

        // Slide 3: Ending
        const slide3 = pptx.addSlide();
        slide3.background = { color: '0F172A' };
        slide3.addText('Thank You! Q&A', { x: 1.0, y: 3.0, w: 11.3, h: 1.5, fontSize: 40, bold: true, color: 'F59E0B', align: 'center' });

        await pptx.writeFile({ fileName: title.replace(/\\s+/g, '_') + '.pptx' });
        statusMsg.innerText = '✅ PPT 다운로드 완료! 브라우저 다운로드 폴더를 확인하세요.';
        statusMsg.className = 'text-center text-xs text-emerald-400 font-bold';
      } catch (err) {
        console.error(err);
        statusMsg.innerText = '오류: ' + err.message;
        statusMsg.className = 'text-center text-xs text-rose-400 font-bold';
      } finally {
        btnText.innerText = '📥 .pptx 파워포인트 파일 생성 & 다운로드';
        btn.disabled = false;
      }
    });
  </script>
</body>
</html>`,
    keyActionSteps: [
      'PptxGenJS + JSZip 라이브러리로 브라우저에서 직접 PPT 파이프라인 가동',
      '슬라이드 객체에 텍스트, 카드형 사각형 도형, 브랜드 색상 자동 배치',
      '버튼 한 번에 MS Office / 한글과컴퓨터에서 바로 열리는 .pptx 파일 다운로드!'
    ]
  },
  {
    id: 'music-synth',
    category: 'music',
    categoryLabel: '음악(BGM/사운드)',
    title: '외부 파일 없이 브라우저 Web Audio API로 칩튠/로파이 BGM 작곡 & WAV 다운로드',
    badge: '예술/게임 음향 제작',
    techStack: 'HTML5 + Web Audio API (Oscillator/GainNode) + WAV 인코더',
    painPoint: '게임이나 웹앱을 만들었는데 배경음악(BGM)이나 버튼 효과음이 없어서 밋밋하고 재미가 없음 (저작권 문제도 걱정)',
    solutionSummary: 'mp3 파일 다운로드나 외부 음원 라이선스 걱정 제로! 브라우저 자체 오디오 신디사이저(Web Audio API) 주파수를 코드로 합성하여 감미로운 로파이 코드(Chord)를 연주하고 즉시 .wav 음원 파일로 다운로드!',
    teachingHook: '"여러분, 사운드 파일 1개도 안 넣었는데 웹페이지에서 웅장한 피아노와 비트가 흘러나오고 음원 파일로 다운로드까지 되는 기적을 보여드리겠습니다!"',
    promptToAi: `당신은 웹 오디오 엔지니어 및 사운드 디자이너입니다.
외부 MP3 파일이나 오디오 에셋 다운로드 없이, 100% 브라우저 순수 Web Audio API만을 활용하여 음악을 연주하고 WAV 오디오 파일로 다운로드하는 [인터랙티브 웹 신디사이저]를 만들어주세요.

요구사항:
1. 사운드 프리셋: 감성 로파이 피아노 (Lo-Fi Chords: Cmaj7, Am7, Dm7, G7 아르페지오 루프)
2. 피아노 건반(도~시) 터치 연주
3. [🎵 10초 로파이 음원 WAV 생성 & 다운로드] 버튼: 브라우저에서 직접 10초간의 로파이 음악을 연주 녹음하여 "lofi_bgm.wav" 파일로 즉시 다운로드`,
    sampleCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>바이브 사운드 스튜디오</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white min-h-screen p-4 sm:p-6 font-sans flex flex-col items-center justify-center">
  <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-2xl">
    <div class="space-y-1">
      <span class="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">WEB AUDIO SYNTHESIZER</span>
      <h1 class="text-2xl font-black text-white">🎵 무저작권 BGM 신디사이저</h1>
      <p class="text-xs text-slate-400">외부 파일 없이 주파수 합성 연주 및 WAV 즉시 다운로드!</p>
    </div>

    <!-- Visualizer Display -->
    <div class="h-20 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center">
      <div id="visualizer" class="flex items-end justify-center gap-1.5 h-12 w-full px-8">
        <div class="w-2.5 bg-purple-500 rounded-t h-4 transition-all"></div>
        <div class="w-2.5 bg-indigo-500 rounded-t h-8 transition-all"></div>
        <div class="w-2.5 bg-pink-500 rounded-t h-12 transition-all"></div>
        <div class="w-2.5 bg-cyan-500 rounded-t h-6 transition-all"></div>
        <div class="w-2.5 bg-emerald-500 rounded-t h-10 transition-all"></div>
        <div class="w-2.5 bg-purple-400 rounded-t h-7 transition-all"></div>
      </div>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-2 gap-2">
      <button id="btnLoFi" class="py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer">
        ▶️ 로파이 BGM 연속 재생
      </button>
      <button id="btnStop" class="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer">
        ⏹️ 정지
      </button>
    </div>

    <!-- Download WAV Button -->
    <button id="btnDownloadWav" class="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer">
      <span>💾 5초 로파이 음원 .wav 파일 다운로드</span>
    </button>
    <p id="audioStatus" class="text-[11px] text-slate-400 font-mono"></p>

    <!-- Mini Piano Keys -->
    <div class="pt-2">
      <p class="text-[11px] text-slate-400 mb-2 font-mono">터치 건반으로 직접 소리 내보기</p>
      <div class="flex justify-center gap-1.5">
        <button onclick="playTone(261.63)" class="w-10 h-20 bg-white text-slate-900 font-bold text-xs rounded-b-lg active:bg-purple-200 pt-12 cursor-pointer shadow">도</button>
        <button onclick="playTone(293.66)" class="w-10 h-20 bg-white text-slate-900 font-bold text-xs rounded-b-lg active:bg-purple-200 pt-12 cursor-pointer shadow">레</button>
        <button onclick="playTone(329.63)" class="w-10 h-20 bg-white text-slate-900 font-bold text-xs rounded-b-lg active:bg-purple-200 pt-12 cursor-pointer shadow">미</button>
        <button onclick="playTone(349.23)" class="w-10 h-20 bg-white text-slate-900 font-bold text-xs rounded-b-lg active:bg-purple-200 pt-12 cursor-pointer shadow">파</button>
        <button onclick="playTone(392.00)" class="w-10 h-20 bg-white text-slate-900 font-bold text-xs rounded-b-lg active:bg-purple-200 pt-12 cursor-pointer shadow">솔</button>
        <button onclick="playTone(440.00)" class="w-10 h-20 bg-white text-slate-900 font-bold text-xs rounded-b-lg active:bg-purple-200 pt-12 cursor-pointer shadow">라</button>
        <button onclick="playTone(493.88)" class="w-10 h-20 bg-white text-slate-900 font-bold text-xs rounded-b-lg active:bg-purple-200 pt-12 cursor-pointer shadow">시</button>
      </div>
    </div>
  </div>

  <script>
    let audioCtx = null;
    let loopTimer = null;

    function getAudioContext() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }

    function playTone(freq, duration = 0.5) {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    }

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    let chordIndex = 0;
    document.getElementById('btnLoFi').addEventListener('click', () => {
      clearInterval(loopTimer);
      document.getElementById('audioStatus').innerText = '🎵 로파이 연주 중...';
      loopTimer = setInterval(() => {
        const currentChord = chords[chordIndex % chords.length];
        currentChord.forEach((f, i) => {
          setTimeout(() => playTone(f, 0.7), i * 140);
        });
        chordIndex++;
      }, 1100);
    });

    document.getElementById('btnStop').addEventListener('click', () => {
      clearInterval(loopTimer);
      document.getElementById('audioStatus').innerText = '정지됨';
    });

    // WAV File Generator using OfflineAudioContext
    document.getElementById('btnDownloadWav').addEventListener('click', async () => {
      const status = document.getElementById('audioStatus');
      status.innerText = '⏳ 5초 음악 렌더링 중...';
      
      const sampleRate = 44100;
      const duration = 5;
      const offlineCtx = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

      let time = 0;
      for (let c = 0; c < 4; c++) {
        const chord = chords[c % chords.length];
        chord.forEach((freq, idx) => {
          const osc = offlineCtx.createOscillator();
          const gain = offlineCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time + idx * 0.12);
          gain.gain.setValueAtTime(0.2, time + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.12 + 0.8);
          osc.connect(gain);
          gain.connect(offlineCtx.destination);
          osc.start(time + idx * 0.12);
          osc.stop(time + idx * 0.12 + 0.8);
        });
        time += 1.1;
      }

      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = bufferToWave(renderedBuffer, renderedBuffer.length);
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vibe_lofi_bgm.wav';
      a.click();
      status.innerText = '✅ vibe_lofi_bgm.wav 다운로드 완료!';
    });

    function bufferToWave(abuffer, len) {
      const numOfChan = abuffer.numberOfChannels;
      const length = len * numOfChan * 2 + 44;
      const out = new DataView(new ArrayBuffer(length));
      const channels = [];
      let sample = 0;
      let offset = 0;
      let pos = 0;

      function setUint16(data) { out.setUint16(pos, data, true); pos += 2; }
      function setUint32(data) { out.setUint32(pos, data, true); pos += 4; }

      setUint32(0x46464952); // "RIFF"
      setUint32(length - 8);
      setUint32(0x45564157); // "WAVE"
      setUint32(0x20746d66); // "fmt "
      setUint32(16);
      setUint16(1); // PCM
      setUint16(numOfChan);
      setUint32(abuffer.sampleRate);
      setUint32(abuffer.sampleRate * 2 * numOfChan);
      setUint16(numOfChan * 2);
      setUint16(16);
      setUint32(0x61746164); // "data"
      setUint32(length - pos - 4);

      for (let i = 0; i < abuffer.numberOfChannels; i++) channels.push(abuffer.getChannelData(i));
      while (pos < length) {
        for (let i = 0; i < numOfChan; i++) {
          sample = Math.max(-1, Math.min(1, channels[i][offset]));
          sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
          out.setInt16(pos, sample, true);
          pos += 2;
        }
        offset++;
      }
      return new Blob([out], { type: 'audio/wav' });
    }
  </script>
</body>
</html>`,
    keyActionSteps: [
      'Web Audio API를 이용해 MP3 용량 걱정 및 음원 저작권 완벽 해결',
      '화음(코드) 배열 주파수를 루프로 돌려 분위기 있는 BGM 즉석 연주',
      'OfflineAudioContext로 브라우저 메모리에서 1초 만에 WAV 음원 파일로 인코딩 & 다운로드!'
    ]
  },
  {
    id: 'video-canvas-animator',
    category: 'video',
    categoryLabel: '영상(쇼츠/릴스/자막)',
    title: '텍스트 치면 유튜브 쇼츠/인스타 릴스 9:16 모션 비디오 자동 렌더링 & WebM 다운로드',
    badge: '1인 크리에이터/마케터',
    techStack: 'HTML5 + Canvas 2D + MediaRecorder API (브라우저 영상 인코더)',
    painPoint: '프리미어 프로나 캡컷 켜서 자막 치고 키프레임 잡는 게 너무 귀찮고 시간이 오래 걸림',
    solutionSummary: '브라우저 캔버스(Canvas)의 애니메이션을 브라우저 내장 미디어 레코더(MediaRecorder)로 실시간 캡처하여, 자막이 통통 튀는 9:16 세로형 쇼츠 홍보 영상을 5초 만에 비디오 파일로 다운로드!',
    teachingHook: '"영상 편집 프로그램 1도 안 배웠는데, 문구 3줄 입력하니까 세로 쇼츠 비디오가 렌더링되어 파일로 다운로드되는 기적을 보여드리겠습니다!"',
    promptToAi: `당신은 숏폼 모션그래픽 비디오 엔지니어입니다.
복잡한 프리미어/에프터이펙트 없이 브라우저 자체에서 텍스트 기반 [유튜브 쇼츠 / 인스타그램 릴스 9:16 모션 비디오 생성기] 단일 HTML 웹앱을 만들어주세요.

기술 요구사항:
1. Canvas 2D (270 x 480 해상도, 9:16 세로 비율)
2. MediaRecorder API: 캔버스 렌더링 화면을 실시간 녹화하여 .webm 비디오 파일로 즉시 다운로드
3. 기능:
   - [메인 자막], [강조 문구] 텍스트 입력창
   - 배경: 네이비 그라디언트 및 파티클 애니메이션
   - 텍스트 애니메이션: 자막이 바운스되며 등장
   - [🎥 5초 비디오 렌더링 & 다운로드] 클릭 시: 5초간 30fps로 프레임 기록 ➜ "vibe_shorts.webm" 즉시 다운로드`,
    sampleCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>바이브 숏폼 비디오 생성기</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white min-h-screen p-4 sm:p-6 font-sans flex flex-col items-center justify-center">
  <div class="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
    <div class="text-center space-y-1">
      <span class="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/30">BROWSER VIDEO RENDERER</span>
      <h1 class="text-2xl font-black text-white">🎬 유튜브 쇼츠 모션 비디오 생성기</h1>
      <p class="text-xs text-slate-400">자막만 넣으면 9:16 세로형 홍보 영상이 5초 만에 다운로드!</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
      <!-- 9:16 Canvas Preview -->
      <div class="flex justify-center">
        <canvas id="videoCanvas" width="270" height="480" class="rounded-2xl border-2 border-rose-500/40 shadow-xl bg-slate-950"></canvas>
      </div>

      <!-- Controls -->
      <div class="space-y-3 text-xs">
        <div>
          <label class="font-bold text-slate-300">메인 자막 (Hook)</label>
          <input id="mainText" type="text" value="아직도 야근하세요?" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white mt-1">
        </div>
        <div>
          <label class="font-bold text-slate-300">강조 키워드</label>
          <input id="subText" type="text" value="바이브코딩 10분 마스터" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white mt-1">
        </div>

        <button id="btnRecord" class="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-black rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer">
          <span id="btnRecordText">🎥 5초 비디오 렌더링 & 다운로드</span>
        </button>
        <p id="statusText" class="text-center text-[11px] text-slate-400 font-mono">대기 중...</p>
      </div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('videoCanvas');
    const ctx = canvas.getContext('2d');
    let frame = 0;

    function render() {
      frame++;
      const main = document.getElementById('mainText').value || '';
      const sub = document.getElementById('subText').value || '';

      // Background Gradient Animation
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating Glow Circle
      ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2 + Math.sin(frame * 0.05) * 30, 80, 0, Math.PI * 2);
      ctx.fill();

      // Main Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(main, canvas.width / 2, 200 + Math.sin(frame * 0.08) * 8);

      // Sub Text Highlight
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(sub, canvas.width / 2, 260);

      // Watermark
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px monospace';
      ctx.fillText('CREATED WITH VIBEPILOT', canvas.width / 2, 450);

      requestAnimationFrame(render);
    }
    render();

    // Video Recording via MediaRecorder
    document.getElementById('btnRecord').addEventListener('click', () => {
      const btn = document.getElementById('btnRecord');
      const btnText = document.getElementById('btnRecordText');
      const status = document.getElementById('statusText');

      if (!canvas.captureStream) {
        alert('현재 브라우저가 Canvas 녹화를 지원하지 않습니다. 크롬 브라우저를 이용해주세요.');
        return;
      }

      btn.disabled = true;
      btnText.innerText = '🔴 영상 녹화 중... (5초)';
      status.innerText = '프레임을 캡처하고 있습니다...';
      status.className = 'text-center text-[11px] text-rose-400 font-bold animate-pulse';

      try {
        const stream = canvas.captureStream(30);
        let mimeType = 'video/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = ''; // 브라우저 기본 포맷 사용
        }
        const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
        const chunks = [];

        recorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType || 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'vibe_shorts.webm';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          
          btn.disabled = false;
          btnText.innerText = '🎥 5초 비디오 렌더링 & 다운로드';
          status.innerText = '✅ 다운로드 완료! vibe_shorts.webm을 확인하세요.';
          status.className = 'text-center text-[11px] text-emerald-400 font-bold';
        };

        recorder.start();
        setTimeout(() => recorder.stop(), 5000);
      } catch (err) {
        console.error(err);
        btn.disabled = false;
        btnText.innerText = '🎥 5초 비디오 렌더링 & 다운로드';
        status.innerText = '녹화 오류: ' + err.message;
        status.className = 'text-center text-[11px] text-rose-400 font-bold';
      }
    });
  </script>
</body>
</html>`,
    keyActionSteps: [
      'Canvas 2D로 9:16 모바일 쇼츠 비율(인스타/틱톡/유튜브)의 모션 그래픽 렌더링',
      'MediaRecorder API로 렌더링되는 화면을 브라우저 메모리에서 실시간 비디오 녹화',
      '버튼 한 번에 .webm 비디오 파일로 다운로드하여 SNS에 즉시 업로드!'
    ]
  }
];
