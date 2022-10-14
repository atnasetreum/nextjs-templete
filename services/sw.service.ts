import axios from './axios.wrapper';
import {
  ResponseSendWebpushSw,
  ResponseUsersFindAllService,
  WsSubcribeProps,
} from '@interfaces';

async function subscribe(subscription: WsSubcribeProps) {
  const { data } = await axios.post<ResponseUsersFindAllService>(
    '/sw/subscribe',
    { subscription },
  );
  return data;
}

async function sendWebpush(payload: { title: string; body: string }) {
  const { data } = await axios.post<ResponseSendWebpushSw>(
    '/sw/webpush',
    payload,
  );
  return data;
}

export const swService = {
  subscribe,
  sendWebpush,
};
