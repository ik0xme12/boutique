export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).end();

  const apiKey = process.env.REPLICATE_API_KEY;
  const { id } = req.query;

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Token ${apiKey}` },
    });
    const data = await response.json();
    return res.status(200).json({ status: data.status, output: data.output, error: data.error });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
