import { combineReducers } from 'redux';
import userAuth from './userAuth-reducers';
import userProfile from './userProfile-reducers';

export default combineReducers({
  userAuth,
  userProfile,
});