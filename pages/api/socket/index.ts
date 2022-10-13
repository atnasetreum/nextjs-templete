/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

import { Server, Socket } from 'socket.io';

import { isValidToken } from '@utils';
import { User } from '@models';
import { connectToDatabase } from '@database';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

const connectedClients: ConnectedClients = {};

const SocketHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (res.socket) {
    const socket = res.socket as any;

    if (socket.server.io) {
      console.log('Socket is already running');
    } else {
      console.log('Socket is initializing');
      const io = new Server(socket.server);
      socket.server.io = io;

      await connectToDatabase();

      io.on('connection', async (client) => {
        const { token = '' } = client.handshake.auth;
        try {
          const { id } = await isValidToken(token);
          const user = await User.findOneBy({ id });

          if (!user) return disconnectUser(client);

          registerUser(client, user);

          client.on('disconnect', () => {
            disconnectUser(client);
          });

          events(client);
        } catch (error) {
          disconnectUser(client);
        }
      });
    }
    res.end();
  }
};

function events(client: Socket) {
  client.on('click-button', () => {
    client.emit('update-count-notify');
  });
}

function countClients() {
  return Object.keys(connectedClients).length;
}

function labelCount() {
  console.log('[SOCKET] count connected clients', countClients());
}

function registerUser(client: Socket, user: User) {
  console.log('[SOCKET] connected => user', user?.email);

  client.join(user.email);
  connectedClients[client.id] = {
    socket: client,
    user,
  };
  labelCount();
}

function disconnectUser(client: Socket) {
  const clientId = client.id;

  const socketCurrent = connectedClients[clientId];

  let message = `[SOCKET] disconnect => ${clientId}`;
  if (socketCurrent) {
    const user = socketCurrent.user;
    delete connectedClients[clientId];
    message = `${message} => user: ${user.email}`;
  }
  console.log(message);
  labelCount();
  client.disconnect();
}

export default SocketHandler;
