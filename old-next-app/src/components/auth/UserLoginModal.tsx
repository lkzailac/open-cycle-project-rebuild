"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import LoginForm from "./LoginForm";

export default function UserLoginModal() {
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
          <LoginForm />
        </Modal>
      )}
    </>
  );
}
