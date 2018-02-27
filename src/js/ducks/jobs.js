import instance from '../axiosInstance';

const FETCH_JOBS_REQUEST = 'jobs/FETCH_JOBS_REQUEST';
const FETCH_JOBS_SUCCESS = 'jobs/FETCH_JOBS_SUCCESS';
const FETCH_JOBS_FAIL = 'jobs/FETCH_JOBS_FAIL';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS: {
      return {
        ...state,
        openings: action.openings,
        error: null
      };
    }

    case FETCH_JOBS_FAIL: {
      return {
        ...state,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
};

export const fetchJobsRequest = () => {
  return {
    type: FETCH_JOBS_REQUEST
  };
};

export const fetchJobsSuccess = openings => {
  return {
    type: FETCH_JOBS_SUCCESS,
    openings
  };
};

export const fetchJobsFail = error => {
  return {
    type: FETCH_JOBS_FAIL,
    error
  };
};

export const fetchJobs = (...params) => dispatch => {
  dispatch(fetchJobsRequest());

  instance
    .get('/users/jobs')
    .then(r => r.data)
    .then(openings => {
      dispatch(fetchJobsSuccess(openings));
    })
    .catch(error => {
      dispatch(fetchJobsFail(error));
    });
};
