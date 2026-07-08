import Hero from '../../features/about/components/Hero'
import Program_Kerja from '../../features/about/components/ProgramKerja'
import Tujuan from '../../features/about/components/Tujuan'
import Visi_Misi from '../../features/about/components/VisiMisi'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'

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