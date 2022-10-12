import { FC } from 'react';

import { SocketContext } from '.';
import { useSocket } from '@hooks';

interface Props {
  children: JSX.Element;
}

export const SocketProvider: FC<Props> = ({ children }) => {
  const { socket, online } = useSocket();
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
