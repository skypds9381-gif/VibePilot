export interface VibeChallenge {
  id: string;
  level: '입문' | '중급' | '실전 프로젝트';
  title: string;
  category: '웹앱' | '데이터/엑셀' | '파이썬 자동화' | '인터랙티브 UI';
  timeEstimate: string;
  summary: string;
  instructorNote: string;
  vibeFormula: {
    role: string;
    goal: string;
    techStack: string;
    keyFeatures: string[];
    designVibe: string;
    constraints: string[];
  };
  sampleStarterCode?: string;
  quickPrompt: string;
}

export const VIBE_CURRICULUM: VibeChallenge[] = [
  {
    id: 'challenge-1',
    level: '입문',
    title: '스마트 직장인 급여 & 실수령액 계산기',
    category: '웹앱',
    timeEstimate: '10분 완성',
    summary: '자연어 3문장으로 4대보험, 소득세율, 세후 실수령액을 깔끔한 원형 차트와 함께 산출하는 모던 웹앱 빌드하기',
    instructorNote: '수강생들에게 "자료형이나 switch문을 몰라도 요구사항만 명확하면 AI가 계산 로직과 UI를 한 번에 짠다"는 것을 보여주는 최고의 첫걸음 실습입니다.',
    vibeFormula: {
      role: '시니어 풀스택 프론트엔드 엔지니어 및 UX 디자이너',
      goal: '2026년 대한민국 4대보험 요율(국민연금 4.5%, 건강보험 3.545% 등)이 적용된 연봉/월급 실수령액 계산기 단일 HTML 웹앱',
      techStack: 'HTML5, Tailwind CSS (CDN), Vanilla JavaScript',
      keyFeatures: [
        '연봉 또는 월급 입력 필드 (천 단위 콤마 자동 포맷)',
        '비과세액 설정 (기본 20만원 식대)',
        '부양가족 수 및 20세 이하 자녀 수 옵션',
        '실수령액 대형 강조 뱃지 및 공제액 항목별 막대 게이지',
        '원클릭 계산서 텍스트 복사 기능'
      ],
      designVibe: '다크 슬레이트 캔버스, 금융 핀테크 스타일의 에메랄드/사파이어 포인트 컬러, 탭 스위처',
      constraints: [
        '외부 복잡한 라이브러리 없이 CDN 단일 파일로 동작할 것',
        '입력값 변경 즉시 실시간으로 재계산될 것'
      ]
    },
    quickPrompt: `당신은 시니어 프론트엔드 개발자입니다.
2026년 한국 4대보험(국민연금 4.5%, 건강보험 3.545%, 장기요양, 고용보험 0.9%) 및 간이세액표를 반영한 [급여 실수령액 계산기 웹앱]을 만들어주세요.
기술: HTML, Tailwind CSS, 순수 자바스크립트 단일 파일
디자인: 토스(Toss) 스타일의 깔끔하고 세련된 카드 UI, 슬레이트 배경, 에메랄드 강조색
기능:
1. 연봉/월급 라디오 토글 선택
2. 금액 입력 시 실시간 천단위 콤마 포맷팅
3. 공제 항목(국민연금, 건강보험, 고용보험, 근로소득세, 지방소득세) 상세 테이블 및 총 실수령액 표시
4. 바로 브라우저에서 실행 가능한 완성된 단일 HTML 코드로 작성해주세요.`
  },
  {
    id: 'challenge-2',
    level: '입문',
    title: '강사용 수업 집중 타이머 & 자리 룰렛',
    category: '인터랙티브 UI',
    timeEstimate: '12분 완성',
    summary: '강의실 빔프로젝터에 띄울 대형 네온 타이머, 배경 사운드 토글, 학생 발표자 랜덤 뽑기 룰렛',
    instructorNote: '강사님이 직접 실제 강의실에서 켜놓고 쓰실 수 있는 도구입니다. "내 수업에 필요한 도구를 10분 만에 내가 만든다"는 바이브코딩의 진수를 체감시킵니다.',
    vibeFormula: {
      role: '인터랙티브 웹 디렉터 & 사운드/모션 디자이너',
      goal: '프로젝터 빔에 최적화된 강의실용 올인원 실습 타이머 & 학생 발표 추첨기',
      techStack: 'HTML5 Canvas, Web Audio API, Tailwind CSS, Lucide Icons',
      keyFeatures: [
        '1분/3분/5분/10분/15분/25분(뽀모도로) 퀵 프리셋 버튼',
        '원형 프로그레스 링과 남은 시간 대형 디지털 폰트 표기',
        '타이머 종료 시 브라우저 내장 오디오 비프음 및 색상 점멸',
        '수강생 명단 텍스트 영역에 넣고 [랜덤 뽑기] 누르면 회전 애니메이션 후 축하 효과'
      ],
      designVibe: '사이버펑크 다크 네온 or 미니멀 스튜디오 블랙, 거대한 가독성 높은 숫자',
      constraints: [
        '전체화면(F11) 전환 토글 지원',
        '웹 오디오 API로 외부 mp3 파일 없이 자체 신디사이저 알림음 생성'
      ]
    },
    quickPrompt: `컴퓨터 강의실에서 빔프로젝터로 띄울 [인터랙티브 수업 타이머 & 랜덤 수강생 추첨기] 웹앱을 만들어주세요.
기술: 단일 HTML + Tailwind CSS + Vanilla JS (Web Audio API 내장음)
요구사항:
1. 화면 전체를 채우는 대형 디지털 카운트다운 타이머 (원형 게이지 포함)
2. 5분/10분/15분/30분 원클릭 프리셋 버튼 및 시작/일시정지/리셋 컨트롤
3. 종료 시 Web Audio API로 신시사이저 차임벨 소리 재생
4. 우측 서브패널: 학생 이름들을 줄바꿈으로 적어두고 [발표자 뽑기] 누르면 슬롯머신처럼 이름이 롤링되다 한 명이 뽑히는 룰렛 기능
5. 다크 모드 기반의 고대비 폰트로 먼 거리에서도 잘 보이게 해주세요.`
  },
  {
    id: 'challenge-3',
    level: '중급',
    title: '엑셀 CSV/XLSX 브라우저 즉석 분석기 & 피벗 차트',
    category: '데이터/엑셀',
    timeEstimate: '15분 완성',
    summary: '엑셀 프로그램이 안 깔려 있어도 CSV/엑셀 파일을 드래그하면 즉시 표로 띄우고 통계와 인터랙티브 막대 차트를 뽑아주는 데이터 도구',
    instructorNote: '엑셀/컴활 수강생들에게 "파이썬 데이터 분석이나 웹 대시보드가 엑셀과 어떻게 연결되는지" 직관적으로 연결해 주는 최고의 시각화 프로젝트입니다.',
    vibeFormula: {
      role: '데이터 시각화 엔지니어 (Data Visualization Specialist)',
      goal: '브라우저 로컬에서 안전하게 동작하는 클라이언트 사이드 엑셀/CSV 뷰어 및 차트 생성기',
      techStack: 'PapaParse, Chart.js (CDN), Tailwind CSS, SheetJS(xlsx)',
      keyFeatures: [
        '파일 드래그 앤 드롭 업로드 존 (서버 전송 없이 브라우저 메모리 파싱)',
        '스프레드시트 형태의 반응형 데이터 테이블 (정렬, 실시간 검색, 페이징)',
        '수치형 열(Column) 자동 감지하여 평균, 합계, 최대/최소 통계 카드 노출',
        '원클릭 바 차트 & 도넛 차트 즉시 시각화'
      ],
      designVibe: '노션(Notion) / 에어테이블(Airtable) 감성의 깔끔한 모던 데이터 그리드',
      constraints: [
        '개인정보 보호를 위해 서버 업로드 절대 없이 100% 클라이언트 JS로만 처리',
        '샘플 판매 데이터셋 원클릭 로드 버튼 제공'
      ]
    },
    quickPrompt: `브라우저에서 엑셀(XLSX)이나 CSV 파일을 드래그 앤 드롭하면 즉시 인터랙티브 대시보드로 변환해주는 단일 HTML 웹앱을 개발해주세요.
기술: SheetJS(xlsx.full.min.js), Chart.js CDN, Tailwind CSS, Lucide 아이콘
핵심 기능:
1. 파일 드롭존 + "샘플 매출 데이터 불러오기" 버튼
2. 업로드 시 첫 행을 헤더로 인식하고 깔끔한 데이터 그리드 렌더링
3. 상단에 데이터 총 행 수, 숫자 컬럼들의 합계 및 평균 통계 요약 카드 4개 자동 생성
4. 원하는 컬럼을 골라 즉시 막대 차트(Bar Chart)와 파이 차트로 변환하는 드롭다운
5. 서버 없이 브라우저 단에서 100% 동작하는 단일 파일 코드를 주세요.`
  },
  {
    id: 'challenge-4',
    level: '실전 프로젝트',
    title: '파이썬 초보자 알고리즘 비주얼라이저 (버블정렬 & 스택)',
    category: '파이썬 자동화',
    timeEstimate: '20분 완성',
    summary: '파이썬으로 코딩했던 정렬과 스택/큐 구조가 브라우저에서 색색의 블록으로 움직이며 작동하는 인터랙티브 학습기',
    instructorNote: '파이썬 입문자들이 가장 머리 아파하는 반복문과 리스트 교환(swap)을 시각적으로 완전히 깨치게 만드는 프로젝트입니다.',
    vibeFormula: {
      role: '컴퓨터 사이언스 교육 공학자 및 프론트엔드 애니메이터',
      goal: '정렬 알고리즘(버블, 선택, 삽입)과 자료구조(Stack/Queue)의 동작을 단계별로 보여주는 시각화 시뮬레이터',
      techStack: 'HTML5, CSS Animations, Canvas / Flexbox, Vanilla JavaScript',
      keyFeatures: [
        '랜덤 배열 생성기 (막대 높이로 숫자 표현)',
        '재생, 일시정지, 1단계 전진(Step), 속도 조절 슬라이더',
        '현재 비교 중인 두 막대는 빨간색/노란색 하이라이트 및 위치 교환 애니메이션',
        '하단에 파이썬 의사코드(Pseudocode)가 실시간으로 현재 실행 줄에 하이라이트'
      ],
      designVibe: 'VS Code 다크 테마 감성, 직관적인 제어 바, 초당 프레임 및 비교 횟수 카운터',
      constraints: [
        '비동기 async/await sleep을 사용하여 부드러운 스텝 전환 구현',
        '비전공자도 "아! 이게 for문 안에서 swap 되는 거구나" 알 수 있게 설명 박스 연동'
      ]
    },
    quickPrompt: `컴퓨터 입문 수강생을 위한 [버블 정렬(Bubble Sort) 인터랙티브 시각화 시뮬레이터] 단일 HTML 웹앱을 만들어주세요.
기술: HTML, Tailwind CSS, Vanilla JS
요구사항:
1. 10~20개의 랜덤 높이를 가진 막대 그래프 렌더링
2. [시작], [일시정지], [한 단계씩(Step)], [새로 섞기] 버튼
3. 정렬 진행 시 현재 비교 중인 두 막대를 노란색/빨간색으로 표시하고, 값이 바뀌면 부드러운 CSS transition으로 위치 이동
4. 완료된 막대는 초록색으로 변경
5. 우측 패널에 실제 Python 버블정렬 코드(for i in range... if arr[j] > arr[j+1])를 보여주고, 현재 실행 중인 코드 라인에 형광펜 표시
6. 모던 다크 테마로 완성도 높은 단일 코드를 작성해주세요.`
  }
];

