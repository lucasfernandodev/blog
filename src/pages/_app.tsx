import { Roboto } from '@next/font/google';
import '../styles/colors.css';
import '../styles/scrolbar.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

import Script from 'next/script';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* eslint-disable */}
      <Script
        src='/assets/javascript/theme.js'
        strategy='beforeInteractive'
      ></Script>
      <main className={roboto.className}>
        {/* eslint-enable */}
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
