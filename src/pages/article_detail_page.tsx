import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { articleData } from "../data/articles";
import type { ArticleItem } from "../data/articles";
import { pastelGreen } from "../theme/pastel_green";

// Constants
const GREEN = pastelGreen.primary;
const GREEN_DARK = pastelGreen.heroEnd;
const GREEN_LIGHT = pastelGreen.surfaceAlt;

// Toast Component
interface ToastProps {
  message: string;
  isVisible: boolean;
}

const Toast = ({ message, isVisible }: ToastProps) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-[100] animate-fade-in-up"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

const SHARE_PLATFORMS = [
  { id: "whatsapp", name: "WhatsApp" },
  { id: "facebook", name: "Facebook" },
  { id: "instagram", name: "Instagram" },
  { id: "linkedin", name: "LinkedIn" },
] as const;

type SharePlatformId = (typeof SHARE_PLATFORMS)[number]["id"];

const SocialShareIcon = ({ platform }: { platform: SharePlatformId }) => {
  switch (platform) {
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-[#25D366]">
          <path d="M20.52 3.48A11.87 11.87 0 0012.06 0C5.47 0 .12 5.35.12 11.94c0 2.1.55 4.16 1.59 5.97L0 24l6.28-1.64a11.92 11.92 0 005.78 1.48h.01c6.58 0 11.93-5.35 11.93-11.94 0-3.19-1.24-6.19-3.48-8.42zM12.07 21.82h-.01a9.88 9.88 0 01-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.38a9.9 9.9 0 01-1.52-5.25c0-5.48 4.46-9.93 9.94-9.93 2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 012.9 7.02c0 5.48-4.46 9.93-9.95 9.93zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.46-.15-.65.15-.19.3-.75.97-.92 1.17-.17.2-.34.22-.63.08-.3-.15-1.24-.46-2.36-1.48a8.77 8.77 0 01-1.64-2.04c-.17-.3-.02-.45.13-.59.13-.13.3-.34.45-.51.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.65-1.57-.9-2.16-.23-.55-.47-.47-.65-.48h-.56c-.19 0-.5.07-.75.35-.25.28-.97.95-.97 2.31 0 1.36.99 2.67 1.13 2.86.15.2 1.95 2.98 4.73 4.18.66.28 1.17.44 1.57.56.66.2 1.27.17 1.74.1.53-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.26-.2-.56-.34z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-[#1877F2]">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.5h3.05V9.41c0-3.03 1.79-4.71 4.54-4.71 1.32 0 2.7.24 2.7.24v2.97h-1.52c-1.5 0-1.96.94-1.96 1.9v2.28h3.34l-.53 3.5h-2.81V24C19.61 23.1 24 18.1 24 12.07z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-[#E4405F]">
          <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.8A3.95 3.95 0 003.8 7.75v8.5a3.95 3.95 0 003.95 3.95h8.5a3.95 3.95 0 003.95-3.95v-8.5a3.95 3.95 0 00-3.95-3.95h-8.5zm8.95 1.4a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8A3.2 3.2 0 1015.2 12 3.2 3.2 0 0012 8.8z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-[#0A66C2]">
          <path d="M20.45 20.45h-3.56v-5.59c0-1.33-.03-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78A1.78 1.78 0 000 1.78v20.44C0 23.2.8 24 1.78 24h20.44c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const CopyLinkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 stroke-current" fill="none" strokeWidth="2">
    <path d="M10 14a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11.4 5.52" />
    <path d="M14 10a5 5 0 00-7.07 0L4.1 12.83a5 5 0 107.07 7.07L12.6 18.5" />
  </svg>
);

// Helper Functions
const getRelatedArticles = (currentArticle: ArticleItem, count = 5): ArticleItem[] => {
  return articleData.filter((item) => item.id !== currentArticle.id).slice(0, count);
};

const shareToSocial = (platform: string, title: string, url: string) => {
  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title)} ${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    instagram: `https://www.instagram.com/`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };
  
  const shareUrl = shareUrls[platform as keyof typeof shareUrls];
  if (shareUrl) {
    window.open(shareUrl, '_blank');
  }
};

// Sub-Components
interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform: string) => void;
  onCopyLink: () => void;
}

