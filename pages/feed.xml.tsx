import MDXContent from "@lib/MDXContent";
import { GetServerSidePropsContext } from "next";
import RSS from "rss";

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const siteURL = "https://j471n.in";
  const allBlogs = new MDXContent("posts").getAllPosts();

  const feed = new RSS({
    title: "Jatin Sharma",
    description: `I've been writing online since 2021, mostly about web development
            and tech careers. In total, I've written ${allBlogs.length} articles
            till now.`,
    site_url: siteURL,
    feed_url: `${siteURL}/feed.xml`,
    language: "en",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Jatin Sharma`,
  });

  allBlogs.map((post) => {
    feed.item({
      title: post!.title,
      url: `https://j471n.in/blogs/${post!.slug}`,
      date: post!.date,
      description: post!.excerpt,
    });
  });

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
}

export default function RSSFeed() {
  return null;
}
