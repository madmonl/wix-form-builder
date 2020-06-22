import React from 'react';
import { firebaseLogin } from './authSlice';

export default function LoginPage() {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Login</h1>
        <button type="button" className="button" onClick={firebaseLogin()}>Login with Google</button>
      </div>
    </div>
  );
}
