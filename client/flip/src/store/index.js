import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger({
  level: {
    prevState: false,
    action: 'log',
    nextState: 'log',
    error: 'error'
  }
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
