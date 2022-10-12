import { useContext, useEffect, ChangeEvent, useState } from 'react';

import { NextPage } from 'next';

import { styled } from '@mui/material/styles';
import { Box, Paper, Grid } from '@mui/material';

import { MainLayout } from '@components/layouts';
import { AuthContext, SocketContext } from '@contexts';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomePage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const { socket, online } = useContext(SocketContext);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log({ user });
  }, [user]);

  useEffect(() => {
    console.log({ socket, online });
  }, [online, socket]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket?.emit('input-change', e.target.value);
  };

  useEffect(() => {
    socket?.on('update-input', (msg) => {
      setInput(msg);
    });
    return () => {
      socket?.off('update-input');
    };
  }, [socket]);

  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))}
        </Grid>
        <input
          placeholder="Type something"
          value={input}
          onChange={onChangeHandler}
        />
      </Box>
    </MainLayout>
  );
};

export default HomePage;
