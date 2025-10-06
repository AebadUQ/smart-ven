import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import student from './student-slice';
import auth from './auth-slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // only persist token field (optional)
};

const persistedAuthReducer = persistReducer(authPersistConfig, auth);

const reducers = combineReducers({
  auth: persistedAuthReducer,
  student,
});

export default reducers;
