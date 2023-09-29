import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const logger = createLogger({
    level: {
        prevState: false,
        action: 'log',
        nextState: 'log',
        error: 'error',
    },
});

const persistConfig = { key: 'flip', storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const persistor = persistStore(store);

export default store;

export { persistor };
