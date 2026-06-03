import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';

import "./UserModal.css";

const UserModalContext = React.createContext();

export function UserModalProvider({ children }) {
    const userModalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(userModalRef.current);
    }, [])

    return (
        <>
            <UserModalContext.Provider value={value}>
                {children}
            </UserModalContext.Provider>
            <div ref={userModalRef} />
        </>
    )
}

export function UserModal({ onClose, children }) {
    const modalNode = useContext(UserModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
      <div id="modal">
        <div id="modal-background" onClick={onClose} />
        <div id="modal-content">
          {children}
        </div>
      </div>,
      modalNode
    );
  }
