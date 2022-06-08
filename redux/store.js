import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
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
import AsyncStorage from '@react-native-community/async-storage';

import postReducer from './postSlice';
import {postSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'posts',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, postReducer);

const configureMiddleware = getDefaultMiddleware => {
  const result = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

  result.push(sagaMiddleware);
  result.push(logger);

  return result;
};

const store = configureStore({
  reducer: {
    posts: persistedReducer,
  },
  middleware: configureMiddleware,
});

export default store;
export const persistor = persistStore(store);

sagaMiddleware.run(postSaga);
