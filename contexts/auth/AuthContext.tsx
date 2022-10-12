import { createContext } from 'react';

import { UserLogin } from '@interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  user?: UserLogin;
  loginUser: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps);
