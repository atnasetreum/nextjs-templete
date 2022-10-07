import 'reflect-metadata';
import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@themes';

import '@styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
