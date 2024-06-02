import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import authSlice from './auth.slice';
import followingSlice from './following.slice';
import followedSlice from './followed.slice';
import diaryListSlice from './diaryList.slice';

export const rootReducer = combineReducers({
  auth: authSlice,
  following: followingSlice,
  followed: followedSlice,
  diaryList: diaryListSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
