import { getRequestParams } from "../../lib/newsletter";

export default async function handler(req, res) {
  const body = req.body;
  const { email } = JSON.parse(body);

  if (!email || !email.length) {
    return res.status(400).json({
      error: "Forgot to add your email?",
    });
  }

  try {
    const { url, data, headers } = getRequestParams(email);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: data,
    }).then((res) => res.json());

    return res.status(200).json({
      title: response.title,
      status: response.status,
    });
    // Success
  } catch (error) {
    return res.status(400).json({
      error: "Oops, something went wrong... Try again later",
    });
  }
}
