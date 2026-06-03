// import LoginForm from './LoginForm';

// export default LoginForm;

import React, {useState} from "react";
import { UserModal } from '../../../context/UserModal' ;
import LoginForm from "./LoginForm";

import './loginform.css'

const UserLoginModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>  <div className='r-login'>
                <button className='r-login-link' onClick={() => setShowModal(true)}>SIGN IN</button>
            </div>

            {showModal && (
                <UserModal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </UserModal>
            )}
        </>
    )
}

export default UserLoginModal;
