import * as api from '../api';
import { JOIN_CALL } from '../constants/actionTypes';

export const joincall = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.joincall(formData);
        dispatch({ type: JOIN_CALL, data });
    } catch (error) {
        console.log(error);
    }
}