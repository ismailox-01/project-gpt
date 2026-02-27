import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import absencesReducer from '../features/absences/absencesSlice';
import contentReducer from '../features/content/contentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    absences: absencesReducer,
    content: contentReducer
  }
});
