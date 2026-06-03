"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import "./CompanyDemoButton.css";

export default function CompanyDemoButton() {
  const router = useRouter();
  const loginCompany = useAuthStore((s) => s.loginCompany);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const errors = await loginCompany("Demo Company", "demo@company.com", "password");
    if (!errors) {
      const company = useAuthStore.getState().company;
      if (company) router.push(`/company/${company.id}`);
    }
  };

  return (
    <button className="c-demo-button" onClick={handleClick}>
      DEMO
    </button>
  );
}
