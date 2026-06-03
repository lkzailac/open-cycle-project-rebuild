import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import LoginForm from "./components/auth/LoginForm/index";
import SignUpForm from "./components/auth/SignUpForm/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ConsumerPage from "./components/ConsumerPage/index";
import { authenticate } from "./store/session";


function ConsumerApp() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
        await dispatch(authenticate());
        setLoaded(true);
    })();
  }, []);


  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/consumer/login" exact={true}>
          <LoginForm />
        </Route> */}
        <Route path="/consumer/signup" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/consumer/" exact={true} >
          <ConsumerPage />
        </ProtectedRoute>
        <ProtectedRoute path="/consumer/:userId" exact={true} >
          <ConsumerPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default ConsumerApp;
