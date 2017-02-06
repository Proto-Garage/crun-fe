import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'
import { SET_CURRENT_USER, BASE_URL, SHOW_ERROR } from './types'

const instance = axios.create({
  baseURL: BASE_URL
});
