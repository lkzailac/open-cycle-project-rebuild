"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import UserLogoutButton from "@/components/auth/UserLogoutButton";
import CompanyLogoutButton from "@/components/auth/CompanyLogoutButton";
import "./NavBar.css";

export default function NavBar() {
  const user = useAuthStore((s) => s.user);
  const company = useAuthStore((s) => s.company);

  let sessionLinks = null;
  if (user) {
    sessionLinks = <UserLogoutButton />;
  } else if (company) {
    sessionLinks = <CompanyLogoutButton />;
  }

  return (
    <nav>
      <div className="image-container">
        <Link href="/">
          <img className="nav-logo" src="/images/ocp-logo.svg" alt="Open Cycle Project logo" />
        </Link>
      </div>
      <ul></ul>
      <div className="company-logout-container">{sessionLinks}</div>
    </nav>
  );
}
