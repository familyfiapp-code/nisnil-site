# FamilyFi Reel Studio (3D Instagram Reels)

Makes 1080×1920 Instagram Reels for **@familyfi.app** from code, using the real
FamilyFi app screenshots (sample family "Aarav & Meera") already on nisnil.co.in.

Every reel has the same 19.5-second structure, built for watch time and comments:

| Time | Scene | Why it helps on Instagram |
|---|---|---|
| 0 – 2.9 s | **Hook**: big 3D words fly in over a moving grid with falling ₹ coins, plus a question | Stops the scroll in the first 2 s |
| 2.8 – 6.5 s | **"Sound familiar?"**: 3 pain cards spin in, each gets a red ✕ | Viewers recognise their own problem and keep watching |
| 6.4 – 12.2 s | **3D phone**: the phone spins in, a light sweep and ring highlight the screen, then the feature card flies out toward the camera | Shows the real product, not stock footage |
| 12.1 – 15.6 s | **Proof**: circle wipe to cream, a number counts up, 3 ticks drop in | Clear value, easy to screenshot and save |
| 15.5 – 19.5 s | **CTA**: logo, "15 din FREE trial", ₹1,499 → ₹999 price card, link, "Comment KEYWORD 👇 · Save 🔖 · Share" | Comments, saves and shares are what push a reel to more people |

All text stays inside Instagram's safe area (clear of the caption and buttons).

## Files

- `episodes.js`: the scripts. **Edit only this file to make new reels.**
- `index.html`: the animation engine. Open it in a browser to preview any episode (pick from the list, scrub the timeline).
- `render.mjs`: turns an episode into an MP4, a cover image and a caption file.
- `fonts/`: Anton, Fraunces and Inter (SIL Open Font License).
- `out/`: rendered files (not committed).

## Make the videos

Needs Node 18+, ffmpeg and Playwright (`npm i playwright && npx playwright install chromium`).

```bash
cd reel-studio
node render.mjs                        # all episodes  (≈1.5 min each)
node render.mjs R03                    # one episode (prefix match)
node render.mjs R03 --stills           # 5 check frames only, a few seconds
node render.mjs R03 --music track.mp3  # add music you have the rights to
```

Output in `out/`: `<id>.mp4` (H.264, 30 fps, AAC), `<id>_cover.jpg` and `<id>_caption.txt`.

## New episode in 2 minutes

1. Copy an episode in `episodes.js` and give it a new `id` (R07_..., R08_...).
2. Change `hook` (put `*stars*` around the word to highlight), `hookSub`, `pains`, `benefits`, `keyword`, `caption`.
3. Pick a picture for `feature.img` (any app screenshot with **sample data only**).
4. `node render.mjs R07 --stills`, check the frames, then `node render.mjs R07`.

## Posting checklist (for reach)

1. Upload the MP4 and pick `_cover.jpg` as the cover.
2. In Instagram, add a **trending audio** at low volume. The video's own audio is silent, so any track fits.
3. Paste the caption from `_caption.txt` (it already has exactly 5 hashtags).
4. Post between 7 and 10 pm IST. In the first hour, reply to every comment that has the keyword.
5. Pin a comment with the link, and keep the link in your bio.
6. Change one thing at a time (hook, topic or length) and note views, saves and shares to learn what works.

Rules: sample data only, never real customer data; numbers must be true; prices match `/familyfi/` (launch offer to 31 Dec 2026).
