import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <Route {...rest} render={props => (
      user && user.username
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
  )
}