import { create } from "zustand";
import type { User, Company, CompanySignUpData } from "@/types";

const JSON_HEADERS = { "Content-Type": "application/json" };

interface AuthState {
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
  logoutUser: () => Promise<void>;
  logoutCompany: () => Promise<void>;
  signUpUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<string[] | null>;
  signUpCompany: (data: CompanySignUpData) => Promise<string[] | null>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  company: null,
  authLoaded: false,

  checkSessions: async () => {
    const [userRes, companyRes] = await Promise.all([
      fetch("/api/auth/", { headers: JSON_HEADERS }),
      fetch("/api/cauth/", { headers: JSON_HEADERS }),
    ]);
    const [userData, companyData] = await Promise.all([
      userRes.json(),
      companyRes.json(),
    ]);
    set({
      user: userData.errors ? null : userData,
      company: companyData.errors ? null : companyData,
      authLoaded: true,
    });
  },

  loginUser: async (email, password) => {
    const res = await fetch("/api/auth/login/", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.errors) return data.errors;
    set({ user: data });
    return null;
  },

  loginCompany: async (name, admin_email, password) => {
    const res = await fetch("/api/cauth/login", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name, admin_email, password }),
    });
    const data = await res.json();
    if (data.errors) return data.errors;
    set({ company: data });
    return null;
  },

  logoutUser: async () => {
    await fetch("/api/auth/logout", { headers: JSON_HEADERS });
    set({ user: null });
  },

  logoutCompany: async () => {
    await fetch("/api/cauth/logout", { headers: JSON_HEADERS });
    set({ company: null });
  },

  signUpUser: async (username, email, password) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (data.errors) return data.errors;
    set({ user: data });
    return null;
  },

  signUpCompany: async (formData) => {
    const res = await fetch("/api/cauth/signup/", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.errors) return data.errors;
    set({ company: data });
    return null;
  },
}));
