import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
   
  },
  reducers: {
   getUser:(state,actions)=>{
    return actions.payload
   },
   updateUsers:(state,actions)=>{
    return [{...state[0],coursesEnrolledIds:[...state[0].coursesEnrolledIds,actions.payload]}]
   },
   updateProfile:(state,actions)=>{
    return [{...state[0],profilePic:actions.payload}]
   }
  },
})

export const { getUser, updateUsers } = userSlice.actions
export default userSlice.reducer