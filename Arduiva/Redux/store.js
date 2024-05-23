// store.js
import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlice';
import paymentReducer from './slices/paymentSlice';



const store = configureStore({
    reducer: {
        nav: navReducer,
        payment: paymentReducer,
    },
});

export default store;
