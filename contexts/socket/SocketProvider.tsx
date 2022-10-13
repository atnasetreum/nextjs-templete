import { FC } from 'react';

import { SocketContext } from '.';
import { useSocket } from '@hooks';

interface Props {
  children: JSX.Element;
}

export const SocketProvider: FC<Props> = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket();
  return (
    <SocketContext.Provider
      value={{ socket, online, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
