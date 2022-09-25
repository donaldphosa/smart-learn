import { configureStore } from '@reduxjs/toolkit'
import coursesSlice from './slice'
import  userSlice  from './userStore'

export const store = configureStore({
    reducer:{
        courses:coursesSlice,
        users:userSlice
    }
})