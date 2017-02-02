import { SET_CURRENT_USER, SHOW_ERROR } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        errors: {}
      };
    case SHOW_ERROR:
      return {
        errors: action.errors,
        isAuthenticated: false
      };
    default: return state;
  }
}
