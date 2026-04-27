import { Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currentTheme } from "../theme/theme";
import { useAuth } from "../contexts/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function validateEmail(email: string): string {
  if (!email.trim()) return "Email wajib diisi.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return "Format email tidak valid.";
  return "";
}

function validatePassword(password: string): string {
  if (!password) return "Password wajib diisi.";
  if (password.length < 6) return "Password minimal 6 karakter.";
  return "";
}

// ─── Sub-components ───────────────────────────────────────────────────────────
interface FloatingInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
  onChange: (val: string) => void;
  onBlur: () => void;
  trailingSlot?: React.ReactNode;
}

function FloatingInput({
  id,
  label,
  type,
  value,
  autoComplete,
  error,
  disabled,
  onChange,
  onBlur,
  trailingSlot,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const isLifted = focused || value.length > 0;

  const borderColor = error
    ? "#EF4444"
    : focused
      ? currentTheme.primary
      : "#D1D5DB";

  const shadowValue = error
    ? "0 0 0 3px rgba(239,68,68,0.15)"
    : focused
      ? `0 0 0 3px rgba(47,143,143,0.15)`
      : "none";

  return (
    <div className="relative">
      {/* Label float */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 z-10 origin-top-left select-none font-medium transition-all duration-200"
        style={{
          top: isLifted ? "8px" : "50%",
          transform: isLifted ? "translateY(0) scale(0.75)" : "translateY(-50%) scale(1)",
          color: error ? "#EF4444" : focused ? currentTheme.primary : "#9CA3AF",
          fontSize: isLifted ? "0.75rem" : "0.875rem",
        }}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          className="w-full rounded-xl border bg-white pt-6 pb-2.5 pl-4 text-sm text-gray-800 outline-none transition-all duration-200"
          style={{
            borderColor,
            boxShadow: shadowValue,
            paddingRight: trailingSlot ? "3rem" : "1rem",
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
        {trailingSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {trailingSlot}
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [successUser, setSuccessUser] = useState<{ name: string; role: string } | null>(null);

  // ── Blur handlers ──
  const handleEmailBlur = () => {
    setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
  };

  const handlePasswordBlur = () => {
    setErrors((prev) => ({ ...prev, password: validatePassword(form.password) }));
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailErr = validateEmail(form.email);
    const passwordErr = validatePassword(form.password);

    if (emailErr || passwordErr) {
      setErrors({ email: emailErr || undefined, password: passwordErr || undefined });
      return;
    }

    setIsLoading(true);
    setErrors({});

    const result = await login(form.email, form.password);

    setIsLoading(false);

    if (!result.success || !result.user) {
      setErrors({ general: result.error });
      return;
    }

    setSuccessUser({ name: result.user.nickname, role: result.user.role });
    setLoginSuccess(true);

    // Navigate after short delay to show success state
    setTimeout(() => {
      if (result.user!.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex" style={{ background: currentTheme.surface }}>
      {/* ── Left panel (decorative, hidden on mobile) ───────────── */}
      <aside
        className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative flex-col justify-between overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 55%, ${currentTheme.heroEnd} 100%)`,
        }}
        aria-hidden="true"
      >
        {/* Decorative blobs */}
        <div
          className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "#ffffff" }}
        />
        <div
          className="pointer-events-none absolute bottom-10 right-[-60px] h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: "#B9E2E2" }}
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full opacity-10 blur-2xl"
          style={{ background: "#ffffff" }}
        />

        {/* Logo / branding */}
        <header className="relative z-10 p-10 xl:p-14">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)" }}
            >
              <ShieldCheck size={22} color="#ffffff" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">UPA PKK</p>
              <p className="text-base font-extrabold text-white leading-tight">UPN Veteran Jawa Timur</p>
            </div>
          </Link>
        </header>

        {/* Centre content */}
        <div className="relative z-10 px-10 xl:px-14">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
            <span className="text-xs font-semibold text-white/90">Portal Karier Mahasiswa</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-snug text-white">
            Raih karier<br />impianmu<br />
            <span style={{ color: currentTheme.accent }}>bersama kami.</span>
          </h1>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
            Temukan ribuan lowongan kerja, magang eksklusif, dan kegiatan karier dari perusahaan terpilih—semuanya dalam satu platform.
          </p>

          {/* Feature pills */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["Lowongan Kerja", "Program Magang", "Acara Karier", "Panduan Alumni"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <footer className="relative z-10 p-10 xl:p-14">
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            {[
              { value: "2.500+", label: "Mahasiswa" },
              { value: "180+", label: "Perusahaan" },
              { value: "95%", label: "Tingkat Penempatan" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs text-white/65">{stat.label}</p>
              </div>
            ))}
          </div>
        </footer>
      </aside>

      {/* ── Right panel (form) ───────────────────────────────────── */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-10">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `linear-gradient(135deg, ${currentTheme.heroStart}, ${currentTheme.heroEnd})` }}
          >
            <ShieldCheck size={20} color="#fff" strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: currentTheme.textMuted }}>UPA PKK</p>
            <p className="text-sm font-extrabold" style={{ color: currentTheme.text }}>UPN Veteran Jawa Timur</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
              Masuk ke akun Anda
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Belum punya akun?{" "}
              <Link
                to="/registrasi"
                className="font-semibold transition-colors hover:underline"
                style={{ color: currentTheme.primary }}
              >
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* General error */}
          {errors.general && (
            <div
              className="mb-5 flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium animate-fade-in-scale"
              style={{ borderColor: "#FECACA", background: "#FEF2F2", color: "#B91C1C" }}
              role="alert"
            >
              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              {errors.general}
            </div>
          )}

          {/* Success state */}
          {loginSuccess && successUser && (
            <div
              className="mb-5 flex items-center gap-3 rounded-xl border px-4 py-4 text-sm font-medium animate-fade-in-scale"
              style={{ borderColor: currentTheme.border, background: currentTheme.surfaceAlt, color: currentTheme.text }}
              role="status"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ background: currentTheme.primary }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Selamat datang kembali, {successUser.name}!</p>
                <p className="text-xs font-normal" style={{ color: currentTheme.textMuted }}>Mengalihkan ke beranda…</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <FloatingInput
              id="login-email"
              label="Alamat Email"
              type="email"
              value={form.email}
              autoComplete="email"
              error={errors.email}
              disabled={isLoading || loginSuccess}
              onChange={(val) => setForm((prev) => ({ ...prev, email: val }))}
              onBlur={handleEmailBlur}
            />

            <FloatingInput
              id="login-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              autoComplete="current-password"
              error={errors.password}
              disabled={isLoading || loginSuccess}
              onChange={(val) => setForm((prev) => ({ ...prev, password: val }))}
              onBlur={handlePasswordBlur}
              trailingSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={16} color="#6B7280" />
                  ) : (
                    <Eye size={16} color="#6B7280" />
                  )}
                </button>
              }
            />

            {/* Remember me & forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2.5 select-none">
                <div className="relative">
                  <input
                    id="login-remember"
                    type="checkbox"
                    checked={form.rememberMe}
                    onChange={(e) => setForm((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                    className="peer sr-only"
                  />
                  <div
                    className="h-5 w-5 rounded-md border-2 transition-all duration-200 peer-checked:border-transparent"
                    style={{
                      borderColor: form.rememberMe ? currentTheme.primary : "#D1D5DB",
                      background: form.rememberMe
                        ? `linear-gradient(135deg, ${currentTheme.heroStart}, ${currentTheme.heroEnd})`
                        : "white",
                    }}
                  >
                    {form.rememberMe && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="h-full w-full p-0.5">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>

              <button
                type="button"
                className="text-sm font-semibold transition-colors hover:underline"
                style={{ color: currentTheme.primary }}
              >
                Lupa password?
              </button>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading || loginSuccess}
              className="relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 55%, ${currentTheme.heroEnd} 100%)`,
              }}
            >
              <span className="flex items-center justify-center gap-2.5">
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                    </svg>
                    Memverifikasi…
                  </>
                ) : loginSuccess ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Berhasil Masuk
                  </>
                ) : (
                  <>
                    <LogIn size={16} strokeWidth={2.2} />
                    Masuk
                  </>
                )}
              </span>
            </button>
          </form>



          {/* Back to home */}
          <p className="mt-8 text-center text-xs text-gray-400">
            <Link
              to="/"
              className="transition-colors hover:underline"
              style={{ color: currentTheme.textMuted }}
            >
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
