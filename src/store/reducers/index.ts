import { combineReducers } from 'redux';
import counter from './counter-slice';
import student from './student-slice'

// Your reducer logic follows
const reducers = combineReducers({
  counter,
  student
  // Additional reducers if needed
});

export default reducers;
