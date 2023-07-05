import { NextRequest, NextResponse } from "next/server";
import { allFollowers, allPosts } from "../../../lib/devto";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

export default async function handler(_req: NextRequest) {
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

  return NextResponse.json(
    {
      followers: followers,
      likes: totalLikes,
      views: totalViews,
      comments: totalComments,
      posts: posts.length,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
      status: 200,
    }
  );
}
