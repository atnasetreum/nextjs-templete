import type { NextApiRequest, NextApiResponse } from 'next';

export interface PropsApi {
  req: NextApiRequest;
  res: NextApiResponse;
}
