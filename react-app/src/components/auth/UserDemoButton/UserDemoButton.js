import React, { useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login} from '../../../store/session';

import "./userdemobutton.css"

function UserDemoButton() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const handleClick = async (e) => {
        e.preventDefault();

        const email = 'demo@aa.io';
        const password = "password";

        const data = await dispatch(login(email, password))

    }

    if (user) {
        return <Redirect to={`/consumer/${user.id}`} />;
    }

    return (
        <button className='user-demo-button' onClick={handleClick}>Sign in as GUEST</button>
    )
}

export default UserDemoButton;
