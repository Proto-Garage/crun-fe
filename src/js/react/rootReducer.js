import { combineReducers } from 'redux'

import flashMessages from './reducers/flashMessages'
import auth from './reducers/auth'
import user from './reducers/userReducer'
import commandReducer from './reducers/commandReducer'
import userReducer from './reducers/userReducer'
import roleReducer from './reducers/roleReducer'

export default combineReducers({
  flashMessages,
  auth,
  commandReducer,
  userReducer,
  roleReducer
});
