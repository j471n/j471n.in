import "../styles/globals.css";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Script from "next/script";
import Head from "next/head";

NProgress.configure({
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      NProgress.start();
    };
    const end = () => {
      NProgress.done();
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="" rel="stylesheet"></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700;800;900&family=Bungee+Shade&family=Inter:wght@400;500;600;700;800&display=swap"
        ></link>
      </Head>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                  page_path: window.location.pathname,
                  page_location : window.location.href,
                });
            `,
            }}
          />
        </>
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
