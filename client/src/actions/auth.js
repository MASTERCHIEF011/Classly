import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        if(data.message.length > 0)
            navigate('/login');
        else
            navigate('/dashboard')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        console.log(formData)
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        navigate('/dashboard');

    } catch (error) {
        console.log(error);
    }
}