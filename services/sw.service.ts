import axios from './axios.wrapper';
import { ResponseUsersFindAllService, WsSubcribeProps } from '@interfaces';

async function subscribe(subscription: WsSubcribeProps) {
  const { data } = await axios.post<ResponseUsersFindAllService>(
    '/sw/subscribe',
    { subscription },
  );
  return data;
}

export const swService = {
  subscribe,
};
