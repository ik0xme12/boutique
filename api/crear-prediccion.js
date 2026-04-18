export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env.REPLICATE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'REPLICATE_API_KEY no configurado' });

  try {
    const { garm_img, human_img, garment_des } = req.body;

    const response = await fetch('https://api.replicate.com/v1/models/yisol/idm-vton/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          human_img,
          garm_img,
          garment_des: garment_des || 'clothing item',
          is_checked: true,
          is_checked_crop: false,
          denoise_steps: 30,
          seed: Math.floor(Math.random() * 9999),
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.detail || 'Error Replicate' });
    return res.status(200).json({ id: data.id, status: data.status });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
