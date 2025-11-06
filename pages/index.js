import Head from 'next/head';
import Chat from '../components/Chat';

export default function Home(){
  return (
    <div className="min-h-screen bg-white text-black flex">
      <Head><title>AIO Chat</title></Head>
      <aside className="w-14 border-r border-gray-100 flex flex-col items-center py-6">
        <button className="mb-6">✎</button>
        <button>🔍</button>
      </aside>
      <main className="flex-1 flex items-start justify-center p-8">
        <div className="w-full max-w-3xl">
          <h1 className="text-center text-2xl font-semibold mb-10">AIO Chat</h1>
          <Chat />
        </div>
      </main>
    </div>
  );
}
