import { userTypes } from '../constants/userTypes';
import instance from '../axiosInstance';

const FETCH_INTERVIEWS_REQUEST = 'interviews/FETCH_INTERVIEWS_REQUEST';
const FETCH_INTERVIEWS_SUCCESS = 'interviews/FETCH_INTERVIEWS_SUCCESS';
const FETCH_INTERVIEWS_FAIL = 'interviews/FETCH_INTERVIEWS_FAIL';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_INTERVIEWS_REQUEST:
      return state;

    case FETCH_INTERVIEWS_SUCCESS:
      return {
        ...state,
        requests: action.requests
      };

    case FETCH_INTERVIEWS_FAIL:
      return state;
    default:
      return state;
  }
};

export const fetchInterviewsSuccess = requests => {
  return {
    type: FETCH_INTERVIEWS_SUCCESS,
    requests
  };
};

export const fetchInterviews = () => dispatch => {
  instance
    .get('/employers/interview_requests')
    .then(r => r.data)
    .then(({ interview_requests }) => {
      const requests = interview_requests.filter(
        request => request.state !== 'withdrawn' && request.state !== 'rejected'
      );
      dispatch(fetchInterviewsSuccess(requests));
    });
};

export const rejectInterview = id => dispatch => {
  instance
    .post(`/employers/interview_requests/${id}/reject`)
    .then(r => r.data)
    .then(_ => {
      dispatch(fetchInterviews());
    });
};
