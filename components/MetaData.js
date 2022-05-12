import Head from "next/head";
import { useEffect, useState } from "react";
export default function MetaData({ title, description, previewImage }) {
  const [URL, setURL] = useState("");

  useEffect(() => {
    setURL(window.location.href);
  }, []);

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description || "Jatin Sharma"} />
      <title>{`${title} - Jatin Sharma`}</title>
      <meta name="theme-color" content="#000" />
      <link rel="icon" href="/favicon.ico" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

      {/* Og */}
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:site_name" content="Jatin Sharma" key="ogsitename" />
      <meta property="og:url" content={URL} key="ogurl" />
      <meta property="og:image" content={previewImage} key="ogimage" />
    </Head>
  );
}
