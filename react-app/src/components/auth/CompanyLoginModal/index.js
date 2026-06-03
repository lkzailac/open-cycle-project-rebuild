// import CompanyLoginForm from './CompanyLoginForm';

// export default CompanyLoginForm;

import React, {useState} from "react";
import { UserModal } from '../../../context/UserModal' ;
import CompanyLoginForm from "./CompanyLoginForm";

import './companyloginform.css'

const CompanyLoginModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>  <div className='r-login'>
                <button className='r-login-link' onClick={() => setShowModal(true)}>SIGN IN</button>
            </div>

            {showModal && (
                <UserModal onClose={() => setShowModal(false)}>
                    <CompanyLoginForm />
                </UserModal>
            )}
        </>
    )
}

export default CompanyLoginModal;
