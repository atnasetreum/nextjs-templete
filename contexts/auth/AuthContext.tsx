import { createContext } from 'react';

import { IUser } from '@interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  loading: boolean;
  user?: IUser;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
