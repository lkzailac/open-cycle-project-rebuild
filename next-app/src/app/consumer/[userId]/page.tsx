"use client";

import { useUserGuard } from "@/hooks/useAuthGuard";
import ConsumerPage from "@/components/ConsumerPage";

export default function ConsumerPageRoute() {
  const { user, authLoaded } = useUserGuard();
  if (!authLoaded) return <div>Loading...</div>;
  if (!user) return null;
  return <ConsumerPage />;
}
