import { ref } from "@lib/firebase";

export default async function viewsSlug(req, res) {
  // Get the total views of the page according to the slug by GET method
  if (req.method === "GET") {
    const snapshot = await ref.child(req.query.slug).once("value");
    return res.status(200).json({ views: snapshot.val() });
  }
  // check if the app in the production and req method is post only then add the view to the database
  if (req.method === "POST" && process.env.NODE_ENV === "production") {
    const slugRef = ref.child(req.query.slug);

    const { snapshot } = await slugRef.transaction((currentViews) => {
      if (currentViews === null) {
        return 1;
      }
      return currentViews + 1;
    });

    return res.status(200).json({
      total: snapshot.val(),
    });
  } else {
    return res.status(401).json({
      message: "In Development, Can't add views",
    });
  }
}
