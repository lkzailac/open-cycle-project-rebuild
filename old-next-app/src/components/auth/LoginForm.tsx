"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import UserDemoButton from "./UserDemoButton";
import "./LoginForm.css";

export default function LoginForm() {
  const router = useRouter();
  const loginUser = useAuthStore((s) => s.loginUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = await loginUser(email, password);
    if (errors) {
      setEmailErrors(errors.filter((e) => e.startsWith("email ")).map((e) => e.split(":")[1]));
      setPasswordErrors(errors.filter((e) => e.startsWith("password ")).map((e) => e.split(":")[1]));
      return;
    }
    const user = useAuthStore.getState().user;
    if (user) router.push(`/consumer/${user.id}`);
  };

  return (
    <div className="login-contain">
      <div className="login-form-container">
        <div className="ocp-logo">
          <img src="/images/ocp-logo.svg" alt="logo" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {emailErrors.map((err) => <div key={err} className="errors">{err}</div>)}
          <div>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {passwordErrors.map((err) => <div key={err} className="errors">{err}</div>)}
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="user-login-button" type="submit">SIGN IN</button>
            <div className="user-demo-div">
              <UserDemoButton />
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
