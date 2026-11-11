// FamilyFi Reel Studio — renders episodes from episodes.js to Instagram-ready MP4s.
//
//   node render.mjs                      # all episodes
//   node render.mjs R01_paisa_gaya_kahan # one episode
//   node render.mjs R01 --music song.mp3 # add your own licensed music
//   node render.mjs R01 --stills         # only 5 check frames (fast)
//
// Output (in ./out): <id>.mp4 (1080x1920, 30 fps, H.264 + AAC), <id>_cover.jpg, <id>_caption.txt
// Needs: Node 18+, `npm i playwright` (or a global Playwright), ffmpeg on PATH.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');          // site root, so ../img/... works
const OUT = path.join(HERE, 'out');
fs.mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2);
const flag = n => args.includes(n);
const opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const music = opt('--music');
const wanted = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--music');

// --- tiny static server (fonts and images load reliably over http) ---
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.css': 'text/css' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/reel-studio/index.html`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto(base + '?render=1');
await page.evaluate(() => window.READY);
const all = await page.evaluate(() => EPISODES.map(e => ({ id: e.id, caption: e.caption })));
const list = wanted.length ? all.filter(e => wanted.some(w => e.id.startsWith(w))) : all;
if (!list.length) { console.error('No episode matches', wanted.join(' '), '\nKnown:', all.map(e => e.id).join(', ')); process.exit(1); }

const shot = () => page.screenshot({ type: 'jpeg', quality: 93 });

for (const ep of list) {
  await page.goto(`${base}?render=1&ep=${encodeURIComponent(ep.id)}`);
  await page.evaluate(() => window.READY);
  const { DUR, FPS } = await page.evaluate(() => ({ DUR: window.DURATION, FPS: window.FPS }));
  fs.writeFileSync(path.join(OUT, `${ep.id}_caption.txt`), ep.caption + '\n');

  // cover = strongest hook frame
  await page.evaluate(t => window.seek(t), 1.9);
  fs.writeFileSync(path.join(OUT, `${ep.id}_cover.jpg`), await shot());

  if (flag('--stills')) {
    for (const t of [1.9, 5.6, 10.5, 14.8, 18.5]) {
      await page.evaluate(t => window.seek(t), t);
      fs.writeFileSync(path.join(OUT, `${ep.id}_still_${t}.jpg`), await shot());
    }
    console.log('stills ->', ep.id);
    continue;
  }

  const file = path.join(OUT, `${ep.id}.mp4`);
  const audioIn = music && fs.existsSync(music)
    ? ['-stream_loop', '-1', '-i', music]
    : ['-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo'];
  const af = music ? ['-af', `afade=t=in:d=0.4,afade=t=out:st=${DUR - 1.2}:d=1.2,volume=0.9`] : [];
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    ...audioIn, ...af,
    '-map', '0:v', '-map', '1:a', '-t', String(DUR),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', file], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', c => c ? rej(new Error('ffmpeg ' + c)) : res()));

  const n = Math.round(DUR * FPS);
  for (let f = 0; f < n; f++) {
    await page.evaluate(t => window.seek(t), f / FPS);
    const buf = await shot();
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 60 === 0) process.stdout.write(`\r${ep.id}  ${Math.round(f / n * 100)}%   `);
  }
  ff.stdin.end(); await done;
  console.log(`\r${ep.id}  done -> out/${ep.id}.mp4`);
}
await browser.close(); server.close();
