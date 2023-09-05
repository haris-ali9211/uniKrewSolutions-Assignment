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
import loaderReducer from './reducers/loader';
import cartReducer from './reducers/cartReducer';
import favoriteReducer from './reducers/favoriteReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: loginReducer,
  loader: loaderReducer,
  cart: cartReducer,
  favorites: favoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
