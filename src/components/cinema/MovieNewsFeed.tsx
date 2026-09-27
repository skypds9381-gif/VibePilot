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
  Radio,
  Layers,
  LayoutGrid,
  Filter,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { MOVIE_NEWS_LIST, MovieNewsArticle } from '../../data/movieNewsData';
import { MOVIE_DATABASE, MovieItem } from '../../data/movieDatabase';

interface MovieNewsFeedProps {
  onOpenTicket?: (movie: MovieItem) => void;
  onSelectDetail?: (movie: MovieItem) => void;
}

// Helper function to sanitize raw text from RSS feeds
function cleanText(raw?: string): string {
  if (!raw) return '';
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
  // Classification & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [feedMode, setFeedMode] = useState<'all' | 'curated' | 'live'>('all');
  const [viewMode, setViewMode] = useState<'digest' | 'grid'>('digest'); // 'digest': 테마별 모아보기, 'grid': 피드형
  const [sortBy, setSortBy] = useState<'latest' | 'views' | 'likes'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState<number>(6); // Limit displayed articles to prevent overload
  const [selectedArticle, setSelectedArticle] = useState<MovieNewsArticle | null>(null);

  // Real-time live RSS news state
  const [liveNews, setLiveNews] = useState<MovieNewsArticle[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  // Likes & Comments
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cinema_news_likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [comments, setComments] = useState<Record<string, { author: string; text: string; time: string }[]>>({
    'news-01': [
      { author: '시네마키드', text: '암살자(들) 봤는데 유해진 박해일 연기 합 진짜 미쳤습니다 강추!', time: '1시간 전' },
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

  // Base combined pool according to source filter
  const basePool = useMemo(() => {
    if (feedMode === 'live') {
      return liveNews.length > 0 ? liveNews : MOVIE_NEWS_LIST;
    }
    if (feedMode === 'curated') {
      return MOVIE_NEWS_LIST;
    }
    return [...MOVIE_NEWS_LIST, ...liveNews];
  }, [liveNews, feedMode]);

  // Categories definition
  const categories = [
    { id: 'all', label: '전체' },
    { id: '신작개봉', label: '🎬 신작·개봉' },
    { id: '박스오피스', label: '📊 박스오피스' },
    { id: '흥행', label: '🔥 흥행 돌풍' },
    { id: '인터뷰', label: '🎙️ 배우·인터뷰' },
    { id: '영화제', label: '🏆 영화제·수상' },
    { id: '속보', label: '⚡ 속보·단독' },
    { id: '비하인드', label: '🎞️ 비하인드' },
  ];

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: basePool.length };
    categories.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = basePool.filter(a => a.category === cat.id).length;
      }
    });
    return counts;
  }, [basePool]);

  // Filtered & Sorted Articles
  const filteredArticles = useMemo(() => {
    let result = basePool.filter(article => {
      const matchCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.press.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    // Sorting
    if (sortBy === 'views') {
      result.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortBy === 'likes') {
      result.sort((a, b) => b.likeCount - a.likeCount);
    } // 'latest' maintains default chronological order

    return result;
  }, [basePool, selectedCategory, searchQuery, sortBy]);

  // Top 3 Highlights for Briefing Cards
  const topHighlights = useMemo(() => {
    return basePool.slice(0, 3);
  }, [basePool]);

  // Breaking ticker items
  const tickerItems = useMemo(() => {
    return basePool.slice(0, 6);
  }, [basePool]);

  // Grouped sections for "테마별 모아보기" (Digest View)
  const topicSections = useMemo(() => {
    const sections = [
      {
        id: '신작개봉',
        title: '🎬 신작 & 개봉 스포트라이트',
        desc: '이번 주 극장가에 등판한 최신 개봉작 및 기대작 소식',
        articles: basePool.filter(a => a.category === '신작개봉').slice(0, 3)
      },
      {
        id: '박스오피스',
        title: '📊 박스오피스 & 관객 흥행 지표',
        desc: '실시간 예매율 1위와 주말 극장가 흥행 질주 분석',
        articles: basePool.filter(a => a.category === '박스오피스' || a.category === '흥행').slice(0, 3)
      },
      {
        id: '인터뷰',
        title: '🎙️ 스타 & 감독 인터뷰 현장',
        desc: '스크린 뒤 배우와 연출진이 직접 전하는 생생한 코멘터리',
        articles: basePool.filter(a => a.category === '인터뷰' || a.category === '비하인드').slice(0, 3)
      },
      {
        id: '속보',
        title: '⚡ 실시간 단독 및 주요 속보',
        desc: '언론사에서 가장 최근에 타전된 실시간 영화계 이슈',
        articles: basePool.filter(a => a.category === '속보' || a.category === '영화제').slice(0, 3)
      }
    ];
    return sections.filter(sec => sec.articles.length > 0);
  }, [basePool]);

  // Helper to render individual article card
  const renderArticleCard = (article: MovieNewsArticle) => {
    const isLiked = likedArticles[article.id];
    const articleComments = comments[article.id] || [];
    let cleanSummary = cleanText(article.summary);
    if (!cleanSummary) {
      cleanSummary = `${article.press}에서 보도한 최신 영화 소식입니다. 카드를 클릭해 상세 내용을 확인하세요.`;
    }

    return (
      <div
        key={article.id}
        onClick={() => setSelectedArticle(article)}
        className="group bg-[#111218] border border-stone-800/80 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-amber-950/20 cursor-pointer relative overflow-hidden"
      >
        <div className="space-y-3">
          {/* Meta Header */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-[10px]">
                {article.category}
              </span>
              {article.badge && (
                <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-[10px]">
                  {article.badge}
                </span>
              )}
              {article.id.startsWith('gnews') && (
                <span className="px-1.5 py-0.5 rounded bg-sky-950/60 border border-sky-500/30 text-sky-400 font-mono text-[9px]">
                  LIVE
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

          {/* Clean Summary */}
          <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
            {cleanSummary}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 mt-4 border-t border-stone-800/60 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5 font-mono text-[11px] truncate max-w-[60%]">
            <span className="text-stone-300 font-medium">{article.press}</span>
            <span>•</span>
            <span className="truncate">{article.reporter}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={(e) => handleToggleLike(article.id, e)}
              className="flex items-center gap-1 hover:text-red-400 transition-colors"
              title="좋아요"
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
  };

  return (
    <div className="space-y-8">
      {/* 24H Live News Breaking Ticker */}
      <div className="relative overflow-hidden rounded-xl border border-amber-900/40 bg-[#120F0D] p-3 flex items-center gap-3 shadow-lg">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-mono font-bold shrink-0">
          <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" />
          <span>LIVE 속보</span>
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
                <span>{cleanText(item.title) || item.title}</span>
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
                CINEMA DESK & CLASSIFIED DIGEST
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                실시간 언론사 & 매거진 분류 피드 가동 중
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-stone-100 tracking-tight">
              실시간 극장가 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">주제별 맞춤 뉴스</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              쏟아지는 기사를 한눈에 파악하실 수 있도록 <strong>[신작개봉]</strong>, <strong>[박스오피스]</strong>, <strong>[배우인터뷰]</strong> 등 주제별로 명확하게 분류하여 브리핑해 드립니다.
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

      {/* TOP 3 Highlights Briefing Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-sm text-stone-200">오늘의 극장가 3대 핵심 이슈</span>
          </div>
          <span className="text-xs text-stone-400">엄선된 헤드라인 브리핑</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topHighlights.map((item, idx) => (
            <div
              key={`highlight-${item.id}`}
              onClick={() => setSelectedArticle(item)}
              className="group bg-gradient-to-br from-[#16141a] to-[#0f0e13] border border-amber-500/20 hover:border-amber-400/50 rounded-xl p-4 cursor-pointer transition-all hover:translate-y-[-2px] shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">
                    TOP {idx + 1} · {item.category}
                  </span>
                  <span className="text-stone-400 font-mono text-[10px]">{item.press}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                  {cleanText(item.title) || item.title}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
                <span className="text-stone-400 text-[10px]">{item.publishedAt}</span>
                <span className="text-amber-400 text-[11px] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  기사보기 <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classification & Filter Controls Bar */}
      <div className="bg-[#12131A] border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        {/* Row 1: Source & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800/70">
          {/* Source Tabs */}
          <div className="flex items-center gap-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800 text-xs shrink-0">
            <button
              onClick={() => { setFeedMode('all'); setVisibleCount(6); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                feedMode === 'all'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              전체 뉴스 ({basePool.length})
            </button>
            <button
              onClick={() => { setFeedMode('curated'); setVisibleCount(6); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                feedMode === 'curated'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              💎 매거진 심층기사 ({MOVIE_NEWS_LIST.length})
            </button>
            <button
              onClick={() => { setFeedMode('live'); setVisibleCount(6); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                feedMode === 'live'
                  ? 'bg-red-500 text-black font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Radio className="w-3 h-3 text-red-300" />
              🔴 언론사 실시간 ({liveNews.length})
            </button>
          </div>

          {/* View Mode Toggle: Digest vs Grid */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-stone-400 hidden md:inline">보기 방식:</span>
            <div className="flex items-center gap-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800 text-xs">
              <button
                onClick={() => setViewMode('digest')}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  viewMode === 'digest'
                    ? 'bg-white/10 text-white font-bold border border-white/20'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="주제별로 깔끔하게 묶어보기"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>주제별 모아보기</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white/10 text-white font-bold border border-white/20'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="전체 기사를 카드 그리드로 탐색"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                <span>피드 그리드</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Search box & Sort options */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="영화 제목, 배우, 감독, 언론사 검색..."
              className="w-full bg-stone-900/90 border border-stone-800 rounded-xl pl-9 pr-8 py-2 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-stone-400">정렬:</span>
            <div className="flex items-center bg-stone-900/90 border border-stone-800 rounded-lg p-0.5">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  sortBy === 'latest' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortBy('views')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  sortBy === 'views' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                조회순
              </button>
              <button
                onClick={() => setSortBy('likes')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  sortBy === 'likes' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                인기순
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: Category Pills with Counts */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-stone-400">
            <span>세부 카테고리 필터링:</span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                카테고리 초기화
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setVisibleCount(6); // Reset pagination on category change
                  }}
                  className={`px-3 py-1.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                      : 'bg-stone-900/90 text-stone-300 hover:text-white border border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-black/20 text-black font-black' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT AREA: Depends on viewMode */}
      {viewMode === 'digest' && selectedCategory === 'all' && !searchQuery ? (
        /* MODE 1: Topic Sections Digest (주제별 모아보기) */
        <div className="space-y-10">
          {topicSections.map((sec) => (
            <div key={sec.id} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-stone-400">{sec.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory(sec.id);
                    setViewMode('grid');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium shrink-0 self-start sm:self-auto"
                >
                  <span>더 많은 기사 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sec.articles.map(article => renderArticleCard(article))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* MODE 2: Clean Paginated Grid (피드 그리드 모아보기) */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>
              총 <strong className="text-amber-400">{filteredArticles.length}</strong>개의 기사 중{' '}
              <strong className="text-stone-200">{Math.min(visibleCount, filteredArticles.length)}</strong>개 표시 중
            </span>
            {selectedCategory !== 'all' && (
              <span className="text-stone-400">
                선택된 카테고리: <strong className="text-amber-300">{selectedCategory}</strong>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.slice(0, visibleCount).map(article => renderArticleCard(article))}
          </div>

          {/* Load More Button to prevent visual overload */}
          {filteredArticles.length > visibleCount && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-200 font-medium text-xs transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
              >
                <span>기사 더보기 (+6개)</span>
                <span className="text-stone-400 font-mono text-[10px]">
                  ({filteredArticles.length - visibleCount}개 남음)
                </span>
                <ChevronDown className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-stone-900/30 rounded-2xl border border-stone-800/80 space-y-3">
          <Newspaper className="w-10 h-10 text-stone-600 mx-auto" />
          <p className="text-sm font-medium text-stone-300">검색 조건에 맞는 기사가 없습니다.</p>
          <p className="text-xs text-stone-500">다른 검색어를 입력하시거나 카테고리를 전체로 변경해 보세요.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 rounded-lg transition-colors mt-2"
          >
            필터 초기화
          </button>
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
                <div className="flex items-center justify-between text-xs text-stone-400 pb-3 border-b border-stone-800">
                  <span>작성자: {selectedArticle.reporter}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-mono">
                      <Eye className="w-3.5 h-3.5" />
                      {selectedArticle.viewCount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleToggleLike(selectedArticle.id)}
                      className="flex items-center gap-1 hover:text-red-400 transition-colors font-mono"
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedArticles[selectedArticle.id] ? 'fill-red-500 text-red-500' : ''}`} />
                      {selectedArticle.likeCount + (likedArticles[selectedArticle.id] ? 1 : 0)}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quote Highlight */}
              {selectedArticle.quote && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 text-amber-200/90 text-sm italic font-serif leading-relaxed">
                  {selectedArticle.quote}
                </div>
              )}

              {/* Summary */}
              <div className="text-sm text-stone-300 font-medium leading-relaxed bg-stone-900/60 p-4 rounded-xl border border-stone-800">
                {cleanText(selectedArticle.summary) || selectedArticle.summary}
              </div>

              {/* Body Content */}
              <div className="space-y-4 text-stone-300 text-sm leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Original Article Link (For Live Google News) */}
              {selectedArticle.originUrl && (
                <div className="p-4 rounded-xl bg-stone-900/80 border border-sky-500/30 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-sky-400 font-bold flex items-center gap-1">
                      <Globe2 className="w-3.5 h-3.5" /> 언론사 공식 원문 기사
                    </span>
                    <p className="text-xs text-stone-300 truncate max-w-sm sm:max-w-md">
                      {selectedArticle.press}의 원문 페이지에서 사진과 기사 전문을 확인할 수 있습니다.
                    </p>
                  </div>
                  <a
                    href={selectedArticle.originUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 hover:text-white text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <span>원문 보기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Related Movies Card (If applicable) */}
              {selectedArticle.relatedMovies && selectedArticle.relatedMovies.length > 0 && (
                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Film className="w-4 h-4" />
                    <span>관련 영화 정보 바로가기</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.relatedMovies.map((movieTitle) => {
                      const movieObj = MOVIE_DATABASE.find(m => m.title === movieTitle);
                      return (
                        <div key={movieTitle} className="flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-lg text-xs">
                          <span className="text-stone-200 font-medium">{movieTitle}</span>
                          {movieObj && (
                            <div className="flex items-center gap-1.5">
                              {onSelectDetail && (
                                <button
                                  onClick={() => {
                                    setSelectedArticle(null);
                                    onSelectDetail(movieObj);
                                  }}
                                  className="text-stone-400 hover:text-amber-300 text-[11px] underline"
                                >
                                  상세
                                </button>
                              )}
                              {onOpenTicket && (
                                <button
                                  onClick={() => {
                                    setSelectedArticle(null);
                                    onOpenTicket(movieObj);
                                  }}
                                  className="text-amber-400 hover:text-amber-300 text-[11px] font-bold flex items-center gap-0.5"
                                >
                                  <Ticket className="w-3 h-3" />
                                  예매
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Reader Comments */}
              <div className="space-y-4 pt-4 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>관객 한줄평 & 실시간 반응 ({(comments[selectedArticle.id] || []).length})</span>
                  </h4>
                </div>

                {/* Comment Input */}
                <div className="space-y-2 bg-stone-900/40 p-3 rounded-xl border border-stone-800">
                  <input
                    type="text"
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    placeholder="닉네임 (기본값: 익명의 관객)"
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/50"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="기사에 대한 생각을 남겨보세요..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(selectedArticle.id);
                      }}
                      className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/50"
                    />
                    <button
                      onClick={() => handleAddComment(selectedArticle.id)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>등록</span>
                    </button>
                  </div>
                </div>

                {/* Comment List */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {(comments[selectedArticle.id] || []).map((cmt, idx) => (
                    <div key={idx} className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between text-stone-400">
                        <span className="font-bold text-stone-300">{cmt.author}</span>
                        <span className="text-[10px] font-mono">{cmt.time}</span>
                      </div>
                      <p className="text-stone-300">{cmt.text}</p>
                    </div>
                  ))}
                  {(!comments[selectedArticle.id] || comments[selectedArticle.id].length === 0) && (
                    <p className="text-xs text-stone-500 text-center py-4">첫 번째 관객 반응을 남겨보세요!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-800 bg-stone-900/60 flex items-center justify-between">
              <button
                onClick={() => handleShare(selectedArticle)}
                className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">주소 복사됨!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>기사 공유하기</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
