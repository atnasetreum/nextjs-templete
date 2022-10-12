import { FC, useReducer, useEffect } from 'react';

import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';
import { UserLogin } from '@interfaces';
import { authService } from '@services';
import { routesConstants } from '@constants';
import { useNotify } from '@hooks';

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserLogin;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: JSX.Element;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { notify } = useNotify();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const createSession = (token: string, user: UserLogin) => {
    Cookies.set('token', token);
    dispatch({ type: '[Auth] - Login', payload: user });
    if (router.pathname === routesConstants.loginPage) {
      router.replace(routesConstants.root);
    }
  };

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const {
        data: { token, user },
      } = await authService.login({
        email,
        password,
      });
      createSession(token, user);
      return true;
    } catch (error) {
      return false;
    }
  };

  const checkToken = async () => {
    try {
      const {
        data: { token, user },
      } = await authService.validateToken();
      createSession(token, user);
    } catch (err) {
      Cookies.remove('token');
      notify('The session expired');
      if (router.pathname !== routesConstants.loginPage) {
        router.push(routesConstants.loginPage);
      }
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
