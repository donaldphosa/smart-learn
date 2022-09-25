import { createSlice } from '@reduxjs/toolkit'

export const courseSlice = createSlice({
  name: 'courses',
  initialState: {
   
  },
  reducers: {
   setVideos:(state,actions)=>{
        return actions.payload 
   },
   setLikes:(state,actions)=>{
    return {...state,courseLikes:actions.payload}
   }
  },
})

export const { setVideos,setLikes } = courseSlice.actions
export default courseSlice.reducer