export const DEFAULT_SALARY_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2026 연봉 실수령액 계산기</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Pretendard', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 sm:p-8 flex items-center justify-center">
  <div class="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
    
    <div class="flex items-center justify-between border-b border-slate-800/80 pb-4">
      <div>
        <span class="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          2026 대한민국 최신 요율
        </span>
        <h1 class="text-2xl font-black text-white mt-1">급여 & 실수령액 계산기</h1>
      </div>
      <span class="text-2xl">💰</span>
    </div>

    <!-- Type Switcher -->
    <div class="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
      <button id="btnAnnual" class="py-2.5 text-xs font-bold rounded-xl bg-emerald-500 text-slate-950 transition-all shadow">
        연봉 기준
      </button>
      <button id="btnMonthly" class="py-2.5 text-xs font-bold rounded-xl text-slate-400 hover:text-white transition-all">
        월급 기준
      </button>
    </div>

    <!-- Input Field -->
    <div class="space-y-2">
      <label class="text-xs font-semibold text-slate-400 flex justify-between">
        <span id="salaryLabel">희망 연봉 (원)</span>
        <span class="text-emerald-400 font-mono" id="formattedPreview">50,000,000원</span>
      </label>
      <div class="relative">
        <input 
          type="number" 
          id="salaryInput" 
          value="50000000" 
          step="1000000"
          class="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-emerald-500 font-mono"
        />
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">원</span>
      </div>
    </div>

    <!-- Result Banner -->
    <div class="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-5 text-center space-y-1">
      <p class="text-xs text-slate-400">예상 월 실수령액 (세후)</p>
      <p class="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight" id="takeHomePay">
        3,524,190원
      </p>
      <p class="text-[11px] text-slate-500" id="totalDeductionText">
        월 공제합계: 약 642,470원
      </p>
    </div>

    <!-- Deductions Breakdown -->
    <div class="space-y-2.5 pt-2">
      <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">월별 4대보험 및 세금 공제 상세</p>
      
      <div class="space-y-2 text-xs font-mono">
        <div class="flex justify-between items-center p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span class="text-slate-300">국민연금 (4.5%)</span>
          <span class="font-bold text-slate-200" id="dedNp">187,500원</span>
        </div>
        <div class="flex justify-between items-center p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span class="text-slate-300">건강보험 (3.545%)</span>
          <span class="font-bold text-slate-200" id="dedHi">147,700원</span>
        </div>
        <div class="flex justify-between items-center p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span class="text-slate-300">고용보험 (0.9%)</span>
          <span class="font-bold text-slate-200" id="dedEi">37,500원</span>
        </div>
        <div class="flex justify-between items-center p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span class="text-slate-300">근로소득세 + 지방소득세 (추정)</span>
          <span class="font-bold text-slate-200" id="dedTax">269,770원</span>
        </div>
      </div>
    </div>

  </div>

  <script>
    let isAnnual = true;
    const salaryInput = document.getElementById('salaryInput');
    const salaryLabel = document.getElementById('salaryLabel');
    const formattedPreview = document.getElementById('formattedPreview');
    const takeHomePay = document.getElementById('takeHomePay');
    const totalDeductionText = document.getElementById('totalDeductionText');
    const btnAnnual = document.getElementById('btnAnnual');
    const btnMonthly = document.getElementById('btnMonthly');

    const dedNp = document.getElementById('dedNp');
    const dedHi = document.getElementById('dedHi');
    const dedEi = document.getElementById('dedEi');
    const dedTax = document.getElementById('dedTax');

    function fmt(num) {
      return Math.round(num).toLocaleString('ko-KR') + '원';
    }

    function calculate() {
      const val = parseFloat(salaryInput.value) || 0;
      formattedPreview.textContent = fmt(val);

      const monthlyGross = isAnnual ? (val / 12) : val;
      const nonTaxable = 200000; // 20만원 식대 비과세
      const taxable = Math.max(0, monthlyGross - nonTaxable);

      // 4대보험 요율
      const np = Math.min(taxable * 0.045, 265500); // 국민연금 상한
      const hi = taxable * 0.03545; // 건강보험
      const lt = hi * 0.1295; // 장기요양보험
      const ei = taxable * 0.009; // 고용보험

      // 간이 세액 추정
      let incomeTax = 0;
      if (taxable > 6000000) incomeTax = taxable * 0.16;
      else if (taxable > 4000000) incomeTax = taxable * 0.09;
      else if (taxable > 2500000) incomeTax = taxable * 0.04;
      else incomeTax = taxable * 0.015;

      const localTax = incomeTax * 0.1;
      const totalTax = incomeTax + localTax;

      const totalDeductions = np + hi + lt + ei + totalTax;
      const net = Math.max(0, monthlyGross - totalDeductions);

      takeHomePay.textContent = fmt(net);
      totalDeductionText.textContent = '월 공제합계: 약 ' + fmt(totalDeductions);
      dedNp.textContent = fmt(np);
      dedHi.textContent = fmt(hi + lt);
      dedEi.textContent = fmt(ei);
      dedTax.textContent = fmt(totalTax);
    }

    btnAnnual.addEventListener('click', () => {
      isAnnual = true;
      btnAnnual.className = 'py-2.5 text-xs font-bold rounded-xl bg-emerald-500 text-slate-950 transition-all shadow';
      btnMonthly.className = 'py-2.5 text-xs font-bold rounded-xl text-slate-400 hover:text-white transition-all';
      salaryLabel.textContent = '희망 연봉 (원)';
      salaryInput.value = 50000000;
      calculate();
    });

    btnMonthly.addEventListener('click', () => {
      isAnnual = false;
      btnMonthly.className = 'py-2.5 text-xs font-bold rounded-xl bg-emerald-500 text-slate-950 transition-all shadow';
      btnAnnual.className = 'py-2.5 text-xs font-bold rounded-xl text-slate-400 hover:text-white transition-all';
      salaryLabel.textContent = '월 기본급 (원)';
      salaryInput.value = 4000000;
      calculate();
    });

    salaryInput.addEventListener('input', calculate);
    calculate();
  </script>
