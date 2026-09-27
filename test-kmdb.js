async function testKmdb() {
  const query = encodeURIComponent("암살자");
  const res = await fetch(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml2.jsp?collection=kmdb_new2&detail=N&query=${query}&listCount=5`);
  const text = await res.text();
  console.log(text.slice(0, 1000));
}
testKmdb();
