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
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
}
