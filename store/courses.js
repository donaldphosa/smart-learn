import { createSlice } from '@reduxjs/toolkit'

export const allCourseSlice = createSlice({
  name: 'allCourses',
  initialState: {
   
  },
  reducers: {
   setCourses:(state,actions)=>{
        return actions.payload 
   }
  },
})

export const { setCourses } = allCourseSlice.actions
export default allCourseSlice.reducer