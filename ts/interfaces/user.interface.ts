export interface UserSeed {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}
