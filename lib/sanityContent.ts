import groq from "groq";
import sanityClient from "@lib/sanityClient";

export async function getAllPostsMeta(limit?: number) {
  const query = groq`*[_type == "post"] | order(publishedAt desc)${
    limit ? `[0..${limit - 1}]` : ""
  } {
    _id,
    title,
    slug,
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
    // body
  }`;

  const post = await sanityClient.fetch(query);
  return post;
}
