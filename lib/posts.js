import path from "path";
import { readFileSync } from "fs";
import { sync } from "glob";
import matter from "gray-matter";

const POST_PATH = path.join(process.cwd(), "posts");

export function getSlugs() {
  const paths = sync(`${POST_PATH}/*.mdx`);

  return paths.map((path) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1];
    const [slug, _ext] = fileName.split(".");
    return slug;
  });
}
export function getAllPosts() {
  const posts = getSlugs()
    .map((slug) => {
      return getPostFromSlug(slug);
    })
    .filter((post) => post != null) // Filter post if it is not published
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return 1;
      if (a.meta.date < b.meta.date) return -1;
      return 0;
    });

  return posts;
}
export function getPostFromSlug(slug = "") {
  const postPath = path.join(POST_PATH, `${slug}.mdx`);
  const source = readFileSync(postPath);
  const { content, data } = matter(source);

  if (!data.published) return null;
  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      date: (data.date ?? new Date()).toString(),
      stringDate: data.stringDate,
    },
  };
}
