import { ref } from "@lib/firebase";

export default async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    if (req.method === "POST") {
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

  if (req.method === "GET") {
    const snapshot = await ref.child(req.query.slug).once("value");
    const views = snapshot.val();

    return res.status(200).json({ total: views });
  }
};
