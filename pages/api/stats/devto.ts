import { NextApiRequest, NextApiResponse } from "next";
import { allFollowers, allPosts } from "../../../lib/devto";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const followers = await allFollowers();

  const posts = await allPosts();

  let totalViews = 0;
  let totalLikes = 0;
  let totalComments = 0;

  posts.forEach((post) => {
    totalLikes += post.public_reactions_count;
    totalViews += post.page_views_count;
    totalComments += post.comments_count;
  });

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json({
    followers: followers,
    likes: totalLikes,
    views: totalViews,
    comments: totalComments,
    posts: posts.length,
  });
}
