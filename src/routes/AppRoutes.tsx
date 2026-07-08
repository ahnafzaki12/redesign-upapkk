import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { ArticlePage, ArticleDetailPage } from "../pages/artikel";
import { EventPage, EventDetailPage, InternPage, JobPage, JobDetailPage, ApplyPage, CompanyPage, CompanyDetailPage } from "../pages/karir";
import { HomePage } from "../pages/home";
import { RegisterPage, LoginPage } from "../pages/auth";
import { DashboardPage } from "../pages/dashboard";
import { KewirausahaanPage, KewirausahaanDetailPage } from "../pages/kewirausahaan";
import { AboutPage, FaqPage, ContactPage, MembershipGuidePage } from "../pages/info";
import { NotFoundPage } from "../pages/errors";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

// ─── Route Guards ─────────────────────────────────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artikel" element={<ArticlePage />} />
        <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
        <Route path="/karir/acara" element={<EventPage />} />
        <Route path="/karir/acara/:slug" element={<EventDetailPage />} />
        <Route path="/karir/magang" element={<InternPage />} />
        <Route path="/karir/pekerjaan" element={<JobPage />} />
        <Route path="/karir/detail/:id" element={<JobDetailPage />} />
        <Route path="/karir/lamar/:id" element={<ApplyPage />} />
        <Route path="/karir/perusahaan" element={<CompanyPage />} />
        <Route path="/karir/perusahaan/:id" element={<CompanyDetailPage />} />
        <Route path="/registrasi" element={<GuestRoute><RegisterPage /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard/:section" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/panduan/keanggotaan" element={<MembershipGuidePage />} />
        <Route path="/kewirausahaan" element={<KewirausahaanPage />} />
        <Route path="/kewirausahaan/:slug" element={<KewirausahaanDetailPage />} />
        <Route
          path="/membership/jobseeker"
          element={<Navigate to="/panduan/keanggotaan" replace />}
        />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/kontak" element={<ContactPage />} />

        {/* ── Catch-All Route ── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;