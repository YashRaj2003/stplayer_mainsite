import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="notranslate" translate="no">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8685024993031796"
          crossOrigin="anonymous"></script>
        <meta name="robots" content="index,follow" />
        <meta name="robots" content="all" />
        <meta name="googlebot" content="index,follow" />

      </Head>
      <body className="font-Manrope">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
