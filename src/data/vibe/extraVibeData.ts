export interface GamePreset {
  id: string;
  title: string;
  genre: string;
  playTime: string;
  summary: string;
  prompt: string;
  sampleHtml: string;
}

export const GAME_PRESETS: GamePreset[] = [
  {
    id: 'game-reaction',
    title: '번개 반응속도 테스트 ⚡',
    genre: '아케이드/순발력',
    playTime: '1분',
    summary: '빨간 화면이 초록색으로 변하는 순간 광클! 내 반응속도(ms)와 등급(치타/고양이/거북이)을 측정하는 중독성 게임',
    prompt: `단일 HTML 파일로 브라우저 [반응속도 테스트 게임]을 만들어주세요.
기술: HTML5, Tailwind CSS, Vanilla JS
요구사항:
1. 시작 화면은 빨간색 대기 화면 ("초록색이 되면 즉시 클릭하세요").
2. 2초~5초 사이 무작위(랜덤) 타이머 후 화면이 밝은 네온 초록색으로 번쩍 바뀌며 시간 카운트 시작.
3. 초록색 전에 누르면 "너무 빨랐습니다! 부정출발 ⚠️" 경고 및 재시작.
4. 초록색 이후 클릭 시 걸린 시간(밀리초, ms) 표시:
   - < 200ms: ⚡ 초인간급 치타
   - 200~280ms: 🏃 민첩한 고양이
   - 280~380ms: 🚶 보통 사람
   - > 380ms: 🐢 잠자는 거북이
5. 최고 기록(Best Record) 로컬스토리지 저장 및 재도전 버튼 제공.`,
    sampleHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>반응속도 테스트</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4 select-none font-sans">
  <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-6 shadow-2xl">
    <div class="space-y-1">
      <span class="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">VIBE MINI GAME</span>
      <h1 class="text-2xl font-black text-white">⚡ 번개 반응속도 측정기</h1>
    </div>

    <!-- Click Canvas / Box -->
    <div id="targetBox" class="h-64 rounded-2xl bg-rose-600 flex flex-col items-center justify-center cursor-pointer transition-colors p-4 border-2 border-white/20">
      <p id="boxText" class="text-xl font-black text-white drop-shadow">화면을 눌러 시작하세요</p>
      <p id="subText" class="text-xs text-white/80 mt-2">초록색으로 바뀌는 순간 광클!</p>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-400 px-2 font-mono">
      <span>최고 기록: <strong id="bestRecord" class="text-emerald-400">-</strong></span>
      <span>시도 횟수: <strong id="tryCount" class="text-white">0</strong></span>
    </div>
  </div>

  <script>
    const box = document.getElementById('targetBox');
    const boxText = document.getElementById('boxText');
    const subText = document.getElementById('subText');
    const bestRecord = document.getElementById('bestRecord');
    const tryCount = document.getElementById('tryCount');

    let state = 'waiting'; // waiting, ready, click, result
    let timer = null;
    let startTime = 0;
    let count = 0;
    let best = localStorage.getItem('vibe_best_react') || null;
    if (best) bestRecord.innerText = best + ' ms';

    box.addEventListener('click', () => {
      if (state === 'waiting' || state === 'result') {
        state = 'ready';
        box.className = 'h-64 rounded-2xl bg-rose-600 flex flex-col items-center justify-center cursor-pointer p-4 border-2 border-white/20';
        boxText.innerText = '🔴 초록색을 기다리세요...';
        subText.innerText = '아직 누르지 마세요!';
        
        const delay = Math.floor(Math.random() * 3000) + 1500;
        timer = setTimeout(() => {
          state = 'click';
          startTime = Date.now();
          box.className = 'h-64 rounded-2xl bg-emerald-500 flex flex-col items-center justify-center cursor-pointer p-4 border-2 border-white/40 shadow-[0_0_40px_rgba(16,185,129,0.5)]';
          boxText.innerText = '🟢 지금 바로 클릭!!';
          subText.innerText = '광클하세요!';
        }, delay);

      } else if (state === 'ready') {
        clearTimeout(timer);
        state = 'result';
        box.className = 'h-64 rounded-2xl bg-amber-500 flex flex-col items-center justify-center cursor-pointer p-4 border-2 border-white/20';
        boxText.innerText = '⚠️ 부정 출발!';
        subText.innerText = '초록색으로 바뀌기 전에 눌렀습니다. 클릭하여 재도전';

      } else if (state === 'click') {
        const ms = Date.now() - startTime;
        state = 'result';
        count++;
        tryCount.innerText = count;

        let rank = '🐢 잠자는 거북이';
        if (ms < 200) rank = '⚡ 초인간급 치타!';
        else if (ms < 270) rank = '🏃 민첩한 고양이';
        else if (ms < 350) rank = '🚶 평범한 사람';

        if (!best || ms < best) {
          best = ms;
          localStorage.setItem('vibe_best_react', best);
          bestRecord.innerText = best + ' ms';
        }

        box.className = 'h-64 rounded-2xl bg-indigo-600 flex flex-col items-center justify-center cursor-pointer p-4 border-2 border-white/20';
        boxText.innerHTML = \`<span class="text-4xl font-mono">\${ms} ms</span><br><span class="text-sm mt-2 block">\${rank}</span>\`;
        subText.innerText = '다시 하려면 클릭하세요';
      }
    });
  </script>
</body>
</html>`
  },
  {
    id: 'game-snake',
    title: '레트로 픽셀 스네이크(Snake) 🐍',
    genre: '클래식 레트로',
    playTime: '3분',
    summary: '방향키로 사과를 먹을수록 뱀이 길어지는 오락실 감성 클래식 게임. 충돌 감지와 점수판 구현',
    prompt: `단일 HTML 파일로 향수를 자극하는 [네온 픽셀 스네이크 게임]을 작성해주세요.
1. 20x20 그리드 캔버스 기반 뱀 이동 및 키보드 화살표 방향 조작
2. 빨간 사과를 먹으면 뱀 길이가 늘어나고 스코어 +10점 획득
3. 모바일 사용자를 위해 화면 하단에 터치 가능한 [상/하/좌/우] 가상 컨트롤러 패드 제공
4. 벽이나 자기 꼬리에 부딪히면 게임오버 팝업 및 최고 점수 갱신
5. 네온 사이버펑크 스타일 다크 UI로 구현해주세요.`,
    sampleHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>네온 스네이크 게임</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans select-none">
  <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 text-center space-y-4 shadow-2xl">
    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
      <h1 class="text-lg font-black text-emerald-400">🐍 NEON SNAKE</h1>
      <div class="font-mono text-xs text-slate-300">SCORE: <span id="scoreText" class="text-emerald-400 font-bold text-sm">0</span></div>
    </div>

    <!-- Canvas -->
    <div class="flex justify-center">
      <canvas id="gameCanvas" width="300" height="300" class="bg-slate-950 border-2 border-emerald-500/40 rounded-xl shadow-lg"></canvas>
    </div>

    <!-- Mobile Virtual Pad -->
    <div class="pt-2 max-w-[200px] mx-auto space-y-1">
      <button onclick="changeDir('UP')" class="w-12 h-10 bg-slate-800 rounded-lg text-slate-200 font-bold hover:bg-slate-700 active:scale-95">▲</button>
      <div class="flex justify-between">
        <button onclick="changeDir('LEFT')" class="w-12 h-10 bg-slate-800 rounded-lg text-slate-200 font-bold hover:bg-slate-700 active:scale-95">◀</button>
        <button onclick="changeDir('DOWN')" class="w-12 h-10 bg-slate-800 rounded-lg text-slate-200 font-bold hover:bg-slate-700 active:scale-95">▼</button>
        <button onclick="changeDir('RIGHT')" class="w-12 h-10 bg-slate-800 rounded-lg text-slate-200 font-bold hover:bg-slate-700 active:scale-95">▶</button>
      </div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 15;
    const tileCount = 20;

    let snake = [{x: 10, y: 10}];
    let food = {x: 5, y: 5};
    let dx = 1, dy = 0;
    let score = 0;
    let gameLoop = null;

    function draw() {
      // Move snake
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};

      // Wall Collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return resetGame();
      }

      // Self Collision
      for (let s of snake) {
        if (s.x === head.x && s.y === head.y) return resetGame();
      }

      snake.unshift(head);

      // Eat Food
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('scoreText').innerText = score;
        spawnFood();
      } else {
        snake.pop();
      }

      // Clear Screen
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Food
      ctx.fillStyle = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ef4444';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

      // Draw Snake
      ctx.fillStyle = '#10b981';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#10b981';
      snake.forEach((part, index) => {
        if (index === 0) ctx.fillStyle = '#34d399';
        else ctx.fillStyle = '#10b981';
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
      });
    }

    function spawnFood() {
      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
    }

    function resetGame() {
      alert('💥 게임 오버! 최종 점수: ' + score + '점');
      snake = [{x: 10, y: 10}];
      dx = 1; dy = 0;
      score = 0;
      document.getElementById('scoreText').innerText = score;
      spawnFood();
    }

    function changeDir(dir) {
      if (dir === 'UP' && dy === 0) { dx = 0; dy = -1; }
      if (dir === 'DOWN' && dy === 0) { dx = 0; dy = 1; }
      if (dir === 'LEFT' && dx === 0) { dx = -1; dy = 0; }
      if (dir === 'RIGHT' && dx === 0) { dx = 1; dy = 0; }
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') changeDir('UP');
      if (e.key === 'ArrowDown') changeDir('DOWN');
      if (e.key === 'ArrowLeft') changeDir('LEFT');
      if (e.key === 'ArrowRight') changeDir('RIGHT');
    });

    gameLoop = setInterval(draw, 120);
  </script>
</body>
</html>`
  }
];

export interface CursorShortcut {
  key: string;
  action: string;
  situation: string;
  tip: string;
}

export const CURSOR_SHORTCUTS: CursorShortcut[] = [
  {
    key: 'Ctrl + K  (Mac: ⌘ + K)',
    action: '코드 인라인 편집 (Inline Edit)',
    situation: '에디터에서 특정 함수나 HTML 태그를 블록 지정하고 이 키를 누르면 AI 입력창 생성',
    tip: '"이 버튼 클릭 시 소리 나게 해줘" 라고 쓰면 그 부분만 마법처럼 즉시 수정됨'
  },
  {
    key: 'Ctrl + L  (Mac: ⌘ + L)',
    action: 'AI 사이드바 채팅 (Composer Chat)',
    situation: '코드 전체를 분석하거나 새로운 컴포넌트를 설계하고 질문할 때',
    tip: '에러 로그 전체를 붙여넣고 질문하기 가장 좋은 메인 대화창'
  },
  {
    key: 'Ctrl + I  (Mac: ⌘ + I)',
    action: '컴포저 전체 프로젝트 생성 (Composer)',
    situation: '파일 여러 개를 한 번에 새로 만들거나 프로젝트 구조 전체를 리팩토링할 때',
    tip: '바이브코딩의 진정한 궁극기. "3개 파일 연동해서 로그인 기능 만들어줘" 가능'
  },
  {
    key: '@Web  (또는 @Docs)',
    action: '최신 인터넷 웹 검색 참조',
    situation: '2026년 최신 라이브러리 문법이나 공식 문서를 AI에게 주입할 때',
    tip: '할루시네이션(거짓말)을 0%로 줄여주는 필살기 명령어'
  }
];