export interface PromptPreset {
  id: string;
  name: string;
  tag: string;
  icon: string;
  role: string;
  architecture: string;
  template: string;
}

export const VIBE_PROMPT_PRESETS: PromptPreset[] = [
  {
    id: 'single-file-app',
    name: '단일 파일 완전 동작 웹앱 공식 (초보자 필승)',
    tag: 'Cursor / Claude Artifacts',
    icon: '⚡',
    role: '시니어 풀스택 개발자이자 프로덕트 디자이너',
    architecture: 'Single HTML (Tailwind CSS CDN + Vanilla JS)',
    template: `당신은 최고 수준의 UI/UX 감각을 지닌 시니어 풀스택 엔지니어입니다.
다음 요구사항을 충족하는 웹 애플리케이션을 [외부 빌드 도구 없이 즉시 브라우저에서 실행 가능한 단일 index.html 파일]로 작성해주세요.

[프로젝트 목표]: {GOAL}
[대상 사용자]: {TARGET_USER}
[핵심 기능 목록]:
1. {FEATURE_1}
2. {FEATURE_2}
3. {FEATURE_3}

[기술 제약 조건]:
- 디자인: Tailwind CSS 최신 CDN 사용, 다크 슬레이트 톤과 선명한 액센트 컬러를 사용해 모던한 느낌을 줄 것
- 아이콘: Lucide Icons CDN 또는 인라인 SVG 활용
- 반응형: 모바일과 데스크톱 모두에서 레이아웃 깨짐이 없을 것
- 상태 보존: 필요한 경우 LocalStorage를 활용해 새로고침해도 데이터 유지
- 코드 형식: 설명은 최소화하고 오직 완성된 하나의 <!DOCTYPE html> ... </html> 코드 블록으로만 답변할 것.`
  },
  {
    id: 'python-automation',
    name: '파이썬 엑셀/업무 자동화 스크립트 공식',
    tag: 'Python / ChatGPT / Cursor',
    icon: '🐍',
    role: '파이썬 업무 자동화 및 데이터 엔지니어링 전문가',
    architecture: 'Python 3.10+ (pandas, openpyxl, os, pathlib)',
    template: `당신은 10년 차 파이썬 업무 자동화 전문가입니다.
초보자도 터미널에서 에러 없이 한 번에 실행할 수 있는 견고한 파이썬 스크립트를 작성해주세요.

[자동화 목적]: {GOAL}
[입력 데이터]: {INPUT_FORMAT} (예: 엑셀 .xlsx, 폴더 내 파일들)
[출력 결과]: {OUTPUT_FORMAT} (예: 가공된 최종 엑셀 리포트)

[작성 원칙]:
1. 코드 최상단에 필요한 pip 라이브러리 설치 명령어를 주석으로 명시 (예: # pip install pandas openpyxl)
2. 파일이 없거나 데이터 형식이 다를 때 튕기지 않도록 try-except 예외 처리 완벽 구현
3. 각 핵심 단계마다 print() 로그를 친절하게 출력하여 사용자가 진행 상황을 알 수 있게 할 것
4. 초보자 수강생을 위해 함수 단위로 모듈화하고 명확한 한국어 주석 첨부`
  },
  {
    id: 'component-ui',
    name: '리액트 + 테일윈드 감성 UI 컴포넌트 공식',
    tag: 'v0.dev / Bolt.new / Claude',
    icon: '🎨',
    role: '실리콘밸리 테크 기업의 리드 디자인 시스템 엔지니어',
    architecture: 'React (TSX) + Tailwind CSS + Lucide React',
    template: `당신은 Vercel이나 Linear 스타일의 세련된 UI를 만드는 리드 프론트엔드 엔지니어입니다.
다음 사양의 리액트 컴포넌트를 타입스크립트(TSX)로 작성해주세요.

[컴포넌트 이름]: {COMPONENT_NAME}
[핵심 인터랙션]: {INTERACTION_DESCRIPTION}
[시각 디자인 톤]:
- 배경: 딥 다크 (#0B0F19 또는 #121826)
- 보더: 1px 세련된 헤어라인 보더 (border-white/10)
- 타이포그래피: 폰트 위계가 명확하며 군더더기 없는 마이크로 인터랙션
- 피드백: 마우스 호버(Hover), 활성화(Active), 로딩(Loading), 성공(Success) 상태가 모두 구현되어 있을 것
- 완결성: 모의 데이터(Mock Data)를 포함하여 바로 렌더링 가능한 컴포넌트 전체 코드를 제공할 것.`
  },
  {
    id: 'error-rescue',
    name: '시뻘건 에러 해결용 AI 역질문 공식',
    tag: 'Bug Fix / Error Rescue',
    icon: '🚑',
    role: '디버깅 및 문제 해결 마스터',
    architecture: 'Error Traceback & Root Cause Analysis',
    template: `방금 작성해준 코드를 실행했더니 다음 에러가 발생했습니다.

[발생한 에러 메시지 전문]:
\`\`\`
{ERROR_MESSAGE}
\`\`\`

[에러가 발생한 상황 또는 입력값]:
{CONTEXT}

[요청 사항]:
1. 이 에러가 왜 발생했는지 초보자도 1초 만에 이해할 수 있게 한 문장으로 원인을 설명해주세요.
2. 기존 코드를 통째로 다시 주지 말고, [어느 파일의 몇 번째 줄을 어떻게 바꾸면 되는지] 명확한 Before/After 코드 스니펫으로 집어주세요.
3. 동일한 실수를 방지하기 위한 팁을 한 줄 덧붙여주세요.`
  }
];

