import { NextApiRequest, NextApiResponse } from "next";
import { getGithubContribution } from "../../../lib/github";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getGithubContribution();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(data);
}
