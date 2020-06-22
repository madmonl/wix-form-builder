/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { firebase, googleAuthProvider } from '../firebase/firebase';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: { uid: null }
  },
  reducers: {
    login: (state, action) => {
      state.value.uid = action.payload;
    },
    logout: (state) => {
      state.value.uid = null;
    }
  }
});

export const {
  login,
  logout
} = authSlice.actions;

export const selectAuth = (state) => !!state.auth.value.uid;
export const selectID = (state) => state.auth.value.uid;

export function firebaseLogin() {
  return () => firebase.auth().signInWithPopup(googleAuthProvider);
}

export function firebaseLogout() {
  return () => firebase.auth().signOut();
}

export default authSlice.reducer;
