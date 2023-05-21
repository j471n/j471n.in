import { NextApiRequest, NextApiResponse } from "next";
import { topArtists } from "../../../lib/spotify";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await topArtists();
  const { items } = await response.json();

  const artists = items.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    url: artist.external_urls.spotify,
    popularity: artist.popularity,
    coverImage: artist.images[1],
  }));

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(artists);
}
