import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '@/store/store';
import '@/styles/global.scss';
import Header from '@/components/Header';
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
