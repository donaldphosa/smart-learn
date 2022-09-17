import { createSlice } from '@reduxjs/toolkit'

export const courseSlice = createSlice({
  name: 'courses',
  initialState: {
   
  },
  reducers: {
   setVideos:(state,actions)=>{
        return actions.payload 
   }
  },
})


export const { setVideos } = courseSlice.actions

export default courseSlice.reducer