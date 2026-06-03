"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function useCompanyGuard() {
  const router = useRouter();
  const company = useAuthStore((s) => s.company);
  const authLoaded = useAuthStore((s) => s.authLoaded);

  useEffect(() => {
    if (authLoaded && !company) router.replace("/");
  }, [authLoaded, company, router]);

  return { company, authLoaded };
}

export function useUserGuard() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const authLoaded = useAuthStore((s) => s.authLoaded);

  useEffect(() => {
    if (authLoaded && !user) router.replace("/");
  }, [authLoaded, user, router]);

  return { user, authLoaded };
}
