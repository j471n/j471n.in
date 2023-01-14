import { getAllViews } from "@lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function views(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(await getAllViews());
  } else {
    return res.status(405).json({
      message: "Invalid method use GET",
    });
  }
}
