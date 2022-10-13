import { IUser } from './user.interface';

export interface LoginServiceProps {
  email: string;
  password: string;
}

export interface ResponseLoginService {
  data: Data;
  message: string;
  statusCode: number;
}

interface Data {
  token: string;
  user: IUser;
}

export interface ResponseUsersFindAllService {
  data: IUser[];
  message: string;
  statusCode: number;
}
