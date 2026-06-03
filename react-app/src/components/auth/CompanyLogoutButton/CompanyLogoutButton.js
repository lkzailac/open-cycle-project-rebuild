import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { companyLogout } from "../../../store/csession";

import './companylogout.css';

const CompanyLogoutButton = () => {
    const company = useSelector(state => state.csession.company);
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = async (e) => {
        history.push('/')
        await dispatch(companyLogout());



    };

    // if (!company) {
    //     return <Redirect to='/' />
    // }

    return <button className='company-logout-button' onClick={onLogout}>Admin Logout</button>;
};

export default CompanyLogoutButton;
