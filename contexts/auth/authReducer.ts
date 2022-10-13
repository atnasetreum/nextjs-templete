import { AuthState } from './';
import { UserLogin } from '@interfaces';

type AuthActionType =
  | { type: '[Auth] - Login'; payload: UserLogin }
  | { type: '[Auth] - Logout' };

export const authReducer = (
  state: AuthState,
  action: AuthActionType,
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading: true,
      };
    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
        loading: false,
      };

    default:
      return state;
  }
};
