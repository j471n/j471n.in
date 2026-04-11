import { NextApiRequest, NextApiResponse } from "next";
import { getMyBooks } from "../../lib/hardcover";
import { HardcoverBook } from "../../lib/types";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ books: HardcoverBook[] } | { error: string }>,
) {
  try {
    const books = await getMyBooks();

    // Revalidate once per day (86 400 s), serve stale for up to 12 h while revalidating
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200",
    );

    return res.status(200).json({ books });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch books";
    return res.status(500).json({ error: message });
  }
}
