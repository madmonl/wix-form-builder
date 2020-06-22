import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/auth/authSlice';
import formsListReducer from '../components/formsList/FormsListSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    forms: formsListReducer
  }
});
