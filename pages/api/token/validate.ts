import type { NextApiRequest, NextApiResponse } from 'next';

import { PropsApi } from '@interfaces';
import { handlerReponse, handlerReponseCatch, isValidToken } from '@utils';
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
      handlerReponseCatch({
        res,
        err: 'Method not allowed',
        statusCode: 405,
      });
  }
}

async function checkJWT({ req, res }: PropsApi) {
  const { token = '' } = req.cookies;

  try {
    const { id, token: newToken } = await isValidToken(token);
    if (!id) {
      return handlerReponseCatch({
        res,
        err: 'Invalid credentials',
        statusCode: 401,
      });
    }

    const user = await User.findOneBy({ id });

    handlerReponse({ res, data: { token: newToken, user } });
  } catch (err) {
    handlerReponseCatch({
      res,
      err,
    });
  }
}
