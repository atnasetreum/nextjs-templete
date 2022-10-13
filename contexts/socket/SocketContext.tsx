import { createContext } from 'react';

import { Socket } from 'socket.io-client';

interface ContextProps {
  socket: Socket | undefined;
  online: boolean;
  connectSocket: () => Promise<void>;
  disconnectSocket: () => void;
}

export const SocketContext = createContext({} as ContextProps);
