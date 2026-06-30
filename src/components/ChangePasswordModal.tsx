import { useEffect, useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Modal, FormInput, Button } from "./ui";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function ChangePasswordModal({ isOpen, onClose, onSave }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setShowPassword({ old: false, new: false, confirm: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Password baru dan konfirmasi password tidak cocok!");
      return;
    }
    // TODO: Connect to your API here
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ubah Password"
      titleIcon={<Shield />}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan Password
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type={showPassword.old ? "text" : "password"}
          label="Password Lama"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          required
          trailingSlot={
            <button
              type="button"
              onClick={() => togglePasswordVisibility("old")}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <FormInput
          type={showPassword.new ? "text" : "password"}
          label="Password Baru"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          minLength={6}
          trailingSlot={
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <FormInput
          type={showPassword.confirm ? "text" : "password"}
          label="Konfirmasi Password Baru"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
          trailingSlot={
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
      </form>
    </Modal>
  );
}
