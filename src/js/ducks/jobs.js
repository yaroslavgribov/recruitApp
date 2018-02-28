import instance from '../axiosInstance';
import { jobTypes } from '../constants/jobTypes';

const FETCH_JOBS_REQUEST = 'jobs/FETCH_JOBS_REQUEST';
const FETCH_JOBS_SUCCESS = 'jobs/FETCH_JOBS_SUCCESS';
const FETCH_JOBS_FAIL = 'jobs/FETCH_JOBS_FAIL';

const jobParams = {
  [jobTypes.applications]: {
    select_applied: 1
  },
  [jobTypes.openings]: {
  }
};

const initialState = {};

// { jobType: 'applications', list: [] }
// { jobType: 'openings', list: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS: {
      return {
        ...state,
        [action.payload.jobType]: action.payload.list,
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

export const fetchJobsSuccess = payload => {
  return {
    type: FETCH_JOBS_SUCCESS,
    payload
  };
};

export const fetchJobsFail = error => {
  return {
    type: FETCH_JOBS_FAIL,
    error
  };
};

export const fetchJobs = jobType => dispatch => {
  dispatch(fetchJobsRequest());

  const params = jobParams[jobType];

  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach(key => urlSearchParams.append(key, params[key]));

  instance
    .get('/users/jobs', { params: urlSearchParams })
    .then(({ data, status }) => ({ data, status }))
    .then(({ data, status }) => {
      if (status !== 304) {
        dispatch(fetchJobsSuccess({ jobType, list: data.jobs }));
      }
    })
    .catch(error => {
      dispatch(fetchJobsFail(error));
    });
};

export const requestApplication = id => dispatch => {
  instance
    .post('/users/interview_requests', {
      interview_request: {
        job_id: id
      }
    })
    .then(r => r.data)
    .then(_ => {
      dispatch(fetchJobs(jobTypes.openings));
    });
};

export const cancelApplication = id => dispatch => {
  instance
    .post(`/users/interview_requests/${id}/withdraw`)
    .then(r => r.data)
    .then(_ => {
      dispatch(fetchJobs(jobTypes.applications));
    });
};
