import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@database';
import { User } from '@models';
import { PropsApi } from '@interfaces';
import { handlerReponse, handlerReponseCatch, isValidEmail } from '@utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      return findOne({ req, res });
    case 'PATCH':
      return update({ req, res });
    case 'DELETE':
      return remove({ req, res });
    default:
      handlerReponseCatch({
        res,
        err: 'Method not allowed',
        statusCode: 405,
      });
  }
}

async function findOne({ req, res }: PropsApi) {
  try {
    const { id } = req.query as { id: string };
    const user = await User.findOneBy({
      id,
    });
    handlerReponse({ res, data: user });
  } catch (err) {
    handlerReponseCatch({
      res,
      err,
    });
  }
}

async function update({ req, res }: PropsApi) {
  const { id } = req.query as { id: string };
  const { body } = req;

  if (body.email && !isValidEmail(body.email)) {
    return handlerReponseCatch({
      res,
      err: 'The email does not have a valid format',
    });
  }

  try {
    const userPreload = await User.preload({ id, ...body });
    await User.save(userPreload);
    const user = await User.findOneBy({ id });
    handlerReponse({ res, data: user });
  } catch (err) {
    handlerReponseCatch({
      res,
      err,
    });
  }
}

async function remove({ req, res }: PropsApi) {
  try {
    const { id } = req.query as { id: string };
    const user = await User.find({ where: { id } });
    await User.softRemove(user);
    handlerReponse({ res, data: user });
  } catch (err) {
    handlerReponseCatch({
      res,
      err,
    });
  }
}
