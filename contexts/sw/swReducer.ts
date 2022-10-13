/* eslint-disable @typescript-eslint/no-explicit-any */
import { SwState } from '.';

type SwActionType =
  | { type: '[SW] - Set Reg'; payload: any }
  | { type: '[SW] - active notifications'; payload: any };

export const swReducer = (state: SwState, action: SwActionType): SwState => {
  switch (action.type) {
    case '[SW] - Set Reg':
      return {
        ...state,
        swReg: action.payload,
      };
    case '[SW] - active notifications':
      return {
        ...state,
        isActivePushNotifications: action.payload,
      };

    default:
      return state;
  }
};
