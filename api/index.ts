import express from 'express';

const app = express();
app.use(express.json());

// Clean HTML tags and entities
function cleanHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>?/gm, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function parseGoogleNewsRss(xmlText: string) {
  const items: any[] = [];
  const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || [];

  itemMatches.forEach((itemXml, index) => {
    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const sourceMatch = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/);

    let rawTitle = titleMatch ? titleMatch[1] : '';
    let press = sourceMatch ? cleanHtml(sourceMatch[1]) : '주요 언론사';

    if (rawTitle.includes(' - ')) {
      const parts = rawTitle.split(' - ');
      press = parts.pop() || press;
      rawTitle = parts.join(' - ');
    }
    const title = cleanHtml(rawTitle);
    const link = linkMatch ? cleanHtml(linkMatch[1]) : '';
    const pubDateRaw = pubDateMatch ? pubDateMatch[1] : '';

    let formattedDate = '방금 전';
    if (pubDateRaw) {
      try {
        const d = new Date(pubDateRaw);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        formattedDate = `${yyyy}.${mm}.${dd} ${hh}:${min}`;
      } catch {
        formattedDate = pubDateRaw;
      }
    }

    let category: '속보' | '박스오피스' | '흥행' | '신작개봉' | '영화제' | '인터뷰' | '비하인드' = '속보';
    if (title.includes('박스오피스') || title.includes('관객') || title.includes('매출')) {
      category = '박스오피스';
    } else if (title.includes('개봉') || title.includes('출격') || title.includes('개막') || title.includes('상영')) {
      category = '신작개봉';
    } else if (title.includes('영화제') || title.includes('수상') || title.includes('칸') || title.includes('베니스') || title.includes('아카데미')) {
      category = '영화제';
    } else if (title.includes('인터뷰') || title.includes('감독') || title.includes('배우') || title.includes('만나다')) {
      category = '인터뷰';
    } else if (title.includes('돌파') || title.includes('흥행') || title.includes('1위')) {
      category = '흥행';
    }

    const cleanSummaryText = `${press}에서 보도한 최신 영화 소식입니다. 『${title}』 관련 상세 내용은 기사 상세보기를 통해 확인하실 수 있습니다.`;

    if (title && link) {
      items.push({
        id: `gnews-${index}-${Date.now()}`,
        category,
        title,
        summary: cleanSummaryText,
        content: [
          `${press} 보도: ${title}`,
          '실시간 극장가 및 영화계 최신 동향을 신속하게 집계하여 전달해 드립니다.',
          '기사 전문 및 상세 사진은 아래 언론사 공식 원문 보기 링크를 통해 바로 확인하실 수 있습니다.'
        ],
        press: cleanHtml(press),
        reporter: '실시간 속보',
        publishedAt: formattedDate,
        viewCount: 1200 + (itemMatches.length - index) * 350,
        likeCount: 45 + (itemMatches.length - index) * 12,
        badge: index === 0 ? '실시간 속보' : index < 3 ? 'HOT' : undefined,
        relatedMovies: ['최신 극장 개봉작'],
        linkUrl: link,
      });
    }
  });

  return items;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'mood-magazine', timestamp: new Date().toISOString() });
});

