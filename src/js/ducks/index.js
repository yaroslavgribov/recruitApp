import { combineReducers } from 'redux';

import user from './user';
import jobs from './jobs';
import candidates from './candidates';
import interviews from './interviews';

export default combineReducers({
  user, jobs, candidates, interviews
});