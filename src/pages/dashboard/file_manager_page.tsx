import { useState, useRef, useCallback } from "react";
import {
  FolderOpen, Upload, Search, Trash2, Image, FileText,
  X, AlertCircle, CheckCircle, Loader2, Hash, Edit2
} from "lucide-react";
import { currentTheme } from "../../theme/theme";

// ─── Types ────────────────────────────────────────────────────────────────────
type FileType = "Image" | "CV (PDF)";

interface FileItem {
  id: number;
  order: number;
  type: FileType;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
}

interface FormErrors {
  type?: string;
  file?: string;
  title?: string;
  description?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ACCENT = currentTheme.primary;
const ACCENT_DARK = currentTheme.heroEnd;
const ACCENT_LIGHT = currentTheme.surfaceAlt;
const MAX_FILE_SIZE_MB = 5;

// Seed data awal agar tampilan tidak kosong
const INITIAL_FILES: FileItem[] = [
  { id: 1, order: 0, type: "Image", title: "Foto KTM", description: "Kartu Tanda Mahasiswa UPN Veteran Jawa Timur", fileName: "ktm_foto.jpg", fileSize: "320 KB", uploadedAt: "2026-04-10" },
  { id: 2, order: 1, type: "CV (PDF)", title: "CV Terbaru 2026", description: "Curriculum vitae untuk melamar pekerjaan", fileName: "cv_2026.pdf", fileSize: "1.2 MB", uploadedAt: "2026-04-22" },
];

// ─── Helper: hitung order otomatis ───────────────────────────────────────────
/**
 * Logika Auto-Order:
 * 1. Ambil semua nilai 'order' yang sudah ada dalam list.
 * 2. Mulai dari 0, cari angka terkecil yang BELUM dipakai (gap filling).
 * 3. Jika tidak ada gap, gunakan max_order + 1.
 * Contoh: orders = [0, 1, 3] → hasil = 2 (mengisi gap)
 * Contoh: orders = [0, 1, 2] → hasil = 3 (max + 1)
 */
function getNextOrder(files: FileItem[]): number {
  if (files.length === 0) return 0;
  const usedOrders = new Set(files.map((f) => f.order));
  let next = 0;
  while (usedOrders.has(next)) next++;
  return next;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
      <AlertCircle size={12} /> {msg}
    </p>
  );
}

function TypeBadge({ type }: { type: FileType }) {
  const isImage = type === "Image";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide"
      style={{
        background: isImage ? "#EFF6FF" : "#F5F3FF",
        color: isImage ? "#1D4ED8" : "#6D28D9",
      }}
    >
      {isImage ? <Image size={10} /> : <FileText size={10} />}
      {type}
    </span>
  );
}

// ─── Upload Modal ─────────────────────────────────────────────────────────────
interface UploadModalProps {
  files: FileItem[];
  onClose: () => void;
  onSubmit: (item: Omit<FileItem, "id">) => void;
}

