import { NextApiRequest } from 'next';

import jwt from 'jsonwebtoken';

export const signToken = (id: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla de JWT - Revisar variables de entorno');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET_SEED, { expiresIn: '1h' });
};

export const isValidToken = (
  token: string,
): Promise<{ token: string; id: string }> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla de JWT - Revisar variables de entorno.');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT no es válido');

        const { id } = payload as { id: string };

        const token = signToken(id);

        resolve({
          token,
          id,
        });
      });
    } catch (error) {
      reject('JWT no es válido');
    }
  });
};

export const getToken = (req: NextApiRequest) => {
  const token = req.cookies;
  //const token = req.cookies?.get('token') || '';
  return token;
};
