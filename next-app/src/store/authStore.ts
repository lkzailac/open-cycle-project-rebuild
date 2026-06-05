import { create } from "zustand";
import type { User, Company, CompanySignUpData } from "@/types";

const JSON_HEADERS = { "Content-Type": "application/json" };

function authHeaders(token: string) {
  return { ...JSON_HEADERS, Authorization: `Bearer ${token}` };
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

function storeToken(token: string) {
  localStorage.setItem("access_token", token);
}

function clearToken() {
  localStorage.removeItem("access_token");
}

// FastAPI errors come back as { detail: { errors: [...] } }
function extractErrors(data: Record<string, unknown>): string[] {
  const detail = data.detail as Record<string, unknown> | string | undefined;
  if (detail && typeof detail === "object" && Array.isArray(detail.errors)) {
    return detail.errors as string[];
  }
  if (typeof detail === "string") return [detail];
  return ["An unexpected error occurred"];
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  company: Company | null;
  authLoaded: boolean;

  checkSessions: () => Promise<void>;
  loginUser: (email: string, password: string) => Promise<string[] | null>;
  loginCompany: (
    name: string,
    admin_email: string,
    password: string
  ) => Promise<string[] | null>;
  logoutUser: () => void;
  logoutCompany: () => void;
  signUpUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<string[] | null>;
  signUpCompany: (data: CompanySignUpData) => Promise<string[] | null>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  company: null,
  authLoaded: false,

  checkSessions: async () => {
    const token = getStoredToken();
    if (!token) {
      set({ authLoaded: true });
      return;
    }
    const res = await fetch("/api/auth/me", { headers: authHeaders(token) });
    if (!res.ok) {
      clearToken();
      set({ authLoaded: true });
      return;
    }
    const account = await res.json();
    set({
      accessToken: token,
      user: account.role === "user" ? (account as User) : null,
      company: account.role === "company" ? (account as Company) : null,
      authLoaded: true,
    });
  },

  loginUser: async (email, password) => {
    const res = await fetch("/api/auth/login/user", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return extractErrors(data);
    storeToken(data.access_token);
    set({ accessToken: data.access_token, user: data.account as User });
    return null;
  },

  loginCompany: async (name, admin_email, password) => {
    const res = await fetch("/api/auth/login/company", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name, admin_email, password }),
    });
    const data = await res.json();
    if (!res.ok) return extractErrors(data);
    storeToken(data.access_token);
    set({ accessToken: data.access_token, company: data.account as Company });
    return null;
  },

  // JWT is stateless — no server call needed to log out
  logoutUser: () => {
    clearToken();
    set({ accessToken: null, user: null });
  },

  logoutCompany: () => {
    clearToken();
    set({ accessToken: null, company: null });
  },

  signUpUser: async (username, email, password) => {
    const res = await fetch("/api/auth/register/user", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) return extractErrors(data);
    storeToken(data.access_token);
    set({ accessToken: data.access_token, user: data.account as User });
    return null;
  },

  signUpCompany: async (formData) => {
    const res = await fetch("/api/auth/register/company", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        ...formData,
        products_sold: Number(formData.products_sold) || 0,
        carbon_goal: formData.carbon_goal ? Number(formData.carbon_goal) : null,
      }),
    });
    const data = await res.json();
    if (!res.ok) return extractErrors(data);
    storeToken(data.access_token);
    set({ accessToken: data.access_token, company: data.account as Company });
    return null;
  },
}));
