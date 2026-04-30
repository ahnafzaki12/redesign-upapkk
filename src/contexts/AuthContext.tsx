import { createContext, useContext, useState, useEffect } from "react";

// ─── Hardcoded accounts ───────────────────────────────────────────────────────
// AKUN USER   : user@upapkk.ac.id    | password: User@2026
// AKUN ADMIN  : admin@upapkk.ac.id   | password: Admin@2026
export const HARDCODED_ACCOUNTS = [
  {
    id: "1",
    email: "user@gmail.com",
    password: "User123",
    role: "user" as const,
    name: "Ahnaf Zaki",
    nickname: "Ahnaf",
    nim: "21082010001",
    prodi: "Sistem Informasi",
    accountType: "Permanent Account",
  },
  {
    id: "2",
    email: "admin@upapkk.ac.id",
    password: "Admin@2026",
    role: "admin" as const,
    name: "Administrator UPA PKK",
    nickname: "Admin",
    nim: "ADMIN-001",
    prodi: "Administrator",
    accountType: "Admin Account",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  nickname: string;
  nim: string;
  prodi: string;
  accountType: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => void;
}

const STORAGE_KEY = "upapkk_auth_user";

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  // Sync to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));

    const found = HARDCODED_ACCOUNTS.find(
      (acc) =>
        acc.email.toLowerCase() === email.trim().toLowerCase() &&
        acc.password === password
    );

    if (!found) {
      return { success: false, error: "Email atau password salah. Periksa kembali kredensial Anda." };
    }

    const authUser: AuthUser = {
      id: found.id,
      email: found.email,
      role: found.role,
      name: found.name,
      nickname: found.nickname,
      nim: found.nim,
      prodi: found.prodi,
      accountType: found.accountType,
    };

    setUser(authUser);
    return { success: true, user: authUser };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
