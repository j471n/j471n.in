import groq from "groq";
import matter from "gray-matter";
import readTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import sanityClient from "@lib/sanityClient";
import { serialize } from "next-mdx-remote/serialize";

export async function getAllPostsMeta(limit?: number) {
  const query = groq`*[_type == "post"] | order(publishedAt desc)${
    limit ? `[0..${limit - 1}]` : ""
  } {
    _id,
    title,
    slug,
    keywords,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    author->{name, image {asset -> {_id, url}}},
    organization->{name, image {asset -> {_id, url}}, website},
  }`;

  const res = await sanityClient.fetch(query);
  return res;
}

export async function getAllPostSlugs() {
  const query = groq`*[_type == "post"] | order(publishedAt desc) {
    slug {
      current
    }
  }`;

  const res_slugs = await sanityClient.fetch(query);
  const slugs = res_slugs.map((item: any) => {
    // console.log("SLUG : ", item);
    return item.slug.current;
  });
  return slugs;
}

export async function getPostFromSlug(slug: string) {
  const query = groq`*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    keywords,
    excerpt,
    image_url,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    _createdAt,
    publishedAt,
    author->{name, image {asset -> {_id, url}}},
    organization->{name, image {asset -> {_id, url}}, website},
    content
  }`;

  const post = await sanityClient.fetch(query);

  const source = post.content;
  const { content } = matter(source);
  const readingTime = readTime(content);

  const prettyCodeOptions = {
    theme: "one-dark-pro",
    onVisitLine(node: any) {
      // Prevent lines from collapsing in `display: grid` mode, and
      // allow empty lines to be copy/pasted
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    // Feel free to add classNames that suit your docs
    onVisitHighlightedLine(node: any) {
      node.properties.className.push("highlighted");
    },
    onVisitHighlightedWord(node: any) {
      node.properties.className = ["word"];
    },
  };

  const tableOfContents = getTableOfContents(content);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behaviour: "wrap" }],
        [rehypePrettyCode, prettyCodeOptions],
      ],
    },
  });

  post["content"] = mdxSource;
  post["tableOfContents"] = tableOfContents;
  post["readingTime"] = readingTime;

  return post;
}

export function getTableOfContents(markdown: string) {
  const regXHeader = /#{2,6}.+/g;
  const headingArray = markdown.match(regXHeader)
    ? markdown.match(regXHeader)
    : [];
  return headingArray?.map((heading) => {
    return {
      level: heading.split("#").length - 1 - 2, // we starts from the 2nd heading that's why we subtract 2 and 1 is extra heading text
      heading: heading.replace(/#{2,6}/, "").trim(),
    };
  });
}
