import { createContext } from 'react';

import { Socket } from 'socket.io-client';

interface ContextProps {
  socket: Socket | undefined;
  online: boolean;
}

export const SocketContext = createContext({} as ContextProps);
