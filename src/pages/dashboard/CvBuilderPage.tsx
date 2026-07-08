import { useState } from "react";
import { Plus, Trash2, Link as LinkIcon, Bold, Italic, List, Link2, Download } from "lucide-react";
import { currentTheme } from '../../lib/theme';
import { Button, FormInput, FormTextarea } from '../../components/ui';

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
                    <FormInput
                        label="Posisi Pekerjaan"
                        name="jobTitle"
                        value={details.jobTitle}
                        onChange={handleDetailChange}
                        placeholder="mis. Desainer Layanan"
                    />
                    <FormInput
                        label="Nama Lengkap"
                        name="fullName"
                        value={details.fullName}
                        onChange={handleDetailChange}
                        placeholder="mis. Budi Santoso"
                    />
                    <FormInput
                        label="Alamat Lengkap"
                        name="address"
                        value={details.address}
                        onChange={handleDetailChange}
                        placeholder="mis. Jl. Sudirman No. 12"
                    />
                    <FormInput
                        label="Alamat Email"
                        type="email"
                        name="email"
                        value={details.email}
                        onChange={handleDetailChange}
                        placeholder="mis. budi@example.com"
                    />
                </div>
            </div>

            {/* 1. Short Bio */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Ringkasan Singkat</h2>
                <p className="text-sm text-gray-500 mb-4">Buatlah singkat dan padat - Perekrut rata-rata hanya menghabiskan 6 detik untuk setiap resume.</p>
                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 transition-shadow" style={{ "--tw-ring-color": ACCENT } as React.CSSProperties}>
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
                        className="w-full p-4 border-none focus:outline-none resize-y text-sm text-gray-800"
                    ></textarea>
                </div>
            </div>

            {/* 2. Pendidikan */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Pendidikan</h2>
                <div className="space-y-4">
                    {educations.map((edu) => (
                        <div key={edu.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 relative group">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(setEducations, educations, edu.id)}
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 text-gray-400"
                            >
                                <Trash2 size={18} />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Institusi / Universitas"
                                        value={edu.institution}
                                        onChange={(e) => updateItem(setEducations, educations, edu.id, "institution", e.target.value)}
                                        placeholder="mis. UPN Veteran Jawa Timur"
                                    />
                                </div>
                                <FormInput
                                    label="Gelar / Jurusan"
                                    value={edu.degree}
                                    onChange={(e) => updateItem(setEducations, educations, edu.id, "degree", e.target.value)}
                                    placeholder="mis. S1 Informatika"
                                />
                                <FormInput
                                    label="Tahun Lulus"
                                    value={edu.year}
                                    onChange={(e) => updateItem(setEducations, educations, edu.id, "year", e.target.value)}
                                    placeholder="mis. 2022 - 2026"
                                />
                            </div>
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        onClick={() => addItem(setEducations, educations, { institution: "", degree: "", year: "" })}
                        icon={<Plus size={16} />}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                        Tambah Pendidikan
                    </Button>
                </div>
            </div>

            {/* 3. Pengalaman Bekerja / Magang */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Pengalaman Bekerja / Magang</h2>
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 relative group">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(setExperiences, experiences, exp.id)}
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 text-gray-400"
                            >
                                <Trash2 size={18} />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <FormInput
                                    label="Perusahaan"
                                    value={exp.company}
                                    onChange={(e) => updateItem(setExperiences, experiences, exp.id, "company", e.target.value)}
                                    placeholder="mis. PT Maju Bersama"
                                />
                                <FormInput
                                    label="Posisi / Role"
                                    value={exp.role}
                                    onChange={(e) => updateItem(setExperiences, experiences, exp.id, "role", e.target.value)}
                                    placeholder="mis. Software Engineer Intern"
                                />
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Tahun / Durasi"
                                        value={exp.year}
                                        onChange={(e) => updateItem(setExperiences, experiences, exp.id, "year", e.target.value)}
                                        placeholder="mis. Jan 2025 - Jun 2025"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <FormTextarea
                                        label="Deskripsi Pekerjaan"
                                        value={exp.description}
                                        onChange={(e) => updateItem(setExperiences, experiences, exp.id, "description", e.target.value)}
                                        rows={3}
                                        placeholder="Deskripsikan tanggung jawab dan pencapaian Anda..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        onClick={() => addItem(setExperiences, experiences, { company: "", role: "", year: "", description: "" })}
                        icon={<Plus size={16} />}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                        Tambah Pengalaman
                    </Button>
                </div>
            </div>

            {/* 4. Pengalaman Organisasi */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Pengalaman Organisasi</h2>
                <div className="space-y-4">
                    {organizations.map((org) => (
                        <div key={org.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 relative group">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(setOrganizations, organizations, org.id)}
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 text-gray-400"
                            >
                                <Trash2 size={18} />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <FormInput
                                    label="Nama Organisasi"
                                    value={org.name}
                                    onChange={(e) => updateItem(setOrganizations, organizations, org.id, "name", e.target.value)}
                                    placeholder="mis. BEM Fakultas"
                                />
                                <FormInput
                                    label="Posisi / Role"
                                    value={org.role}
                                    onChange={(e) => updateItem(setOrganizations, organizations, org.id, "role", e.target.value)}
                                    placeholder="mis. Ketua Divisi IT"
                                />
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Tahun / Durasi"
                                        value={org.year}
                                        onChange={(e) => updateItem(setOrganizations, organizations, org.id, "year", e.target.value)}
                                        placeholder="mis. 2023 - 2024"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <FormTextarea
                                        label="Deskripsi"
                                        value={org.description}
                                        onChange={(e) => updateItem(setOrganizations, organizations, org.id, "description", e.target.value)}
                                        rows={3}
                                        placeholder="Deskripsikan peran dan aktivitas Anda..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        onClick={() => addItem(setOrganizations, organizations, { name: "", role: "", year: "", description: "" })}
                        icon={<Plus size={16} />}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                        Tambah Organisasi
                    </Button>
                </div>
            </div>

            {/* 5. Pengalaman Proyek */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Pengalaman Proyek</h2>
                <div className="space-y-4">
                    {projects.map((proj) => (
                        <div key={proj.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 relative group">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(setProjects, projects, proj.id)}
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 text-gray-400"
                            >
                                <Trash2 size={18} />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <FormInput
                                    label="Nama Proyek"
                                    value={proj.name}
                                    onChange={(e) => updateItem(setProjects, projects, proj.id, "name", e.target.value)}
                                    placeholder="mis. Sistem Informasi Akademik"
                                />
                                <FormInput
                                    label="Posisi / Role"
                                    value={proj.role}
                                    onChange={(e) => updateItem(setProjects, projects, proj.id, "role", e.target.value)}
                                    placeholder="mis. Frontend Developer"
                                />
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Tahun"
                                        value={proj.year}
                                        onChange={(e) => updateItem(setProjects, projects, proj.id, "year", e.target.value)}
                                        placeholder="mis. 2024"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <FormTextarea
                                        label="Deskripsi Proyek"
                                        value={proj.description}
                                        onChange={(e) => updateItem(setProjects, projects, proj.id, "description", e.target.value)}
                                        rows={3}
                                        placeholder="Deskripsikan proyek dan kontribusi Anda..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        onClick={() => addItem(setProjects, projects, { name: "", role: "", year: "", description: "" })}
                        icon={<Plus size={16} />}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                        Tambah Proyek
                    </Button>
                </div>
            </div>

            {/* 6. Keterampilan & Sertifikasi */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Keterampilan & Sertifikasi</h2>
                <div className="space-y-4">
                    <FormTextarea
                        label="Keterampilan (Skills) & Sertifikasi"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        rows={4}
                        placeholder="mis. ReactJS, TailwindCSS, Sertifikasi UI/UX (Google), dll. Pisahkan dengan koma atau baris baru."
                    />
                </div>
            </div>

            {/* 7. Sosial Media Link */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Sosial Media Link</h2>
                <div className="space-y-4">
                    {socials.map((social) => (
                        <div key={social.id} className="flex items-center gap-4 group">
                            <div className="w-1/3">
                                <FormInput
                                    value={social.platform}
                                    onChange={(e) => updateItem(setSocials, socials, social.id, "platform", e.target.value)}
                                    placeholder="mis. LinkedIn"
                                />
                            </div>
                            <div className="flex-1">
                                <FormInput
                                    type="url"
                                    value={social.url}
                                    onChange={(e) => updateItem(setSocials, socials, social.id, "url", e.target.value)}
                                    placeholder="https://..."
                                    trailingSlot={<LinkIcon size={16} className="text-gray-400" />}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                onClick={() => removeItem(setSocials, socials, social.id)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                            >
                                <Trash2 size={20} />
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        onClick={() => addItem(setSocials, socials, { platform: "", url: "" })}
                        icon={<Plus size={16} />}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                        Tambah Link
                    </Button>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-4">
                <Button variant="outline" className="px-6 py-3">
                    Pratinjau CV
                </Button>
                <Button variant="primary" icon={<Download size={18} />} className="px-6 py-3">
                    Simpan & Download CV
                </Button>
            </div>

        </div>
    );
}
