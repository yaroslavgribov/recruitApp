import instance from '../axiosInstance';
import generateError from '../errors';
import {
  saveRole,
  saveToken,
  retrieveRole,
  retrieveToken,
  deleteRole,
  deleteToken,
  setTokenHeaders
} from '../utils';
import { roles } from '../constants/userRoles';

const CREATE_SESSION_REQUEST = 'user/CREATE_SESSION_REQUEST';
const CREATE_SESSION_SUCCESS = 'user/CREATE_SESSION_SUCCESS';
const CREATE_SESSION_FAIL = 'user/CREATE_SESSION_FAIL';

const DELETE_SESSION = 'user/DELETE_SESSION';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload.session,
        role: action.payload.role,
        error: null
      };

    case CREATE_SESSION_FAIL:
      return {
        ...state,
        error: action.error
      };

    case DELETE_SESSION:
      return {
        ...state,
        error: null,
        session: null,
        role: null
      };

    default:
      return state;
  }
};

export const createSessionRequest = () => {
  return {
    type: CREATE_SESSION_REQUEST
  };
};

export const createSessionSuccess = ({ role, session }) => {
  return {
    type: CREATE_SESSION_SUCCESS,
    payload: { role, session }
  };
};

export const createSessionFail = error => {
  return {
    type: CREATE_SESSION_FAIL,
    error
  };
};

export const deleteSessionSuccess = () => {
  return {
    type: DELETE_SESSION
  };
};

const withRole = (role, method, params) => {
  return instance[method](`/${role}s/sessions`, params);
};

export const logIn = (role, email, password) => dispatch => {
  dispatch(createSessionRequest());

  withRole(role, 'post', { session: { email, password } })
    .then(r => r.data)
    .then(session => {
      saveToken(session.api_token);
      saveRole(role);

      setTokenHeaders(session.api_token);

      dispatch(createSessionSuccess({ role, session }));
    })
    .catch(error => {
      const status = error.response.status;

      dispatch(createSessionFail(generateError('user', status)));
    });
};

export const retrieveSession = (role, token) => dispatch => {
  dispatch(createSessionRequest());
  setTokenHeaders(token);
  withRole(role, 'get')
    .then(r => r.data)
    .then(session => {

      dispatch(createSessionSuccess({ role, session }));
    })
    .catch(error => {
      const status = error.response.status;

      dispatch(createSessionFail(generateError('user', status)));
    });
};

export const logOut = () => dispatch => {
  const role = retrieveRole();

  withRole(role, 'delete')
    .then(r => r.data)
    .then(_ => {
      deleteToken();
      dispatch(deleteSessionSuccess());
    })
    .catch(error => {
      const status = error.response.status;
    });
};
