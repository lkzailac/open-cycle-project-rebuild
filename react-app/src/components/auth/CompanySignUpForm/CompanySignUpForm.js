import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { companySignUp } from '../../../store/csession';

import downArrow from "../../../images/down-arrow.svg";
import computers from "../../../images/company-signup.svg";
import question from "../../../images/question.svg";
import './companysignup.css';

const CompanySignUpForm = () => {
  const [name, setName] = useState("");
  const [admin_email, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [logo_url, setLogoUrl] = useState("");
  const [statement, setStatement] = useState("");
  const [warehouse_location, setWarehouseLocation] = useState("");
  const [products_sold, setProductsSold] = useState("");
  const [carbon_goal, setCarbonGoal] = useState("");
  const [carbon_goal_date, setCarbonGoalDate] = useState("");
  const [showHint, setShowHint] = useState(false)
  const company = useSelector(state => state.csession.company);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(companySignUp(name, admin_email, password, logo_url, statement, warehouse_location, products_sold, carbon_goal, carbon_goal_date));
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setAdminEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateLogo = (e) => {
    setLogoUrl(e.target.value);
  };

  const updateStatement = (e) => {
    setStatement(e.target.value);
  };

  const updateWarehouse = (e) => {
    setWarehouseLocation(e.target.value);
  };

  const updateProducts = (e) => {
    setProductsSold(e.target.value);
  };

  const updateCarbonGoal = (e) => {
    setCarbonGoal(e.target.value);
  };

  const updateCarbonGoalDate = (e) => {
    setCarbonGoalDate(e.target.value);
  };

  if (company) {
    return <Redirect to={`/company/${company.id}`} />;
  }

  // const popUp =''

  // const handleClick = (value) => {
  //   setShowHint(true)
  //   if (showHint) {
  //     if(value === "admin_email") {
  //       popUp = (
  //         <div className='pop-up'>
  //           <p>This is admin email hint</p>
  //         </div>
  //       )

  //     }
  //     return popUp;
  //   }
  // }

  return (
    <>
      <div className='container'>
        <div className="share-container">
          <div className='share-p'>
            <p>Share your carbon outputs <br></br>and set goals for the future of commerce.</p>
          </div>
          <div className='arrow'>
            <img src={downArrow} />
          </div>
        </div>
        <form onSubmit={onSignUp}>
          {/* {errors.map((error) => (
            <p>error</p>
          ))} */}
          <div className='left-form'>
            <div>
              <div className='label-container'>
                <label>Company Name</label>
              </div>
              <input
                type="text"
                name="name"
                onChange={updateName}
                value={name}
                required={true}
              ></input>
            </div>
            <div>
              <div className='label-container'>
                <label>Admin Email</label>
                {/* <button className='question-button' value='admin_email' onClick={(e) => [handleClick(e.target.value), console.log("button")]}><img className='question' src={question} /></button> */}
                {/* <button className='question-button' value='admin_email' onClick={(e) => handleClick(e.target.value)}>Button</button> */}
                {/* {popUp} */}
              </div>
              <input
                type="text"
                name="admin_email"
                onChange={updateEmail}
                value={admin_email}
                required={true}
              ></input>
            </div>
            <div>
              <div className='label-container'>
                <label>Password</label>
              </div>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                required={true}
              ></input>
            </div>
            <div>
              <div className='label-container'>
                <label>Repeat Password</label>
              </div>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div>
              <div className='label-container'>
                <label>Logo Url</label>
              </div>
              <input
                type="text"
                name="logo_url"
                onChange={updateLogo}
                value={logo_url}
              ></input>
            </div>
          </div> {/* end left-form */}
          <div className='right-form'>
            <div>
              <div className='label-container'>
                <label>Statement</label>
              </div>
              <textarea
                className='statement-input'
                type="text"
                name="statement"
                onChange={updateStatement}
                value={statement}
              ></textarea>
            </div>

            <div>
              <div className='label-container'>
                <label>Warehouse Location</label>
              </div>
              <input
                type="text"
                name="warehouse_location"
                onChange={updateWarehouse}
                value={warehouse_location}
              ></input>
            </div>
            <div>
              <div className='label-container'>
                <label>Number of Products at Retail</label>
              </div>
              <input
                type="text"
                name="products_sold"
                onChange={updateProducts}
                value={products_sold}
              ></input>
            </div>
            <div>
              <div className='label-container'>
                <label>Carbon Goal</label>
              </div>
              <input
                type="text"
                name="carbon_goal"
                onChange={updateCarbonGoal}
                value={carbon_goal}
              ></input>
            </div>
            <div>
              <div className='label-container'>
                <label>Carbon Goal Due Date</label>
              </div>
              <input
                type="date"
                name="carbon_goal_date"
                onChange={updateCarbonGoalDate}
                value={carbon_goal_date}
                // min="2021-06-07T00:00"
                // max="2021-06-14T00:00"
              ></input>
            </div>
            <p className='full-width'>
              <button className='join-button' type="submit">JOIN NOW</button>
            </p>
          </div>
        </form>
        <div className='comp-container'>
          <img src={computers} alt='computers'/>
        </div>
      </div>
    </>
  );
};

export default CompanySignUpForm;
