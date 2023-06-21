import { IEmailValidation } from "@lib/interface";
import { NextApiRequest, NextApiResponse } from "next";

// Function to check if the host is valid
const isValidHost = (host: string) => {
  if (process.env.NODE_ENV === "production")
    return host.toLowerCase() === "j471n.in";
  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const origin = req.headers.origin;
  const host = req.headers.host;

  console.log({
    origin,
    host,
  });

  if (!isValidHost(host!)) {
    return res.status(400).json({
      status: "error",
      message: "You are unauthorize to access this route.",
    });
  }

  if (req.method !== "POST") {
    return res.status(400).json({
      status: "error",
      message: "Invalid Method, use POST",
    });
  }

  const { email } = JSON.parse(req.body);

  const url = "https://mailcheck.p.rapidapi.com/?domain=" + email;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.EMAIL_VALIDATION_API!,
      "X-RapidAPI-Host": "mailcheck.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);

  if (response.status !== 200) {
    return res.status(400).json({
      status: "error",
      message:
        "Unable to process your request right now. Please try again later.",
    });
  }

  const { valid, disposable } = (await response.json()) as IEmailValidation;

  return res.status(200).json({
    status: "success",
    message: "Email is deliverable.",
    valid: valid && !disposable,
  });
}
