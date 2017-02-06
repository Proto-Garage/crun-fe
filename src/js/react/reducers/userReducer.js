import {
   GET_USER, GET_USER_ERR, POST_USER, POST_USER_ERR
} from '../actions/types'

const initialState = {
  users: {},
  links: {},
  errors: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER:
      return {
        users: action.users,
        links: action.links,
        errors: {}
      }
      break;
    case GET_USER_ERR:
      return {
        users: {},
        links: {},
        errors: action.errors
      }
      break;
    case POST_USER:
      return {
        id: action.id,
        errors: {}
      }
      break;
    case POST_USER_ERR:
      return {
        errors: action.errors
      }
      break;
    default: return state;

  }
}
