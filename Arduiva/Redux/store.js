// store.js
import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlice';
import paymentReducer from './slices/paymentSlice';
import userReducer from './slices/userSlice';



const store = configureStore({
    reducer: {
        nav: navReducer,
        payment: paymentReducer,
        user: userReducer,
    },
});

export default store;
