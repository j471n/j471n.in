import fs from "fs";
import { Feed } from "feed";
// import { getBlogPostsData } from "@/utils/blog";
import { getAllPosts } from "./posts";

export default async function generateRssFeed() {
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
    description: "",
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