export interface ErrorExample {
  title: string;
  category: 'Python' | 'JavaScript' | 'CSS/HTML' | 'Terminal';
  badLog: string;
  friendlyExplanation: string;
  fixPrompt: string;
}

export const VIBE_ERROR_EXAMPLES: ErrorExample[] = [
  {
    title: 'IndentationError: unexpected indent (파이썬 들여쓰기 실수)',
    category: 'Python',
    badLog: `File "main.py", line 4
    total = price * 1.1
IndentationError: unexpected indent`,
    friendlyExplanation: '파이썬에서는 스페이스 4칸 들여쓰기가 코드 블록의 생명선입니다! 어떤 줄은 스페이스 2칸, 어떤 줄은 탭을 눌러서 AI나 파이썬 인터프리터가 줄을 못 맞춘 상태예요.',
    fixPrompt: `파이썬 코드에서 "IndentationError: unexpected indent" 에러가 발생했습니다.
들여쓰기가 엉킨 부분을 PEP8 표준(스페이스 4칸)으로 완벽하게 정리하고, 들여쓰기가 틀렸던 줄과 올바른 전체 코드를 다시 보여주세요.`
  },
  {
    title: 'Uncaught TypeError: Cannot read properties of null (JS 요소 미발견)',
    category: 'JavaScript',
    badLog: `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at script.js:12:8`,
    friendlyExplanation: '자바스크립트가 HTML 버튼을 찾으려고 했는데, 아직 HTML이 다 안 그려졌거나 ID 이름에 오타가 있어서 찾지 못해 터진 에러입니다.',
    fixPrompt: `자바스크립트에서 "Cannot read properties of null (reading 'addEventListener')" 에러가 발생했습니다.
DOM이 완전히 로드된 후 스크립트가 실행되도록 DOMContentLoaded 이벤트 리스너로 감싸거나, getElementById 대상이 실제로 존재하는지 널 체크(?.)를 적용한 수정 코드를 알려주세요.`
  },
  {
    title: 'ModuleNotFoundError: No module named pandas (모듈 미설치)',
    category: 'Terminal',
    badLog: `Traceback (most recent call last):
  File "analyze.py", line 1, in <module>
    import pandas as pd
ModuleNotFoundError: No module named 'pandas'`,
    friendlyExplanation: '파이썬에게 판다스(pandas)를 쓰라고 시켰는데, 컴퓨터에 판다스가 아직 설치되지 않았습니다. AI에게 터미널 설치 명령어를 물어봐야 합니다.',
    fixPrompt: `ModuleNotFoundError: No module named 'pandas' 에러가 납니다.
Windows 명령 프롬프트(CMD) 및 Mac/Linux 터미널에서 이 라이브러리를 설치하는 정확한 pip 명령어와, 가상환경 사용 시 주의할 점을 1줄로 알려주세요.`
  }
];
