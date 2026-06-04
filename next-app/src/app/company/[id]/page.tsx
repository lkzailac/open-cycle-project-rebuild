"use client";

import { useCompanyGuard } from "@/hooks/useAuthGuard";
import CompanyDashboard from "@/components/CompanyDashboard";

export default function CompanyDashboardPage() {
  const { company, authLoaded } = useCompanyGuard();
  if (!authLoaded) return <div>Loading...</div>;
  if (!company) return null;
  return <CompanyDashboard />;
}
