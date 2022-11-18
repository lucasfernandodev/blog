import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='pt-br' className='isDarkTheme' id='aeterDocument'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
        <link rel='shortcut icon' href='/images/Icon.svg' type='image/svg' />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
