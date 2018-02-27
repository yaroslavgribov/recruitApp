import axios from 'axios';

import { API_TOKEN_KEY } from './constants/session';

export const saveToken = token => {
  localStorage.setItem(API_TOKEN_KEY, token);
};

export const retrieveToken = () => {
  return localStorage.getItem(API_TOKEN_KEY);
};

export const setTokenHeaders = () => {
  axios.defaults.headers.common['X-Auth-Token'] = retrieveToken();
};
