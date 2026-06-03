"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import "./UserDemoButton.css";

export default function UserDemoButton() {
  const router = useRouter();
  const loginUser = useAuthStore((s) => s.loginUser);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const errors = await loginUser("demo@aa.io", "password");
    if (!errors) {
      const user = useAuthStore.getState().user;
      if (user) router.push(`/consumer/${user.id}`);
    }
  };

  return (
    <button className="user-demo-button" onClick={handleClick}>
      Sign in as GUEST
    </button>
  );
}
