import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { usersConstants } from '@constants';
import { CostCenter } from '@interfaces';

interface CostCenterState {
  data: CostCenter[];
  isLoading: boolean;
  isError: string;
}

const initialState: CostCenterState = {
  data: [],
  isLoading: false,
  isError: '',
};

export const costCenterSlice = createSlice({
  name: usersConstants.sliceName,
  initialState,
  reducers: {
    setCostCenter: (state, action: PayloadAction<CostCenter[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.data = action.payload;
    },
  },
});

export const { setCostCenter } = costCenterSlice.actions;
