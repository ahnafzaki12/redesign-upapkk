import { useEffect, useState } from "react";
import { Edit2 } from "lucide-react";
import { Modal, FormInput, FormSelect, Button } from "./ui";

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

  const title = `Edit Informasi ${type === "personal" ? "Pribadi" : "Akademik"}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      titleIcon={<Edit2 />}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan Perubahan
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "personal" && (
          <>
            <FormInput
              label="Nama Lengkap"
              name="fullName"
              value={formData?.fullName || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="NIK"
              name="nik"
              value={formData?.nik || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              type="email"
              label="Alamat Email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Nomor Telepon"
              name="phone"
              value={formData?.phone || ""}
              onChange={handleChange}
              required
            />
          </>
        )}

        {type === "academic" && (
          <>
            <FormInput
              label="Asal Universitas"
              name="universityName"
              value={formData?.universityName || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="NIM"
              name="nim"
              value={formData?.nim || ""}
              onChange={handleChange}
              required
            />
            <FormSelect
              label="Jenjang Pendidikan"
              value={formData?.degree || ""}
              onChange={(val) => setFormData((prev: any) => ({ ...prev, degree: val }))}
              options={[
                { label: "D3", value: "D3" },
                { label: "D4", value: "D4" },
                { label: "S1", value: "S1" },
                { label: "S2", value: "S2" },
                { label: "S3", value: "S3" }
              ]}
              placeholder="Pilih Jenjang"
              required
            />
            <FormInput
              label="Fakultas"
              name="faculty"
              value={formData?.faculty || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Jurusan"
              name="major"
              value={formData?.major || ""}
              onChange={handleChange}
              required
            />
          </>
        )}
      </form>
    </Modal>
  );
}
