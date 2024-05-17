import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Uncomment this line
import { locationReducer } from '../reducers/locationReducer';

// rootReducer.js

const rootReducer = combineReducers({
    auth: authReducer, // Uncomment this line
    location: locationReducer,
});

export default rootReducer;
