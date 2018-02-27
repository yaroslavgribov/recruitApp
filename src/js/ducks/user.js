import instance from '../axiosInstance';
import generateError from '../errors';
import { saveToken } from '../utils';

const CREATE_SESSION_REQUEST = 'user/CREATE_SESSION_REQUEST';
const CREATE_SESSION_SUCCESS = 'user/CREATE_SESSION_SUCCESS';
const CREATE_SESSION_FAIL = 'user/CREATE_SESSION_FAIL';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        session: action.session,
        error: null
      };
    
    case CREATE_SESSION_FAIL:
      return {
        ...state,
        error: action.error
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

export const createSessionSuccess = session => {
  return {
    type: CREATE_SESSION_SUCCESS,
    session
  };
};

export const createSessionFail = error => {
  return {
    type: CREATE_SESSION_FAIL,
    error
  };
};

export const createSession = (email, password) => {
  return dispatch => {
    dispatch(createSessionRequest());

    instance
      .post('/users/sessions', {
        session: {
          email,
          password
        }
      })
      .then(r => r.data)
      .then(session => {
        saveToken(session.api_token);
        dispatch(createSessionSuccess(session));
      })
      .catch(error => {
        const status = error.response.status;

        dispatch(createSessionFail(generateError('user', status)));
      });
  };
};

export const retrieveSession = apiToken => {
  return dispatch => {
    dispatch(createSessionRequest());

    instance
      .get('/users/sessions')
      .then(r => r.data)
      .then(session => dispatch(createSessionSuccess(session)))
      .catch(error => {
        const status = error.response.status;

        dispatch(createSessionFail(generateError('user', status)));
      });
  };
};
