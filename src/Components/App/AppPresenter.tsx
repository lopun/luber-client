import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

import AddPlace from "src/Routes/AddPlace";
import EditAccount from "src/Routes/EditAccount";
import Home from "src/Routes/Home";
import Login from "src/Routes/Login";
import PhoneLogin from "src/Routes/PhoneLogin";
import Places from "src/Routes/Places";
import Ride from "src/Routes/Ride";
import Settings from "src/Routes/Settings";
import VerifyPhone from "src/Routes/VerifyPhone";
import SocialLogin from "src/Routes/SocialLogin";
import FindAddress from "src/Routes/FindAddress";

interface IProps {
  isLoggedIn: boolean;
}

const LoggedOutRoutes: React.SFC = () => (
  <Switch>
    <Route exact={true} path={"/"} component={Login} />
    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/verify-phone/:number"} component={VerifyPhone} />
    <Route path={"/social-login"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  <Switch>
    <Route exact={true} path={"/"} component={Home} />
    <Route path={"/ride"} component={Ride} />
    <Route path={"/edit-account"} component={EditAccount} />
    <Route path={"/settings"} component={Settings} />
    <Route path={"/places"} component={Places} />
    <Route path={"/add-place"} component={AddPlace} />
    <Route path={"/find-address"} component={FindAddress} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
