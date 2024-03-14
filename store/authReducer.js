// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   setUser: (state, action)=>{
    state.auth = action.payload;
   }  
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
