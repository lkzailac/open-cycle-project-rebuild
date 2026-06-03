import { useQuery } from "@tanstack/react-query";
import type { AllProductsData } from "@/types";

async function fetchAllProducts(userId: number): Promise<AllProductsData> {
  const res = await fetch(`/api/consumer/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export function useAllProducts(userId: number | undefined) {
  return useQuery({
    queryKey: ["consumer", userId],
    queryFn: () => fetchAllProducts(userId!),
    enabled: !!userId,
  });
}
