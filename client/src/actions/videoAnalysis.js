import * as api from '../api';
import { SEND_VIDEO_DATA } from '../constants/actionTypes';

export const sendvideodata = (formData) => async (dispatch) => {
    try {
        console.log(formData.getAll('file'), "bla")
        const { data } = await api.sendVideoData(formData);
        dispatch({ type: SEND_VIDEO_DATA, data });
        //Just close modal-->no redirect
        // history.push('/pitchAnalysisResult')
    } catch (error) {
        console.log(error);
    }
}



