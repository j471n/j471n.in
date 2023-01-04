import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Barlow */}
        <link
          rel="preload"
          href="/fonts/Barlow/Barlow-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Barlow/Barlow-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Barlow/Barlow-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Barlow/Barlow-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Barlow/Barlow-800.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Inter */}
        <link
          rel="preload"
          href="/fonts/Inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Sarina */}
        <link
          rel="preload"
          href="/fonts/Sarina/Sarina-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