</body>
</html>`;

export const DEFAULT_TIMER_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>강의실 수업 타이머 & 룰렛</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6 select-none font-sans">
  <div class="max-w-2xl w-full text-center space-y-8">
    <div class="inline-block px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold tracking-widest">
      CLASSROOM VIBE TIMER
    </div>

    <!-- Timer Numbers -->
    <div id="timeDisplay" class="text-7xl sm:text-9xl font-black font-mono tracking-tighter text-cyan-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
      10:00
    </div>

    <!-- Presets -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <button onclick="setTime(1)" class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold hover:border-cyan-500 text-slate-300">1분</button>
      <button onclick="setTime(3)" class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold hover:border-cyan-500 text-slate-300">3분</button>
      <button onclick="setTime(5)" class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold hover:border-cyan-500 text-slate-300">5분 실습</button>
      <button onclick="setTime(10)" class="px-3 py-1.5 bg-cyan-950/50 border border-cyan-500/50 rounded-lg text-xs font-bold text-cyan-300">10분 휴식</button>
      <button onclick="setTime(15)" class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold hover:border-cyan-500 text-slate-300">15분 코딩</button>
      <button onclick="setTime(25)" class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold hover:border-cyan-500 text-slate-300">25분 뽀모도로</button>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-center gap-4">
      <button id="toggleBtn" onclick="toggleTimer()" class="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/30">
        시작
      </button>
      <button onclick="resetTimer()" class="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-sm rounded-xl">
        초기화
      </button>
    </div>

    <!-- Student Picker Section -->
    <div class="mt-8 border-t border-slate-900 pt-6 max-w-md mx-auto space-y-3">
      <p class="text-xs text-slate-500 font-bold uppercase tracking-wider">🎯 오늘 발표자 랜덤 뽑기</p>
      <div id="pickerResult" class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xl font-bold text-amber-400 min-h-[56px] flex items-center justify-center">
        발표자 대기 중...
      </div>
      <button onclick="pickStudent()" class="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg transition-all">
        수강생 랜덤 지목하기 🎲
      </button>
    </div>
  </div>

  <script>
    let totalSec = 600;
    let remainSec = 600;
    let timerId = null;
    const students = ['김민준', '이서연', '박도현', '정수빈', '최예은', '한준우', '윤지아', '송민재', '임하늘'];

    function updateDisplay() {
      const m = Math.floor(remainSec / 60);
      const s = remainSec % 60;
      document.getElementById('timeDisplay').innerText = 
        String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    function setTime(min) {
      clearInterval(timerId);
      timerId = null;
      document.getElementById('toggleBtn').innerText = '시작';
      totalSec = min * 60;
      remainSec = totalSec;
      updateDisplay();
    }

    function toggleTimer() {
      const btn = document.getElementById('toggleBtn');
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
        btn.innerText = '계속';
      } else {
        btn.innerText = '일시정지';
        timerId = setInterval(() => {
          if (remainSec > 0) {
            remainSec--;
            updateDisplay();
          } else {
            clearInterval(timerId);
            timerId = null;
            btn.innerText = '완료!';
            beep();
          }
        }, 1000);
      }
    }

    function resetTimer() {
      clearInterval(timerId);
      timerId = null;
      document.getElementById('toggleBtn').innerText = '시작';
      remainSec = totalSec;
      updateDisplay();
    }

    function beep() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } catch(e) {}
    }

    function pickStudent() {
      const res = document.getElementById('pickerResult');
      let count = 0;
      const interval = setInterval(() => {
        const rand = students[Math.floor(Math.random() * students.length)];
        res.innerText = rand + ' 님 당첨!';
        count++;
        if (count > 15) {
          clearInterval(interval);
          res.classList.add('scale-105', 'border-amber-400');
        }
      }, 70);
    }

    updateDisplay();
  </script>
</body>
</html>`;
