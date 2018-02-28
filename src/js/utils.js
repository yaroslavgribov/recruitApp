import axios from 'axios';

import { apiTokenKey, roleKey } from './constants/session';

const saveToStorage = key => value => {
  localStorage.setItem(key, value);
};

const getFromStorage = key => () => {
  return localStorage.getItem(key);
};

const deleteFromStorage = key => () => {
  localStorage.removeItem(key);
};

export const saveToken = saveToStorage(apiTokenKey);
export const retrieveToken = getFromStorage(apiTokenKey);
export const deleteToken = deleteFromStorage(apiTokenKey);

export const saveRole = saveToStorage(roleKey);
export const retrieveRole = getFromStorage(roleKey);
export const deleteRole = deleteFromStorage(roleKey);

export const setTokenHeaders = token => {
  axios.defaults.headers.common['X-Auth-Token'] = token;
};
