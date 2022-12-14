import type { NextApiRequest, NextApiResponse } from 'next';

import argon2 from 'argon2';

import { connectToDatabase } from '@database';
import { User } from '@models';
import { PropsApi } from '@interfaces';
import {
  handlerReponse,
  handlerReponseCatch,
  isValidEmail,
  signToken,
} from '@utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();
  switch (req.method) {
    case 'POST':
      return login({ req, res });
    default:
      handlerReponseCatch({
        res,
        err: 'Method not allowed',
        statusCode: 405,
      });
  }
}

async function login({ req, res }: PropsApi) {
  const { email = '', password = '' } = req.body;

  if (!email || !password) {
    return handlerReponseCatch({
      res,
      err: 'Email or Password not found',
    });
  }

  if (!isValidEmail(email)) {
    return handlerReponseCatch({
      res,
      err: 'Format email invalid',
    });
  }

  const userPreview = await User.findOne({
    where: {
      email,
    },
    select: ['password'],
  });

  const user = await User.findOneBy({
    email,
  });

  if (!userPreview || !user) {
    return handlerReponseCatch({
      res,
      err: 'Invalid credentials',
      statusCode: 401,
    });
  }

  try {
    const isValid = await argon2.verify(userPreview.password, password);
    if (!isValid) {
      return handlerReponseCatch({
        res,
        err: 'Invalid credentials',
        statusCode: 401,
      });
    }

    const id = user.id;

    const token = signToken(id);

    handlerReponse({ res, data: { token, user } });
  } catch (err) {
    handlerReponseCatch({
      res,
      err,
    });
  }
}
