// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch } from 'react-redux';
import { firebaseLogout } from '../auth/authSlice';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <AppBar id="header" position="static">
      <Toolbar className="header__container">
        <Link className="header__link" to="/forms-list">All Forms</Link>
        <Link className="header__link" to="/form-builder">New Form</Link>
        <Button
          className="button--logout"
          onClick={() => dispatch(firebaseLogout())}
          color="inherit"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
