export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env.REPLICATE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'REPLICATE_API_KEY no configurado en Vercel' });

  const { garm_img, human_img, garment_des } = req.body;

  try {
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
    if (!response.ok) return res.status(response.status).json({ error: data.detail || 'Error al crear predicción' });
    return res.status(200).json({ id: data.id, status: data.status });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
