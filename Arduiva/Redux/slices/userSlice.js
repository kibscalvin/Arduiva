// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    balance: 53500, // Initial balance
    userName: '', // Initial user name
  },
  reducers: {
    setUserBalance: (state, action) => {
      state.balance = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserBalance, setUserName } = userSlice.actions;

export const selectUserBalance = (state) => state.user.balance;
export const selectUserName = (state) => state.user.userName;

export default userSlice.reducer;
