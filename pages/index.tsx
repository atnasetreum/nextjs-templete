import { useContext } from 'react';

import { NextPage } from 'next';

import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Button } from '@mui/material';

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
  const { socket } = useContext(SocketContext);

  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              <Button
                variant="contained"
                onClick={() => socket?.emit('click-button')}
              >
                Emit event = {user?.email}
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default HomePage;
