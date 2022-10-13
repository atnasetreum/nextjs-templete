import type { NextApiRequest, NextApiResponse } from 'next';

import webpush from 'web-push';

import { PropsApi } from '@interfaces';
import { handlerReponse, handlerReponseCatch, isValidToken } from '@utils';
import { User } from '@models';
import { connectToDatabase } from '@database';
import vapidKeys from '@config/vapid.json';

webpush.setVapidDetails(
  'mailto:eduardo-266@hotmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();
  switch (req.method) {
    case 'POST':
      return saveSubscribe({ req, res });
    default:
      handlerReponseCatch({
        res,
        err: 'Method not allowed',
        statusCode: 405,
      });
  }
}

async function saveSubscribe({ res, req }: PropsApi) {
  const { subscription } = req.body;
  const { token = '' } = req.cookies;
  const { id } = await isValidToken(token);
  const user = await User.findOneBy({ id });
  if (!user) {
    return handlerReponseCatch({
      res,
      err: 'User not found',
      statusCode: 404,
    });
  }

  user.subscription = subscription;

  webpush
    .sendNotification(
      subscription,
      JSON.stringify({ titulo: 'hola', cuerpo: 'mundo' }),
    )
    .then(() => console.log('Notification web push send'))
    .catch((err) => {
      if (err.statusCode === 410) {
        user.subscription = undefined;
      }
    });

  user.save();
  handlerReponse({ res, data: user });
}
