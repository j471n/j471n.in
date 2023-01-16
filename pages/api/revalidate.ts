import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    revalidateUrl: string;
    secret: string;
  };
}
export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({
      message:
        "Invalid token alert! It looks like you're trying to sneak in without proper authorization. Please present a valid token or face rejection",
    });
  }

  try {
    // Regenerate the projects page
    await res.revalidate(req.query.revalidateUrl);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
