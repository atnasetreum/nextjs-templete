import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@database';
import { User } from '@models';
import { PropsApiUser } from '@interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User>,
) {
  const db = await connectToDatabase();
  const userRepository = db.getRepository(User);

  switch (req.method) {
    case 'POST':
      return create({ req, res, userRepository });
    case 'GET':
      return findAll({ req, res, userRepository });
  }
}

async function create({ req, res, userRepository }: PropsApiUser) {
  const { body } = req;
  const user = new User();
  user.firstName = body.firstName;
  user.lastName = body.lastName;
  user.age = body.age;
  const userNew = await userRepository.save(user);
  res.status(200).json(userNew);
}

async function findAll({ res, userRepository }: PropsApiUser) {
  const users = await userRepository.find();
  res.status(200).json(users);
}
