import { useState } from "react";
import { Plus, Trash2, Link as LinkIcon, Bold, Italic, List, Link2, Download } from "lucide-react";
import { currentTheme } from "../../theme/theme";

export default function CVBuilderPage() {
    const [details, setDetails] = useState({
        jobTitle: "",
        fullName: "",
        address: "",
        email: "",
        bio: ""
    });

    const [educations, setEducations] = useState([{ id: 1, institution: "", degree: "", year: "" }]);
    const [experiences, setExperiences] = useState([{ id: 1, company: "", role: "", year: "", description: "" }]);
    const [organizations, setOrganizations] = useState([{ id: 1, name: "", role: "", year: "", description: "" }]);
    const [projects, setProjects] = useState([{ id: 1, name: "", role: "", year: "", description: "" }]);
    const [skills, setSkills] = useState("");
    const [socials, setSocials] = useState([{ id: 1, platform: "", url: "" }]);

    const ACCENT = currentTheme.primary;

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const addItem = (setter: any, items: any[], defaultItem: any) => {
        setter([...items, { ...defaultItem, id: Date.now() }]);
    };

    const removeItem = (setter: any, items: any[], id: number) => {
        setter(items.filter((item: any) => item.id !== id));
    };

    const updateItem = (setter: any, items: any[], id: number, field: string, value: string) => {
        setter(items.map((item: any) => item.id === id ? { ...item, [field]: value } : item));
    };

    const calculateProgress = () => {
        let points = 0;
        if (details.jobTitle.trim() !== "") points++;
        if (details.fullName.trim() !== "") points++;
        if (details.address.trim() !== "") points++;
        if (details.email.trim() !== "") points++;
        if (details.bio.trim() !== "") points++;

        if (educations.some(e => e.institution.trim() !== "" || e.degree.trim() !== "")) points++;
        if (experiences.some(e => e.company.trim() !== "" || e.role.trim() !== "")) points++;
        if (organizations.some(o => o.name.trim() !== "" || o.role.trim() !== "")) points++;
        if (projects.some(p => p.name.trim() !== "" || p.role.trim() !== "")) points++;
        if (skills.trim() !== "") points++;
        if (socials.some(s => s.platform.trim() !== "" || s.url.trim() !== "")) points++;

        return Math.round((points / 11) * 100);
    };

    const progress = calculateProgress();
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Top Header area */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 relative">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                        <img src="/logo_upnvjt.png" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                        CV {details.fullName ? `${details.fullName}` : "Anda"}
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        {details.jobTitle ? details.jobTitle : "Belum ada posisi"}
                    </p>
                </div>
                <div className="shrink-0 relative flex items-center justify-center w-16 h-16">
                    <svg width="64" height="64" viewBox="0 0 64 64" className="transform -rotate-90">
                        <circle cx="32" cy="32" r={radius} stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                        <circle
                            cx="32" cy="32" r={radius}
                            stroke={ACCENT}
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-500 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: ACCENT }}>
                        {progress}%
                    </div>
                </div>
            </div>

            {/* Your Details */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Data Diri</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Posisi Pekerjaan</label>
                        <input type="text" name="jobTitle" value={details.jobTitle} onChange={handleDetailChange} placeholder="mis. Desainer Layanan" className="w-full p-3.5 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Nama Lengkap</label>
                        <input type="text" name="fullName" value={details.fullName} onChange={handleDetailChange} placeholder="mis. Budi Santoso" className="w-full p-3.5 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Alamat Lengkap</label>
                        <input type="text" name="address" value={details.address} onChange={handleDetailChange} placeholder="mis. Jl. Sudirman No. 12" className="w-full p-3.5 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Alamat Email</label>
                        <input type="email" name="email" value={details.email} onChange={handleDetailChange} placeholder="mis. budi@example.com" className="w-full p-3.5 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-colors" />
                    </div>
                </div>
            </div>

            {/* 1. Short Bio */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Ringkasan Singkat</h2>
                <p className="text-sm text-gray-500 mb-4">Buatlah singkat dan padat - Perekrut rata-rata hanya menghabiskan 6 detik untuk setiap resume.</p>
                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">Tidak ada masalah terdeteksi</span>
                        <div className="flex items-center gap-3 text-gray-500">
                            <button className="hover:text-gray-900"><Bold size={16} /></button>
                            <button className="hover:text-gray-900"><Italic size={16} /></button>
                            <button className="hover:text-gray-900"><List size={16} /></button>
                            <button className="hover:text-gray-900"><Link2 size={16} /></button>
                        </div>
                    </div>
                    <textarea
                        name="bio"
                        value={details.bio}
                        onChange={handleDetailChange}
                        rows={5}
                        placeholder="Tuliskan ringkasan profesional Anda di sini..."
                        className="w-full p-4 border-none focus:ring-0 resize-y"
                    ></textarea>
                </div>
            </div>

            {/* 2. Pendidikan */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Pendidikan</h2>
                <div className="space-y-4">
                    {educations.map((edu) => (
                        <div key={edu.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 relative group">
                            <button onClick={() => removeItem(setEducations, educations, edu.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Institusi / Universitas</label>
                                    <input type="text" value={edu.institution} onChange={(e) => updateItem(setEducations, educations, edu.id, "institution", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. UPN Veteran Jawa Timur" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Gelar / Jurusan</label>
                                    <input type="text" value={edu.degree} onChange={(e) => updateItem(setEducations, educations, edu.id, "degree", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. S1 Informatika" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Tahun Lulus</label>
                                    <input type="text" value={edu.year} onChange={(e) => updateItem(setEducations, educations, edu.id, "year", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. 2022 - 2026" />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem(setEducations, educations, { institution: "", degree: "", year: "" })} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 py-2">
                        <Plus size={16} /> Tambah Pendidikan
                    </button>
                </div>
            </div>

            {/* 3. Pengalaman Bekerja / Magang */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Pengalaman Bekerja / Magang</h2>
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 relative group">
                            <button onClick={() => removeItem(setExperiences, experiences, exp.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Perusahaan</label>
                                    <input type="text" value={exp.company} onChange={(e) => updateItem(setExperiences, experiences, exp.id, "company", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. PT Maju Bersama" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Posisi / Role</label>
                                    <input type="text" value={exp.role} onChange={(e) => updateItem(setExperiences, experiences, exp.id, "role", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. Software Engineer Intern" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Tahun / Durasi</label>
                                    <input type="text" value={exp.year} onChange={(e) => updateItem(setExperiences, experiences, exp.id, "year", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. Jan 2025 - Jun 2025" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Deskripsi Pekerjaan</label>
                                    <textarea value={exp.description} onChange={(e) => updateItem(setExperiences, experiences, exp.id, "description", e.target.value)} rows={3} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Deskripsikan tanggung jawab dan pencapaian Anda..."></textarea>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem(setExperiences, experiences, { company: "", role: "", year: "", description: "" })} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 py-2">
                        <Plus size={16} /> Tambah Pengalaman
                    </button>
                </div>
            </div>

            {/* 4. Pengalaman Organisasi */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Pengalaman Organisasi</h2>
                <div className="space-y-4">
                    {organizations.map((org) => (
                        <div key={org.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 relative group">
                            <button onClick={() => removeItem(setOrganizations, organizations, org.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Organisasi</label>
                                    <input type="text" value={org.name} onChange={(e) => updateItem(setOrganizations, organizations, org.id, "name", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. BEM Fakultas" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Posisi / Role</label>
                                    <input type="text" value={org.role} onChange={(e) => updateItem(setOrganizations, organizations, org.id, "role", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. Ketua Divisi IT" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Tahun / Durasi</label>
                                    <input type="text" value={org.year} onChange={(e) => updateItem(setOrganizations, organizations, org.id, "year", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. 2023 - 2024" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Deskripsi</label>
                                    <textarea value={org.description} onChange={(e) => updateItem(setOrganizations, organizations, org.id, "description", e.target.value)} rows={3} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Deskripsikan peran dan aktivitas Anda..."></textarea>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem(setOrganizations, organizations, { name: "", role: "", year: "", description: "" })} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 py-2">
                        <Plus size={16} /> Tambah Organisasi
                    </button>
                </div>
            </div>

            {/* 5. Pengalaman Proyek */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Pengalaman Proyek</h2>
                <div className="space-y-4">
                    {projects.map((proj) => (
                        <div key={proj.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 relative group">
                            <button onClick={() => removeItem(setProjects, projects, proj.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Proyek</label>
                                    <input type="text" value={proj.name} onChange={(e) => updateItem(setProjects, projects, proj.id, "name", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. Sistem Informasi Akademik" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Posisi / Role</label>
                                    <input type="text" value={proj.role} onChange={(e) => updateItem(setProjects, projects, proj.id, "role", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. Frontend Developer" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Tahun</label>
                                    <input type="text" value={proj.year} onChange={(e) => updateItem(setProjects, projects, proj.id, "year", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. 2024" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Deskripsi Proyek</label>
                                    <textarea value={proj.description} onChange={(e) => updateItem(setProjects, projects, proj.id, "description", e.target.value)} rows={3} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Deskripsikan proyek dan kontribusi Anda..."></textarea>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem(setProjects, projects, { name: "", role: "", year: "", description: "" })} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 py-2">
                        <Plus size={16} /> Tambah Proyek
                    </button>
                </div>
            </div>

            {/* 6. Keterampilan & Sertifikasi */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Keterampilan & Sertifikasi</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Keterampilan (Skills) & Sertifikasi</label>
                        <textarea
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            rows={4}
                            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-colors"
                            placeholder="mis. ReactJS, TailwindCSS, Sertifikasi UI/UX (Google), dll. Pisahkan dengan koma atau baris baru."
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* 7. Sosial Media Link */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Sosial Media Link</h2>
                <div className="space-y-4">
                    {socials.map((social) => (
                        <div key={social.id} className="flex items-center gap-4 group">
                            <div className="w-1/3">
                                <input type="text" value={social.platform} onChange={(e) => updateItem(setSocials, socials, social.id, "platform", e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="mis. LinkedIn" />
                            </div>
                            <div className="flex-1 relative">
                                <LinkIcon size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                <input type="url" value={social.url} onChange={(e) => updateItem(setSocials, socials, social.id, "url", e.target.value)} className="w-full p-3 pl-9 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="https://..." />
                            </div>
                            <button onClick={() => removeItem(setSocials, socials, social.id)} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <button onClick={() => addItem(setSocials, socials, { platform: "", url: "" })} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 py-2">
                        <Plus size={16} /> Tambah Link
                    </button>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-4">
                <button className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                    Pratinjau CV
                </button>
                <button
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
                    style={{ backgroundColor: ACCENT }}
                >
                    <Download size={18} /> Simpan & Download CV
                </button>
            </div>

        </div>
    );
}
