import { SEND_VIDEO_DATA } from '../constants/actionTypes';

const videoAnalysisReducer = (state = { videoAnalysisData: null, conversationData: {}, }, action) => {
    switch (action.type) {
        case SEND_VIDEO_DATA:
            localStorage.setItem('videoAnalysisData', JSON.stringify({ ...action?.data }));
            return { ...state, conversationData: action?.data };

        default:
            return state;
    }
};

export default videoAnalysisReducer;