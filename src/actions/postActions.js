import axios from 'axios';
import {ADD_POST, GET_ERRORS} from './types';

//ADD post
//THIS NEEDS TO POST TO THE CUSTOMER SERVER, NOT TO THE ADMIN SERVER. SHOULD BE EASY TO FIX /KPU
export const addPost = postData => dispatch => {
    axios
        .post('http://localhost:3000/createinsuranceclaims', postData)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};