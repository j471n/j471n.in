import path from "path";
import { readFileSync } from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import readTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";

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
      return getFrontMatter(slug, false);
    })
    .filter((post) => post != null || post != undefined) // Filter post if it is not published
    .sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return -1;
      if (new Date(a.date) < new Date(b.date)) return 1;
      return 0;
    });

  return posts;
}
export async function getPostFromSlug(slug, force = false) {
  const postPath = path.join(POST_PATH, `${slug}.mdx`);
  const source = readFileSync(postPath);
  const { content, data } = matter(source);
  if (!data.published && !force) return null;

  const readingTime = readTime(content);

  const prettyCodeOptions = {
    theme: "one-dark-pro",
  };
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behaviour: "wrap" }],
        [rehypePrettyCode, prettyCodeOptions],
      ],
    },
  });
  return {
    content: mdxSource,
    readingTime,
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      date: (data.date ?? new Date()).toString(),
      stringDate: data.stringDate,
    },
  };
}

export function getFrontMatter(slug) {
  const postPath = path.join(POST_PATH, `${slug}.mdx`);
  const source = readFileSync(postPath);
  const { content, data } = matter(source);
  const readingTime = readTime(content);

  if (data.published) {
    return {
      slug,
      readingTime,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      date: (data.date ?? new Date()).toString(),
      stringDate: data.stringDate,
    };
  }
}
