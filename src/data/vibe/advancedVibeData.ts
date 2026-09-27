export interface IterationRecipe {
  id: string;
  category: '기능 확장' | '디자인/UX 개편' | '데이터/엑셀 연동' | '모바일 반응형/최적화';
  title: string;
  situation: string;
  beforeCodeContext: string;
  promptToAi: string;
  instructorTip: string;
}

export const ITERATION_RECIPES: IterationRecipe[] = [
  {
    id: 'recipe-1',
    category: '기능 확장',
    title: '결과값 엑셀(CSV) 및 클립보드 즉시 복사 버튼 달기',
    situation: '계산기나 데이터 표를 만들었는데, 사용자가 결과를 엑셀로 저장하거나 카톡으로 바로 보내고 싶어할 때',
    beforeCodeContext: '결과 화면만 덩그러니 표로 나오고 내보내기 버튼이 없는 상태',
    promptToAi: `현재 결과 화면 바로 아래에 다음 2가지 액션 버튼을 나란히 추가해주세요.
1. [클립보드 복사] 버튼: 클릭 시 계산 결과 요약본 텍스트가 복사되고 "복사되었습니다!" 툴팁이 1.5초간 노출될 것.
2. [엑셀(CSV) 다운로드] 버튼: 브라우저 Blob과 UTF-8 BOM 인코딩(\ufeff)을 적용하여 한글 깨짐 없이 .csv 파일로 즉시 다운로드되는 JavaScript 함수를 구현해주세요.
기존 디자인 스타일과 버튼 크기/패딩을 일관되게 맞춰주세요.`,
    instructorTip: '수강생들에게 "AI는 CSV의 한글 인코딩 깨짐(\ufeff)까지 알아서 처리한다"는 점을 강조하면 실무자들의 반응이 아주 뜨겁습니다.'
  },
  {
    id: 'recipe-2',
    category: '디자인/UX 개편',
    title: '시니어/어르신을 위한 "눈 편한 고대비 & 글자 확대" 토글',
    situation: '기본 폰트가 너무 작거나 회색 글씨가 흐려서 어르신 수강생이나 모바일에서 잘 안 보일 때',
    beforeCodeContext: '작은 12px 폰트와 낮은 명도 대비의 미니멀 스타일',
    promptToAi: `우측 상단에 [큰 글씨 모드 (시니어 친화)] 토글 스위치를 추가해주세요.
이 스위치를 켜면:
1. 본문과 입력창 폰트 크기가 1.3배 커지고 두께가 bold로 강화됩니다.
2. 흐릿한 회색 텍스트(#94a3b8 등)가 고대비 선명한 흰색(#ffffff) 또는 진한 검정(#111827)으로 변경됩니다.
3. 클릭 영역(터치 타겟) 패딩이 넓어져서 손가락으로 누르기 훨씬 쉬워지도록 CSS 클래스를 토글하는 함수를 넣어주세요.`,
    instructorTip: '접근성(Accessibility)을 바이브코딩 단 1문장으로 해결하는 마법을 보여주는 킬러 예제입니다.'
  },
  {
    id: 'recipe-3',
    category: '데이터/엑셀 연동',
    title: '로컬 스토리지 자동 저장 (새로고침해도 안 날아가게)',
    situation: '수강생이 웹앱에서 열심히 입력하고 새로고침(F5)을 눌렀더니 데이터가 다 날아가서 멘붕이 왔을 때',
    beforeCodeContext: '변수에만 저장되어 새로고침하면 초기값으로 리셋됨',
    promptToAi: `사용자가 입력한 값들과 추가한 항목들이 브라우저를 새로고침하거나 껐다 켜도 유지되도록 [localStorage 자동 저장/불러오기] 기능을 연동해주세요.
1. 입력창의 'input' 또는 'change' 이벤트마다 localStorage.setItem('user_app_data', JSON.stringify(...)) 로 실시간 저장
2. 페이지 로드(DOMContentLoaded) 시 기존 저장된 데이터가 있으면 폼에 자동 복원
3. 우측 구석에 작게 [데이터 초기화] 버튼도 함께 제공해주세요.`,
    instructorTip: '"DB(데이터베이스) 서버 구축 없이도 브라우저 자체 메모리로 영구 저장이 된다"는 사실을 알게 되면 학생들의 프로젝트 퀄리티가 급상승합니다.'
  },
  {
    id: 'recipe-4',
    category: '모바일 반응형/최적화',
    title: '스마트폰 화면 잘림 및 가로 스크롤 버그 잡기',
    situation: 'PC에서는 완벽한데 스마트폰(아이폰/갤럭시)으로 열었더니 표가 옆으로 삐져나가고 화면이 깨질 때',
    beforeCodeContext: 'w-[800px] 같은 고정 픽셀(px) 너비가 들어가서 모바일에서 레이아웃 붕괴',
    promptToAi: `스마트폰 모바일 화면에서 가로 스크롤이 발생하고 테이블이 화면 밖으로 잘립니다.
다음 모바일 반응형 규칙을 적용해주세요:
1. 고정 너비(width: 800px 등)를 전부 w-full max-w-2xl 및 overflow-x-auto로 감싸주세요.
2. 테이블(table)의 경우 모바일(< 640px)에서는 카드 형태(Flex-col)로 변환되거나 가로 스와이프가 자연스럽게 동작하도록 개선해주세요.
3. 모바일 터치 시 더블탭 확대가 발생하지 않도록 뷰포트 메타태그와 버튼 최소 높이(min-h-[44px])를 확보해주세요.`,
    instructorTip: '모바일 반응형 디버깅 프롬프트 1회 입력으로 해결되는 모습을 보여주면 "진짜 실무 개발자 같다"며 감탄합니다.'
  }
];

