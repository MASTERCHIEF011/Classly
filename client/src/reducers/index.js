import { combineReducers } from 'redux';
import auth from './auth';
import videoCall from './videoCall'
export default combineReducers({
    auth,
    videoCall,
});