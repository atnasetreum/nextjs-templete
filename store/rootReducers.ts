import { createGQLClient } from '../gql-client';

import { usersSlice, uiSlice, costCenterSlice } from '@slices';

export const rootReducers = {
  reducer: {
    users: usersSlice.reducer,
    iu: uiSlice.reducer,
    costCenter: costCenterSlice.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { client: createGQLClient() },
      },
      serializableCheck: false,
    }),
};
