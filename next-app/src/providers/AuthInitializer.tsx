"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const checkSessions = useAuthStore((s) => s.checkSessions);
  useEffect(() => {
    checkSessions();
  }, []);
  return null;
}
