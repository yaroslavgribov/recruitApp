import { userTypes } from '../constants/userTypes';
import instance from '../axiosInstance';

const FETCH_USERS_REQUEST = 'users/FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'users/FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'users/FETCH_USERS_FAIL';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return state;

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.list
      };

    case FETCH_USERS_FAIL:
      return state;
      
    default:
      return state;
  }
};

export const fetchUsersRequest = { type: FETCH_USERS_REQUEST };

export const fetchUsersSuccess = ({ type, list }) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: { type, list }
  };
};

export const fetchUsers = type => dispatch => {
  instance
    .get('/employers/users')
    .then(r => r.data)
    .then(({ users }) => {
      dispatch(fetchUsersSuccess({ type, list: users }));
    });
};


