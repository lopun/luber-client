import React from "react";
import AppPresenter from "./AppPresenter";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer = ({ data }) => (
  <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
);

export default graphql(IS_LOGGED_IN)(AppContainer);
