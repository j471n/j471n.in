import { fetchGithub, getOldStats } from "../../../lib/github";

export default async function handler(req, res) {
  const { public_repos: repos, public_gists: gists, followers } = await fetchGithub();

  // it runs when user's api is exhausted, it gives the old data
  if (repos === undefined && gists === undefined) {
    const { public_repos: repos, public_gists: gists, followers } = getOldStats();
    return res.status(200).json({
      repos,
      gists,
      followers,
    });
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json({
    repos,
    gists,
    followers,
  });
}
