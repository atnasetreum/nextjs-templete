import { useContext, useEffect } from 'react';

import { NextPage } from 'next';

import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Button } from '@mui/material';

import { MainLayout } from '@components/layouts';
import { FormCustom } from '@components/ui';
import { AuthContext, SocketContext, SwContext } from '@contexts';
import { getUsers } from '@slices/users';
import { useAppSelector, useAppDispatch, useNotify } from '@hooks';
import { swService } from '@services';
import { handleError } from '@utils';

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
  const { isActivePushNotifications } = useContext(SwContext);
  const dispatch = useAppDispatch();
  const { notify } = useNotify();

  const { data: users } = useAppSelector((state) => state.users);

  useEffect(() => {
    //dispatch(getUsers());
  }, [dispatch]);

  const handleClick = () => {
    socket?.emit('click-button');
  };

  const handleClickWebpush = () => {
    if (!isActivePushNotifications) return notify('Web notification disable');
    swService
      .sendWebpush({ title: 'Test', body: 'Web Notification' })
      .catch((err) => handleError(err, notify));
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
              Socket notification = {user?.email}
            </Button>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Button
              color={isActivePushNotifications ? 'success' : 'error'}
              variant="contained"
              onClick={handleClickWebpush}
            >
              Send Web Notification
            </Button>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              {users.map((user) => (
                <p key={user.id}>{user.name}</p>
              ))}
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormCustom />
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default HomePage;
