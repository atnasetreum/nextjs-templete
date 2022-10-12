import 'reflect-metadata';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '@themes';
import { store } from '@store';
import { AuthProvider, SocketProvider } from '@contexts';

import '@styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SocketProvider>
        <Provider store={store}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </SocketProvider>
    </AuthProvider>
  );
}
