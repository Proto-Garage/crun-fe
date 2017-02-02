import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import user from './reducers/userReducer';
import commandReducer from './reducers/commandReducer';

export default combineReducers({
  flashMessages,
  auth,
  commandReducer
});
