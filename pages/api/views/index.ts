import { ref } from "@lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

type FirebasePost = {
  slug: string;
  views: number;
};

export default async function views(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    ref.on("value", (snapshots) => {
      let totalViews = 0;
      let posts: FirebasePost[] = [];

      Object.keys(snapshots.val()).forEach((key) => {
        totalViews += snapshots.val()[key];
        posts.push({ slug: key, views: snapshots.val()[key] });
      });

      res.setHeader("Access-Control-Allow-Origin", "*");

      return res.status(200).json({
        totalViews,
        posts: posts,
      });
    });
  }
}
