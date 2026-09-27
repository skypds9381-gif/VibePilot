export interface UpcomingMovie {
  id: string;
  title: string;
  originalTitle: string;
  releaseDate: string; // YYYY.MM.DD
  director: string;
  cast: string[];
  genre: string[];
  synopsis: string;
  expectedPoint: string;
  wantToSeeCount: number;
  teaserUrl: string;
  bgGradient: string;
  posterBadge?: string;
}

export const UPCOMING_MOVIES: UpcomingMovie[] = [
  {
    id: 'up-01',
    title: '현혹',
    originalTitle: 'Delusion',
    releaseDate: '2026.11.12',
    director: '한재림 (관상, 더 킹, 비상선언)',
    cast: ['수지 (배수지)', '김선호'],
    genre: ['미스터리', '시대극', '스릴러'],
    synopsis: '1935년 일제강점기 경성, 매혹적인 뱀파이어 여인 송정화의 초상화 의뢰를 맡은 가난한 화가 윤이호. 그녀의 저택에 발을 들인 순간 시간과 현실이 뒤틀리기 시작한다.',
    expectedPoint: '수지의 파격적인 뱀파이어 여인 변신과 한재림 감독의 압도적인 미장센',
    wantToSeeCount: 28410,
    teaserUrl: 'https://search.naver.com/search.naver?query=%EC%98%81%ED%99%94+%ED%98%84%ED%98%B9',
    bgGradient: 'from-rose-950 via-stone-900 to-black',
    posterBadge: '🌸 수지 차기작'
  },
  {
    id: 'up-02',
    title: '아바타 3: 불과 재',
    originalTitle: 'Avatar: Fire and Ash',
    releaseDate: '2026.12.18',
    director: '제임스 카메론',
    cast: ['샘 워싱턴', '조 샐다나', '시고니 위버'],
    genre: ['SF', '액션', '어드벤처'],
    synopsis: '판도라 행성의 새로운 지역 화산 지대에 서식하는 공격적인 재의 부족(Ash People)의 등장. 숲과 바다를 넘어 불의 세계로 확장되는 제임스 카메론의 역대급 판도라 비주얼 혁명.',
    expectedPoint: '전작들의 흥행 기록을 모두 갈아치울 전 세계 최고 기대작, 불의 나비족과의 격돌',
    wantToSeeCount: 52190,
    teaserUrl: 'https://search.naver.com/search.naver?query=%EC%95%84%EB%B0%94%ED%83%80+3',
    bgGradient: 'from-orange-950 via-red-950 to-black',
    posterBadge: '🔥 글로벌 1위 기대작'
  },
  {
    id: 'up-03',
    title: '실연당한 사람들을 위한 일곱시 조찬모임',
    originalTitle: '7 AM Breakfast Club for the Broken-Hearted',
    releaseDate: '2026.10.28',
    director: '임선애 (69세, 세기말의 사랑)',
    cast: ['수지 (배수지)', '구교환'],
    genre: ['로맨스', '드라마', '힐링'],
    synopsis: '사랑에 실패하고 마음에 깊은 흉터를 안은 사람들이 매일 아침 7시 오래된 식당에 모여 따뜻한 수프 한 그릇을 나눈다. 상처를 딛고 서로의 온기가 되어가는 치유의 이야기.',
    expectedPoint: '수지와 구교환의 독보적인 감성 케미, 백영옥 작가 동명 베스트셀러 소설 원작',
    wantToSeeCount: 19820,
    teaserUrl: 'https://search.naver.com/search.naver?query=%EC%8B%A4%EC%97%B0%EB%8B%B9%ED%95%9C+%EC%82%AC%EB%9E%8C%EB%93%A4%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%9D%BC%EA%B3%B1%EC%8B%9C+%EC%A1%B0%EC%B0%AC%EB%AA%A8%EC%9E%84',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    posterBadge: '☕ 가을 멜로'
  },
  {
    id: 'up-04',
    title: '듄: 메시아',
    originalTitle: 'Dune: Messiah',
    releaseDate: '2026.11.25',
    director: '드니 빌뇌브',
    cast: ['티모시 샬라메', '젠데이아', '플로렌스 퓨', '안야 테일러 조이'],
    genre: ['SF', '어드벤처', '드라마'],
    synopsis: '황제의 자리에 오른 폴 아트레이데스와 그를 신격화하며 은하계 전역으로 퍼져나가는 종교 전쟁. 우주의 구원자인가 파멸의 시작인가, 드니 빌뇌브 듄 3부작의 대단원.',
    expectedPoint: '듄 1·2를 잇는 드니 빌뇌브 감독 SF 3부작 완결판, 티모시 샬라메의 황제 카리스마',
    wantToSeeCount: 38400,
    teaserUrl: 'https://search.naver.com/search.naver?query=%EB%93%84+%EB%A9%94%EC%8B%9C%EC%95%84',
    bgGradient: 'from-yellow-950 via-stone-950 to-black',
    posterBadge: '👑 듄 완결판'
  },
  {
    id: 'up-05',
    title: '극장판 귀멸의 칼날: 무한성편',
    originalTitle: 'Demon Slayer: Kimetsu no Yaiba - Infinity Castle',
    releaseDate: '2026.10.15',
    director: '소토자키 하루오',
    cast: ['하나에 나츠키', '키토 아카리'],
    genre: ['애니메이션', '액션', '판타지'],
    synopsis: '마침내 열린 무한성의 문. 키부츠지 무잔과 상현 도깨비들을 상대로 귀살대 전원과 주(柱)들의 목숨을 건 최후의 결전이 스크린 3부작 중 첫 번째 장으로 펼쳐진다.',
    expectedPoint: 'ufotable의 역대급 작화 퀄리티와 IMAX 전용 상영, 글로벌 애니메이션 원탑',
    wantToSeeCount: 44200,
    teaserUrl: 'https://search.naver.com/search.naver?query=%EA%B7%80%EB%A9%88%EC%9D%98+%EC%B0%BC%EB%82%A0+%EB%AC%B4%ED%95%9C%EC%84%B1%ED%8E%B8',
    bgGradient: 'from-purple-950 via-stone-950 to-black',
    posterBadge: '⚔️ 예매 전쟁 예고'
  }
];

export const calculateDDay = (targetDateStr: string): number => {
  const parts = targetDateStr.split('.');
  const targetYear = parseInt(parts[0], 10);
  const targetMonth = parseInt(parts[1], 10) - 1;
  const targetDay = parseInt(parts[2], 10);

  // App reference time: 2026-09-25
  const current = new Date(2026, 8, 25);
  const target = new Date(targetYear, targetMonth, targetDay);
  
  const diffTime = target.getTime() - current.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
