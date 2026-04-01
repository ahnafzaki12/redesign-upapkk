import Navbar from "../components/navbar";
import Hero_slider from "../components/hero_slider";
import type { SlideItem } from "../components/hero_slider";
import ArtikelAcara from "../components/artikel_acara";
import Job from "../components/job";
import { SectionHeaderDivider } from "../components/section_dividers";
import Footer from "../components/footer";

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
  return (
    <>
      <Navbar />
      <Hero_slider slides={slides} />

      
      <Job />
  

      <SectionHeaderDivider />

      <section
        className="w-full pt-2 pb-12"
        style={{
          background: 'linear-gradient(180deg, #FAFDFB 0%, #F4FBF5 100%)'
        }}
      >
        <ArtikelAcara />
      </section>

      <Footer />
    </>
  );
};

export default HomePage;