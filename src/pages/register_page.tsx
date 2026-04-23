import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { currentTheme } from "../theme/theme";

const ACCENT = currentTheme.primary;
const ACCENT_DARK = currentTheme.heroEnd;

const GUIDE_INTERNAL_ROUTE = "/panduan/keanggotaan";
const DEFAULT_UPN_NAME = "UPN Veteran Jawa Timur";

type UniversityType = "UPN" | "NON_UPN";

interface RegisterForm {
  fullName: string;
  nik: string;
  nim: string;
  degree: string;
  universityType: UniversityType;
  universityName: string;
  faculty: string;
  major: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationNavigationState {
  registrationSuccess?: {
    universityType: UniversityType;
    fullName: string;
  };
}

type FormKey = keyof RegisterForm;

type FormErrors = Partial<Record<FormKey, string>>;

const DEGREE_OPTIONS = [
  "Undergraduate",
  "Diploma",
  "Postgraduate",
  "Doctoral",
  "Professional",
] as const;

const UNIVERSITY_OPTIONS = [
  "Universitas Airlangga",
  "Institut Teknologi Sepuluh Nopember",
  "Universitas Brawijaya",
  "Universitas Gadjah Mada",
  "Institut Teknologi Bandung",
  "Universitas Indonesia",
  "Telkom University",
  "Universitas Diponegoro",
  "Lainnya",
] as const;

const REQUIRED_FIELDS: FormKey[] = [
  "fullName",
  "nik",
  "nim",
  "degree",
  "universityType",
  "universityName",
  "faculty",
  "major",
  "phone",
  "email",
  "password",
  "confirmPassword",
];

const FIELD_LABELS: Record<FormKey, string> = {
  fullName: "Nama Lengkap",
  nik: "NIK",
  nim: "NIM",
  degree: "Jenjang Pendidikan",
  universityType: "Kategori Universitas",
  universityName: "Asal Universitas",
  faculty: "Fakultas",
  major: "Jurusan",
  phone: "Nomor Telepon",
  email: "Alamat Email",
  password: "Password",
  confirmPassword: "Konfirmasi Password",
};

function validateField(field: FormKey, value: string, form: RegisterForm): string {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return `${FIELD_LABELS[field]} wajib diisi.`;
  }

  if (field === "nik" && !/^\d{16}$/.test(trimmedValue)) {
    return "NIK harus berisi 16 digit angka.";
  }

  if (field === "nim" && !/^[A-Za-z0-9]{8,20}$/.test(trimmedValue)) {
    return "NIM harus 8-20 karakter alfanumerik.";
  }

  if (field === "phone" && !/^(\+62|0)\d{8,13}$/.test(trimmedValue)) {
    return "Nomor telepon harus diawali +62 atau 0, lalu 10-15 digit.";
  }

  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return "Format email tidak valid.";
  }

  if (field === "password") {
    if (trimmedValue.length < 8) {
      return "Password minimal 8 karakter.";
    }

    const hasLetter = /[A-Za-z]/.test(trimmedValue);
    const hasNumber = /\d/.test(trimmedValue);
    const hasSymbol = /[^A-Za-z0-9]/.test(trimmedValue);

    if (!(hasLetter && hasNumber && hasSymbol)) {
      return "Password wajib mengandung huruf, angka, dan simbol.";
    }
  }

  if (field === "confirmPassword" && trimmedValue !== form.password.trim()) {
    return "Konfirmasi password tidak sama.";
  }

  return "";
}

function validateForm(form: RegisterForm): FormErrors {
  const nextErrors: FormErrors = {};

  for (const key of REQUIRED_FIELDS) {
    const maybeError = validateField(key, form[key], form);
    if (maybeError) {
      nextErrors[key] = maybeError;
    }
  }

  return nextErrors;
}

function fieldIsComplete(value: string): boolean {
  return value.trim().length > 0;
}

interface TextInputProps {
  id: FormKey;
  name: FormKey;
  value: string;
  type?: "text" | "email" | "password" | "tel";
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  error?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  trailingSlot?: React.ReactNode;
}

