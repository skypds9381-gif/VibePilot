async function testNaver() {
  const q = encodeURIComponent("영화 베테랑2");
  const res = await fetch(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${q}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  // Find poster image
  const posterMatches = html.match(/https:\/\/[^"]*(?:pstatic\.net|naver\.net)[^"]*(?:movie|poster|thumb)[^"]*/gi) || [];
  console.log("Matches:", posterMatches.slice(0, 5));
}
testNaver();
