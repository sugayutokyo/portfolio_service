import { combineReducers } from '@reduxjs/toolkit'
import userSlice, { UserState } from '@/features/userSlice'

export interface RootState {
  user: UserState
}

export const rootReducer = combineReducers({
  user: userSlice.reducer,
})
