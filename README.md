# Simple HLS Player

Minimal Vite + React app that plays HLS streams using hls.js and shows debug toasts.

Try the provided URL (replace if needed):

http://140.112.31.164:8888/mystream/index.m3u8

Quick start:

```bash
cd /home/andy/playground/hlsplayer
npm install
npm run dev
```

Open the URL printed by vite (usually http://localhost:5173) and the player should load. If your browser supports native HLS (Safari) hls.js won't be used.

Troubleshooting:
- If auto-play is blocked, click play on the player.
- If you see network errors, confirm the stream is reachable from your machine.
- Use the URL input to change streams.