export interface DeploymentGuide {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  difficulty: '★☆☆ (1분 컷 초간단)' | '★★☆ (깃허브 연동)' | '★★★ (프로 엔지니어)';
  steps: {
    stepNum: number;
    title: string;
    desc: string;
    actionTip: string;
  }[];
  instructorScript: string;
}

export const DEPLOYMENT_GUIDES: DeploymentGuide[] = [
  {
    id: 'tiiny-host',
    name: '1단계: 드래그 앤 드롭 30초 배포 (Tiiny.host / Netlify Drop)',
    badge: '초보자 추천',
    tagline: '회원가입/로그인도 필요 없이 파일 하나 던지면 링크 생성!',
    difficulty: '★☆☆ (1분 컷 초간단)',
    steps: [
      {
        stepNum: 1,
        title: '클로드나 VibePilot에서 HTML 파일 다운로드',
        desc: '클로드 아티팩트 우측 상단의 [다운로드] 버튼이나 VibePilot의 [다운로드] 버튼을 눌러 "index.html" 파일을 내 컴퓨터 바탕화면에 저장합니다.',
        actionTip: '파일 이름이 반드시 index.html 인지 확인하세요!'
      },
      {
        stepNum: 2,
        title: 'tiiny.host 또는 app.netlify.com/drop 접속',
        desc: '브라우저 새 탭에서 tiiny.host (무료 호스팅) 웹사이트로 이동합니다.',
        actionTip: '아무것도 설치할 필요가 없는 100% 웹 서비스입니다.'
      },
      {
        stepNum: 3,
        title: '바탕화면의 index.html을 네모 박스에 끌어다 놓기',
        desc: '원하는 주소 이름(예: my-salary-calc)을 적고 마우스로 드래그하여 놓으면 끝!',
        actionTip: '3초 만에 나만의 실제 동작하는 웹사이트 주소가 생깁니다.'
      },
      {
        stepNum: 4,
        title: '내 스마트폰 카톡으로 링크 보내서 실행 확인',
        desc: '카카오톡 나에게 보내기로 링크를 전송하고 스마트폰에서 터치해 봅니다. 내 폰에서도 똑같이 계산기가 실행되는 것을 확인합니다!',
        actionTip: '수강생들에게 "부모님이나 친구한테 카톡으로 자랑해보세요!" 시키면 반응 최고조!'
      }
    ],
    instructorScript: `"학생 여러분, 방금 우리가 10분 만에 만든 계산기, 이제 전 세계 80억 인구가 접속할 수 있는 진짜 인터넷 웹사이트로 띄워보겠습니다. 파일 하나만 드래그하면 30초 만에 끝납니다!"`
  },
  {
    id: 'vercel-github',
    name: '2단계: Vercel + GitHub 연동 배포 (전문가 표준)',
    badge: '취업/포트폴리오',
    tagline: '코드를 수정하고 저장하면 사이트가 자동으로 실시간 업데이트!',
    difficulty: '★★☆ (깃허브 연동)',
    steps: [
      {
        stepNum: 1,
        title: 'GitHub에 새 리포지토리(Repository) 만들기',
        desc: 'github.com에 로그인 후 [New repository]를 누르고 프로젝트 이름을 입력하여 생성합니다.',
        actionTip: 'Public(공개)으로 설정해 두세요.'
      },
      {
        stepNum: 2,
        title: '코드 업로드 (Add file > Upload files)',
        desc: 'index.html 파일을 드래그하여 올리고 초록색 Commit changes 버튼을 클릭합니다.',
        actionTip: '초보자는 깃 명령어 몰라도 웹에서 파일 올리면 끝납니다.'
      },
      {
        stepNum: 3,
        title: 'Vercel.com에서 깃허브 저장소 Import',
        desc: 'Vercel 대시보드에서 방금 올린 깃허브 프로젝트를 찾아 [Import] ➜ [Deploy] 클릭!',
        actionTip: 'https://내프로젝트.vercel.app 주소가 영구 무료로 발급됩니다.'
      },
      {
        stepNum: 4,
        title: '자동 배포(CI/CD) 마법 체감하기',
        desc: '깃허브에서 index.html 코드를 한 줄 고치고 저장하면, Vercel이 10초 만에 실제 사이트에 실시간 자동 반영합니다.',
        actionTip: '개발자들이 왜 깃허브와 버셀을 사랑하는지 설명해주세요.'
      }
    ],
    instructorScript: `"실제 실리콘밸리 스타트업 개발자들도 전부 이 Vercel 방식으로 배포합니다. 수강생 여러분의 이력서 포트폴리오 링크에 딱 이 Vercel 주소를 적으시면 됩니다."`
  }
];

