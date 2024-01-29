import { NextApiRequest, NextApiResponse } from "next";

import { getInstagramPosts } from "@lib/instaposts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paginationCode = req.query?.code ?? null;
  const mode = req.query?.mode ?? null;

  const additionalParams = mode
    ? mode === "before"
      ? { before: paginationCode }
      : { after: paginationCode }
    : {};

  const outputData = await getInstagramPosts(additionalParams);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(outputData);
}
