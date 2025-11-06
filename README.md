# AIO Chat — Ready minimal Next.js project (Hugging Face)

This is a minimal, working Next.js project (Pages router) that uses the Hugging Face Inference API to generate text and images.
It optionally saves chats to Supabase **if** you set the Supabase environment variables.

**Important**: Do NOT commit sensitive keys. Use Vercel Environment Variables for deployment.

## Quick steps to deploy on Vercel
1. Create a repo on GitHub and upload these files (or upload the zip contents).
2. In Vercel, import the repository and add the Env variables (see below).
3. Deploy — the app will be available at `https://<your-project>.vercel.app`.

## Required environment variables (add in Vercel Settings - Environment Variables)
- `HF_API_TOKEN` — your Hugging Face token
Optional (only if you want message saving):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Local development
Create `.env.local` with:
```
HF_API_TOKEN=hf_xxx
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Run locally:
```
npm install
npm run dev
```

## Files
- pages/index.js — main UI page
- pages/api/generate.js — server endpoint to call Hugging Face
- components/Chat.jsx — chat UI component
- lib/hf.js — small helper for HF requests
- lib/supabaseClient.js — optional supabase client used only if env vars present
- styles/globals.css — Tailwind + glass styles
