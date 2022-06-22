import { ref } from "@lib/firebase";

export default async function views(req, res) {
  if (req.method === "GET") {
    ref.on("value", (snapshots) => {
      let totalViews = 0;
      let posts = [];

      Object.keys(snapshots.val()).forEach((key) => {
        totalViews += snapshots.val()[key];
        posts.push({ slug: key, views: snapshots.val()[key] });
      });

      return res.status(200).json({
        totalViews,
        posts: posts,
      });
    });
  }
}
