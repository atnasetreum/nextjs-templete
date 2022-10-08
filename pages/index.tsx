import { useEffect } from 'react';

import { NextPage } from 'next';
import { Button } from '@mui/material';

import { MainLayout } from '@components/layouts';
import { useAppSelector, useAppDispatch } from '@hooks';
import { setUsers } from '@slices/users';

const HomePage: NextPage = () => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log({ users });
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
    </MainLayout>
  );
};

export default HomePage;
