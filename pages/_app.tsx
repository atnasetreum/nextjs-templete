import 'reflect-metadata';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@themes';

import '@styles/global.css';
import { store } from '@store';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
