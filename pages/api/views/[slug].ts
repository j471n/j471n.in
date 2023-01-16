import { addView, getViewBySlug } from "@lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

/* Extending API request because by default quey.slug return string | string[] and I only want string */
interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    slug: string;
  };
}

/**
 * This function handles HTTP requests made to a specific route. It takes in a "slug" parameter from the request query.
 *
 * If the request method is GET, it calls the getViewBySlug(slug) function, which retrieves the view count of the specified blog post by its slug value.
 * If the view count is not found, it sends a response with a status code of 404 and a JSON object with a message of "Slug not found"
 * If the view count is found, it sends a response with a status code of 200 and the data in JSON format.
 *
 * If the request method is POST and the app is running in production environment, it calls the addView(slug) function,
 * which adds a view to the specified blog post. It sends a response with the status code and data returned from the addView function.
 *
 * If the request method is POST and the app is running in development environment, it sends a response with a status code of 401 and a JSON object with a message of "In Development, Can't add views"
 */

export default async function viewsSlug(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug;
  if (req.method === "GET") {
    const data = await getViewBySlug(slug);
    if (data === undefined) {
      return res
        .status(404)
        .json({
          message:
            "Sorry, the slug you're looking for has gone for a coffee break. Please try again later or make a cup of tea while you wait.",
        });
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
