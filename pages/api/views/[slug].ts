import { addView, getViewBySlug } from "@lib/supabase";
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
  const slug = req.query.slug;
  if (req.method === "GET") {
    const data = await getViewBySlug(slug);
    if (data === undefined) {
      return res.status(404).json({ message: "Slug not found" });
    } else {
      return res.status(200).json(data);
    }
  }
  // check if the app in the production and req method is post only then add the view to the database
  if (req.method === "POST" && process.env.NODE_ENV === "production") {
    const supabaseResponse = await addView(slug);
    res.status(supabaseResponse?.status!).json(supabaseResponse);
  } else {
    return res.status(401).json({
      message: "In Development, Can't add views",
    });
  }
}
