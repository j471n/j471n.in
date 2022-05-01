import { getGithubPublicStats } from "../../../lib/github";

export default async function handler(req, res) {
  const { public_repos: repos, public_gists: gists } =
    await getGithubPublicStats();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json({
    repos,
    gists,
  });
}
