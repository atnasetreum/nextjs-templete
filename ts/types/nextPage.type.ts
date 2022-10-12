import { NextPage } from 'next';

export type NextAppPage<P = { requireAuth: true }, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};
