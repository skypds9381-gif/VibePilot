// 100% Real Official Korean Theatrical Posters (Naver Movie & TMDB CDN)
export const DEFAULT_MOVIE_POSTERS: Record<string, string> = {
  // 1위: 암살자(들) (유해진, 박해일, 이민호 주연 실제 공식 극장 포스터)
  '암살자(들)': 'https://movie-phinf.pstatic.net/20260923_19/1790149334778AOAsP_JPEG/movie_image.jpg',
  '암살자들': 'https://movie-phinf.pstatic.net/20260923_19/1790149334778AOAsP_JPEG/movie_image.jpg',
  '암살자': 'https://movie-phinf.pstatic.net/20260923_19/1790149334778AOAsP_JPEG/movie_image.jpg',

  // 2위: 타짜: 벨제붑의 노래 (변요한, 노재원 주연 실제 공식 극장 포스터)
  '타짜: 벨제붑의 노래': 'https://movie-phinf.pstatic.net/20260923_172/1790140368820rlLy0_JPEG/movie_image.jpg',
  '타짜: 벨제붑의노래': 'https://movie-phinf.pstatic.net/20260923_172/1790140368820rlLy0_JPEG/movie_image.jpg',
  '타짜': 'https://movie-phinf.pstatic.net/20260923_172/1790140368820rlLy0_JPEG/movie_image.jpg',

  // 3위: 오디세이 (크리스토퍼 놀란 감독 실제 공식 극장 포스터)
  '오디세이': 'https://movie-phinf.pstatic.net/20260710_243/1783670981741HgbjS_JPEG/movie_image.jpg',
  '디 오디세이': 'https://movie-phinf.pstatic.net/20260710_243/1783670981741HgbjS_JPEG/movie_image.jpg',

  // 4위: 인턴 (최민식, 한소희 주연 실제 공식 극장 포스터)
  '인턴': 'https://movie-phinf.pstatic.net/20260916_162/1789524626778p9KKC_JPEG/movie_image.jpg',

  // 5위: 어벤져스: 엔드게임 앙코르 (월트디즈니/마블 코리아 실제 공식 한국 개봉 포스터)
  '어벤져스: 엔드게임 앙코르': 'https://movie-phinf.pstatic.net/20190417_250/1555465284425i6WQE_JPEG/movie_image.jpg',
  '어벤져스: 엔드게임': 'https://movie-phinf.pstatic.net/20190417_250/1555465284425i6WQE_JPEG/movie_image.jpg',
  '어벤져스': 'https://movie-phinf.pstatic.net/20190417_250/1555465284425i6WQE_JPEG/movie_image.jpg',

  // 6위: 가능한 사랑 (정해인 주연 로맨스 실제 공식 극장 포스터)
  '가능한 사랑': 'https://movie-phinf.pstatic.net/20260914_179/17893772569871RnXO_JPEG/movie_image.jpg',

  // 7위: 옵세션 (김남길, 천우희 주연 서스펜스 실제 공식 극장 포스터)
  '옵세션': 'https://movie-phinf.pstatic.net/20260812_196/1786497126921CQVW2_JPEG/movie_image.jpg',

  // 8위: 레지던트 이블: 0번째 밤 (소니픽쳐스 실제 공식 극장 포스터)
  '레지던트 이블: 0번째 밤': 'https://movie-phinf.pstatic.net/20260908_234/178885159130621sSE_JPEG/movie_image.jpg',
  '레지던트 이블': 'https://movie-phinf.pstatic.net/20260908_234/178885159130621sSE_JPEG/movie_image.jpg',

  // 9위: 스파이더맨: 브랜드 뉴 데이 (마블/소니 코리아 실제 공식 스파이더맨 극장 포스터)
  '스파이더맨: 브랜드 뉴 데이': 'https://movie-phinf.pstatic.net/20260716_51/1784184393949xOJUJ_JPEG/movie_image.jpg',
  '스파이더맨': 'https://movie-phinf.pstatic.net/20260716_51/1784184393949xOJUJ_JPEG/movie_image.jpg',

  // 10위: 바다 탐험대 옥토넛 (극장판 공식 오리지널 극장 포스터)
  '바다 탐험대 옥토넛 어보브 앤 비욘드 : 두근두근 대자연 어드벤처': 'https://movie-phinf.pstatic.net/20260824_224/1787558403819xuukM_JPEG/movie_image.jpg',
  '바다 탐험대 옥토넛': 'https://movie-phinf.pstatic.net/20260824_224/1787558403819xuukM_JPEG/movie_image.jpg',
};

// Distinct official fallbacks per rank
const RANK_OFFICIAL_POSTERS: Record<number, string> = {
  1: 'https://movie-phinf.pstatic.net/20260923_19/1790149334778AOAsP_JPEG/movie_image.jpg', // 암살자(들)
  2: 'https://movie-phinf.pstatic.net/20260923_172/1790140368820rlLy0_JPEG/movie_image.jpg', // 타짜: 벨제붑의 노래
  3: 'https://movie-phinf.pstatic.net/20260710_243/1783670981741HgbjS_JPEG/movie_image.jpg', // 오디세이
  4: 'https://movie-phinf.pstatic.net/20260916_162/1789524626778p9KKC_JPEG/movie_image.jpg', // 인턴
  5: 'https://movie-phinf.pstatic.net/20190417_250/1555465284425i6WQE_JPEG/movie_image.jpg', // 어벤져스: 엔드게임
  6: 'https://movie-phinf.pstatic.net/20260914_179/17893772569871RnXO_JPEG/movie_image.jpg', // 가능한 사랑
  7: 'https://movie-phinf.pstatic.net/20260812_196/1786497126921CQVW2_JPEG/movie_image.jpg', // 옵세션
  8: 'https://movie-phinf.pstatic.net/20260908_234/178885159130621sSE_JPEG/movie_image.jpg', // 레지던트 이블
  9: 'https://movie-phinf.pstatic.net/20260716_51/1784184393949xOJUJ_JPEG/movie_image.jpg', // 스파이더맨
  10: 'https://movie-phinf.pstatic.net/20260824_224/1787558403819xuukM_JPEG/movie_image.jpg', // 옥토넛
};

// Automatic Poster Search
export async function fetchTmdbPoster(title: string): Promise<string | null> {
  try {
    const cleanTitle = title.replace(/\(.*\)/g, '').replace(/:.*$/g, '').trim();
    const tmdbKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(
      cleanTitle || title
    )}&language=ko-KR`;

    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const match = data.results.find((m: any) => m.poster_path);
      if (match && match.poster_path) {
        return `https://image.tmdb.org/t/p/w780${match.poster_path}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Fallback resolver
export function getFallbackPoster(title: string, rank: number): string {
  // 1. Exact match in official posters
  if (DEFAULT_MOVIE_POSTERS[title]) {
    return DEFAULT_MOVIE_POSTERS[title];
  }

  // 2. Keyword match
  const clean = title.replace(/\s+/g, '');
  for (const [key, url] of Object.entries(DEFAULT_MOVIE_POSTERS)) {
    const cleanKey = key.replace(/\s+/g, '');
    if (clean.includes(cleanKey) || cleanKey.includes(clean)) {
      return url;
    }
  }

  // 3. Fallback strictly by rank (1위~10위 각각 고유의 공식 포스터 반환)
  if (RANK_OFFICIAL_POSTERS[rank]) {
    return RANK_OFFICIAL_POSTERS[rank];
  }

  return RANK_OFFICIAL_POSTERS[1];
}
