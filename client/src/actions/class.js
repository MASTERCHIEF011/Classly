import * as api from '../api';
import { CREATE_CLASS } from '../constants/actionTypes';

export const createClass = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createClass(formData);
        dispatch({ type: CREATE_CLASS, data });
        navigate('/dashboard/classes')
    } catch (error) {
        console.log(error);
    }
}