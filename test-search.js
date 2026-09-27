async function searchPoster(movieTitle) {
  const q = encodeURIComponent(`영화 ${movieTitle}`);
  const res = await fetch(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${q}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  // Look for movie poster image URL in Naver Movie Box
  const match = html.match(/https%3A%2F%2Fmovie-phinf\.pstatic\.net[^"&]+/i);
  if (match) {
    const decoded = decodeURIComponent(match[0]);
    console.log(`[${movieTitle}] Naver Movie Poster:`, decoded);
    return decoded;
  }
  // Alternate: search.pstatic.net/common?type=f208_312
  const match2 = html.match(/https:\/\/search\.pstatic\.net\/common\?type=[^"'\s&]+&amp;src=([^"'\s&]+)/i);
  if (match2) {
    const decoded = decodeURIComponent(match2[1]);
    console.log(`[${movieTitle}] Naver Search Poster:`, decoded);
    return decoded;
  }
  console.log(`[${movieTitle}] Not found in Naver`);
  return null;
}

async function run() {
  await searchPoster("베테랑2");
  await searchPoster("타짜");
  await searchPoster("오디세이");
  await searchPoster("인턴");
  await searchPoster("스파이더맨");
}
run();
