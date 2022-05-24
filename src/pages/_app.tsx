import "../../styles/colors.css";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="/assets/javascript/theme.js"
        strategy="beforeInteractive"
      ></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
