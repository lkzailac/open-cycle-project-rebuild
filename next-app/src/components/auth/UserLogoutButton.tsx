"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import "./UserLogoutButton.css";

export default function UserLogoutButton() {
  const router = useRouter();
  const logoutUser = useAuthStore((s) => s.logoutUser);

  const handleLogout = async () => {
    router.push("/");
    await logoutUser();
  };

  return (
    <button className="user-logout-button" onClick={handleLogout}>
      Consumer Logout
    </button>
  );
}
