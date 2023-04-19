import '../styles/colors.css';
import '../styles/scrolbar.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* eslint-disable */}
      <Script src='/assets/javascript/theme.js' strategy='beforeInteractive'></Script>
      {/* eslint-enable */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
