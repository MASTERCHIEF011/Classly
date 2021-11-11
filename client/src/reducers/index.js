import { combineReducers } from 'redux';
import auth from './auth';
import videoCall from './videoCall'
import videoAnalysis from './videoAnalysis'
export default combineReducers({
    auth,
    videoCall,
    videoAnalysis
});