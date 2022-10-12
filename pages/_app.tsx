import 'reflect-metadata';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '@themes';
import { store } from '@store';
import { AuthProvider } from '@contexts';

import '@styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <Provider store={store}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </AuthProvider>
    </SnackbarProvider>
  );
}
