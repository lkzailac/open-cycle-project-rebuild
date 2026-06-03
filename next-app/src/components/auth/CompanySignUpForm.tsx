"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import "./CompanySignUpForm.css";

export default function CompanySignUpForm() {
  const router = useRouter();
  const signUpCompany = useAuthStore((s) => s.signUpCompany);
  const [name, setName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [statement, setStatement] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [productsSold, setProductsSold] = useState("");
  const [carbonGoal, setCarbonGoal] = useState("");
  const [carbonGoalDate, setCarbonGoalDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }
    const errs = await signUpCompany({
      name, admin_email: adminEmail, password,
      logo_url: logoUrl, statement,
      warehouse_location: warehouseLocation,
      products_sold: productsSold,
      carbon_goal: carbonGoal,
      carbon_goal_date: carbonGoalDate,
    });
    if (errs) { setErrors(errs); return; }
    const company = useAuthStore.getState().company;
    if (company) router.push(`/company/${company.id}`);
  };

  return (
    <>
      <div className="container">
        <div className="share-container">
          <div className="share-p">
            <p>Share your carbon outputs <br />and set goals for the future of commerce.</p>
          </div>
          <div className="arrow">
            <img src="/images/down-arrow.svg" alt="arrow" />
          </div>
        </div>
        {errors.map((err) => <div key={err} className="errors">{err}</div>)}
        <form onSubmit={handleSubmit}>
          <div className="left-form">
            <div>
              <div className="label-container"><label>Company Name</label></div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <div className="label-container"><label>Admin Email</label></div>
              <input type="text" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
            </div>
            <div>
              <div className="label-container"><label>Password</label></div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <div className="label-container"><label>Repeat Password</label></div>
              <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
            </div>
            <div>
              <div className="label-container"><label>Logo Url</label></div>
              <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
            </div>
          </div>
          <div className="right-form">
            <div>
              <div className="label-container"><label>Statement</label></div>
              <textarea className="statement-input" value={statement} onChange={(e) => setStatement(e.target.value)} />
            </div>
            <div>
              <div className="label-container"><label>Warehouse Location</label></div>
              <input type="text" value={warehouseLocation} onChange={(e) => setWarehouseLocation(e.target.value)} />
            </div>
            <div>
              <div className="label-container"><label>Number of Products at Retail</label></div>
              <input type="text" value={productsSold} onChange={(e) => setProductsSold(e.target.value)} />
            </div>
            <div>
              <div className="label-container"><label>Carbon Goal</label></div>
              <input type="text" value={carbonGoal} onChange={(e) => setCarbonGoal(e.target.value)} />
            </div>
            <div>
              <div className="label-container"><label>Carbon Goal Due Date</label></div>
              <input type="date" value={carbonGoalDate} onChange={(e) => setCarbonGoalDate(e.target.value)} />
            </div>
            <p className="full-width">
              <button className="join-button" type="submit">JOIN NOW</button>
            </p>
          </div>
        </form>
        <div className="comp-container">
          <img src="/images/company-signup.svg" alt="computers" />
        </div>
      </div>
    </>
  );
}
