import React, { useState, useMemo, useEffect } from 'react';
import { 
  Newspaper, 
  Flame, 
  Clock, 
  Eye, 
  Heart, 
  Search, 
  Share2, 
  ExternalLink, 
  ChevronRight, 
  X, 
  MessageSquare, 
  Send, 
  Sparkles,
  Ticket,
  Film,
  Bookmark,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Globe2,
  Radio
} from 'lucide-react';
import { MOVIE_NEWS_LIST, MovieNewsArticle } from '../../data/movieNewsData';
import { MOVIE_DATABASE, MovieItem } from '../../data/movieDatabase';

interface MovieNewsFeedProps {
  onOpenTicket?: (movie: MovieItem) => void;
  onSelectDetail?: (movie: MovieItem) => void;
}

// Helper function to thoroughly sanitize text
function cleanText(raw?: string): string {
  if (!raw) return '';
  // If it starts with raw HTML tag or link, filter it out
  if (raw.trim().startsWith('<') || raw.includes('href=') || raw.includes('news.google.com/rss/articles')) {
    return '';
  }
  return raw
    .replace(/<[^>]*>?/gm, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export const MovieNewsFeed: React.FC<MovieNewsFeedProps> = ({
  onOpenTicket,
  onSelectDetail
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<MovieNewsArticle | null>(null);
  
  // Real-time news state
  const [liveNews, setLiveNews] = useState<MovieNewsArticle[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const [feedMode, setFeedMode] = useState<'all' | 'live' | 'curated'>('all');

  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cinema_news_likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // User comments per article
  const [comments, setComments] = useState<Record<string, { author: string; text: string; time: string }[]>>({
    'news-01': [
      { author: '시네마키드', text: '어제 추석에 가족들이랑 암살자(들) 봤는데 유해진 박해일 연기 합 진짜 미쳤습니다 강추!', time: '1시간 전' },
      { author: '영화광99', text: '1974년 모티브라 몰입감 장난 아닙니다. 후반부 추격신 대박.', time: '2시간 전' }
    ],
    'news-02': [
      { author: '타짜마니아', text: '변요한 특유의 묵직한 아우라가 조승우랑은 또 다른 매력으로 터짐.', time: '3시간 전' }
    ]
  });
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch Live Google News RSS Feed
  const fetchLiveNews = async () => {
    setIsLoadingLive(true);
    try {
      const res = await fetch('/api/news/live?q=%EC%98%81%ED%99%94');
      const data = await res.json();
      if (res.ok && data.isLive && data.articles) {
        setLiveNews(data.articles);
        setLastRefreshed(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (e) {
      console.error('Failed to fetch live news', e);
    } finally {
      setIsLoadingLive(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
  }, []);

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedArticles(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('cinema_news_likes', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleAddComment = (articleId: string) => {
    if (!newCommentText.trim()) return;
    const author = newCommentAuthor.trim() || '익명의 관객';
    const newEntry = {
      author,
      text: newCommentText.trim(),
      time: '방금 전'
    };
    setComments(prev => ({
      ...prev,
      [articleId]: [newEntry, ...(prev[articleId] || [])]
    }));
    setNewCommentText('');
  };

  const handleShare = (article: MovieNewsArticle) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Combine curated news with live news feed
  const combinedNews = useMemo(() => {
    if (feedMode === 'live') {
      return liveNews.length > 0 ? liveNews : MOVIE_NEWS_LIST;
    }
    if (feedMode === 'curated') {
      return MOVIE_NEWS_LIST;
    }
    return [...liveNews, ...MOVIE_NEWS_LIST];
  }, [liveNews, feedMode]);

  // Categories list
  const categories = [
    { id: 'all', label: '전체' },
    { id: '속보', label: '⚡ 속보/단독' },
    { id: '박스오피스', label: '📊 박스오피스' },
    { id: '신작개봉', label: '🎬 신작·개봉' },
    { id: '흥행', label: '🔥 흥행 돌풍' },
    { id: '영화제', label: '🏆 영화제·수상' },
    { id: '인터뷰', label: '🎙️ 인터뷰' },
    { id: '비하인드', label: '🎞️ 비하인드' },
  ];

  // Filtering
  const filteredArticles = useMemo(() => {
    return combinedNews.filter(article => {
      const matchCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.press.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [combinedNews, selectedCategory, searchQuery]);

  // Breaking ticker items
  const tickerItems = useMemo(() => {
    return combinedNews.slice(0, 5);
  }, [combinedNews]);

  return (
    <div className="space-y-8">
      {/* 24H Live News Breaking Ticker */}
      <div className="relative overflow-hidden rounded-xl border border-amber-900/40 bg-[#120F0D] p-3 flex items-center gap-3 shadow-lg">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-mono font-bold shrink-0">
          <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" />
          <span>LIVE 24H 속보</span>
        </div>
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee text-xs text-stone-300 space-x-8">
            {tickerItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="hover:text-amber-400 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="text-amber-500 font-mono">[{item.category}]</span>
                <span>{item.title}</span>
                <span className="text-stone-500 font-mono text-[10px]">({item.press})</span>
                {idx < tickerItems.length - 1 && <span className="text-stone-700">|</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Magazine Header */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-900/30 bg-gradient-to-br from-[#18110D] via-[#110D12] to-[#0A0B10] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wider">
                <Newspaper className="w-3.5 h-3.5" />
                CINEMA DESK & LIVE DISPATCH
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                실시간 구글 뉴스 & 언론사 피드 연동 중
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-stone-100 tracking-tight">
              실시간 극장가 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">이슈 & 단독 보도</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              연합뉴스, KBS, 뉴스1 등 전국 주요 언론사의 실시간 영화 기사와 무드매거진 심층 큐레이션 기사를 실시간으로 집계해 가장 빠르고 생생하게 전달합니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={fetchLiveNews}
              disabled={isLoadingLive}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 active:scale-95 text-neutral-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLive ? 'animate-spin' : ''}`} />
              <span>실시간 뉴스 즉시 갱신</span>
            </button>
            {lastRefreshed && (
              <span className="text-[11px] text-stone-400 font-mono text-center">
                최근 동기화: {lastRefreshed}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Source switch tabs */}
        <div className="flex items-center justify-between gap-4 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => setFeedMode('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                feedMode === 'all'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              전체 뉴스 ({combinedNews.length})
            </button>
            <button
              onClick={() => setFeedMode('live')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                feedMode === 'live'
                  ? 'bg-red-500 text-black font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Radio className="w-3 h-3 text-red-400" />
              실시간 속보 ({liveNews.length})
            </button>
            <button
              onClick={() => setFeedMode('curated')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                feedMode === 'curated'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              매거진 단독 ({MOVIE_NEWS_LIST.length})
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="영화, 배우, 이슈 검색..."
              className="w-full bg-stone-900/90 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        {/* Categories: Wrap neatly on all devices with clear pill buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm'
                  : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((article) => {
          const isLiked = likedArticles[article.id];
          const articleComments = comments[article.id] || [];
          
          // Pure summary without any messy html or url snippet
          let cleanSummary = cleanText(article.summary);
          if (!cleanSummary) {
            cleanSummary = `${article.press}에서 보도한 실시간 영화 기사입니다. 카드를 클릭해 상세 내용을 확인하세요.`;
          }

          return (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-[#111218] border border-stone-800/80 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20 cursor-pointer relative overflow-hidden"
            >
              <div className="space-y-3">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-[10px]">
                      {article.category}
                    </span>
                    {article.badge && (
                      <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-[10px]">
                        {article.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">
                    {article.publishedAt}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-stone-100 text-base group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                  {cleanText(article.title) || article.title}
                </h3>

                {/* Pure Clean Summary without raw HTML or links */}
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                  {cleanSummary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-stone-800/60 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-stone-300 font-medium">{article.press}</span>
                  <span>•</span>
                  <span>{article.reporter}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleToggleLike(article.id, e)}
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-[11px] font-mono">
                      {article.likeCount + (isLiked ? 1 : 0)}
                    </span>
                  </button>

                  <div className="flex items-center gap-1 text-stone-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono">{articleComments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-stone-900/30 rounded-2xl border border-stone-800/80 space-y-3">
          <Newspaper className="w-10 h-10 text-stone-600 mx-auto" />
          <p className="text-sm font-medium text-stone-300">검색 조건에 맞는 기사가 없습니다.</p>
          <p className="text-xs text-stone-500">다른 검색어를 입력하시거나 카테고리를 전체로 변경해 보세요.</p>
        </div>
      )}

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#12131A] border border-amber-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col text-stone-200 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {selectedArticle.press} · {selectedArticle.publishedAt}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-100 leading-snug">
                  {cleanText(selectedArticle.title) || selectedArticle.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-stone-400 pb-3 border-b border-stone-800/80">
                  <span>보도: {selectedArticle.press} ({selectedArticle.reporter})</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-mono">
                      <Eye className="w-3.5 h-3.5" />
                      {selectedArticle.viewCount.toLocaleString()} 읽음
                    </span>
                    <button
                      onClick={() => handleToggleLike(selectedArticle.id)}
                      className="flex items-center gap-1 text-stone-300 hover:text-red-400 font-mono transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedArticles[selectedArticle.id] ? 'fill-red-500 text-red-500' : ''}`} />
                      {selectedArticle.likeCount + (likedArticles[selectedArticle.id] ? 1 : 0)}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quote Block if available */}
              {selectedArticle.quote && (
                <div className="p-4 rounded-xl bg-amber-500/5 border-l-4 border-amber-500 text-amber-200 text-sm italic font-serif">
                  {selectedArticle.quote}
                </div>
              )}

              {/* Article Content Paragraphs */}
              <div className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans">
                {selectedArticle.content
                  .map(p => cleanText(p))
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>

              {/* Original Article Link (For Google News or External articles) */}
              {(selectedArticle as any).linkUrl && (
                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-stone-200">언론사 원문 기사 확인하기</p>
                    <p className="text-[11px] text-stone-400">{selectedArticle.press} 공식 보도로 이동합니다.</p>
                  </div>
                  <a
                    href={(selectedArticle as any).linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>원문 보기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Comments Section */}
              <div className="pt-6 border-t border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>독자 한줄평 ({(comments[selectedArticle.id] || []).length})</span>
                  </h4>
                  <button
                    onClick={() => handleShare(selectedArticle)}
                    className="text-xs text-stone-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? '링크 복사됨!' : '기사 공유'}</span>
                  </button>
                </div>

                {/* Input box */}
                <div className="space-y-2 bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      placeholder="닉네임 (기본: 익명)"
                      className="w-32 bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(selectedArticle.id);
                      }}
                      placeholder="기사에 대한 생각을 남겨보세요..."
                      className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => handleAddComment(selectedArticle.id)}
                      className="px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold rounded-lg text-xs hover:brightness-110 shrink-0"
                    >
                      등록
                    </button>
                  </div>
                </div>

                {/* Comment list */}
                <div className="space-y-2.5 max-h-44 overflow-y-auto">
                  {(comments[selectedArticle.id] || []).map((c, idx) => (
                    <div key={idx} className="bg-stone-900/40 p-2.5 rounded-lg border border-stone-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-stone-400">
                        <span className="font-semibold text-stone-300">{c.author}</span>
                        <span className="font-mono">{c.time}</span>
                      </div>
                      <p className="text-stone-300">{c.text}</p>
                    </div>
                  ))}
                  {(comments[selectedArticle.id] || []).length === 0 && (
                    <p className="text-xs text-stone-500 text-center py-3">첫 번째 한줄평을 남겨보세요!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
