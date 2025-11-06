export async function generateText(prompt){ 
  const token = process.env.HF_API_TOKEN;
  if(!token) throw new Error('HF_API_TOKEN not set');
  const model = 'google/flan-t5-small';
  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method:'POST',
    headers:{ Authorization: `Bearer ${token}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ inputs: prompt })
  });
  if(!res.ok){ const t = await res.text(); throw new Error('HF text error: '+t); }
  const body = await res.json();
  if(Array.isArray(body) && body[0]?.generated_text) return body[0].generated_text;
  if(body?.generated_text) return body.generated_text;
  if(typeof body === 'string') return body;
  return JSON.stringify(body);
}

export async function generateImage(prompt){
  const token = process.env.HF_API_TOKEN;
  if(!token) throw new Error('HF_API_TOKEN not set');
  const model = 'stabilityai/stable-diffusion-2-1';
  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method:'POST',
    headers:{ Authorization: `Bearer ${token}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ inputs: prompt })
  });
  if(!res.ok){ const t = await res.text(); throw new Error('HF image error: '+t); }
  const arrayBuffer = await res.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const contentType = res.headers.get('content-type') || 'image/png';
  return { base64, contentType };
}
