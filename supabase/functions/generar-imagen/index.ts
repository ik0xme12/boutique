const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function poll(id: string, apiKey: string): Promise<string> {
  for (let i = 0; i < 50; i++) {
    await new Promise(r => setTimeout(r, 4000));
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Token ${apiKey}` },
    });
    const data = await res.json();
    if (data.status === 'succeeded') return data.output as string;
    if (data.status === 'failed' || data.status === 'canceled')
      throw new Error(data.error ?? 'La generación falló');
  }
  throw new Error('Tiempo de espera agotado');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('REPLICATE_API_KEY');
    if (!apiKey) throw new Error('REPLICATE_API_KEY no configurado');

    const { garm_img, human_img, garment_des } = await req.json();

    const res = await fetch('https://api.replicate.com/v1/models/yisol/idm-vton/predictions', {
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

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { detail?: string }).detail ?? `Error ${res.status}`);
    }

    const prediction = await res.json();

    const output = prediction.status === 'succeeded'
      ? prediction.output as string
      : await poll(prediction.id as string, apiKey);

    return new Response(JSON.stringify({ output }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'Error desconocido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
