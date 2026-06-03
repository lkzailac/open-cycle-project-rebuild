import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { logout } from '../../../store/session';

import './userlogoutbutton.css';

const UserLogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  const onLogout = async (e) => {
    history.push('/')
    await dispatch(logout());

  };

  if(!user) {
      return <Redirect to='/' />
  }

  return <button className='user-logout-button' onClick={onLogout}>Consumer Logout</button>;
};

export default UserLogoutButton;
