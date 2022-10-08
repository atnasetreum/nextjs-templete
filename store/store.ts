import { configureStore } from '@reduxjs/toolkit';

import { rootReducers } from './rootReducers';

export const store = configureStore(rootReducers);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
