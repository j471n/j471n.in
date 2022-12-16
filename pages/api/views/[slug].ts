// import { ref } from "";
import { ref } from "./../../../lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

/* Extending API request because by default quey.slug return string | string[] and I only want string */
interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    slug: string;
  };
}

export default async function viewsSlug(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  // const query: {slug: string} = req.query;
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
