import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { currentTheme } from '../../lib/theme';
import { jobsData } from '../../data/jobData';
import { kewirausahaanData } from '../../data/kewirausahaanData';
import { PageHeader, StatusBadge, Button } from '../../components/ui';

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState<"lowongan" | "kewirausahaan">("lowongan");
  const navigate = useNavigate();
  
  // Mengambil sebagian data pekerjaan dan kewirausahaan simulasi sebagai wishlist 
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
      <PageHeader
        icon={<Heart />}
        title="Wishlist Saya"
        description="Simpan dan kelola lowongan pekerjaan, magang, serta kompetisi kewirausahaan yang Anda minati di satu tempat."
      />

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
                        <StatusBadge
                          label={job.tag || job.category}
                          color={job.tag === 'Magang' ? '#C2410C' : '#1D4ED8'}
                          bgColor={job.tag === 'Magang' ? '#FFEDD5' : '#DBEAFE'}
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 truncate leading-tight group-hover:text-[var(--theme-primary)] transition-colors" style={{ '--theme-primary': currentTheme.primary } as React.CSSProperties}>
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                        <Building2 size={14} />
                        <span className="truncate">{job.company}</span>
                      </div>
                    </div>
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
                    <Button 
                      variant="primary" 
                      onClick={() => navigate(`/karir/detail/${job.id}`)}
                      icon={<ArrowRight size={14} />}
                      iconPosition="right"
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState tabName="Lowongan & Magang" navigate={navigate} />
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
                        <StatusBadge
                          label={item.category}
                          color="#7E22CE"
                          bgColor="#F3E8FF"
                        />
                        {item.status === 'Buka' && (
                          <StatusBadge
                            label="Daftar Buka"
                            color="#047857"
                            bgColor="#D1FAE5"
                          />
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[var(--theme-primary)] transition-colors" style={{ '--theme-primary': currentTheme.primary } as React.CSSProperties}>
                        {item.title}
                      </h3>
                    </div>
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
                    <Button 
                      variant="primary" 
                      onClick={() => navigate(`/kewirausahaan/${item.slug}`)}
                      icon={<ArrowRight size={14} />}
                      iconPosition="right"
                    >
                      Lihat Info
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState tabName="Kewirausahaan" navigate={navigate} />
          )
        )}
      </div>
    </div>
  );
}

function EmptyState({ tabName, navigate }: { tabName: string, navigate: any }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <Heart size={28} className="text-gray-300" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">Belum ada {tabName} tersimpan</h3>
      <p className="text-gray-500 text-sm max-w-sm mb-6">
        Anda belum menambahkan item ke wishlist ini. Jelajahi halaman {tabName} untuk menemukan yang cocok untuk Anda!
      </p>
      <Button
        variant="primary"
        onClick={() => navigate(tabName === "Kewirausahaan" ? "/kewirausahaan" : "/karir/pekerjaan")}
      >
        Mulai Jelajahi
      </Button>
    </div>
  );
}