function TextInput({
  id,
  name,
  value,
  type = "text",
  placeholder,
  autoComplete,
  maxLength,
  error,
  disabled,
  onChange,
  onBlur,
  trailingSlot,
}: TextInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`theme-focus-ring-inset w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition-all ${
          error
            ? "border-red-300 bg-red-50"
            : "border-gray-200 hover:border-[rgba(var(--pg-primary-rgb),0.45)]"
        } ${disabled ? "cursor-not-allowed bg-gray-100 text-gray-500" : ""}`}
      />
      {trailingSlot ? (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">{trailingSlot}</div>
      ) : null}
    </div>
  );
}

interface SelectInputProps {
  id: FormKey;
  name: FormKey;
  value: string;
  error?: string;
  options: readonly string[];
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

function SelectInput({
  id,
  name,
  value,
  error,
  options,
  placeholder,
  onChange,
  onBlur,
}: SelectInputProps) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`theme-focus-ring-inset w-full cursor-pointer appearance-none rounded-xl border bg-white px-4 py-3.5 pr-12 text-sm text-gray-800 outline-none transition-all ${
        error
          ? "border-red-300 bg-red-50"
          : "border-gray-200 hover:border-[rgba(var(--pg-primary-rgb),0.45)]"
      }`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.3'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

interface FieldProps {
  id: FormKey;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, hint, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wide text-gray-600">
        {label}
        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
        {hint ? (
          <span className="ml-1.5 normal-case font-medium tracking-normal text-gray-400">{hint}</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface SectionCardProps {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SectionCard({ step, title, description, children }: SectionCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(var(--pg-primary-rgb),0.08)]">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{
              background: `linear-gradient(145deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`,
            }}
          >
            {step}
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800">{title}</h2>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
      </header>
      <div className="space-y-5 px-6 py-6">{children}</div>
    </section>
  );
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    fullName: "",
    nik: "",
    nim: "",
    degree: "",
    universityType: "UPN",
    universityName: DEFAULT_UPN_NAME,
    faculty: "",
    major: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!showSubmitConfirmation) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSubmitConfirmation(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showSubmitConfirmation]);

  const completionChecklist = useMemo(
    () => [
      { label: "Nama lengkap", done: fieldIsComplete(form.fullName) },
      { label: "NIK", done: fieldIsComplete(form.nik) },
      { label: "NIM", done: fieldIsComplete(form.nim) },
      { label: "Jenjang", done: fieldIsComplete(form.degree) },
      { label: "Kategori universitas", done: fieldIsComplete(form.universityType) },
      { label: "Asal universitas", done: fieldIsComplete(form.universityName) },
      { label: "Fakultas", done: fieldIsComplete(form.faculty) },
      { label: "Jurusan", done: fieldIsComplete(form.major) },
      { label: "Nomor telepon", done: fieldIsComplete(form.phone) },
      { label: "Alamat email", done: fieldIsComplete(form.email) },
      {
        label: "Password",
        done: fieldIsComplete(form.password) && validateField("password", form.password, form) === "",
      },
      {
        label: "Konfirmasi password",
        done:
          fieldIsComplete(form.confirmPassword) &&
          validateField("confirmPassword", form.confirmPassword, form) === "",
      },
    ],
    [form]
  );

  const completedCount = completionChecklist.filter((item) => item.done).length;
  const completionPercent = Math.round((completedCount / completionChecklist.length) * 100);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const field = name as FormKey;
    const nextFormState = { ...form, [field]: value };

    setForm(nextFormState);

    if (submitted) {
      setErrors((previous) => {
        const nextErrors: FormErrors = {
          ...previous,
          [field]: validateField(field, value, nextFormState),
        };

        if (field === "password" && fieldIsComplete(nextFormState.confirmPassword)) {
          nextErrors.confirmPassword = validateField(
            "confirmPassword",
            nextFormState.confirmPassword,
            nextFormState
          );
        }

        return nextErrors;
      });
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "universityType") {
      const nextType = value as UniversityType;
      const nextUniversityName = nextType === "UPN" ? DEFAULT_UPN_NAME : "";

      setForm((previous) => ({
        ...previous,
        universityType: nextType,
        universityName: nextUniversityName,
      }));

      if (submitted) {
        const nextFormState = {
          ...form,
          universityType: nextType,
          universityName: nextUniversityName,
        };

        setErrors((previous) => ({
          ...previous,
          universityType: validateField("universityType", nextFormState.universityType, nextFormState),
          universityName: validateField("universityName", nextFormState.universityName, nextFormState),
        }));
      }

      return;
    }

    const field = name as FormKey;
    setForm((previous) => ({ ...previous, [field]: value }));

    if (submitted) {
      setErrors((previous) => ({
        ...previous,
        [field]: validateField(field, value, { ...form, [field]: value }),
      }));
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const field = name as FormKey;

    setErrors((previous) => ({
      ...previous,
      [field]: validateField(field, value, { ...form, [field]: value }),
    }));
  };

  const handleSelectBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const field = name as FormKey;

    setErrors((previous) => ({
      ...previous,
      [field]: validateField(field, value, { ...form, [field]: value }),
    }));
  };

  const handleOpenGuide = () => {
    navigate(GUIDE_INTERNAL_ROUTE);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setShowSubmitConfirmation(true);
  };

  const handleConfirmSubmission = () => {
    const navigationState: RegistrationNavigationState = {
      registrationSuccess: {
        universityType: form.universityType,
        fullName: form.fullName.trim(),
      },
    };

    setShowSubmitConfirmation(false);
    navigate("/", { state: navigationState });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-24 pt-14 sm:px-6">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(130deg, ${currentTheme.heroStart} 0%, ${currentTheme.heroEnd} 78%)`,
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-96 w-96 rounded-full bg-white/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
           <nav className="mb-8 flex items-center flex-wrap gap-1.5 text-xs sm:text-sm font-semibold text-white/70">
            <Link to="/" className="transition-colors hover:text-white">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-white">Registrasi</span>
          </nav>

          <div>
            <p className="mb-3 inline-flex rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
              Form Jobseeker UPA PKK
            </p>
            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Registrasi Akun dengan Tampilan Modern, Rapi, dan Cepat Diselesaikan.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
              Lengkapi data Anda untuk mendapatkan akses lowongan, kegiatan karier, dan pembaruan
              informasi secara berkala. Jika Anda memilih kategori Non-UPN, akun akan diproses sesuai
              alur verifikasi administrasi.
            </p>
          </div>
        </div>
      </section>

      <main className="relative z-20 mx-auto mt-6 max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <SectionCard
                step={1}
                title="Identitas Pribadi"
                description="Masukkan data diri sesuai dokumen resmi."
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="fullName" label="Nama Lengkap" required error={errors.fullName}>
                    <TextInput
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleTextChange}
                      onBlur={handleInputBlur}
                      placeholder="Nama lengkap sesuai identitas"
                      autoComplete="name"
                      error={errors.fullName}
                    />
                  </Field>

                  <Field id="nik" label="NIK" required hint="16 digit" error={errors.nik}>
                    <TextInput
                      id="nik"
                      name="nik"
                      value={form.nik}
                      onChange={handleTextChange}
                      onBlur={handleInputBlur}
                      placeholder="Contoh: 3578xxxxxxxxxxxx"
                      maxLength={16}
                      error={errors.nik}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="nim" label="NIM" required hint="8-20 karakter" error={errors.nim}>
                    <TextInput
                      id="nim"
                      name="nim"
                      value={form.nim}
                      onChange={handleTextChange}
                      onBlur={handleInputBlur}
                      placeholder="Nomor Induk Mahasiswa"
                      autoComplete="off"
                      error={errors.nim}
                    />
                  </Field>

                  <Field id="degree" label="Jenjang Pendidikan" required error={errors.degree}>
                    <SelectInput
                      id="degree"
                      name="degree"
                      value={form.degree}
                      options={DEGREE_OPTIONS}
                      placeholder="Pilih jenjang"
                      onChange={handleSelectChange}
                      onBlur={handleSelectBlur}
                      error={errors.degree}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard
                step={2}
                title="Institusi Akademik"
                description="Pilih kategori universitas, lalu lengkapi asal kampus."
              >
                <Field
                  id="universityType"
                  label="Kategori Universitas"
                  required
                  hint="Menentukan alur verifikasi"
                  error={errors.universityType}
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        const nextType: UniversityType = "UPN";
                        const nextForm = {
                          ...form,
                          universityType: nextType,
                          universityName: DEFAULT_UPN_NAME,
                        };
                        setForm(nextForm);

                        if (submitted) {
                          setErrors((previous) => ({
                            ...previous,
                            universityType: validateField("universityType", nextForm.universityType, nextForm),
                            universityName: validateField("universityName", nextForm.universityName, nextForm),
                          }));
                        }
                      }}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        form.universityType === "UPN"
                          ? "border-transparent text-white shadow-lg"
                          : "border-gray-200 bg-white text-gray-700 hover:border-[rgba(var(--pg-primary-rgb),0.5)]"
                      }`}
                      style={
                        form.universityType === "UPN"
                          ? {
                              background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`,
                            }
                          : undefined
                      }
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide">UPN</p>
                      <p className="mt-1 text-sm font-medium">Mahasiswa/Alumni UPN</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const nextType: UniversityType = "NON_UPN";
                        const nextForm = {
                          ...form,
                          universityType: nextType,
                          universityName: "",
                        };
                        setForm(nextForm);

                        if (submitted) {
                          setErrors((previous) => ({
                            ...previous,
                            universityType: validateField("universityType", nextForm.universityType, nextForm),
                            universityName: validateField("universityName", nextForm.universityName, nextForm),
                          }));
                        }
                      }}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        form.universityType === "NON_UPN"
                          ? "border-transparent text-white shadow-lg"
                          : "border-gray-200 bg-white text-gray-700 hover:border-[rgba(var(--pg-primary-rgb),0.5)]"
                      }`}
                      style={
                        form.universityType === "NON_UPN"
                          ? {
                              background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`,
                            }
                          : undefined
                      }
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide">Non-UPN</p>
                      <p className="mt-1 text-sm font-medium">Perguruan Tinggi Lain</p>
                    </button>
                  </div>

                  <select
                    id="universityType"
                    name="universityType"
                    value={form.universityType}
                    onChange={handleSelectChange}
                    onBlur={handleSelectBlur}
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <option value="UPN">UPN</option>
                    <option value="NON_UPN">Non-UPN</option>
                  </select>
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    id="universityName"
                    label="Asal Universitas"
                    required
                    error={errors.universityName}
                  >
                    {form.universityType === "UPN" ? (
                      <TextInput
                        id="universityName"
                        name="universityName"
                        value={form.universityName}
                        onChange={handleTextChange}
                        onBlur={handleInputBlur}
                        placeholder="UPN Veteran Jawa Timur"
                        disabled
                        error={errors.universityName}
                      />
                    ) : (
                      <SelectInput
                        id="universityName"
                        name="universityName"
                        value={form.universityName}
                        options={UNIVERSITY_OPTIONS}
                        placeholder="Pilih universitas"
                        onChange={handleSelectChange}
                        onBlur={handleSelectBlur}
                        error={errors.universityName}
                      />
                    )}
                  </Field>

                  <Field id="faculty" label="Fakultas" required error={errors.faculty}>
                    <TextInput
                      id="faculty"
                      name="faculty"
                      value={form.faculty}
                      onChange={handleTextChange}
                      onBlur={handleInputBlur}
                      placeholder="Contoh: Fakultas Teknik"
                      error={errors.faculty}
                    />
                  </Field>
                </div>

                <Field id="major" label="Jurusan" required error={errors.major}>
                  <TextInput
                    id="major"
                    name="major"
                    value={form.major}
                    onChange={handleTextChange}
                    onBlur={handleInputBlur}
                    placeholder="Contoh: Teknik Informatika"
                    error={errors.major}
                  />
                </Field>
              </SectionCard>

              <SectionCard
                step={3}
                title="Kontak dan Keamanan"
                description="Pastikan email aktif dan password kuat."
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="phone" label="Nomor Telepon" required error={errors.phone}>
                    <TextInput
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleTextChange}
                      onBlur={handleInputBlur}
                      placeholder="08xxxxxxxxxx"
                      autoComplete="tel"
                      error={errors.phone}
                    />
                  </Field>

                  <Field id="email" label="Alamat Email" required error={errors.email}>
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleTextChange}
                      onBlur={handleInputBlur}
                      placeholder="nama@email.com"
                      autoComplete="email"
                      error={errors.email}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    id="password"
                    label="Password"
                    required
                    hint="Huruf, angka, simbol"
                    error={errors.password}
                  >
                    <TextInput
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleTextChange}
                      onBlur={handleInputBlur}
                      placeholder="Minimal 8 karakter"
                      autoComplete="new-password"
                      error={errors.password}
                      trailingSlot={
                        <button
                          type="button"
                          onClick={() => setShowPassword((previous) => !previous)}
                          className="rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      }
                    />
                  </Field>

                  <Field
                    id="confirmPassword"
                    label="Konfirmasi Password"
                    required
                    error={errors.confirmPassword}
                  >
                    <TextInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleTextChange}
                      onBlur={handleInputBlur}
                      placeholder="Ulangi password"
                      autoComplete="new-password"
                      error={errors.confirmPassword}
                      trailingSlot={
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((previous) => !previous)}
                          className="rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      }
                    />
                  </Field>
                </div>
              </SectionCard>

              <div className="rounded-2xl bg-white px-6 py-5 shadow-[0_8px_24px_rgba(var(--pg-primary-rgb),0.08)]">
                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
                  style={{
                    background:
                      completionPercent >= 100
                        ? `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`
                        : "#d1d5db",
                  }}
                  disabled={completionPercent < 100}
                >
                  Submit Registration
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  Dengan menekan submit, Anda menyetujui kebijakan penggunaan data yang berlaku.
                </p>
              </div>
            </form>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(var(--pg-primary-rgb),0.08)]">
              <h3 className="text-sm font-bold text-gray-800">Progress Formulir</h3>
              <p className="mt-1 text-xs text-gray-500">Pantau kelengkapan data secara real-time.</p>

              <div className="mt-4 space-y-2.5">
                {completionChecklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: item.done ? ACCENT : "#f3f4f6",
                        border: item.done ? "none" : "1px solid #e5e7eb",
                      }}
                    >
                      {item.done ? (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </span>
                    <span className={`text-xs ${item.done ? "font-semibold text-gray-700" : "text-gray-400"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Kelengkapan</span>
                  <span className="font-bold" style={{ color: ACCENT }}>
                    {completionPercent}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${completionPercent}%`,
                      background: `linear-gradient(90deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(var(--pg-primary-rgb),0.08)]">
              <h3 className="text-sm font-bold text-gray-800">Catatan Aktivasi</h3>
              <div className="mt-3 space-y-3 text-xs leading-relaxed text-gray-600">
                <p>
                  Jika Anda mendaftar sebagai <span className="font-semibold">Non-UPN</span>, akun akan
                  diaktivasi setelah verifikasi administrasi selesai dilakukan.
                </p>
                <p>
                  Cek email secara berkala untuk instruksi lanjutan. Jika belum menerima email, hubungi
                  <span className="font-semibold"> upapkk@upnjatim.ac.id</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenGuide}
                className="mt-4 w-full rounded-xl border border-[rgba(var(--pg-primary-rgb),0.32)] px-4 py-2.5 text-xs font-semibold text-(--pg-primary) transition hover:bg-[rgba(var(--pg-primary-rgb),0.08)]"
              >
                Buka Halaman Panduan
              </button>
            </div>
          </aside>
        </div>
      </main>

      {showSubmitConfirmation ? (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-black/45 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowSubmitConfirmation(false);
            }
          }}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white px-6 py-8 text-center shadow-2xl sm:px-10 sm:py-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-confirm-title"
            aria-describedby="submit-confirm-desc"
          >
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "rgba(var(--pg-primary-rgb),0.12)" }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT_DARK}
                strokeWidth="2.2"
              >
                <path d="M12 9v4m0 4h.01M5.07 19h13.86a1 1 0 00.87-1.5L12.93 5.5a1 1 0 00-1.74 0L4.2 17.5a1 1 0 00.87 1.5z" />
              </svg>
            </div>

            <h2 id="submit-confirm-title" className="mt-5 text-2xl font-bold text-gray-800">
              Konfirmasi Data
            </h2>
            <p id="submit-confirm-desc" className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
              Apakah data yang diinputkan sudah benar? Jika Anda klik OK, data registrasi akan
              diproses dan Anda akan diarahkan ke halaman beranda.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmation(false)}
                className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmission}
                className="rounded-lg px-8 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: ACCENT_DARK }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
};

export default RegisterPage;
