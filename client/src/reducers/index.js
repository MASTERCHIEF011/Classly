import { combineReducers } from 'redux';
import auth from './auth';
import videoCall from './videoCall'
import videoAnalysis from './videoAnalysis'
import classReducer from './class';
export default combineReducers({
    auth,
    videoCall,
    videoAnalysis,
    classReducer
});