import {
  GET_GROUP, GET_GROUP_ERR
} from '../actions/types'

const initialState = {
  groups: {},
  links: {},
  errors: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_GROUP:
      return {
        groups: action.groups,
        links: action.links,
        errors: {}
      }
    break;
    case GET_GROUP_ERR:
      return {
        groups: action.groups,
        links: action.links,
        errors: actions.errors
      }
    break;
    default: return state;
  }
}
