/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

interface ContextProps {
  swReg: any;
  isActivePushNotifications: boolean;
  activeNotificationWeb: () => void;
  cancelSubscribe: () => Promise<void>;
}

export const SwContext = createContext({} as ContextProps);
