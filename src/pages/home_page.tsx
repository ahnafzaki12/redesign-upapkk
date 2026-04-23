import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Hero_slider from "../components/hero_slider";
import type { SlideItem } from "../components/hero_slider";
import ArtikelAcara from "../components/artikel_acara";
import Job from "../components/job";
import { SectionHeaderDivider } from "../components/section_dividers";
import Footer from "../components/footer";
import { currentTheme } from "../theme/theme";

type UniversityType = "UPN" | "NON_UPN";

interface RegistrationSuccessPayload {
  universityType: UniversityType;
  fullName: string;
}

interface HomeNavigationState {
  registrationSuccess?: RegistrationSuccessPayload;
}

const slides: SlideItem[] = [
  {
    backgroundImage: "https://upapkk.upnjatim.ac.id/storage/home-slider/tC9B518aEKoJk89JpWoezZNd4x9u9HxiWgR5GgHf.jpg",
  },
  {
    backgroundImage: "https://upapkk.upnjatim.ac.id/storage/home-slider/nBvkzIwADFYLh3I1vjkwziJAmi5GFGhIYkbcP0lI.jpg",
  },
  {
    backgroundImage: "https://upapkk.upnjatim.ac.id/storage/home-slider/RqRJixdnJhzg1LvFHAy8y4jboHvrF0ZCnTyNSp5B.jpg",
  },
  {
    backgroundImage: "https://upapkk.upnjatim.ac.id/storage/home-slider/v6r3LkA8uWCyKuHtY6q64KC3SVuFzIBD9oLvLPk9.jpg",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState = location.state as HomeNavigationState | null;
  const registrationSuccess = navigationState?.registrationSuccess ?? null;

  useEffect(() => {
    if (!registrationSuccess) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate(location.pathname, { replace: true, state: null });
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [location.pathname, navigate, registrationSuccess]);

  const successTitle = "Berhasil";
  const isNonUpn = registrationSuccess?.universityType === "NON_UPN";
  const successMessage = isNonUpn
    ? `Registrasi berhasil. Yth. ${registrationSuccess?.fullName || "pengguna"}, akun non-UPN Anda akan diaktifkan setelah verifikasi admin selesai. Email konfirmasi telah dikirim ke alamat email Anda, silakan ikuti instruksi yang tertera. Jika email belum diterima, hubungi upapkk@upnjatim.ac.id.`
    : `Registrasi berhasil. Yth. ${registrationSuccess?.fullName || "pengguna"}, data akun UPN Anda telah tercatat dengan baik. Email konfirmasi telah dikirim ke alamat email Anda, silakan ikuti instruksi yang tertera. Jika email belum diterima, hubungi upapkk@upnjatim.ac.id.`;

  return (
    <>
      <Navbar />
      <Hero_slider slides={slides} />

      <Job />  

      <SectionHeaderDivider />

      <section
        className="w-full pt-2 pb-12"
        style={{
          background: `linear-gradient(180deg, ${currentTheme.surface} 0%, ${currentTheme.surfaceAlt} 100%)`
        }}
      >
        <ArtikelAcara />
      </section>

      <Footer />

      {registrationSuccess ? (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-black/45 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              navigate(location.pathname, { replace: true, state: null });
            }
          }}
        >
          <div
            className="w-full max-w-4xl rounded-2xl bg-white px-6 py-10 text-center shadow-2xl sm:px-14 sm:py-12"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-register-success-title"
            aria-describedby="home-register-success-desc"
          >
            <div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4"
              style={{ borderColor: `rgba(var(--pg-primary-rgb),0.92)` }}
            >
              <svg
                width="54"
                height="54"
                viewBox="0 0 24 24"
                fill="none"
                stroke={currentTheme.heroEnd}
                strokeWidth="2.6"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 id="home-register-success-title" className="mt-8 text-4xl font-bold text-gray-700">
              {successTitle}
            </h2>
            <p
              id="home-register-success-desc"
              className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-600"
            >
              {successMessage}
            </p>

            <button
              type="button"
              onClick={() => navigate(location.pathname, { replace: true, state: null })}
              className="mt-10 rounded-xl px-8 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90"
              style={{ backgroundColor: currentTheme.heroEnd }}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HomePage;