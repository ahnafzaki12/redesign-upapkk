const visiItems = [
    {
        text: 'Sebagai pusat informasi lowongan kerja dan pembinaan karir serta pengembangan kewirausahaan dalam mempersiapkan mahasiswa dan alumni yang tangguh, inovatif, dan kreatif dalam dunia kerja serta memiliki jiwa wirausaha dalam menghadapi era globalisasi.',
    },
];

const misiItems = [
    {
        text: 'Mempersiapkan mahasiswa dan alumni UPN "Veteran" Jawa Timur untuk memiliki kemampuan dengan standar kompetensi softskill dan hardskill yang dibutuhkan dunia usaha dan industri.',
    },
    {
        text: 'Menciptakan jaringan kerja sama yang seluas-luasnya dengan institusi pemerintah, DUDI.',
    },
    {
        text: 'Memberikan informasi lowongan kerja dan magang, melakukan pembekalan persiapan menghadapai dunia kerja dan kewirausahaan.',
    },
    {
        text: 'Melaksanakan kegiatan yang dapat mempercepat tumbuh dan berkembangnya jiwa wirausaha mahasiswa UPN "Veteran" Jawa Timur.',
    },
    {
        text: 'Melakukan tracer study secara sensus terhadap alumni UPN "Veteran" Jawa Timur.',
    },
];

const theme = {
    primary: '#2F8F8F',
    primaryHover: '#3B9C9C',
    primarySoft: '#92D2D2',
    surface: '#F2FBFB',
    surfaceAlt: '#E3F4F4',
    surfaceStrong: '#D0ECEC',
    border: '#B9E2E2',
    text: '#1F6464',
    textMuted: '#4A8585',
    accent: '#D8F0F0',
    white: '#FFFFFF',
};

const Visi_Misi = () => {
    return (
        <section style={{ backgroundColor: theme.white }} className="py-16 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
                        Visi dan Misi{' '}
                        <span style={{ color: theme.primary }}>CDC UPNVJT</span>
                    </h2>
                    <p style={{ color: theme.textMuted }} className="text-sm max-w-lg mx-auto">
                        Setiap langkah yang kami ambil selalu didorong oleh visi yang jelas dan misi yang kuat.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* VISI Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <h3 className="text-xl font-bold" style={{ color: theme.primary }}>Visi</h3>
                            <span style={{ color: theme.primarySoft }} className="text-lg">↗</span>
                        </div>

                        {visiItems.map((item, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <p style={{ color: theme.textMuted }} className="text-sm leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Divider with timeline dots (center) — only visible on lg */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                    </div>

                    {/* MISI Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <h3 className="text-xl font-bold" style={{ color: theme.primary }}>Misi</h3>
                            <span style={{ color: theme.primarySoft }} className="text-lg">↗</span>
                        </div>

                        <div className="relative">
                            {/* Vertical timeline line */}
                            <div
                                className="absolute left-3.75 top-4 bottom-4 w-0.5"
                                style={{ backgroundColor: theme.border }}
                            />

                            <div className="flex flex-col gap-6">
                                {misiItems.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-start relative">
                                        {/* Timeline dot */}
                                        <div
                                            className="shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10"
                                            style={{
                                                borderColor: theme.primary,
                                                backgroundColor: theme.white,
                                            }}
                                        >
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: theme.primary }}
                                            />
                                        </div>

                                        <div className="flex gap-3 items-start">
                                            <p style={{ color: theme.textMuted }} className="text-sm leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Visi_Misi;