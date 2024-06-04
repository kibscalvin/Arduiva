import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        mode: 'cash', // default payment mode
        ePayBalance: 2000, // default ePay balance (in GPT)
    },
    reducers: {
        setPaymentMode: (state, action) => {
            state.mode = action.payload;
        },
        setEPayBalance: (state, action) => {
            state.ePayBalance = action.payload;
        },
    },
});

export const { setPaymentMode, setEPayBalance } = paymentSlice.actions;

export const selectPaymentMode = (state) => state.payment.mode;
export const selectEPayBalance = (state) => state.payment.ePayBalance;

export default paymentSlice.reducer;
