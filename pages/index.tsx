import { useContext, useEffect, useState, ChangeEvent } from 'react';

import { NextPage } from 'next';

import { Button } from '@mui/material';
import io, { Socket } from 'socket.io-client';

import { MainLayout } from '@components/layouts';
import { useAppSelector, useAppDispatch } from '@hooks';
import { setUsers } from '@slices/users';
import { AuthContext } from '@contexts';

let socket: Socket;

const HomePage: NextPage = () => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  const [input, setInput] = useState('');

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io();

      socket.on('connect', () => {
        console.log('connected mm');
      });

      socket.on('update-input', (msg) => {
        setInput(msg);
      });
    };
    socketInitializer();
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit('input-change', e.target.value);
  };

  useEffect(() => {
    // console.log({ users });
  }, [users]);

  return (
    <MainLayout>
      <Button
        onClick={() =>
          dispatch(
            setUsers([
              {
                name: 'edu',
                email: 'correo',
              },
            ]),
          )
        }
      >
        update users
      </Button>

      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
    </MainLayout>
  );
};

export default HomePage;
