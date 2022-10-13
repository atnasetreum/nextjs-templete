import { usersSlice, uiSlice } from '@slices';

export const rootReducers = {
  reducer: {
    users: usersSlice.reducer,
    iu: uiSlice.reducer,
  },
};
