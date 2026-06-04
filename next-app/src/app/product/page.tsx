"use client";

import { useCompanyGuard } from "@/hooks/useAuthGuard";
import ProductForm from "@/components/ProductForm";

export default function ProductFormPage() {
  const { company, authLoaded } = useCompanyGuard();
  if (!authLoaded) return <div>Loading...</div>;
  if (!company) return null;
  return <ProductForm />;
}
