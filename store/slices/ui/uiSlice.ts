import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { uiConstants } from '@constants';
import { UiState } from '@interfaces';

const initialState: UiState = {
  isOpenMenu: false,
};

export const uiSlice = createSlice({
  name: uiConstants.sliceName,
  initialState,
  reducers: {
    toogleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    // setUsers2: (state, action: PayloadAction<UiState>) => {
    //   state.isOpenMenu = action.payload;
    // },
  },
});

export const { toogleMenu } = uiSlice.actions;
