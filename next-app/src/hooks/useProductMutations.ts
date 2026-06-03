import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewProductPayload, Product } from "@/types";

export function useCreateProduct(companyId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: NewProductPayload) => {
      const res = await fetch("/api/company/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.errors) throw data;
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
    mutationFn: async (product: Partial<Product> & { id: number }) => {
      const res = await fetch(`/api/company/products/${product.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
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
      const res = await fetch(`/api/company/products/${productId}`, {
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
