import Navbar from "./components/navbar"
import Hero_slider from "./components/hero_slider";
import type { SlideItem } from "./components/hero_slider";

const slides: SlideItem[] = [
  {
    href: "#",
    backgroundImage: "https://karir.itb.ac.id/img/banner/webbanner tkt cominh soon_.png",
  },
  {
    href: "https://wa.me/message/UGRAFZRLORMMF1?src=qr",
    backgroundImage: "https://karir.itb.ac.id/img/banner/WEBBANNER KONSELING 2026-min.png",
  },
  {
    href: "#",
    backgroundImage: "https://karir.itb.ac.id/img/banner/Web banner Keuntungan member ITBCC-min.png",
  },
  {
    href: "#",
    backgroundImage: "https://karir.itb.ac.id/img/banner/Web banner konseling karier-min.png",
  },
  {
    href: "#",
    backgroundImage: "https://karir.itb.ac.id/img/banner/Web banner GELORA FIX banget.png",
  },
];

function App() {
  return (
    <div>
      <Navbar />
      <Hero_slider slides={slides} />
    </div>
  )
}

export default App
