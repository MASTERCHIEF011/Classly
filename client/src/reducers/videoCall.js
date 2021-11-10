import { JOIN_CALL } from '../constants/actionTypes';

const videoCallReducer = (state = { roomData: null }, action) => {
    //change state based on action type and payload
    switch (action.type) {
        case JOIN_CALL:
            return { ...state, roomData: action?.data };

        default:
            return state;
    }
};

export default videoCallReducer;