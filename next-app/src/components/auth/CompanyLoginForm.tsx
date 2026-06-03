"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import CompanyDemoButton from "./CompanyDemoButton";
import "./CompanyLoginForm.css";

export default function CompanyLoginForm() {
  const router = useRouter();
  const loginCompany = useAuthStore((s) => s.loginCompany);
  const [name, setName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = await loginCompany(name, adminEmail, password);
    if (errors) {
      setEmailErrors(errors.filter((e) => e.startsWith("admin_email ")).map((e) => e.split(":")[1]));
      setPasswordErrors(errors.filter((e) => e.startsWith("password ")).map((e) => e.split(":")[1]));
      return;
    }
    const company = useAuthStore.getState().company;
    if (company) router.push(`/company/${company.id}`);
  };

  return (
    <div className="c-login-contain">
      <div className="c-login-form-container">
        <div className="c-ocp-logo">
          <img src="/images/ocp-logo.svg" alt="logo" />
        </div>
        <form className="c-login-form" onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="Company Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {emailErrors.map((err) => <div key={err} className="errors">{err}</div>)}
          <div>
            <input type="text" placeholder="Admin Email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
          </div>
          {passwordErrors.map((err) => <div key={err} className="errors">{err}</div>)}
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="c-button-div">
              <button className="c-login-button" type="submit">SIGN IN</button>
              <CompanyDemoButton />
            </div>
          </div>
        </form>
      </div>
      <div className="cycle-container">
        <img src="/images/cycle.png" alt="cycle" />
      </div>
    </div>
  );
}
