import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLocation: null, // Fixed case to match the reducer function
    serviceProviderLocation: null, // Fixed case to match the reducer function
    //travelTimeInformation: null,
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        setServiceProviderLocation: (state, action) => {
            state.serviceProviderLocation = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

export const { setCurrentLocation, setServiceProviderLocation, setTravelTimeInformation } = navSlice.actions;

export const selectCurrentLocation = (state) => state.nav.currentLocation;
export const selectServiceProviderLocation = (state) => state.nav.serviceProviderLocation;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;
