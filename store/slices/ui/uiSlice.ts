import { createSlice } from '@reduxjs/toolkit';

import { uiConstants } from '@constants';
import { UiState } from '@interfaces';

const initialState: UiState = {
  isOpenMenu: false,
};

export const uiSlice = createSlice({
  name: uiConstants.sliceName,
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
  },
});

export const { toggleMenu } = uiSlice.actions;
