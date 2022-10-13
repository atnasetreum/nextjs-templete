import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { usersConstants } from '@constants';
import { IUser } from '@interfaces';

interface UsersState {
  data: IUser[];
  isLoading: boolean;
  isError: string;
}

const initialState: UsersState = {
  data: [],
  isLoading: false,
  isError: '',
};

export const usersSlice = createSlice({
  name: usersConstants.sliceName,
  initialState,
  reducers: {
    startLoadingUser: (state) => {
      state.isLoading = true;
      state.isError = '';
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.data = action.payload;
    },
  },
});

export const { startLoadingUser, setUsers } = usersSlice.actions;
