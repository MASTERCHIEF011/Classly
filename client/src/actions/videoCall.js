import * as api from '../api';
import { JOIN_CALL } from '../constants/actionTypes';

export const joincall = (roomId) => async (dispatch) => {
    try {
        const { data } = await api.joincall(roomId);
        console.log(data, "helelllllssldahjavsfa")
        dispatch({ type: JOIN_CALL, data });
    } catch (error) {
        console.log(error);
    }
}