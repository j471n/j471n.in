import fs, { writeFileSync } from "fs";
import { Feed } from "feed";
import { getAllPosts } from "./posts";
import RSS from "rss";
export async function generateRssFeed() {
  const posts = getAllPosts();
  const siteURL = process.env.VERCEL_URL;
  const date = new Date();
  const author = {
    name: "Jatin Sharma",
    email: "jatinsharma089659@gmail.com",
    link: "https://twitter.com/j471n_",
  };
  const feed = new Feed({
    title: "Jatin Sharma' blog",
    description: `I've been writing online since 2021, mostly about web development
            and tech careers. In total, I've written ${posts.length} articles
            till now.`,
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Jatin Sharma`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });
  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });
  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
}

export default async function getRSS() {
  const siteURL = process.env.VERCEL_URL;
  const allBlogs = getAllPosts();

  const feed = new RSS({
    title: "Jatin Sharma",
    description: `I've been writing online since 2021, mostly about web development
            and tech careers. In total, I've written ${allBlogs.length} articles
            till now.`,
    site_url: "http://jatin.vercel.app/",
    feed_url: "http://jatin.vercel.app/feed.xml",
    language: "en",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Jatin Sharma`,

    // site_url: siteURL,
    // feed_url: siteURL + "/feed.xml",
  });

  allBlogs.map((post) => {
    feed.item({
      title: post.title,
      url: `http://jatin.vercel.app/blogs/${post.slug}`,
      date: post.date,
      description: post.summary,
    });
  });

  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}
