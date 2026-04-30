import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Briefcase,
  Calendar,
  ArrowRight,
  Building2,
  Trash2,
  Trophy,
  Users,
  Monitor
} from "lucide-react";
import { currentTheme } from "../../theme/theme";
import { jobsData } from "../../data/jobData";
import { kewirausahaanData } from "../../data/kewirausahaanData";

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState<"lowongan" | "kewirausahaan">("lowongan");
  
  // Mengambil sebagian data pekerjaan dan kewirausahaan simulasi sebagai wishlist 
  // Di implementasi aslinya, data ini akan didapat dari context atau API berdasarkan id tersimpan
  const [jobs, setJobs] = useState(jobsData.slice(0, 2));
  const [kewirausahaan, setKewirausahaan] = useState(kewirausahaanData.slice(0, 2));

  const removeJob = (id: number | string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const removeKewirausahaan = (id: number) => {
    setKewirausahaan(kewirausahaan.filter(k => k.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* --- HEADER --- */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl" style={{ backgroundColor: `${currentTheme.primary}15` }}>
              <Heart size={24} style={{ color: currentTheme.primary }} fill={currentTheme.primary} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Wishlist Saya</h1>
          </div>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
            Simpan dan kelola lowongan pekerjaan, magang, serta kompetisi kewirausahaan yang Anda minati di satu tempat.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-[0.03]" style={{ background: currentTheme.primary }} />
        <div className="pointer-events-none absolute bottom-0 right-24 h-32 w-32 rounded-full opacity-[0.04]" style={{ background: currentTheme.primaryHover }} />
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-2 border-b border-gray-200" style={{ '--theme-primary': currentTheme.primary } as React.CSSProperties}>
        <button
          onClick={() => setActiveTab("lowongan")}
          className={`pb-3 px-1 text-sm font-semibold transition-colors duration-200 relative ${
            activeTab === "lowongan" ? "text-[var(--theme-primary)]" : "text-gray-500 hover:text-[var(--theme-primary)]"
          }`}
        >
          Pekerjaan & Magang
          <span className={`ml-2 inline-flex items-center justify-center text-xs rounded-full px-2 py-0.5 transition-colors ${
            activeTab === "lowongan" ? "bg-[var(--theme-primary)] text-white" : "bg-gray-100 text-gray-600"
          }`}>
            {jobs.length}
          </span>
          {activeTab === "lowongan" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] rounded-t-full" style={{ background: currentTheme.primary }} />
          )}
        </button>
        
        <button
          onClick={() => setActiveTab("kewirausahaan")}
          className={`pb-3 px-4 text-sm font-semibold transition-colors duration-200 relative ${
            activeTab === "kewirausahaan" ? "text-[var(--theme-primary)]" : "text-gray-500 hover:text-[var(--theme-primary)]"
          }`}
        >
          Kewirausahaan
          <span className={`ml-2 inline-flex items-center justify-center text-xs rounded-full px-2 py-0.5 transition-colors ${
            activeTab === "kewirausahaan" ? "bg-[var(--theme-primary)] text-white" : "bg-gray-100 text-gray-600"
          }`}>
            {kewirausahaan.length}
          </span>
          {activeTab === "kewirausahaan" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] rounded-t-full" style={{ background: currentTheme.primary }} />
          )}
        </button>
      </div>

      {/* --- CONTENT --- */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pt-4">
        {activeTab === "lowongan" ? (
          jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--theme-primary)] transition-all duration-300 relative flex flex-col justify-between" style={{ '--theme-primary': currentTheme.primary } as React.CSSProperties}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {job.logoUrl ? (
                        <img src={job.logoUrl} alt={job.company} className="w-8 h-8 object-contain" />
                      ) : (
                        <span className="font-bold text-white text-sm" style={{ backgroundColor: job.logoColor || currentTheme.primary, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {job.logo || 'C'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          job.tag === 'Magang' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {job.tag || job.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 truncate leading-tight group-hover:text-[var(--theme-primary)] transition-colors" style={{ '--theme-primary': currentTheme.primary } as React.CSSProperties}>
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                        <Building2 size={14} />
                        <span className="truncate">{job.company}</span>
                      </div>
                    </div>
                    {/* Delete button */}
                    <button 
                      onClick={() => removeJob(job.id)}
                      className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      title="Hapus dari wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-600 mb-5">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-gray-400" />
                      <span className="truncate">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="truncate">Tutup {job.deadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Estimasi Pendapatan</p>
                      <p className="font-bold text-sm text-gray-900">{job.salary || "Sesuai UMR"}</p>
                    </div>
                    <Link
                      to={`/karir/detail/${job.id}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-xl transition-transform hover:-translate-y-0.5"
                      style={{ background: currentTheme.primary, boxShadow: `0 4px 14px ${currentTheme.primary}40` }}
                    >
                      Lihat Detail
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState tabName="Lowongan & Magang" />
          )
        ) : (
          kewirausahaan.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kewirausahaan.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--theme-primary)] transition-all duration-300 relative flex flex-col justify-between" style={{ '--theme-primary': currentTheme.primary } as React.CSSProperties}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden shrink-0">
                      <img 
                        src={item.image?.startsWith('http') || item.image?.startsWith('/') ? item.image : `/${item.image}`} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">
                          {item.category}
                        </span>
                        {item.status === 'Buka' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
                          Daftar Buka
                        </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[var(--theme-primary)] transition-colors" style={{ '--theme-primary': currentTheme.primary } as React.CSSProperties}>
                        {item.title}
                      </h3>
                    </div>
                    {/* Delete button */}
                    <button 
                      onClick={() => removeKewirausahaan(item.id)}
                      className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      title="Hapus dari wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-600 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Trophy size={14} className="text-gray-400" />
                      <span className="truncate">{item.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-gray-400" />
                      <span className="truncate">{item.participantType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Monitor size={14} className="text-gray-400" />
                      <span className="truncate">{item.method}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="truncate">{item.schedule}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                    <Link
                      to={`/kewirausahaan/${item.slug}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-xl transition-transform hover:-translate-y-0.5"
                      style={{ background: currentTheme.primary, boxShadow: `0 4px 14px ${currentTheme.primary}40` }}
                    >
                      Lihat Info
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState tabName="Kewirausahaan" />
          )
        )}
      </div>
    </div>
  );
}

function EmptyState({ tabName }: { tabName: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <Heart size={28} className="text-gray-300" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">Belum ada {tabName} tersimpan</h3>
      <p className="text-gray-500 text-sm max-w-sm">
        Anda belum menambahkan item ke wishlist ini. Jelajahi halaman {tabName} untuk menemukan yang cocok untuk Anda!
      </p>
      <Link
        to={tabName === "Kewirausahaan" ? "/kewirausahaan" : "/karir/pekerjaan"}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        style={{ background: currentTheme.primary, boxShadow: `0 4px 14px ${currentTheme.primary}40` }}
      >
        Mulai Jelajahi
      </Link>
    </div>
  );
}
