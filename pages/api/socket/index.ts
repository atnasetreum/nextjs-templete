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
        const { token = '' } = req.cookies;

        try {
          const { id } = await isValidToken(token);
          const user = await User.findOneBy({ id });

          if (!user) return disconnectUser(client);

          console.log('[SOCKET] connected => user', user?.email);

          client.join(user.email);
          connectedClients[client.id] = {
            socket: client,
            user,
          };

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

function disconnectUser(client: Socket) {
  console.log(`[SOCKET] disconnect => ${client.id}`);
  client.disconnect();
}

export default SocketHandler;
