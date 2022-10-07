import type { NextApiRequest, NextApiResponse } from 'next';

import argon2 from 'argon2';

import { connectToDatabase } from '@database';
import { User } from '@models';
import { PropsApi } from '@interfaces';
import { signToken } from '@utils';

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
      };
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await connectToDatabase();

  switch (req.method) {
    case 'POST':
      return login({ req, res });
    default:
      res.status(400).json({ message: 'Bad request' });
  }
}

async function login({ req, res }: PropsApi) {
  const { email = '', password = '' } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
    select: ['id', 'name', 'password'],
  });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  try {
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const id = user.id;

    const token = signToken(id);

    const payload = { token, user: { id, name: user.name, email } };

    res.json(payload);
  } catch (err) {
    res.status(400).json(err || 'Bad request');
  }
}
