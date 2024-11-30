import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import amazonReducer from "../redux/amazonSlice"

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, amazonReducer);

export const store = configureStore({
  reducer: {amazon:persistedReducer,},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            igenoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER,],
        },
    }),
});

export let persistor = persistStore(store);