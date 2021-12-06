import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Colors of the Web</title>
          <meta
            name="description"
            content="Colors Of The Web&quot is a NFT collection created by InnocentPixel,
                  part of the TC community. Paying homage to how the usage of colors online has evolved
                  throughout the years."
          />
          <meta property="og:title" content="Colors of the Web" />
          <meta
            property="og:description"
            content="Colors Of The Web&quot is a NFT collection created by InnocentPixel,
                  part of the TC community. Paying homage to how the usage of colors online has evolved
                  throughout the years."
          />
          <meta property="og:url" content="https://colorsoftheweb.art" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://colorsoftheweb.art/cotw-all-small.png" />

          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap"
            rel="stylesheet"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-CQ2JRBJ8CK" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CQ2JRBJ8CK', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
