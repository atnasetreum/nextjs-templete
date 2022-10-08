import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { usersConstants } from '@constants';

interface User {
  name: string;
  email: string;
}

interface CounterState {
  users: User[];
}

const initialState: CounterState = {
  users: [],
};

export const usersSlice = createSlice({
  name: usersConstants.sliceName,
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
