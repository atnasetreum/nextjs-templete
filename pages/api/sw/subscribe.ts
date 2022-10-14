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
    case 'POST':
      return saveSubscribe({ req, res });
    default:
      handlerReponseCatch({
        res,
        err: 'Method not allowed',
        statusCode: 405,
      });
  }
}

async function saveSubscribe({ res, req }: PropsApi) {
  const { subscription } = req.body;
  const { token = '' } = req.cookies;
  const { id } = await isValidToken(token);
  const user = await User.findOneBy({ id });
  if (!user) {
    return handlerReponseCatch({
      res,
      err: 'User not found',
      statusCode: 404,
    });
  }

  user.subscription = JSON.stringify(subscription);
  user.save();
  handlerReponse({ res, data: user });
}
