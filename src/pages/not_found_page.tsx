import { Link } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { currentTheme } from "../theme/theme";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-20 text-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${currentTheme.primary} 0%, transparent 70%)` }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          {/* Icon */}
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-sm transform -rotate-6"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 100%)`,
              boxShadow: `0 10px 25px -5px rgba(47, 143, 143, 0.3)`
            }}
          >
            <Compass size={48} color="white" strokeWidth={1.5} />
          </div>

          {/* Text Content */}
          <h1 
            className="text-8xl sm:text-9xl font-black mb-4 tracking-tighter"
            style={{ 
              color: currentTheme.primary,
              textShadow: "4px 4px 0px rgba(47, 143, 143, 0.1)"
            }}
          >
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
            Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman tersebut mungkin telah dihapus, diubah namanya, atau tidak pernah ada sama sekali.
          </p>

          {/* Action Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
            style={{ background: currentTheme.primary }}
          >
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