const ShareMenu = ({ isOpen, onClose, onShare, onCopyLink }: ShareMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Remove auto-focus to prevent hover state staying active
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 min-w-[200px] z-50 animate-fade-in-scale"
      role="menu"
      aria-label="Opsi berbagi"
    >
      {SHARE_PLATFORMS.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onShare(platform.id)}
          className="w-full flex items-center gap-3 px-4 py-2.5 theme-hover-surface theme-focus-ring-inset transition-all text-left group"
          role="menuitem"
          aria-label={`Bagikan ke ${platform.name}`}
        >
          <span className="transition-transform group-hover:scale-110" aria-hidden="true">
            <SocialShareIcon platform={platform.id} />
          </span>
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{platform.name}</span>
        </button>
      ))}
      <div className="border-t border-gray-100 my-1"></div>
      <button
        onClick={onCopyLink}
        className="w-full flex items-center gap-3 px-4 py-2.5 theme-hover-surface theme-focus-ring-inset transition-all text-left group"
        role="menuitem"
        aria-label="Salin link artikel"
      >
        <span className="text-gray-700 transition-transform group-hover:scale-110" aria-hidden="true">
          <CopyLinkIcon />
        </span>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Salin Link</span>
      </button>
    </div>
  );
};

interface StatsBarProps {
  views: number;
  likes: number;
  shares: number;
  isLiked: boolean;
  onLike: () => void;
  onShareClick: () => void;
  onShareClose: () => void;
  showShareMenu: boolean;
  onShare: (platform: string) => void;
  onCopyLink: () => void;
}

