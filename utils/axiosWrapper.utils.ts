/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { VariantType } from 'notistack';

export const handleError = (
  error: AxiosError,
  notify: (message: string, variant?: VariantType | undefined) => void,
) => {
  const errMessage = error.message;
  let message = errMessage;
  const data = (error.response?.data as any) || {};
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    message = data?.message || errMessage;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  notify(message);
};