function UploadModal({ files, onClose, onSubmit }: UploadModalProps) {
  const [type, setType] = useState<FileType | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Accept attribute berubah berdasarkan pilihan type
  const acceptAttr =
    type === "Image" ? ".jpg,.jpeg,.png" : type === "CV (PDF)" ? ".pdf" : "";

  // ── Validasi form sebelum submit ──────────────────────────────────────────
  /**
   * Error Handling Strategy:
   * - Setiap field wajib dicek satu per satu dan dikumpulkan dalam objek `errs`.
   * - File divalidasi dua tahap: (1) keberadaan file, (2) ekstensi & ukuran.
   * - Jika ada error, fungsi return false → submit DICEGAH.
   */
  const validate = useCallback((): boolean => {
    const errs: FormErrors = {};

    // 1. Validasi Type (wajib dipilih)
    if (!type) errs.type = "Pilih tipe file terlebih dahulu.";

    // 2. Validasi File (wajib ada)
    if (!selectedFile) {
      errs.file = "File wajib diunggah.";
    } else {
      const ext = selectedFile.name.split(".").pop()?.toLowerCase() ?? "";
      const sizeMB = selectedFile.size / (1024 * 1024);

      // 2a. Validasi tipe file vs pilihan dropdown
      const validExts = type === "Image" ? ["jpg", "jpeg", "png"] : ["pdf"];
      if (type && !validExts.includes(ext)) {
        errs.file = `Tipe tidak cocok. Pilih "${type}" harus berupa ${validExts.join(" / ").toUpperCase()}.`;
      }
      // 2b. Validasi ukuran file (maks 5 MB)
      else if (sizeMB > MAX_FILE_SIZE_MB) {
        errs.file = `Ukuran file melebihi batas ${MAX_FILE_SIZE_MB}MB. (${sizeMB.toFixed(1)}MB)`;
      }
    }

    // 3. Validasi Title (wajib diisi)
    if (!title.trim()) errs.title = "Judul file wajib diisi.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [type, selectedFile, title]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    // Reset error file saat user memilih file baru
    if (file) setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    // Simulasi delay upload (ganti dengan API call asli)
    await new Promise((r) => setTimeout(r, 1200));

    const sizeMB = selectedFile!.size / (1024 * 1024);
    const sizeStr = sizeMB < 1 ? `${Math.round(sizeMB * 1024)} KB` : `${sizeMB.toFixed(1)} MB`;

    onSubmit({
      order: getNextOrder(files), // ← order dihitung otomatis di sini
      type: type as FileType,
      title: title.trim(),
      description: description.trim(),
      fileName: selectedFile!.name,
      fileSize: sizeStr,
      uploadedAt: new Date().toISOString().split("T")[0],
    });

    setIsLoading(false);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all";
  const inputFocusStyle = { "--tw-ring-color": ACCENT } as React.CSSProperties;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg" style={{ background: ACCENT_LIGHT }}>
              <Upload size={16} style={{ color: ACCENT }} />
            </div>
            <h2 className="text-base font-extrabold text-gray-800">Upload New File</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Type */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as FileType | "");
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                setErrors((prev) => ({ ...prev, type: undefined, file: undefined }));
              }}
              className={inputClass}
              style={inputFocusStyle}
            >
              <option value="">-- Pilih Tipe --</option>
              <option value="Image">Image (JPG / PNG)</option>
              <option value="CV (PDF)">CV (PDF)</option>
            </select>
            <FieldError msg={errors.type} />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              File <span className="text-red-500">*</span>
            </label>
            <div
              className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all"
              style={{
                borderColor: errors.file ? "#EF4444" : selectedFile ? ACCENT : "#E5E7EB",
                background: selectedFile ? ACCENT_LIGHT : "#FAFAFA",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptAttr}
                className="hidden"
                onChange={handleFileChange}
                disabled={!type}
              />
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2">
                  {type === "Image" ? (
                    <Image size={18} style={{ color: ACCENT }} />
                  ) : (
                    <FileText size={18} style={{ color: ACCENT }} />
                  )}
                  <span className="text-sm font-semibold text-gray-700 truncate max-w-xs">
                    {selectedFile.name}
                  </span>
                </div>
              ) : (
                <div>
                  <Upload size={22} className="mx-auto mb-1 text-gray-300" />
                  <p className="text-sm text-gray-400">
                    {type ? `Klik untuk pilih file (${acceptAttr})` : "Pilih Type terlebih dahulu"}
                  </p>
                  <p className="text-xs text-gray-300 mt-0.5">Maks. {MAX_FILE_SIZE_MB}MB</p>
                </div>
              )}
            </div>
            <FieldError msg={errors.file} />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              placeholder="Contoh: CV Terbaru 2026"
              className={inputClass}
              style={{ ...inputFocusStyle, borderColor: errors.title ? "#EF4444" : undefined }}
            />
            <FieldError msg={errors.title} />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Description <span className="text-gray-300 font-normal normal-case">(opsional)</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi singkat tentang file ini..."
              className={`${inputClass} resize-none`}
              style={inputFocusStyle}
            />
          </div>

          {/* Order (Read-only, auto-calculated) */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Hash size={11} /> Order (otomatis)
            </label>
            <input
              type="number"
              readOnly
              value={getNextOrder(files)}
              className="w-full rounded-lg border border-gray-100 bg-gray-100 px-3.5 py-2.5 text-sm text-gray-500 cursor-not-allowed"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Urutan dihitung otomatis: nilai terkecil yang belum terpakai.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: ACCENT }}
          >
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload size={15} /> Submit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Modal ─────────────────────────────────────────────────────────────
interface EditModalProps {
  fileToEdit: FileItem;
  onClose: () => void;
  onSubmit: (updatedItem: FileItem) => void;
}

