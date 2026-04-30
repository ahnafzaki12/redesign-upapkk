import { currentTheme } from "../../theme/theme";

const HOME_DIVIDER = {
    title: currentTheme.text,
} as const;

const tujuanItems = [
    {
        icon: "🎓",
        title: "Karir Mahasiswa",
        description: "Membina dan mengembangkan karir mahasiswa dan alumni",
    },
    {
        icon: "🤝",
        title: "Kualitas Alumni",
        description:
            "Meningkatkan kualitas mahasiswa dan alumni untuk berintegritas dengan dunia usaha",
    },
    {
        icon: "🔗",
        title: "Kerjasama Kealumnian",
        description: "Pengembangan hubungan dan kerjasama kealumnian",
    },
    {
        icon: "💼",
        title: "Wirausaha & Profesionalisme",
        description:
            "Membina jiwa wirausaha dan keprofesionalisme mahasiswa sebagai bekal memasuki dunia kerja",
    },
];

const Tujuan = () => {
    return (
        <section className="py-16 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2"
                        style={{ color: HOME_DIVIDER.title }}>Tujuan</h2>
                    <div className="w-16 h-0.5 mx-auto mb-4" style={{ color: HOME_DIVIDER.title }} />
                    <p className="text-slate-500 max-w-xl mx-auto">
                        Tujuan kami adalah mendukung mahasiswa dan alumni dalam
                        pengembangan karir dan profesionalisme
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tujuanItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tujuan;