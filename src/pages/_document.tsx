import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='pt-br' className='isDarkTheme' id='blog'>
      <Head>
        <link rel='shortcut icon' href='/assets/favicon.svg' type='image/svg' />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
