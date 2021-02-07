import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'

interface USER {
  displayName: string
  photoUrl: string
}

export const userInitialState = {
  uid: '',
  displayName: '',
  photoUrl: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userInitialState,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = userInitialState
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName
      state.user.photoUrl = action.payload.photoUrl
    },
  },
})

export const { login, logout, updateUserProfile } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user // state.user.user 真ん中のuserはstate.tsのstore->reducerのkey値と同じである必要がある

export default userSlice.reducer
