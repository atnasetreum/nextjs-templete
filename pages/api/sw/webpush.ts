import type { NextApiRequest, NextApiResponse } from 'next';

import webpush, { PushSubscription } from 'web-push';

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
      return sendWebpush({ req, res });
    default:
      handlerReponseCatch({
        res,
        err: 'Method not allowed',
        statusCode: 405,
      });
  }
}

async function sendWebpush({ res, req }: PropsApi) {
  const { token = '' } = req.cookies;
  const { id } = await isValidToken(token);
  const user = await User.findOneBy({
    id,
  });
  if (!user) {
    return handlerReponseCatch({
      res,
      err: 'User not found',
      statusCode: 404,
    });
  }

  const subscription: PushSubscription = user.subscription
    ? JSON.parse(user.subscription)
    : {};

  if (!Object.keys(subscription).length) {
    return handlerReponseCatch({
      res,
      err: 'Subscription not found',
      statusCode: 404,
    });
  }

  webpush
    .sendNotification(subscription, JSON.stringify(req.body))
    .then(() => console.log('Notification web push send'))
    .catch((err) => {
      if (err.statusCode === 410) {
        user.subscription = undefined;
      }
    });

  handlerReponse({ res, data: 'ok' });
}
