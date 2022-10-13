export interface WsSubcribeProps {
  endpoint: string;
  expirationTime: null;
  keys: Keys;
}

export interface Keys {
  p256dh: string;
  auth: string;
}
