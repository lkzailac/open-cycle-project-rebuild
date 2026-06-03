"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import CompanyLoginForm from "./CompanyLoginForm";

export default function CompanyLoginModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="r-login">
        <button className="r-login-link" onClick={() => setShowModal(true)}>
          SIGN IN
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CompanyLoginForm />
        </Modal>
      )}
    </>
  );
}
