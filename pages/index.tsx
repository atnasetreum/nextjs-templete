import { useContext, useEffect } from 'react';

import { NextPage } from 'next';

import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Button } from '@mui/material';

import { MainLayout } from '@components/layouts';
import { AuthContext, SocketContext } from '@contexts';
import { getUsers } from '@slices/users';
import { useAppSelector, useAppDispatch } from '@hooks';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomePage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const { data: users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleClick = () => {
    socket?.emit('click-button');
  };

  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Button color="primary" variant="contained" onClick={handleClick}>
              Emit event = {user?.email}
            </Button>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              {users.map((user) => (
                <p key={user.id}>{user.name}</p>
              ))}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default HomePage;
