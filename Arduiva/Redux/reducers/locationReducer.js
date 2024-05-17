// locationReducer.js

// Initial state
const initialState = {
    latitude: null,
    longitude: null,
    error: null
};

// Action types
const SET_LOCATION = 'SET_LOCATION';
const SET_ERROR = 'SET_ERROR';

// Reducer function
const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                error: null
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
};

// Action creators

export default locationReducer;