export interface OfficeDataWorkflow {
  id: string;
  targetRole: '경리/회계/총무' | '영업/마케팅' | '인사/채용' | '기획/매장관리';
  title: string;
  problem: string;
  vibePrompt: string;
  sampleDataPreview: string;
  expectedOutput: string;
}

export const OFFICE_WORKFLOWS: OfficeDataWorkflow[] = [
  {
    id: 'workflow-sales',
    targetRole: '영업/마케팅',
    title: '거래처별 미수금 & 매출 달성률 즉석 시각화 대시보드',
    problem: '매달 말마다 엑셀 표에서 거래처별 입금액과 미수금을 계산하고 피벗 돌리는 데 3시간씩 걸림',
    sampleDataPreview: `거래처명,담당자,목표매출,실제매출,수금액,미수금
(주)알파상사,김영업,50000000,48000000,30000000,18000000
베타테크,이마케,30000000,35000000,35000000,0
감마유통,박대리,40000000,28000000,15000000,13000000
델타솔루션,최팀장,60000000,62000000,50000000,12000000`,
    vibePrompt: `당신은 비즈니스 데이터 시각화 전문가입니다.
회사 영업팀에서 매달 쓰는 [거래처별 매출 및 미수금 관리 대시보드] 단일 HTML 웹앱을 만들어주세요.
기술: HTML, Tailwind CSS, Chart.js (CDN), PapaParse (CSV 파서)
핵심 요구사항:
1. 상단에 [미수금 합계], [총 달성률(%)], [최대 매출 거래처], [요주의 미수 거래처 수] 4개 KPI 요약 카드
2. CSV 텍스트 붙여넣기 또는 파일 드래그 앤 드롭 업로드 지원 (기본 샘플 데이터 내장)
3. 거래처별 목표 대비 실제 매출을 비교하는 수평 막대 차트 (달성률 100% 이상 초록색, 미달성 주황색)
4. 미수금이 1,000만원 이상인 거래처는 빨간색 경고 뱃지와 함께 최상단 정렬 토글 기능
5. 핀테크 대시보드 느낌의 다크 테마로 완성된 코드를 제공해주세요.`,
    expectedOutput: '경영진 보고용으로 즉시 쓸 수 있는 고품격 인터랙티브 매출 대시보드'
  },
  {
    id: 'workflow-hr',
    targetRole: '인사/채용',
    title: '직원 연차/휴가 잔여일수 자동 계산기 & 달력 뷰어',
    problem: '직원마다 입사일이 달라 1년 미만 월차와 회계연도 기준 연차가 헷갈려서 문의 전화가 빗발침',
    sampleDataPreview: `이름,부서,입사일,사용연차
홍길동,개발팀,2024-03-15,6
이영희,인사팀,2022-07-01,12
김철수,디자인,2025-01-10,3`,
    vibePrompt: `근로기준법 기준 연차휴가 발생 및 잔여일수 계산기 웹앱을 만들어주세요.
1. 입사일과 기준일을 입력하면 (입사일 기준 / 회계연도 기준 1월 1일) 발생 연차와 잔여 연차를 정확히 계산
2. 1년 미만 입사자의 월 1개씩 발생하는 연차 산정 로직 완벽 반영
3. 직원 명단을 CSV로 일괄 업로드하면 표로 직원별 잔여 연차를 보여주고 엑셀 다운로드 지원
4. 직관적인 토스 스타일의 밝고 신뢰감 있는 디자인`,
    expectedOutput: '인사팀 담당자가 직원들에게 링크를 보내서 스스로 잔여 연차를 조회하게 하는 셀프 서비스 도구'
  },
  {
    id: 'workflow-accounting',
    targetRole: '경리/회계/총무',
    title: '세금계산서 공급가액/부가세 일괄 분리 및 합계 검증기',
    problem: '카드 영수증이나 거래명세서 합계금액에서 공급가액(10/11)과 부가세(1/11)를 일일이 계산기로 두드리다 오타 발생',
    sampleDataPreview: `항목,합계금액(부가세포함)
사무용품 구입,110000
서버 이용료,550000
외식 회식비,330000`,
    vibePrompt: `경리 실무자를 위한 [부가세 공급가액 자동 분리 및 전자세금계산서 검증 웹앱]을 만들어주세요.
기능:
1. 합계금액을 입력하면 공급가액(=합계/1.1)과 부가세(=합계-공급가액)를 원단위 절사하여 즉시 분리
2. 엑셀에서 복사한 여러 줄의 금액을 큰 텍스트창에 Ctrl+V로 붙여넣으면 한 번에 행별로 분리 테이블 생성
3. 총 공급가액 합계와 총 부가세 합계 대형 카드 표기
4. [원클릭 엑셀 복사] 버튼으로 엑셀 시트에 그대로 붙여넣을 수 있는 탭(TSV) 포맷 복사 제공`,
    expectedOutput: '경리 실무자들의 야근을 1시간 줄여주는 마법의 세무 보조 도구'
  }
];
