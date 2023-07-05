import { NextRequest, NextResponse } from "next/server";

import { getAllViews } from "@lib/supabase";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

/**
 * This function handles HTTP requests made to a specific route.
 * If the request method is GET, it calls the getAllViews() function, which retrieves all views count and all blog post from the database
 * and sends the result as a JSON object in the response with a status code of 200.
 * If the request method is not GET, it sends a response with a status code of 405 and a JSON object with a message of "Invalid method use GET"
 */
export default async function views(req: NextRequest) {
  if (req.method === "GET") {
    return NextResponse.json(await getAllViews(), {
      status: 200,
    });
  } else {
    return NextResponse.json(
      {
        error:
          "Invalid method detected! Please switch to GET before proceeding. Trust me, it's the way to go",
      },
      {
        status: 405,
      }
    );
  }
}