// Google News Live RSS Proxy for Vercel Serverless
app.get('/api/news/live', async (req, res) => {
  try {
    const query = encodeURIComponent((req.query.q as string) || '영화');
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=ko&gl=KR&ceid=KR:ko`;

    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      }
    });

    if (!response.ok) {
      throw new Error(`Google News RSS returned status ${response.status}`);
    }

    const xmlText = await response.text();
    const articles = parseGoogleNewsRss(xmlText);

    return res.json({
      isLive: true,
      source: 'Google News 실시간 영화 RSS 피드',
      updatedAt: new Date().toISOString(),
      total: articles.length,
      articles,
    });
  } catch (err: any) {
    console.error('Error fetching live news:', err);
    return res.status(500).json({
      isLive: false,
      error: err.message || '실시간 뉴스를 가져오는 중 오류가 발생했습니다.',
    });
  }
});

// KOBIS Box Office Live Proxy on Vercel Serverless
app.get('/api/boxoffice/live', async (req, res) => {
  const userApiKey = (req.query.key as string) || process.env.KOBIS_API_KEY || '7c64937fb4a37f6ff78a861d45c2301a';
  const targetDate = (req.query.targetDt as string) || '';

  if (!userApiKey) {
    return res.json({
      isLiveKobis: false,
      source: 'curated_database',
      message: 'KOBIS API 키가 설정되지 않아 무드매거진 큐레이션 데이터로 표시됩니다.',
    });
  }

  let queryDt = targetDate;
  if (!queryDt) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    queryDt = `${yyyy}${mm}${dd}`;
  }

  try {
    const apiUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${encodeURIComponent(
      userApiKey
    )}&targetDt=${queryDt}&multiMovieYn=N`;

    const kobisRes = await fetch(apiUrl);
    if (!kobisRes.ok) {
      throw new Error(`KOBIS HTTP Error: ${kobisRes.status}`);
    }

    const data = await kobisRes.json();
    if (data?.faultInfo) {
      return res.status(400).json({
        isLiveKobis: false,
        error: data.faultInfo.message || 'KOBIS 키 인증 실패',
      });
    }

    const boxOfficeResult = data?.boxOfficeResult;
    const dailyList = boxOfficeResult?.dailyBoxOfficeList || [];

    const mappedMovies = dailyList.map((item: any) => {
      const rank = parseInt(item.rank, 10);
      const rankOldAndNew = item.rankOldAndNew === 'NEW' ? 'NEW' : 'OLD';
      const rankInten = parseInt(item.rankInten, 10);

      let rankChange: 'NEW' | 'SAME' | 'UP' | 'DOWN' = 'SAME';
      let rankChangeAmount = 0;

      if (rankOldAndNew === 'NEW') {
        rankChange = 'NEW';
      } else if (rankInten > 0) {
        rankChange = 'UP';
        rankChangeAmount = rankInten;
      } else if (rankInten < 0) {
        rankChange = 'DOWN';
        rankChangeAmount = Math.abs(rankInten);
      }

      const audiCnt = parseInt(item.audiCnt, 10) || 0;
      const audiAcc = parseInt(item.audiAcc, 10) || 0;
      const salesShare = parseFloat(item.salesShare) || 0;
      const screenCnt = parseInt(item.scrnCnt, 10) || 0;
      const showCnt = parseInt(item.showCnt, 10) || 0;

      return {
        rank,
        rankChange,
        rankChangeAmount,
        title: item.movieNm,
        originalTitle: item.movieNmEn || item.movieNm,
        openDate: item.openDt ? item.openDt.replace(/-/g, '.') : '',
        audiCnt,
        audiAcc,
        salesShare,
        bookingRate: salesShare,
        screenCnt,
        showCnt,
        rating: 9.0 + (rank <= 3 ? 0.3 : 0.0),
        ageLimit: '15',
        genre: ['드라마', '영화'],
        director: '국내외 거장 감독',
        cast: ['주연 배우진'],
        highlight: `영진위 KOBIS 공식 집계 일일 관객 ${audiCnt.toLocaleString()}명 (누적 ${audiAcc.toLocaleString()}명)`,
        posterBg: 'from-stone-900 via-neutral-950 to-black',
        bookingUrls: {
          cgv: `https://www.cgv.co.kr/search/?query=${encodeURIComponent(item.movieNm)}`,
          lotte: `https://www.lottecinema.co.kr/NLCHS/Search?keyword=${encodeURIComponent(item.movieNm)}`,
          megabox: `https://www.megabox.co.kr/movie?searchText=${encodeURIComponent(item.movieNm)}`,
        },
      };
    });

    return res.json({
      isLiveKobis: true,
      source: `영화진흥위원회 KOBIS 공식 집계 (${boxOfficeResult?.showRange || queryDt})`,
      targetDt: queryDt,
      boxOfficeType: boxOfficeResult?.boxofficeType || '일별 박스오피스',
      movies: mappedMovies,
    });
  } catch (err: any) {
    return res.status(500).json({
      isLiveKobis: false,
      error: err.message || 'KOBIS 서버 통신 오류',
    });
  }
});

app.get('/api/curation/today', (req, res) => {
  res.json({
    theme: '비 내리는 밤, 따뜻한 위로가 필요할 때',
    recommendedMood: 'cozy',
  });
});

export default app;
