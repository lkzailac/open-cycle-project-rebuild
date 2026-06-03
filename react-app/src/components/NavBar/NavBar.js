import React, { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import UserLogoutButton from '../auth/UserLogoutButton/index';
import CompanyLogoutButton from "../auth/CompanyLogoutButton/index";
import logo from "../../images/ocp-logo.svg"
import "./navbar.css"


const NavBar = (props) => {
  const user = useSelector(state => state.session.user)
  const company = useSelector(state => state.csession.company)



  let sessionLinks = null;

  if (props.user !== null) {
    sessionLinks = (
      <UserLogoutButton />
    )
  } else if (props.company) {
    sessionLinks = (
      <CompanyLogoutButton />
    )
  } else {
    sessionLinks = (
      <></>
    )
  }




  return (
    <nav>
      <div className='image-container'>
        <NavLink to='/'>
          <img className='nav-logo' src={logo} />
        </NavLink>

      </div>
      <ul>
        {/* <li className='right-pad hidden'>
          { company ?
          <NavLink to={`/company/${company.id}`} exact={true} activeClassName="active" className='nav-li r-pad'>
            Company Dashboard
          </NavLink> :
          <NavLink to='/company/login' exact={true} activeClassName="active" className='nav-li r-pad'>
            Company Dashboard
          </NavLink>
          }

        </li>
        <li className='right-pad hidden'>
          <NavLink to="/consumers" exact={true} activeClassName="active" className='nav-li r-pad'>
            Consumers
          </NavLink>
        </li>
        <li className='hidden'>
          <NavLink to="/ocp" exact={true} activeClassName="active" className='nav-li'>
            Why OCP
          </NavLink>
        </li> */}

      </ul>
      <div className='company-logout-container'>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
