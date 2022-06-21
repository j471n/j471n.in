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
    onVisitLine(node) {
      // Prevent lines from collapsing in `display: grid` mode, and
      // allow empty lines to be copy/pasted
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    // Feel free to add classNames that suit your docs
    onVisitHighlightedLine(node) {
      node.properties.className.push("highlighted");
    },
    onVisitHighlightedWord(node) {
      node.properties.className = ["word"];
    },
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
    tableOfContents: getTableOfContents(content),
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      date: (data.date ?? new Date()).toString(),
      stringDate: data.stringDate,
      image: data.image ?? "",
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
      image: data.image ?? "",
    };
  }
}

export function getTableOfContents(markdown) {
  const regXHeader = /#{2,6}.+/g;
  const headingArray =
    markdown.match(regXHeader).length > 0 ? markdown.match(regXHeader) : [];
  return headingArray.map((heading) => {
    return {
      level: heading.split("#").length - 1 - 2, // we starts from the 2nd heading that's why we subtract 2 and 1 is extra heading text
      heading: heading.replace(/#{2,6}/, "").trim(),
    };
  });
}
