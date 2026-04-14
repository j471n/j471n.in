import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://api.monkeytype.com";

async function monkeyFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `ApeKey ${process.env.MONKEYTYPE_APE_KEY}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const [pb15, pb30, pb60, stats, streak, results, rankData] =
      await Promise.all([
        monkeyFetch("/users/personalBests?mode=time&mode2=15"),
        monkeyFetch("/users/personalBests?mode=time&mode2=30"),
        monkeyFetch("/users/personalBests?mode=time&mode2=60"),
        monkeyFetch("/users/stats"),
        monkeyFetch("/users/streak"),
        monkeyFetch("/results?limit=50"),
        monkeyFetch("/leaderboards/rank?language=english&mode=time&mode2=60"),
      ]);

    // personal bests come as arrays – pick the top entry (highest wpm)
    const best = (arr: any[] | null) => {
      if (!arr || arr.length === 0) return null;
      return arr.reduce((a: any, b: any) => (a.wpm > b.wpm ? a : b));
    };

    const personalBests = {
      time15: best(pb15),
      time30: best(pb30),
      time60: best(pb60),
    };

    // Process recent results
    const recentResults: any[] = Array.isArray(results) ? results : [];

    // WPM trend: last 30 results in chronological order
    const trendResults = recentResults
      .slice(0, 30)
      .reverse()
      .map((r: any, i: number) => ({
        index: i + 1,
        wpm: Math.round(r.wpm),
        raw: Math.round(r.rawWpm ?? r.wpm),
        acc: Math.round(r.acc * 100) / 100,
        mode: r.mode2 ? `${r.mode} ${r.mode2}s` : r.mode,
        timestamp: r.timestamp,
      }));

    const leaderboardRank: number | null = rankData?.rank ?? null;

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200",
    );

    return res.status(200).json({
      personalBests,
      stats: stats ?? { completedTests: 0, startedTests: 0, timeTyping: 0 },
      streak: streak ?? { length: 0, maxLength: 0 },
      trendResults,
      leaderboardRank,
    });
  } catch (error) {
    console.error("MonkeyType API error:", error);
    return res.status(500).json({ error: "Failed to fetch MonkeyType data" });
  }
}
