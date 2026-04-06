import { Routes, Route } from "react-router-dom";
import ArticlePage from "../pages/article_page";
import ArticleDetailPage from "../pages/article_detail_page";
import EventPage from "../pages/event_page";
import HomePage from "../pages/home_page";
import MagangPage from "../pages/intern_page";
import JobPag from "../pages/job_page";
import JobDetailPage from "../pages/job_detail_page";
import ApplyPage from "../pages/apply_page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/artikel" element={<ArticlePage />} />
      <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
      <Route path="/karir/acara" element={<EventPage />} />
      <Route path="/karir/magang" element={<MagangPage />} />
      <Route path="/karir/pekerjaan" element={<JobPag />} />
      <Route path="/karir/detail/:id" element={<JobDetailPage />} />
      <Route path="/karir/lamar/:id" element={<ApplyPage />} />
    </Routes>
  );
};

export default AppRoutes;