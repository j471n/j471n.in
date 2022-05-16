export default async function handler(req, res) {
  const body = req.body;
  const { email } = JSON.parse(body);

  if (!email) {
    return res.status(400).json({
      error: true,
      msg: "Forgot to add your email?",
    });
  }

  const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await result.json();
  if (!result.ok) {
    return res.status(500).json({ error: true, msg: data.error.email[0] });
  }

  return res.status(201).json({
    error: false,
    msg: "Voilà, you are on my list. Please check your inbox",
  });
}
