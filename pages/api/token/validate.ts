import type { NextApiRequest, NextApiResponse } from 'next';

import { PropsApi } from '@interfaces';
import { isValidToken, signToken } from '@utils';
import { User } from '@models';
import { connectToDatabase } from '@database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      return checkJWT({ req, res });
    default:
      res.status(400).json({ message: 'Bad request' });
  }
}

async function checkJWT({ req, res }: PropsApi) {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1] || '';

  try {
    const id = await isValidToken(token);
    if (!id) {
      return res.status(401).json({ message: 'Token JWT no valido' });
    }

    const user = await User.findOneBy({ id });

    const newToken = signToken(id);
    res.json({ newToken, user });
  } catch (err) {
    res.status(400).json({ message: err || 'Bad request' });
  }
}
