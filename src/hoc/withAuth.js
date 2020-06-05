import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from './../queries';
import * as Cookies from 'es-cookie';

import Pages from "layouts/Pages.jsx";
import Signin from '../views/Pages/LoginPage';

/* eslint-disable */
const withAuth = conditionFunc => Component => props => {

  if (typeof document !== 'undefined') {

    const tokenExpired = Cookies.get('token');

    if (tokenExpired == undefined) {
      // props.msgfunc("warning", "No Authentication! Please log in...");
      return <Redirect to="/pages/login-page" />
    }
    else return <Component {...props} />
  }
  
  /* if (props.unitTesting === 'true') {
    return <Component {...props} />
  }

  return (

    <Query query={GET_CURRENT_USER}>

      {({ data, loading, error, refetch }) => {

        if (loading) return null

        if (typeof document !== 'undefined') {

          const tokenExpired = Cookies.get('token');

          if (tokenExpired == undefined) return <Redirect to="/pages/login-page" />
        }

        if (props.session.getCurrentUser == null) return <Redirect to="/pages/login-page" />

        return conditionFunc(data) ? <Component {...props} /> : <Redirect to="/pages/login-page" />

      }}


    </Query>

  ) */

};
/* eslint-enable */

export default withAuth;