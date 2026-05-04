import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ArticlePage from "../pages/article_page";
import ArticleDetailPage from "../pages/article_detail_page";
import EventPage from "../pages/event_page";
import EventDetailPage from "../pages/event_detail_page";
import HomePage from "../pages/home_page";
import MagangPage from "../pages/intern_page";
import JobPag from "../pages/job_page";
import JobDetailPage from "../pages/job_detail_page";
import ApplyPage from "../pages/apply_page";
import CompanyDetailPage from "../pages/company_detail_page";
import CompanyPage from "../pages/company_page";
import RegisterPage from "../pages/register_page";
import LoginPage from "../pages/login_page";
import DashboardPage from "../pages/dashboard_page";
import MembershipJobseekerPage from "../pages/membership_guide_page";
import KewirausahaanPage from "../pages/kewirausahaan_page";
import KewirausahaanDetailPage from "../pages/kewirausahaan_detail_page";
import About from "../pages/about_page";
import FAQ_page from "../pages/FAQ_page";
import Contact_page from "../pages/contact_page";
import NotFoundPage from "../pages/not_found_page";

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
        <Route path="/karir/magang" element={<MagangPage />} />
        <Route path="/karir/pekerjaan" element={<JobPag />} />
        <Route path="/karir/detail/:id" element={<JobDetailPage />} />
        <Route path="/karir/lamar/:id" element={<ApplyPage />} />
        <Route path="/karir/perusahaan" element={<CompanyPage />} />
        <Route path="/karir/perusahaan/:id" element={<CompanyDetailPage />} />
        <Route path="/registrasi" element={<GuestRoute><RegisterPage /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard/:section" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/panduan/keanggotaan" element={<MembershipJobseekerPage />} />
        <Route path="/kewirausahaan" element={<KewirausahaanPage />} />
        <Route path="/kewirausahaan/:slug" element={<KewirausahaanDetailPage />} />
        <Route
          path="/membership/jobseeker"
          element={<Navigate to="/panduan/keanggotaan" replace />}
        />
        <Route path="/tentang" element={<About />} />
        <Route path="/faq" element={<FAQ_page />} />
        <Route path="/kontak" element={<Contact_page />} />

        {/* ── Catch-All Route ── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;