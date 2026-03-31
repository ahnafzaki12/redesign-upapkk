import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import Hero_slider from "./components/hero_slider";
import type { SlideItem } from "./components/hero_slider";
import ArtikelAcara from "./components/artikel_acara";
import Job from "./components/job";
import ArticlePage from "./pages/article_page";
import ArticleDetailPage from "./pages/article_detail_page";
import EventPage from "./pages/event_page";
import { SectionHeaderDivider } from "./components/section_dividers";

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

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Navbar />
            <Hero_slider slides={slides} />
            
            {/* Section Lowongan */}
            <section className="w-full bg-white pb-4">
              <Job />
            </section>

            {/* Decorative Divider */}
            <SectionHeaderDivider />

            {/* Section Artikel & Acara */}
            <section 
              className="w-full pt-2 pb-12"
              style={{ 
                background: 'linear-gradient(180deg, #FAFDFB 0%, #F4FBF5 100%)'
              }}
            >
              <ArtikelAcara />
            </section>
          </div>
        }
      />
      <Route path="/artikel" element={<ArticlePage />} />
      <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
      <Route path="/karir/acara" element={<EventPage />} />
    </Routes>
  );
}

export default App
