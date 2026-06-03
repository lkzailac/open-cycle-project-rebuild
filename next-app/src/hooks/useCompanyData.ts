import { useQuery } from "@tanstack/react-query";
import type { CompanyDashboardData } from "@/types";

async function fetchCompanyData(companyId: number): Promise<CompanyDashboardData> {
  const res = await fetch(`/api/company/${companyId}`);
  if (!res.ok) throw new Error("Failed to fetch company data");
  return res.json();
}

export function useCompanyData(companyId: number | undefined) {
  return useQuery({
    queryKey: ["company", companyId],
    queryFn: () => fetchCompanyData(companyId!),
    enabled: !!companyId,
  });
}
