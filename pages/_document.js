import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link rel="DNS-prefetch" href="//fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700;800;900&family=Bungee+Shade&family=Inter:wght@400;500;600;700;800&family=Sarina&display=swap"
        ></link>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tailwindcss/typography@0.4.x/dist/typography.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
