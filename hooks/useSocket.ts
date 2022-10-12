import { useEffect, useState } from 'react';

import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketInitializer = () => {
      const socketNew = io();
      setSocket(socketNew);
    };
    socketInitializer();
  }, []);

  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};
