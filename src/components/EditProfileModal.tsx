import { useEffect, useState } from "react";
import { currentTheme } from "../theme/theme";

const ACCENT = currentTheme.primary;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  type: "personal" | "academic" | null;
}

export default function EditProfileModal({ isOpen, onClose, onSave, initialData, type }: EditProfileModalProps) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, isOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.addEventListener("keydown", h);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg flex flex-col relative shadow-2xl overflow-hidden transform transition-all">
        {/* Header */}
        <div className="p-6 shrink-0 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">
                Edit Informasi {type === "personal" ? "Pribadi" : "Akademik"}
            </h2>
            <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-2xl cursor-pointer border-none"
            >
                ×
            </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
          <div className="space-y-4">
            {type === "personal" && (
                <>
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
                      <input type="text" name="fullName" value={formData?.fullName || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required />
                  </div>
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">NIK</label>
                      <input type="text" name="nik" value={formData?.nik || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required />
                  </div>
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat Email</label>
                      <input type="email" name="email" value={formData?.email || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required />
                  </div>
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nomor Telepon</label>
                      <input type="text" name="phone" value={formData?.phone || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required />
                  </div>
                </>
            )}

            {type === "academic" && (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Asal Universitas</label>
                        <input type="text" name="universityName" value={formData?.universityName || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">NIM</label>
                        <input type="text" name="nim" value={formData?.nim || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jenjang Pendidikan</label>
                        <select name="degree" value={formData?.degree || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required>
                            <option value="">Pilih Jenjang</option>
                            <option value="D3">D3</option>
                            <option value="D4">D4</option>
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Fakultas</label>
                        <input type="text" name="faculty" value={formData?.faculty || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jurusan</label>
                        <input type="text" name="major" value={formData?.major || ""} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 focus:bg-white" required />
                    </div>
                </>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                  Batal
              </button>
              <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 cursor-pointer shadow-sm"
                  style={{ backgroundColor: ACCENT }}
              >
                  Simpan Perubahan
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
