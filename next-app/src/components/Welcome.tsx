"use client";

import Link from "next/link";
import UserLoginModal from "@/components/auth/UserLoginModal";
import CompanyLoginModal from "@/components/auth/CompanyLoginModal";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="outer-div">
      <div className="welcome-container">
        <div className="background-image-container">
          <img id="background-image" src="/images/background.svg" alt="" />
        </div>
        <div className="content-grid">
          <div className="left-container">
            <div className="left-for"><h2>For</h2></div>
            <div className="left-group"><h1>Companies</h1></div>
            <div className="left-p">
              <p>A platform where companies can track and share their carbon outputs<br />and set goals for the future of commerce.</p>
            </div>
            <div className="arrow-container">
              <img className="left-arrow bounce" src="/images/left-arrow.svg" alt="" />
            </div>
            <div className="join-container">
              <div className="join">
                <Link className="join-link" href="/company/signup">JOIN NOW</Link>
              </div>
            </div>
            <div className="login-container">
              <CompanyLoginModal />
            </div>
          </div>

          <div className="right-container">
            <div className="right-for"><h2>For</h2></div>
            <div className="right-group"><h1>Consumers</h1></div>
            <div className="right-p">
              <p>A place where consumers can find companies whose plans <br />for the future align with their own.</p>
            </div>
            <div className="right-arrow-container">
              <img className="right-arrow right-bounce" src="/images/large-arrow.svg" alt="" />
            </div>
            <div className="r-join-container">
              <div className="r-join">
                <Link className="r-join-link" href="/consumer/signup">JOIN NOW</Link>
              </div>
            </div>
            <div className="r-login-container">
              <UserLoginModal />
            </div>
          </div>
        </div>
      </div>
      <div className="dont-hide">
        <h3 className="dont-hide-h3">Don't hide your pollution. Own it.</h3>
      </div>
    </div>
  );
}
