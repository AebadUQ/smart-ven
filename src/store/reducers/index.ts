// src/store/reducers/index.ts
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import student from './student-slice';
import auth from './auth-slice';
import van from './van-slice';
import alert from './alert-slice';
import driver from './driver-slice';
import complaint from './complaint-management';
import route from './route-slice';
import suadmin from './suadmin-slice';
import trip from './trip-slice'
import dashboard from './dashboard-slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, auth);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  trip,
  student,
  van,
  driver,
  alert,
  complaint,
  route,
  suadmin,
  dashboard,
});

export default rootReducer;
