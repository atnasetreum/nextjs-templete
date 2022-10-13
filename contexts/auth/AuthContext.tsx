import { createContext } from 'react';

import { UserLogin } from '@interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  loading: boolean;
  user?: UserLogin;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
