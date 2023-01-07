import { writeFileSync } from "fs";
import MDXContent from "./MDXContent";
import RSS from "rss";

export default async function getRSS() {
  const siteURL = "https://j471n.in";
  const allBlogs = new MDXContent("posts").getAllPosts();

  // Create a new RSS object
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

  // Add all blog posts to the RSS feed
  allBlogs?.map((post) => {
    feed.item({
      title: post!.title,
      url: `${siteURL}/blogs/${post?.slug}`,
      date: post!.date,
      description: post!.excerpt,
    });
  });

  // Write the RSS feed to a file
  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}
