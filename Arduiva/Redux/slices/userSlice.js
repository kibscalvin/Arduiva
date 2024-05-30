import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    balance: 0,
    userName: '',
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

// Export actions
export const { setUserBalance, setUserName } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
