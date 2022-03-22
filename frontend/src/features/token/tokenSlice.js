import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    tokenName: "",
    tokenSymbol: "",
    remainingTokens: 0,
  },
  reducers: {
    storeToken: (state, action) => {
      state.tokenName = action.payload.name;
      state.tokenSymbol = action.payload.symbol;
      state.remainingTokens = action.payload.remainingTokens;
    },
  },
})

// Action creators are generated for each case reducer function
export const { storeToken } = tokenSlice.actions

export default tokenSlice.reducer