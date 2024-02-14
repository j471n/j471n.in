import { NextRequest, NextResponse } from "next/server";

import { getUserDataValue } from "@lib/supabase";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

export default async function handler(_req: NextRequest) {
  const { data } = await getUserDataValue("devto_stats");

  return NextResponse.json(JSON.parse(data), {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
    status: 200,
  });
}

/* 
Response of this API request is: 
{"followers":18034,"likes":13603,"views":754641,"comments":958,"posts":119}
*/
