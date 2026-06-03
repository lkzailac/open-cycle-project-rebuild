import React, { useState} from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {companyLogin} from "../../../store/csession"

import "./companydemo.css"

function CompanyDemoButton() {
    const [errors, setErrors] = useState([]);
    const company = useSelector(state => state.csession.company);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();

        const name = 'Demo Company';
        const admin_email = 'demo@company.com';
        const password = "password";

        const data = await dispatch(companyLogin(name, admin_email, password))
        if (data.errors) {
            setErrors(data.errors);
        }
    }

    if (company) {
        return <Redirect to={`/company/${company.id}`} />;
    }

    return (
        <button className='c-demo-button' onClick={handleClick}>DEMO</button>
    )
}

export default CompanyDemoButton;