function EditModal({ fileToEdit, onClose, onSubmit }: EditModalProps) {
  const [type, setType] = useState<FileType>(fileToEdit.type);
  const [title, setTitle] = useState(fileToEdit.title);
  const [description, setDescription] = useState(fileToEdit.description);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptAttr = type === "Image" ? ".jpg,.jpeg,.png" : type === "CV (PDF)" ? ".pdf" : "";

  const validate = useCallback((): boolean => {
    const errs: FormErrors = {};
    if (!type) errs.type = "Pilih tipe file terlebih dahulu.";

    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop()?.toLowerCase() ?? "";
      const sizeMB = selectedFile.size / (1024 * 1024);
      const validExts = type === "Image" ? ["jpg", "jpeg", "png"] : ["pdf"];
      if (type && !validExts.includes(ext)) {
        errs.file = `Tipe tidak cocok. Pilih "${type}" harus berupa ${validExts.join(" / ").toUpperCase()}.`;
      } else if (sizeMB > MAX_FILE_SIZE_MB) {
        errs.file = `Ukuran file melebihi batas ${MAX_FILE_SIZE_MB}MB. (${sizeMB.toFixed(1)}MB)`;
      }
    }

    if (!title.trim()) errs.title = "Judul file wajib diisi.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [type, selectedFile, title]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    if (file) setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    let newFileName = fileToEdit.fileName;
    let newFileSize = fileToEdit.fileSize;

    if (selectedFile) {
      newFileName = selectedFile.name;
      const sizeMB = selectedFile.size / (1024 * 1024);
      newFileSize = sizeMB < 1 ? `${Math.round(sizeMB * 1024)} KB` : `${sizeMB.toFixed(1)} MB`;
    }

    onSubmit({
      ...fileToEdit,
      type,
      title: title.trim(),
      description: description.trim(),
      fileName: newFileName,
      fileSize: newFileSize,
    });
    setIsLoading(false);
  };

  const inputClass = "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all";
  const inputFocusStyle = { "--tw-ring-color": ACCENT } as React.CSSProperties;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg" style={{ background: ACCENT_LIGHT }}>
              <Edit2 size={16} style={{ color: ACCENT }} />
            </div>
            <h2 className="text-base font-extrabold text-gray-800">Edit File</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"><X size={18} /></button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Type <span className="text-red-500">*</span></label>
            <select value={type} onChange={(e) => { setType(e.target.value as FileType); setErrors((prev) => ({ ...prev, type: undefined })); }} className={inputClass} style={inputFocusStyle}>
              <option value="Image">Image (JPG / PNG)</option>
              <option value="CV (PDF)">CV (PDF)</option>
            </select>
            <FieldError msg={errors.type} />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">File <span className="text-gray-400 font-normal normal-case">(opsional, biarkan jika tidak ingin mengubah file)</span></label>
            <div className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all" style={{ borderColor: errors.file ? "#EF4444" : selectedFile ? ACCENT : "#E5E7EB", background: selectedFile ? ACCENT_LIGHT : "#FAFAFA" }} onClick={() => fileInputRef.current?.click()}>
              <input ref={fileInputRef} type="file" accept={acceptAttr} className="hidden" onChange={handleFileChange} />
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2">
                  {type === "Image" ? <Image size={18} style={{ color: ACCENT }} /> : <FileText size={18} style={{ color: ACCENT }} />}
                  <span className="text-sm font-semibold text-gray-700 truncate max-w-xs">{selectedFile.name}</span>
                </div>
              ) : (
                <div>
                  <Upload size={22} className="mx-auto mb-1 text-gray-300" />
                  <p className="text-sm text-gray-500">File saat ini: <span className="font-semibold text-gray-700">{fileToEdit.fileName}</span></p>
                  <p className="text-xs text-gray-400 mt-0.5">Klik untuk mengganti (Maks. {MAX_FILE_SIZE_MB}MB)</p>
                </div>
              )}
            </div>
            <FieldError msg={errors.file} />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Title <span className="text-red-500">*</span></label>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: undefined })); }} className={inputClass} style={{ ...inputFocusStyle, borderColor: errors.title ? "#EF4444" : undefined }} />
            <FieldError msg={errors.title} />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} resize-none`} style={inputFocusStyle} />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Hash size={11} /> Order (otomatis)</label>
            <input type="number" readOnly value={fileToEdit.order} className="w-full rounded-lg border border-gray-100 bg-gray-100 px-3.5 py-2.5 text-sm text-gray-500 cursor-not-allowed" />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} disabled={isLoading} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: ACCENT }}>
            {isLoading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><CheckCircle size={15} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FileManagerPage() {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToEdit, setFileToEdit] = useState<FileItem | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEditSubmit = (updatedItem: FileItem) => {
    setFiles((prev) => prev.map((f) => (f.id === updatedItem.id ? updatedItem : f)));
    setFileToEdit(null);
    setSuccessMsg(`"${updatedItem.title}" berhasil diupdate!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Real-time search berdasarkan title
  const filtered = files.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleUploadSubmit = (item: Omit<FileItem, "id">) => {
    const newFile: FileItem = { id: Date.now(), ...item };
    setFiles((prev) => [...prev, newFile]);
    setIsModalOpen(false);
    // Toast success
    setSuccessMsg(`"${item.title}" berhasil diupload!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Hapus file ini dari daftar?")) return;
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* ── Header Card ── */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl" style={{ background: ACCENT_LIGHT }}>
              <FolderOpen size={24} style={{ color: ACCENT }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              File Manager
            </h1>
          </div>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
            Kelola seluruh file Anda — foto, CV, dan dokumen pendukung dalam satu tempat yang terorganisir.
          </p>
        </div>
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-[0.04]" style={{ background: ACCENT }} />
        <div className="pointer-events-none absolute bottom-0 right-24 h-32 w-32 rounded-full opacity-[0.05]" style={{ background: ACCENT_DARK }} />
      </div>

      {/* ── Toolbar: Search + Upload Button ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari file berdasarkan nama..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm"
            style={{ "--tw-ring-color": ACCENT } as React.CSSProperties}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:opacity-90 transition-all active:scale-95 shrink-0"
          style={{ background: ACCENT, boxShadow: `0 4px 14px ${ACCENT}40` }}
        >
          <Upload size={16} /> Upload New File
        </button>
      </div>

      {/* ── File Table ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50">
          {["Order", "Type", "Title", "File", "Tanggal", "Aksi"].map((h, i) => (
            <p
              key={h}
              className={`text-[11px] font-bold uppercase tracking-widest text-gray-400 ${
                i === 0 ? "col-span-1" :
                i === 1 ? "col-span-2" :
                i === 2 ? "col-span-3" :
                i === 3 ? "col-span-2" :
                i === 4 ? "col-span-2" :
                "col-span-2 text-right"
              }`}
            >
              {h}
            </p>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-gray-50">
              <FolderOpen size={26} className="text-gray-300" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">
              {search ? "File tidak ditemukan" : "Belum ada file"}
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              {search
                ? `Tidak ada file dengan nama "${search}".`
                : 'Klik tombol "Upload New File" untuk menambahkan file pertama Anda.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((file) => (
              <div
                key={file.id}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50/70 transition-colors group"
              >
                {/* Order */}
                <div className="col-span-1">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold"
                    style={{ background: ACCENT_LIGHT, color: ACCENT_DARK }}
                  >
                    {file.order}
                  </span>
                </div>

                {/* Type */}
                <div className="col-span-2">
                  <TypeBadge type={file.type} />
                </div>

                {/* Title + desc */}
                <div className="col-span-3 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{file.title}</p>
                  {file.description && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">{file.description}</p>
                  )}
                </div>

                {/* File name */}
                <div className="col-span-2 min-w-0">
                  <p className="text-xs text-gray-500 truncate">{file.fileName}</p>
                  <p className="text-[11px] text-gray-400">{file.fileSize}</p>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">{file.uploadedAt}</p>
                </div>

                {/* Action */}
                <div className="col-span-2 flex justify-end gap-1">
                  <button
                    onClick={() => setFileToEdit(file)}
                    className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100"
                    title="Edit file"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    title="Hapus file"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer count */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-400">
              Menampilkan <span className="font-semibold text-gray-600">{filtered.length}</span> dari{" "}
              <span className="font-semibold text-gray-600">{files.length}</span> file
            </p>
          </div>
        )}
      </div>

      {/* ── Upload Modal ── */}
      {isModalOpen && (
        <UploadModal
          files={files}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUploadSubmit}
        />
      )}

      {/* ── Edit Modal ── */}
      {fileToEdit && (
        <EditModal
          fileToEdit={fileToEdit}
          onClose={() => setFileToEdit(null)}
          onSubmit={handleEditSubmit}
        />
      )}

      {/* ── Success Toast ── */}
      {successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl">
          <CheckCircle size={16} className="text-emerald-400" />
          <span className="text-sm font-medium">{successMsg}</span>
        </div>
      )}
    </div>
  );
}
