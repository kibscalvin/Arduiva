import { SET_LOCATION, SET_ERROR } from './Redux/actionTypes';


const setLocation = (latitude, longitude) => ({
  type: SET_LOCATION,
  payload: { latitude, longitude }
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: { error }
});

export { setLocation, setError };