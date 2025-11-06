import { generateText, generateImage } from '../../lib/hf';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error:'Only POST' });
  try{
    const { type='text', prompt, userEmail } = req.body;
    if(!prompt) return res.status(400).json({ error:'No prompt' });
    if(type === 'image'){
      const img = await generateImage(prompt);
      // optionally save a record in supabase
      if(supabase && userEmail){
        await supabase.from('messages').insert({ role:'assistant', content:'image', metadata:{ type:'image' }, user_email: userEmail });
      }
      return res.status(200).json({ image_base64: img.base64, contentType: img.contentType });
    } else {
      const txt = await generateText(prompt);
      if(supabase && userEmail){
        await supabase.from('messages').insert({ role:'assistant', content: txt, user_email: userEmail });
      }
      return res.status(200).json({ result: txt });
    }
  }catch(e){
    console.error(e);
    return res.status(500).json({ error: String(e.message || e) });
  }
}
