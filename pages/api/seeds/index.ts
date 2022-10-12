import type { NextApiRequest, NextApiResponse } from 'next';

import { handlerReponse, handlerReponseCatch } from '@utils';
import { users } from '@database/seeds/user.seed';
import { connectToDatabase } from '@database';
import { User } from '@models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();

  try {
    User.clear();
    for (let i = 0, t = users.length; i < t; i++) {
      const user = users[i];
      const userCreate = await User.create({ ...user });
      await User.save(userCreate);
    }
    handlerReponse({ res, data: 'Seeds executed done' });
  } catch (err) {
    handlerReponseCatch({ res, err });
  }
}
