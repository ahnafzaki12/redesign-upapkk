import { useState, useRef, useCallback } from "react";
import {
  FolderOpen, Upload, Trash2, Image, FileText,
  CheckCircle, Hash, Edit2
} from "lucide-react";
import { currentTheme } from "../../theme/theme";
import {
  Button,
  FormInput,
  FormTextarea,
  FormSelect,
  Modal,
  SearchInput,
  PageHeader,
  StatusBadge
} from "../../components/ui";

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
function getNextOrder(files: FileItem[]): number {
  if (files.length === 0) return 0;
  const usedOrders = new Set(files.map((f) => f.order));
  let next = 0;
  while (usedOrders.has(next)) next++;
  return next;
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

  const acceptAttr = type === "Image" ? ".jpg,.jpeg,.png" : type === "CV (PDF)" ? ".pdf" : "";

  const validate = useCallback((): boolean => {
    const errs: FormErrors = {};
    if (!type) errs.type = "Pilih tipe file terlebih dahulu.";

    if (!selectedFile) {
      errs.file = "File wajib diunggah.";
    } else {
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

    const sizeMB = selectedFile!.size / (1024 * 1024);
    const sizeStr = sizeMB < 1 ? `${Math.round(sizeMB * 1024)} KB` : `${sizeMB.toFixed(1)} MB`;

    onSubmit({
      order: getNextOrder(files),
      type: type as FileType,
      title: title.trim(),
      description: description.trim(),
      fileName: selectedFile!.name,
      fileSize: sizeStr,
      uploadedAt: new Date().toISOString().split("T")[0],
    });

    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Upload New File"
      titleIcon={<Upload />}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={isLoading} icon={<Upload size={15} />}>
            Submit
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormSelect
          label="Type"
          required
          value={type}
          onChange={(val) => {
            setType(val as FileType | "");
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setErrors((prev) => ({ ...prev, type: undefined, file: undefined }));
          }}
          options={[
            { label: "Image (JPG / PNG)", value: "Image" },
            { label: "CV (PDF)", value: "CV (PDF)" }
          ]}
          placeholder="-- Pilih Tipe --"
          error={errors.type}
        />

        {/* Custom File Upload Box */}
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            File <span className="text-red-500">*</span>
          </label>
          <div
            className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all hover:bg-gray-50"
            style={{
              borderColor: errors.file ? "#EF4444" : selectedFile ? ACCENT : "#E5E7EB",
              background: selectedFile ? ACCENT_LIGHT : undefined,
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
          {errors.file && <p className="text-xs text-red-500 mt-1.5">{errors.file}</p>}
        </div>

        <FormInput
          label="Title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          placeholder="Contoh: CV Terbaru 2026"
          error={errors.title}
        />

        <FormTextarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi singkat tentang file ini..."
          rows={3}
          className="resize-none"
        />

        <FormInput
          label="Order (Otomatis)"
          value={String(getNextOrder(files))}
          onChange={() => {}}
          readOnly
          trailingSlot={<Hash size={14} className="text-gray-400" />}
        />
        <p className="-mt-3 text-[11px] text-gray-400">
          Urutan dihitung otomatis: nilai terkecil yang belum terpakai.
        </p>
      </div>
    </Modal>
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

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit File"
      titleIcon={<Edit2 />}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={isLoading} icon={<CheckCircle size={15} />}>
            Save Changes
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormSelect
          label="Type"
          required
          value={type}
          onChange={(val) => { setType(val as FileType); setErrors((prev) => ({ ...prev, type: undefined })); }}
          options={[
            { label: "Image (JPG / PNG)", value: "Image" },
            { label: "CV (PDF)", value: "CV (PDF)" }
          ]}
          placeholder="-- Pilih Tipe --"
          error={errors.type}
        />

        {/* Custom File Upload Box */}
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            File <span className="text-gray-400 font-normal normal-case">(opsional, biarkan jika tidak ingin mengubah file)</span>
          </label>
          <div
            className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all hover:bg-gray-50"
            style={{
              borderColor: errors.file ? "#EF4444" : selectedFile ? ACCENT : "#E5E7EB",
              background: selectedFile ? ACCENT_LIGHT : undefined,
            }}
            onClick={() => fileInputRef.current?.click()}
          >
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
          {errors.file && <p className="text-xs text-red-500 mt-1.5">{errors.file}</p>}
        </div>

        <FormInput
          label="Title"
          required
          value={title}
          onChange={(e) => { setTitle(e.target.value); if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: undefined })); }}
          error={errors.title}
        />

        <FormTextarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="resize-none"
        />

        <FormInput
          label="Order (Otomatis)"
          value={String(fileToEdit.order)}
          onChange={() => {}}
          readOnly
          trailingSlot={<Hash size={14} className="text-gray-400" />}
        />
      </div>
    </Modal>
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

  const filtered = files.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleUploadSubmit = (item: Omit<FileItem, "id">) => {
    const newFile: FileItem = { id: Date.now(), ...item };
    setFiles((prev) => [...prev, newFile]);
    setIsModalOpen(false);
    setSuccessMsg(`"${item.title}" berhasil diupload!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Hapus file ini dari daftar?")) return;
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<FolderOpen />}
        title="File Manager"
        description="Kelola seluruh file Anda — foto, CV, dan dokumen pendukung dalam satu tempat yang terorganisir."
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput 
          value={search}
          onChange={setSearch}
          placeholder="Cari file berdasarkan nama..."
          className="flex-1"
        />
        <Button 
          variant="primary" 
          onClick={() => setIsModalOpen(true)} 
          icon={<Upload size={16} />}
        >
          Upload New File
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
                <div className="col-span-1">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold"
                    style={{ background: ACCENT_LIGHT, color: ACCENT_DARK }}
                  >
                    {file.order}
                  </span>
                </div>

                <div className="col-span-2">
                  <StatusBadge 
                    label={file.type}
                    color={file.type === "Image" ? "#1D4ED8" : "#6D28D9"}
                    bgColor={file.type === "Image" ? "#EFF6FF" : "#F5F3FF"}
                    icon={file.type === "Image" ? <Image /> : <FileText />}
                  />
                </div>

                <div className="col-span-3 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{file.title}</p>
                  {file.description && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">{file.description}</p>
                  )}
                </div>

                <div className="col-span-2 min-w-0">
                  <p className="text-xs text-gray-500 truncate">{file.fileName}</p>
                  <p className="text-[11px] text-gray-400">{file.fileSize}</p>
                </div>

                <div className="col-span-2">
                  <p className="text-xs text-gray-500">{file.uploadedAt}</p>
                </div>

                <div className="col-span-2 flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFileToEdit(file)}
                    className="opacity-0 group-hover:opacity-100"
                    title="Edit file"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 text-gray-400"
                    title="Hapus file"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-400">
              Menampilkan <span className="font-semibold text-gray-600">{filtered.length}</span> dari{" "}
              <span className="font-semibold text-gray-600">{files.length}</span> file
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <UploadModal
          files={files}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUploadSubmit}
        />
      )}

      {fileToEdit && (
        <EditModal
          fileToEdit={fileToEdit}
          onClose={() => setFileToEdit(null)}
          onSubmit={handleEditSubmit}
        />
      )}

      {successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl">
          <CheckCircle size={16} className="text-emerald-400" />
          <span className="text-sm font-medium">{successMsg}</span>
        </div>
      )}
    </div>
  );
}
