import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@database';
import { User } from '@models';
import { PropsApi } from '@interfaces';
import { isValidEmail } from '@utils';

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
      res.status(400).json({ message: 'Bad request' });
  }
}

async function create({ req, res }: PropsApi) {
  const body = req.body;
  if (!isValidEmail(body.email)) {
    return res.status(400).json({
      message: 'El correo no tiene un formato valido',
    });
  }
  try {
    const userCreate = await User.create(body);
    const userNew = await User.save(userCreate);
    const user = await User.findOneBy({ id: userNew.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err || 'Bad request' });
  }
}

async function findAll({ res }: PropsApi) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err || 'Bad request' });
  }
}
