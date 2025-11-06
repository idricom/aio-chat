import React, {useState, useRef} from 'react';
import axios from 'axios';

export default function Chat(){
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('text');
  const refEnd = useRef();

  async function send(){
    if(!input.trim()) return;
    const text = input.trim();
    const userMsg = { id: Date.now(), role:'user', text };
    setMessages(prev=>[...prev, userMsg]);
    setInput('');
    setLoading(true);
    try{
      const res = await axios.post('/api/generate', { type: mode, prompt: text });
      if(res.data?.result){
        setMessages(prev=>[...prev, { id: Date.now()+1, role:'assistant', text: res.data.result }]);
      }else if(res.data?.image_base64){
        const url = `data:${res.data.contentType};base64,${res.data.image_base64}`;
        setMessages(prev=>[...prev, { id: Date.now()+1, role:'assistant', isImage:true, text: url }]);
      } else {
        setMessages(prev=>[...prev, { id: Date.now()+1, role:'assistant', text: 'Пустой ответ' }]);
      }
    }catch(e){
      console.error(e);
      setMessages(prev=>[...prev, { id: Date.now()+1, role:'assistant', text: 'Ошибка при генерации. Попробуй позже.' }]);
    }finally{
      setLoading(false);
      refEnd.current?.scrollIntoView({ behavior:'smooth' });
    }
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-md">
      <div className="flex gap-2 justify-center mb-4">
        <button onClick={()=>setMode('text')} className={`px-4 py-2 rounded-full ${mode==='text'?'bg-black text-white':'bg-white text-black'}`}>Текст</button>
        <button onClick={()=>setMode('image')} className={`px-4 py-2 rounded-full ${mode==='image'?'bg-black text-white':'bg-white text-black'}`}>Картинка</button>
      </div>

      <div className="min-h-[40vh] max-h-[60vh] overflow-auto mb-4 p-4 border border-gray-100 rounded-md">
        {messages.map(m=> (
          <div key={m.id} className={m.role==='user' ? 'text-right mb-3' : 'text-left mb-3'}>
            <div className={`inline-block p-3 rounded-2xl ${m.role==='user' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
              {m.isImage ? <img src={m.text} alt="generated" className="max-w-full rounded" /> : m.text}
            </div>
          </div>
        ))}
        <div ref={refEnd} />
      </div>

      <div className="flex gap-3 items-center">
        <button className="p-3 rounded-full border" title="Добавить">+</button>
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 p-3 rounded-full border" placeholder={mode==='text'?'Напиши сообщение...':'Опиши картинку...'} />
        <button onClick={send} className="p-3 rounded-full bg-black text-white">{loading ? '...' : '➤'}</button>
      </div>
    </div>
  );
}
