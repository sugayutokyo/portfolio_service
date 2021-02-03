import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  uid: string
  displayName: string
  photoUrl: string
}

export const userInitialState: UserState = {
  uid: '',
  displayName: '',
  photoUrl: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<UserState>) => {
      state = action.payload
    },
  },
})

export const { login } = userSlice.actions

export default userSlice
