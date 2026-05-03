import { useState } from "react";
import { Edit2, MapPin, Camera } from "lucide-react";
import { currentTheme } from "../../theme/theme";
import { useAuth } from "../../contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  // Simulated data based on register_page.tsx and dashboard_page.tsx context
  const [profileData] = useState({
    fullName: user?.name || "Natashia Khaleira",
    nik: "3578123456789012",
    nim: user?.nim || "21081010001",
    email: "info@binary-fusion.com",
    phone: "(+62) 821 2554-5846",
    universityType: "UPN",
    universityName: "UPN Veteran Jawa Timur",
    degree: "S1",
    faculty: "Ilmu Komputer",
    major: user?.prodi || "Informatika",
    role: user?.accountType || "Mahasiswa",
  });

  const ACCENT = currentTheme.primary;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Page Title */}
      <div className="pb-3 border-b border-gray-100">
        <h1 className="text-xl font-bold" style={{ color: currentTheme.text }}>
          My Profile
        </h1>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative shrink-0">
          <div
            className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center"
            style={{
              background: `linear-gradient(120deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 85%)`,
            }}
          >
            {/* Fallback avatar if no image */}
            <span className="text-3xl font-bold text-white">
              {profileData.fullName.split(" ").slice(0, 2).map(n => n[0]).join("")}
            </span>
          </div>
          <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors">
            <Camera size={14} />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left mt-2 sm:mt-4">
          <h2 className="text-xl font-bold text-gray-800">{profileData.fullName}</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">{profileData.role}</p>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2 text-sm text-gray-500">
            <MapPin size={14} />
            <span>{profileData.universityName}</span>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold" style={{ color: currentTheme.text }}>
            Informasi Pribadi
          </h3>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{
              backgroundColor: ACCENT,
              color: "white"
            }}
          >
            Edit <Edit2 size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Nama Lengkap</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.fullName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">NIK</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.nik}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Peran Pengguna</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.role}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Alamat Email</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Nomor Telepon</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.phone}</p>
          </div>
        </div>
      </div>

      {/* Academic Information Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold" style={{ color: currentTheme.text }}>
            Informasi Akademik
          </h3>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border"
            style={{
              borderColor: "#E5E7EB",
              color: "#374151",
              backgroundColor: "white"
            }}
          >
            Edit <Edit2 size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Kategori Universitas</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.universityType}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Asal Universitas</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.universityName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">NIM</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.nim}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Jenjang Pendidikan</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.degree}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Fakultas</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.faculty}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 mb-1">Jurusan</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.major}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
