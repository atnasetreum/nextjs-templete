import { usersService } from '@services';
import { AppDispatch } from '@store';
import { setUsers, startLoadingUser } from './usersSlice';

export const getUsers = () => {
  //return async (dispatch: AppDispatch, getState: RootState) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingUser());

    try {
      const { data: users } = await usersService.findAll();
      dispatch(setUsers(users));
    } catch (error) {
      dispatch(setUsers([]));
    }
  };
};
