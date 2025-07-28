import { combineReducers } from 'redux';
import counter from './counter-slice';


// Your reducer logic follows
const reducers = combineReducers({
  counter,
  // Additional reducers if needed
});

export default reducers;
