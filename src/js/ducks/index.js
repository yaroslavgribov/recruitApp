import { combineReducers } from 'redux';

import user from './user';
import jobs from './jobs';

export default combineReducers({
  user, jobs
});