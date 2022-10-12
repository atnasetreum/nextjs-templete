/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse } from 'next';

export interface ResponseGlobal {
  res: NextApiResponse;
  data: any;
  message?: string;
  statusCode?: number;
}

export interface ResponseGlobalCatch {
  res: NextApiResponse;
  err?: any;
  statusCode?: number;
}
