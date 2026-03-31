import { pastelGreen } from "../theme/pastel_green";

export function SectionHeaderDivider() {
  return (
    <div 
      className="w-full pt-8"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFDFB 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Left decorative line */}
          <div 
            className="flex-1 h-px" 
            style={{
              background: `linear-gradient(to right, transparent, ${pastelGreen.border})`
            }}
          />
          
          {/* Center content */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              style={{ 
                background: `linear-gradient(135deg, ${pastelGreen.primary} 0%, ${pastelGreen.primaryHover} 100%)`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <h2 
                className="text-2xl font-bold tracking-tight" 
                style={{ color: pastelGreen.text }}
              >
                Berita & Kegiatan
              </h2>
              <p 
                className="text-sm mt-0.5" 
                style={{ color: pastelGreen.textMuted }}
              >
                Artikel terbaru dan acara mendatang
              </p>
            </div>
          </div>
          
          {/* Right decorative line */}
          <div 
            className="flex-1 h-px" 
            style={{
              background: `linear-gradient(to left, transparent, ${pastelGreen.border})`
            }}
          />
        </div>
      </div>
    </div>
  );
}
