"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import "./CompanyLogoutButton.css";

export default function CompanyLogoutButton() {
  const router = useRouter();
  const logoutCompany = useAuthStore((s) => s.logoutCompany);

  const handleLogout = () => {
    logoutCompany();
    router.push("/");
  };

  return (
    <button className="company-logout-button" onClick={handleLogout}>
      Admin Logout
    </button>
  );
}
