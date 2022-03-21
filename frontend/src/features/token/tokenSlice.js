import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    tokenName: "",
    remainingTokens: 0,
  },
  reducers: {
    storeTokenName: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tokenName = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { storeTokenName } = tokenSlice.actions

export default tokenSlice.reducer