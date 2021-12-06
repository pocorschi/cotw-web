/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.scss';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ReactGA from 'react-ga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from '../state/AppContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.googleAnalyticsID && process.env.NODE_ENV === 'production') {
      // Checks for GA ID and only turns on GA in production
      ReactGA.initialize(process.env.googleAnalyticsID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  });
  return (
    <>
      <Head>
        <title>Colors of the Web</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
