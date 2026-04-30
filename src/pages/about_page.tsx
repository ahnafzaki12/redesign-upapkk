import Hero from "../components/about_page_component/hero"
import Program_Kerja from "../components/about_page_component/program_kerja"
import Tujuan from "../components/about_page_component/tujuan"
import Visi_Misi from "../components/about_page_component/visi_misi"
import Footer from "../components/footer"
import Navbar from "../components/navbar"

const About = () => {
  return (
    <div className="min-h-screen" style={{ background: "#F3F4F6" }}>
            <Navbar />
            <Hero />
            <Tujuan />
            <Visi_Misi />
            <Program_Kerja />
            <Footer />
        </div>
  )
}

export default About