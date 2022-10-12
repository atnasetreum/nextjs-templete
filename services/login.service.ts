import axios from './axios.wrapper';
import { LoginServiceProps, ResponseLoginService } from '@interfaces';

async function login({ email, password }: LoginServiceProps) {
  const { data } = await axios.post<ResponseLoginService>('/login', {
    email,
    password,
  });
  return data;
}

async function validateToken() {
  const { data } = await axios.get<ResponseLoginService>('/token/validate');
  return data;
}

export const authService = {
  login,
  validateToken,
};
