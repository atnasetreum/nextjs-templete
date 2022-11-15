import 'reflect-metadata';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { lightTheme } from '@themes';
import { store } from '@store';
import { AuthProvider, SocketProvider, SwProvider } from '@contexts';

import '@styles/global.css';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SnackbarProvider maxSnack={3}>
        <SwProvider>
          <SocketProvider>
            <AuthProvider>
              <Provider store={store}>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </Provider>
            </AuthProvider>
          </SocketProvider>
        </SwProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
