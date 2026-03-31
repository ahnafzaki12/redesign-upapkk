import { Routes, Route } from "react-router-dom";
import ArticlePage from "../pages/article_page";
import ArticleDetailPage from "../pages/article_detail_page";
import EventPage from "../pages/event_page";
import HomePage from "../pages/home_page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/artikel" element={<ArticlePage />} />
      <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
      <Route path="/karir/acara" element={<EventPage />} />
    </Routes>
  );
};

export default AppRoutes;