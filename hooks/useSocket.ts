import { useEffect, useState, useCallback } from 'react';

import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState<Socket>();

  const connectSocket = useCallback(async () => {
    await fetch('/api/socket');
    const socketNew = io({ autoConnect: true, forceNew: true });
    setSocket(socketNew);
  }, []);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    const event = 'connect';
    socket?.on(event, () => {
      setOnline(true);
    });
    return () => {
      socket?.off(event);
    };
  }, [socket]);

  useEffect(() => {
    const event = 'disconnect';
    socket?.on(event, () => {
      setOnline(false);
    });
    return () => {
      socket?.off(event);
    };
  }, [socket]);

  return {
    socket,
    online,
    disconnectSocket,
    connectSocket,
  };
};
