import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@database';
import { User } from '@models';
import { PropsApiUser } from '@interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const db = await connectToDatabase();
  const userRepository = db.getRepository(User);

  switch (req.method) {
    case 'GET':
      return findOne({ req, res, userRepository });
    case 'PATCH':
      return update({ req, res, userRepository });
    case 'DELETE':
      return remove({ req, res, userRepository });
  }
}

async function findOne({ req, res, userRepository }: PropsApiUser) {
  const { id } = req.query as { id: string };
  const user = await userRepository.findOneBy({
    id,
  });
  res.status(200).json(user);
}

async function update({ req, res, userRepository }: PropsApiUser) {
  const { id } = req.query as { id: string };
  const { body } = req;
  await userRepository.update(id, body);
  const user = await userRepository.findOneBy({
    id,
  });
  res.status(200).json(user);
}

async function remove({ req, res, userRepository }: PropsApiUser) {
  const { id } = req.query as { id: string };
  await userRepository.softDelete(id);
  const user = await userRepository.find({ where: { id }, withDeleted: true });
  res.status(200).json(user);
}
