import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import CompanyLoginForm from "./components/auth/CompanyLoginForm/index"
import CompanySignUpForm from "./components/auth/CompanySignUpForm/index"
import CompanyDashboard from "./components/CompanyDashboard/index"
import ProductForm from "./components/ProductForm/index";
import ProductPage from "./components/ProductPage/index";
import {companyAuthenticate} from "./store/csession";

function CompanyApp() {
  // const company = useSelector(state => state.csession.company)
  // const products = useSelector(state => state.products.products)
  const [companyLoaded, setCompanyLoaded] = useState(false);
  // const [param, setParam] = useState(null)
  // const [prod, setProd] = useState(null)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async() => {
  //     let { id } = useParams();
  //     setParam(id)
  //     let prod = products?.filter((prod) => prod.id == param)
  //     setProd(prod)
  //   })();

  // }, [])



  useEffect(() => {
    (async() => {
      await dispatch(companyAuthenticate());
      setCompanyLoaded(true);
    })();
  }, []);

  if (!companyLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path='/company/login' exact={true}>
          <CompanyLoginForm />
        </Route> */}
        <Route path='/company/signup' exact={true}>
          <CompanySignUpForm />
        </Route>
        <Route path="/company/:id" exact={true}>
          <CompanyDashboard />
        </Route>
        <Route path="/product" exact={true}>
          <ProductForm />
        </Route>
        <Route path="/company/product/:id" exact={true}>
          <ProductPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default CompanyApp;
