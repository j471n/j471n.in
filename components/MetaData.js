import Head from "next/head";
export default function MetaData({ title, description }) {
  return (
    <Head>
      <title>{`${title} - Jatin Sharma`}</title>
      <meta
        name="description"
        content={description || "Portfolio of Jatin Sharma"}
      />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2"
      />
      <meta name="theme-color" content="#000" />
      <link rel="icon" href="/favicon.ico" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    </Head>
  );
}
