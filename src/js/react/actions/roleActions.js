import axios from 'axios';
import {
  BASE_URL, GET_ROLE, GET_ROLE_ERR
} from './types';

const instance = axios.create({
  baseURL: BASE_URL
});

export function dispatchRole () {
  
}
