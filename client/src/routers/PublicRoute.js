// @flow

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectAuth } from '../components/auth/authSlice';

export default function PublicRoute({
  component: Component,
  ...rest
}) {
  const isAuthenticated = useSelector(selectAuth);

  return (
    <Route
      {...rest}
      component={(props) => (
        isAuthenticated ? (
          <Redirect to="/forms-list" />
        ) : (
          <Component {...props} />
        )
      )}
    />
  );
}
