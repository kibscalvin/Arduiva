// paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        mode: 'cash', // default payment mode
    },
    reducers: {
        setPaymentMode: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { setPaymentMode } = paymentSlice.actions;

export const selectPaymentMode = (state) => state.payment.mode;

export default paymentSlice.reducer;
