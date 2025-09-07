import { combineReducers } from 'redux';
import student from './student-slice'
import auth from './auth-slice'
// Your reducer logic follows
const reducers = combineReducers({
  auth,
  student,

  // Additional reducers if needed
});

export default reducers;
