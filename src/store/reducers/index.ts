import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import student from './student-slice';
import auth from './auth-slice';
import van from './van-slice'
import alert from './alert-slice'
import driver from './driver-slice'
import complaint from './complaint-management'
import route from './route-slice'
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // only persist token field (optional)
};

const persistedAuthReducer = persistReducer(authPersistConfig, auth);

const reducers = combineReducers({
  auth: persistedAuthReducer,
  student,
  van,
  driver,
  alert,
  complaint,
  route
});

export default reducers;
