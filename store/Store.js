// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import coursesReducer from './coursesReducer';
export default configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer
  },
});
