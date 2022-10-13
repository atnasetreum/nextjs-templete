import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@database';
import { User } from '@models';
import { PropsApi } from '@interfaces';
import { handlerReponse, handlerReponseCatch, isValidEmail } from '@utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User | { message: string }>,
) {
  await connectToDatabase();

  switch (req.method) {
    case 'POST':
      return create({ req, res });
    case 'GET':
      return findAll({ req, res });
    default:
      handlerReponseCatch({
        res,
        err: 'Method not allowed',
        statusCode: 405,
      });
  }
}

async function create({ req, res }: PropsApi) {
  const body = req.body;
  if (!isValidEmail(body.email)) {
    return handlerReponseCatch({
      res,
      err: 'The email does not have a valid format',
    });
  }
  try {
    const userCreate = await User.create(body);
    const userNew = await User.save(userCreate);
    const user = await User.findOneBy({ id: userNew.id });
    handlerReponse({ res, data: user });
  } catch (err) {
    handlerReponseCatch({
      res,
      err,
    });
  }
}

async function findAll({ res }: PropsApi) {
  try {
    const users = await User.find();
    handlerReponse({ res, data: users });
  } catch (err) {
    handlerReponseCatch({
      res,
      err,
    });
  }
}
