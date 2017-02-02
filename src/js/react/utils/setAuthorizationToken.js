import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Access ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
