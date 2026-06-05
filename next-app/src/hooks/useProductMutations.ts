import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "@/lib/apiClient";
import type { NewProductPayload, Product, ProductUpdatePayload } from "@/types";

export function useCreateProduct(companyId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: NewProductPayload) => {
      const res = await authFetch("/api/company/products", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return data as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
    },
  });
}

export function useUpdateProduct(productId: number, companyId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }: ProductUpdatePayload) => {
      // FastAPI expects a flat ProductUpdate object (not { product: {...} })
      // Method is PUT, not POST
      const res = await authFetch(`/api/company/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json() as Promise<Product>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
    },
  });
}

export function useDeleteProduct(companyId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      const res = await authFetch(`/api/company/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
    },
  });
}
