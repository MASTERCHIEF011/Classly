import { CREATE_CLASS } from '../constants/actionTypes';

const classReducer = (state = { classData: null }, action) => {
    //change state based on action type and payload
    switch (action.type) {  
        case CREATE_CLASS:
            localStorage.setItem('classData', JSON.stringify({ ...action?.data }));
            return { ...state, classData: action?.data };

        default:
            return state;
    }
};

export default classReducer;