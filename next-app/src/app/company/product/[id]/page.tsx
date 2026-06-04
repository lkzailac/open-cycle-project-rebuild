"use client";

import { useParams } from "next/navigation";
import { useCompanyGuard } from "@/hooks/useAuthGuard";
import ProductPage from "@/components/ProductPage";

export default function ProductPageRoute() {
  const params = useParams();
  const productId = Number(params.id);
  const { company, authLoaded } = useCompanyGuard();
  if (!authLoaded) return <div>Loading...</div>;
  if (!company) return null;
  return <ProductPage productId={productId} />;
}