const StatsBar = ({ 
  views, 
  likes, 
  shares, 
  isLiked, 
  onLike, 
  onShareClick,
  onShareClose,
  showShareMenu,
  onShare,
  onCopyLink 
}: StatsBarProps) => {
  return (
    <div className="flex items-center gap-6">
      {/* Views */}
      <div 
        className="flex items-center gap-2 text-sm text-gray-600"
        aria-label={`${views} kali dilihat`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="font-medium">{views} views</span>
      </div>

      {/* Likes */}
      <button
        onClick={onLike}
        className="flex items-center gap-2 text-sm transition-all duration-200 hover:scale-110 active:scale-95 theme-focus-ring rounded-lg px-2 py-1 -mx-2"
        style={{ color: isLiked ? GREEN : "#6B7280" }}
        aria-label={isLiked ? "Batal suka artikel" : "Suka artikel"}
        aria-pressed={isLiked}
      >
        <svg 
          className="transition-transform"
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill={isLiked ? "currentColor" : "none"} 
          stroke="currentColor" 
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="font-medium">{likes}</span>
      </button>

      {/* Share with Dropdown */}
      <div className="relative share-menu-container">
        <button
          onClick={onShareClick}
          className="flex items-center gap-2 text-sm text-gray-600 theme-hover-surface transition-all duration-200 hover:scale-105 theme-focus-ring rounded-lg px-2 py-1 -mx-2"
          aria-label="Bagikan artikel"
          aria-expanded={showShareMenu}
          aria-haspopup="menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span className="font-medium">{shares}</span>
        </button>

        <ShareMenu 
          isOpen={showShareMenu}
          onClose={onShareClose}
          onShare={onShare}
          onCopyLink={onCopyLink}
        />
      </div>
    </div>
  );
};

interface RelatedArticleCardProps {
  article: ArticleItem;
}

const RelatedArticleCard = ({ article }: RelatedArticleCardProps) => {
  return (
    <Link
      to={`/artikel/${article.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-[var(--pg-primary-hover)] transition-colors">
          {article.title}
        </h4>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
};

// Main Component
export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleItem | null>(null);
  const [loadedSlug, setLoadedSlug] = useState<string | undefined>(undefined);
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Initialize article data
  useEffect(() => {
    // Simulate async loading (in real app this would be API call)
    const timer = setTimeout(() => {
      const found = articleData.find((item) => item.slug === slug);
      setArticle(found || null);
      setLoadedSlug(slug);
      
      if (found) {
        setLikes(Math.floor(Math.random() * 100) + 20);
        setShares(Math.floor(Math.random() * 50) + 10);
        setViews(Math.floor(Math.random() * 500) + 100);
      } else {
        setViews(0);
      }
    }, 300);

    window.scrollTo(0, 0);
    
    return () => {
      clearTimeout(timer);
    };
  }, [slug]);

  const loading = loadedSlug !== slug;

  // Handle click outside to close share menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showShareMenu && !target.closest('.share-menu-container')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShareMenu]);

  // Handlers
  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleShare = (platform: string) => {
    setShares(shares + 1);
    setShowShareMenu(false);
    if (article) {
      shareToSocial(platform, article.title, window.location.href);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowShareMenu(false);
      setToastMessage('Link berhasil disalin!');
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }).catch(() => {
      setToastMessage('Gagal menyalin link');
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="animate-pulse">
              {/* Breadcrumb skeleton */}
              <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
              
              {/* Title skeleton */}
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-2/3 mb-8"></div>
              
              {/* Meta skeleton */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              
              {/* Image skeleton */}
              <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
              
              {/* Content skeleton */}
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Article not found
  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <svg 
            className="mx-auto mb-4 w-24 h-24 text-gray-400"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Artikel tidak ditemukan</h2>
          <p className="text-gray-600 mb-6">Artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            style={{ background: GREEN, color: "white" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article, 5);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Article Container - Two Column Layout */}
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Main Grid: Article Content (Left) + Sidebar (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Article Content */}
            <div className="lg:col-span-8">
          
          {/* Breadcrumb - Beranda > Artikel > Judul Artikel */}
          <nav 
            className="flex items-center gap-2 text-sm mb-8 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 transition-colors hover:underline theme-focus-ring rounded px-1"
            >
              Beranda
            </Link>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <Link 
              to="/artikel" 
              className="text-gray-500 hover:text-gray-700 transition-colors hover:underline theme-focus-ring rounded px-1"
            >
              Artikel
            </Link>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <span
              className="text-gray-700 font-medium inline-block max-w-45 sm:max-w-80 lg:max-w-none truncate align-bottom"
              aria-current="page"
              title={article.title}
            >
              {article.title}
            </span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Info - Author, Date & Stats in one row on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
            {/* Left Side - Author & Date */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base text-white"
                style={{ background: GREEN }}
              >
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{article.author}</p>
                <p className="text-xs text-gray-500">{article.date}</p>
              </div>
            </div>

            {/* Right Side - Stats Bar */}
            <StatsBar
              views={views}
              likes={likes}
              shares={shares}
              isLiked={isLiked}
              onLike={handleLike}
              onShareClick={() => setShowShareMenu(!showShareMenu)}
              onShareClose={() => setShowShareMenu(false)}
              showShareMenu={showShareMenu}
              onShare={handleShare}
              onCopyLink={handleCopyLink}
            />
          </div>

          {/* Featured Image */}
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>

          {/* Lead/Description */}
          <div className="mb-10">
            <p className="text-xl leading-relaxed text-gray-700 font-medium">
              {article.description}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-800 leading-relaxed mb-6 text-base sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/artikel?tag=${tag.toLowerCase()}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: "#F3F4F6",
                    color: "#374151",
                  }}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => navigate("/artikel")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: GREEN,
                color: "white",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Kembali ke Semua Artikel
            </button>
          </div>

        </div>
        {/* End Left Column */}

        {/* Right Column - Sidebar (Artikel Terkait) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Artikel Terkait</h3>
            
            {relatedArticles.length > 0 ? (
              <>
                <div className="space-y-5">
                  {relatedArticles.map((item) => (
                    <RelatedArticleCard key={item.id} article={item} />
                  ))}
                </div>

                {/* View More Button */}
                <Link
                  to="/artikel"
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: GREEN_LIGHT,
                    color: GREEN_DARK,
                  }}
                >
                  Lihat Semua Artikel
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            ) : (
              <p className="text-gray-500 text-sm">Tidak ada artikel terkait</p>
            )}
          </div>
        </div>
        {/* End Right Column */}

      </div>
      {/* End Grid */}

        </div>
      </div>
      
      {/* Toast Notification */}
      <Toast message={toastMessage} isVisible={showToast} />
    </div>
  );
}
