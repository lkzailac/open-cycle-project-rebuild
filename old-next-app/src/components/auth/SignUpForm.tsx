"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import "./SignUpForm.css";

export default function SignUpForm() {
  const router = useRouter();
  const signUpUser = useAuthStore((s) => s.signUpUser);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }
    const errs = await signUpUser(username, email, password);
    if (errs) { setErrors(errs); return; }
    const user = useAuthStore.getState().user;
    if (user) router.push(`/consumer/${user.id}`);
  };

  return (
    <div className="u-container">
      <div className="u-center-contain">
        <div className="u-share-container">
          <div className="u-share-p">
            <p>Search carbon outputs <br />before you buy.</p>
          </div>
          <div className="u-arrow-img bounce3">
            <img className="arrow" src="/images/down-arrow.svg" alt="arrow" />
          </div>
        </div>
        {errors.map((err) => <div key={err} className="errors">{err}</div>)}
        <form id="u-form" onSubmit={handleSubmit}>
          <div>
            <div className="u-label-container"><label>User Name</label></div>
            <input className="u-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <div className="u-label-container"><label>Email</label></div>
            <input className="u-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <div className="u-label-container"><label>Password</label></div>
            <input className="u-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <div className="u-label-container"><label>Repeat Password</label></div>
            <input className="u-input" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
          </div>
          <p className="u-full-width">
            <button className="u-join-button" type="submit">JOIN NOW</button>
          </p>
        </form>
        <div className="u-comp-container">
          <img src="/images/checkout.svg" alt="checkout" />
        </div>
      </div>
    </div>
  );
}
