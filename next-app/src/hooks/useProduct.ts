import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/apiClient";
import type { Product } from "@/types";

async function fetchProduct(productId: number): Promise<Product> {
  const res = await authFetch(`/api/company/products/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export function useProduct(productId: number | undefined) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId!),
    enabled: !!productId,
  });
}
