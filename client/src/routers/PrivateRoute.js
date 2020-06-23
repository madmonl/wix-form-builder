import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectAuth } from '../components/auth/authSlice';
import Header from '../components/header/Header';

export default function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector(selectAuth);

  return (
    <Route
      {...rest}
      component={(props) => (
        isAuthenticated ? (
          <>
            <Header />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/" />
        )
      )}
    />
  );
}
