import axios from './axios.wrapper';
import { ResponseUsersFindAllService } from '@interfaces';

async function findAll() {
  const { data } = await axios.get<ResponseUsersFindAllService>('/users');
  return data;
}

export const usersService = {
  findAll,
};
