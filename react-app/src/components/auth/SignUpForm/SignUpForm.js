import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

import downArrow from "../../../images/down-arrow.svg";
import checkout from "../../../images/checkout.svg";
// import question from "../../../images/question.svg";
import './signup.css';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/consumer/${user.id}`} />;
  }

  return (
    <div className='u-container'>
      <div className='u-center-contain'>
      <div className="u-share-container">
        <div className='u-share-p'>
          <p>Search carbon outputs <br></br>before you buy.</p>
        </div>
        <div className='u-arrow-img bounce3'>
          <img class='arrow'src={downArrow} alt='arrow'/>
        </div>
      </div>
      <form id='u-form' onSubmit={onSignUp}>
        <div>
          <div className='u-label-container'>
            <label>User Name</label>
          </div>
          <input
            className='u-input'
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <div className='u-label-container'>
            <label>Email</label>
           </div>
          <input
            className='u-input'
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <div className='u-label-container'>
            <label>Password</label>
          </div>
          <input
            className='u-input'
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <div className='u-label-container'>
            <label>Repeat Password</label>
          </div>
          <input
            className='u-input'
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <p className='u-full-width'>
          <button className='u-join-button' type="submit">JOIN NOW</button>
        </p>
      </form>
      <div className='u-comp-container'>
          <img src={checkout} alt='checkout' />
      </div>
      </div>
    </div>

  );
};

export default SignUpForm;
