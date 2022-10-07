import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@database';
import { User } from '@models';
import { PropsApi } from '@interfaces';
import { isValidEmail } from '@utils';

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
  }
}

async function findOne({ req, res }: PropsApi) {
  try {
    const { id } = req.query as { id: string };
    const user = await User.findOneBy({
      id,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err || 'Bad request' });
  }
}

async function update({ req, res }: PropsApi) {
  const { id } = req.query as { id: string };
  const { body } = req;

  if (body.email && !isValidEmail(body.email)) {
    return res.status(400).json({
      message: 'El correo no tiene un formato valido',
    });
  }

  try {
    const userPreload = await User.preload({ id, ...body });
    await User.save(userPreload);
    const user = await User.findOneBy({ id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err || 'Bad request' });
  }
}

async function remove({ req, res }: PropsApi) {
  try {
    const { id } = req.query as { id: string };
    const user = await User.find({ where: { id } });
    await User.softRemove(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err || 'Bad request' });
  }
}
