import { FC, useReducer, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import { Backdrop, CircularProgress } from '@mui/material';

import { AuthContext, authReducer } from '.';
import { UserLogin } from '@interfaces';
import { authService } from '@services';
import { routesConstants } from '@constants';
import { SocketContext } from '@contexts/socket';

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserLogin;
  loading: boolean;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
  loading: false,
};

interface Props {
  children: JSX.Element;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { connectSocket, disconnectSocket, online } = useContext(SocketContext);

  const createSession = (token: string, user: UserLogin) => {
    connectSocket();
    Cookies.set('token', token);
    dispatch({ type: '[Auth] - Login', payload: user });
    if (router.pathname === routesConstants.loginPage) {
      router.replace(routesConstants.root);
    }
  };

  const killSession = () => {
    if (online) {
      disconnectSocket();
    }
    Cookies.remove('token');
    dispatch({ type: '[Auth] - Logout' });
    if (router.pathname !== routesConstants.loginPage) {
      router.replace(routesConstants.loginPage);
    }
  };

  const logoutUser = () => {
    killSession();
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
      killSession();
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.isLoggedIn && router.pathname !== routesConstants.loginPage) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <AuthContext.Provider value={{ ...state, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
