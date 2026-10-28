// Captures a lead's concept site as the images the web proposal template needs:
//   content/leads/<slug>/concept-desktop-fold.jpg  1440×900, first screen (before/after slider, static hero)
//   content/leads/<slug>/concept-desktop.jpg       full page, 1280 wide, max 4096 tall (3D laptop screen)
//   content/leads/<slug>/concept-mobile.jpg        full page at 390 wide @2x → 640 wide, max 4096 tall (3D phone screen)
//
// Usage: start the dev server, then `npm run capture <slug>` (optional: `-- --port 3123`).
// Needs Google Chrome (set CHROME=/path/to/chrome elsewhere than macOS) and a `Capture` entry for the slug
// in components/proposal/registry.tsx. Re-run whenever the concept's homepage changes.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const portArg = args.indexOf("--port");
const port = portArg >= 0 ? args[portArg + 1] : process.env.PORT ?? "3000";
if (!slug) { console.error("Usage: npm run capture <slug> [-- --port 3000]"); process.exit(1); }

const chrome = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(chrome)) { console.error(`Chrome not found at ${chrome}. Set CHROME=/path/to/chrome.`); process.exit(1); }
const out = join("content/leads", slug);
if (!existsSync(out)) { console.error(`No folder ${out}.`); process.exit(1); }

const url = `http://localhost:${port}/dev/concept/${slug}`;
const res = await fetch(url).catch(() => null);
if (!res?.ok) { console.error(`${url} answered ${res?.status ?? "nothing"}. Is the dev server running, and does the slug have a Capture entry?`); process.exit(1); }

const tmp = mkdtempSync(join(tmpdir(), "capture-"));
function shoot(file, { width, height, scale = 1, w }) {
  execFileSync(chrome, [
    "--headless=new", "--hide-scrollbars", `--window-size=${width},${height}`, `--force-device-scale-factor=${scale}`,
    "--virtual-time-budget=12000", `--screenshot=${file}`, w ? `${url}?w=${w}` : url,
  ], { stdio: "ignore" });
}

/** Height of the concept: the capture page is magenta below it. Scans a column away from the left edge. */
async function contentHeight(file, x) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  for (let y = info.height - 1; y >= 0; y--) {
    const i = (y * info.width + x) * info.channels;
    const magenta = data[i] > 240 && data[i + 1] < 20 && data[i + 2] > 240;
    if (!magenta) return y + 1;
  }
  return info.height;
}

const MAX = 4096; // safe texture height on most GPUs

// Desktop (1440 wide).
const desk = join(tmp, "desk.png");
shoot(desk, { width: 1440, height: 6000 });
const dh = await contentHeight(desk, 1080);
await sharp(desk).extract({ left: 0, top: 0, width: 1440, height: 900 }).jpeg({ quality: 84, progressive: true, mozjpeg: true })
  .toFile(join(out, "concept-desktop-fold.jpg"));
const deskScaled = await sharp(desk).extract({ left: 0, top: 0, width: 1440, height: dh }).resize({ width: 1280 }).toBuffer();
const deskH = Math.min(MAX, (await sharp(deskScaled).metadata()).height);
await sharp(deskScaled).extract({ left: 0, top: 0, width: 1280, height: deskH }).jpeg({ quality: 80, progressive: true, mozjpeg: true })
  .toFile(join(out, "concept-desktop.jpg"));

// Mobile (390 wide at 2x). Headless Chrome will not go below ~500px, so the page renders the concept at 390.
const mob = join(tmp, "mob.png");
shoot(mob, { width: 600, height: 6000, scale: 2, w: 390 });
const mh = await contentHeight(mob, 600);
const mobScaled = await sharp(mob).extract({ left: 0, top: 0, width: 780, height: mh }).resize({ width: 640 }).toBuffer();
const mobH = Math.min(MAX, (await sharp(mobScaled).metadata()).height);
await sharp(mobScaled).extract({ left: 0, top: 0, width: 640, height: mobH }).jpeg({ quality: 80, progressive: true, mozjpeg: true })
  .toFile(join(out, "concept-mobile.jpg"));

rmSync(tmp, { recursive: true, force: true });
console.log(`Saved concept-desktop-fold.jpg, concept-desktop.jpg (1280×${deskH}) and concept-mobile.jpg (640×${mobH}) in ${out}`);
