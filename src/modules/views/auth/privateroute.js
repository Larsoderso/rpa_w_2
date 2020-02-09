import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

//import { authenticationService } from "@/_services";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      //  const currentUser = false;
      if (localStorage.getItem("knock") == null) {
        const currentUser = true;
        //return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
