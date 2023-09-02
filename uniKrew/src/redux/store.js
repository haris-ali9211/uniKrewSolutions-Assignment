// local storage import
import AsyncStorage from '@react-native-async-storage/async-storage';

// redux import
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// reducers
import loginReducer from './reducers/loginReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};
