import { currentTheme } from "../../theme/theme"


const HERO_BG = currentTheme.heroStart

const Hero = () => {
    return (
        <section className="px-4 sm:px-6 py-16" style={{ background: HERO_BG }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                   Tentang Kami
                </h1>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Unit Pendukung Akademik - Pengembang Kewirausahaan dan Karir merupakan sebuah Lembaga yang berfokus di bidang Pengembangan karir dan Kewirusahaan.
                </p>
            </div>
        </section>
    )
}

export default Hero