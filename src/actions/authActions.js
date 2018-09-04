import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

/**
 * @desc Here you will find all the actions related to user authentication.
 */

// Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('http://localhost:4000/profiili/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login user
export const loginUser = userData => dispatch => {
    axios.post('http://localhost:4000/profiili/login', userData)
        .then(res => {
            // Save to localstorage
            const {token} = res.data;
            // Set token to localstorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: console.log(err)
            })
        );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Logout user
export const logoutUser = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object & set isAuthenticated to 'false'
    dispatch(setCurrentUser({}));
};