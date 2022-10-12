import axios from 'axios';

const axiosWrapper = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-APP-KEY': process.env.NEXT_PUBLIC_APP_KEY,
  },
});

export default axiosWrapper;
