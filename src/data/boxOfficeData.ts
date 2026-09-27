import { DEFAULT_MOVIE_POSTERS } from './defaultPosters';

export interface BoxOfficeMovie {
  rank: number;
  rankChange: 'NEW' | 'SAME' | 'UP' | 'DOWN';
  rankChangeAmount?: number;
  title: string;
  originalTitle: string;
  openDate: string;
  audiCnt: number; // Daily audience
  audiAcc: number; // Cumulative audience
  salesShare: number; // %
  bookingRate: number; // %
  screenCnt: number;
  showCnt: number;
  rating: number;
  ageLimit: 'ALL' | '12' | '15' | '19';
  genre: string[];
  director: string;
  cast: string[];
  highlight: string;
  posterBg: string;
  posterImg?: string;
  isMilestone?: string;
  bookingUrls: {
    cgv: string;
    lotte: string;
    megabox: string;
  };
}

export const REALTIME_BOX_OFFICE: BoxOfficeMovie[] = [
  {
    rank: 1,
    rankChange: 'SAME',
    title: '암살자(들)',
    originalTitle: 'The Assassins',
    openDate: '2026.09.24',
    audiCnt: 288493,
    audiAcc: 447081,
    salesShare: 31.8,
    bookingRate: 34.2,
    screenCnt: 1684,
    showCnt: 7420,
    rating: 9.4,
    ageLimit: '15',
    genre: ['액션', '드라마', '시대극'],
    director: '허진호',
    cast: ['유해진', '박해일', '이민호'],
    highlight: '개봉 첫날 13.4만 동원 후 연휴 첫날 28.8만 폭발! 허진호 감독 연출, 유해진·박해일·이민호의 숨 막히는 추격 액션 드라마',
    posterBg: 'from-stone-900 via-neutral-950 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['암살자(들)'],
    isMilestone: '이틀 연속 압도적 1위 · 누적 44.7만 돌파',
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 2,
    rankChange: 'SAME',
    title: '타짜: 벨제붑의 노래',
    originalTitle: 'Tazza: Song of Beelzebub',
    openDate: '2026.09.24',
    audiCnt: 144003,
    audiAcc: 260388,
    salesShare: 20.4,
    bookingRate: 22.1,
    screenCnt: 1240,
    showCnt: 5120,
    rating: 9.2,
    ageLimit: '19',
    genre: ['범죄', '드라마', '스릴러'],
    director: '최국희',
    cast: ['변요한', '노재원'],
    highlight: '개봉 첫날 10.3만 동원 2위 출발! 타짜 4번째 시리즈, 변요한과 노재원의 목숨을 건 광기의 화투 도박 서스펜스',
    posterBg: 'from-red-950 via-stone-950 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['타짜: 벨제붑의 노래'],
    isMilestone: '타짜 시리즈 4탄 흥행 돌풍 2위',
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 3,
    rankChange: 'SAME',
    title: '오디세이',
    originalTitle: 'The Odyssey',
    openDate: '2026.08.13',
    audiCnt: 74210,
    audiAcc: 11324890,
    salesShare: 12.1,
    bookingRate: 13.5,
    screenCnt: 980,
    showCnt: 3840,
    rating: 9.5,
    ageLimit: '12',
    genre: ['SF', '모험', '미스터리'],
    director: '크리스토퍼 놀란',
    cast: ['맷 데이먼', '킬리언 머피', '에밀리 블런트'],
    highlight: '누적 1,132만 관객 돌파 불멸의 천만 대작! 9월 22일 박스오피스 1위 재탈환 후 2020년대 외화 흥행 역대 1위 기록 경신 중',
    posterBg: 'from-blue-950 via-indigo-950 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['오디세이'],
    isMilestone: '누적 1,132만 돌파 · 2020년대 외화 1위',
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 4,
    rankChange: 'SAME',
    title: '인턴',
    originalTitle: 'The Intern (Korean Remake)',
    openDate: '2026.09.18',
    audiCnt: 52180,
    audiAcc: 541200,
    salesShare: 8.7,
    bookingRate: 9.2,
    screenCnt: 760,
    showCnt: 2950,
    rating: 9.3,
    ageLimit: '12',
    genre: ['코미디', '드라마', '힐링'],
    director: '김도영',
    cast: ['최민식', '한소희'],
    highlight: '개봉 첫날 1위 및 6일 연속 박스오피스 정상! 70세 시니어 인턴 최민식과 30세 청년 CEO 한소희의 가슴 뭉클한 세대공감 힐링작',
    posterBg: 'from-amber-950 via-stone-900 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['인턴'],
    isMilestone: '개봉 8일 만에 누적 54만 관객 돌파',
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 5,
    rankChange: 'SAME',
    title: '어벤져스: 엔드게임 앙코르',
    originalTitle: 'Avengers: Endgame Encore',
    openDate: '2026.09.18',
    audiCnt: 23179,
    audiAcc: 14021500,
    salesShare: 4.8,
    bookingRate: 5.1,
    screenCnt: 540,
    showCnt: 1840,
    rating: 9.8,
    ageLimit: '12',
    genre: ['액션', 'SF', '히어로'],
    director: '안소니 루소, 조 루소',
    cast: ['로버트 다우니 주니어', '크리스 에반스'],
    highlight: 'IMAX 3D 앙코르 특별 상영! 마블 시네마틱 유니버스의 전설적 클라이맥스를 다시 극장 대형 스크린으로 만나는 감동',
    posterBg: 'from-purple-950 via-slate-900 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['어벤져스: 엔드게임 앙코르'],
    isMilestone: 'IMAX 재상영 전석 매진',
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 6,
    rankChange: 'SAME',
    title: '가능한 사랑',
    originalTitle: 'Possible Love',
    openDate: '2026.09.10',
    audiCnt: 14800,
    audiAcc: 312000,
    salesShare: 2.9,
    bookingRate: 3.2,
    screenCnt: 420,
    showCnt: 1180,
    rating: 9.1,
    ageLimit: '12',
    genre: ['로맨스', '멜로', '드라마'],
    director: '정가영',
    cast: ['정해인', '전소니'],
    highlight: '가을바람과 함께 찾아온 잔잔하고 솔직한 현실 로맨스. 연인과 함께 보기 좋은 감성 멜로',
    posterBg: 'from-pink-950 via-stone-900 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['가능한 사랑'],
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 7,
    rankChange: 'SAME',
    title: '옵세션',
    originalTitle: 'Obsession',
    openDate: '2026.09.11',
    audiCnt: 11200,
    audiAcc: 284000,
    salesShare: 2.3,
    bookingRate: 2.6,
    screenCnt: 360,
    showCnt: 980,
    rating: 8.8,
    ageLimit: '15',
    genre: ['스릴러', '미스터리'],
    director: '김진원',
    cast: ['김남길', '천우희'],
    highlight: '사라진 기억과 뒤틀린 집착의 끝. 촘촘한 복선과 반전이 돋보이는 심리 미스터리 스릴러',
    posterBg: 'from-zinc-950 via-stone-900 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['옵세션'],
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 8,
    rankChange: 'SAME',
    title: '레지던트 이블: 0번째 밤',
    originalTitle: 'Resident Evil: Night Zero',
    openDate: '2026.09.17',
    audiCnt: 9400,
    audiAcc: 195000,
    salesShare: 1.9,
    bookingRate: 2.1,
    screenCnt: 320,
    showCnt: 840,
    rating: 8.7,
    ageLimit: '19',
    genre: ['공포', '액션', 'SF'],
    director: '요하네스 로버츠',
    cast: ['카야 스코델라리오', '로비 아멜'],
    highlight: '라쿤 시티 참사의 시초가 된 잔혹한 밤. 서바이벌 호러 팬들을 열광시킨 정통 공포 액션',
    posterBg: 'from-red-950 via-neutral-950 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['레지던트 이블: 0번째 밤'],
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 9,
    rankChange: 'SAME',
    title: '스파이더맨: 브랜드 뉴 데이',
    originalTitle: 'Spider-Man: Brand New Day',
    openDate: '2026.08.06',
    audiCnt: 7800,
    audiAcc: 7420000,
    salesShare: 1.6,
    bookingRate: 1.8,
    screenCnt: 280,
    showCnt: 650,
    rating: 9.3,
    ageLimit: '12',
    genre: ['액션', '모험', '히어로'],
    director: '데스틴 대니얼 크레턴',
    cast: ['톰 홀랜드', '젠데이아'],
    highlight: '피터 파커의 홀로서기와 뉴욕의 새로운 위기! 누적 740만 관객 돌파 롱런 흥행',
    posterBg: 'from-blue-950 via-red-950 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['스파이더맨: 브랜드 뉴 데이'],
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  },
  {
    rank: 10,
    rankChange: 'SAME',
    title: '바다 탐험대 옥토넛 어보브 앤 비욘드 : 두근두근 대자연 어드벤처',
    originalTitle: 'Octonauts: Above & Beyond',
    openDate: '2026.09.12',
    audiCnt: 6200,
    audiAcc: 142000,
    salesShare: 1.3,
    bookingRate: 1.5,
    screenCnt: 240,
    showCnt: 520,
    rating: 9.6,
    ageLimit: 'ALL',
    genre: ['애니메이션', '모험', '가족'],
    director: '달린 하인스',
    cast: ['하성용', '정재헌'],
    highlight: '추석 연휴 어린이와 가족 관객의 원픽! 바나클 대장과 옥토넛 대원들의 대자연 구출 대작전',
    posterBg: 'from-teal-950 via-cyan-950 to-black',
    posterImg: DEFAULT_MOVIE_POSTERS['바다 탐험대 옥토넛 어보브 앤 비욘드 : 두근두근 대자연 어드벤처'],
    bookingUrls: {
      cgv: 'https://www.cgv.co.kr/movies/',
      lotte: 'https://www.lottecinema.co.kr/',
      megabox: 'https://www.megabox.co.kr/movie'
    }
  }
];

export interface BoxOfficeStats {
  updatedAt: string;
  source: string;
  totalDailyAudience: string;
  topMovieShare: string;
  currentYearMonth: string;
}

export const BOX_OFFICE_STATS: BoxOfficeStats = {
  currentYearMonth: '2026년 9월 25일 (목)',
  updatedAt: '2026년 9월 25일 영화진흥위원회 KOBIS 통합전산망 기준',
  source: '영화진흥위원회 KOBIS 통합전산망 공식 집계',
  totalDailyAudience: '678,638명',
  topMovieShare: '암살자(들) (31.8%)'
};
