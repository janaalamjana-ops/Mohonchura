// Downloads product photos that match each product name into  public/products/
// 1) Get a free API key at https://www.pexels.com/api/
// 2) Run from your project folder:  node get-images.mjs YOUR_PEXELS_KEY
// Needs Node 18 or newer. Photos are free to use under the Pexels license.
import { mkdir, writeFile } from "node:fs/promises";

const KEY = process.argv[2] || process.env.PEXELS_KEY;
if (!KEY) {
  console.log("Usage: node get-images.mjs YOUR_PEXELS_API_KEY");
  process.exit(1);
}

// file name  ->  what to search for
const ITEMS = {
  headphones: "wireless headphones",
  smartwatch: "smart watch",
  sneakers: "running sneakers",
  backpack: "leather backpack",
  camera: "mirrorless camera",
  sunglasses: "sunglasses",
  speaker: "bluetooth speaker",
  gamepad: "game controller",
  keyboard: "mechanical keyboard",
  earbuds: "wireless earbuds",
  wallet: "leather wallet",
  drone: "camera drone",
  laptop: "slim laptop",
  tablet: "tablet computer",
  monitor: "4k monitor",
  perfume: "perfume bottle",
  jacket: "bomber jacket",
  wristwatch: "analog wristwatch",
  lamp: "desk lamp",
  espresso: "espresso machine",
  chair: "ergonomic office chair",
  turntable: "record player",
  smartphone: "smartphone",
  microphone: "podcast microphone",
};

await mkdir("public/products", { recursive: true });

for (const [slug, query] of Object.entries(ITEMS)) {
  try {
    const r = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=4&orientation=square`,
      { headers: { Authorization: KEY } }
    );
    if (!r.ok) { console.log(`${slug}: failed (${r.status})`); continue; }
    const { photos } = await r.json();
    for (let i = 0; i < photos.length; i++) {
      const img = await fetch(photos[i].src.large);
      await writeFile(`public/products/${slug}${i ? "-" + (i + 1) : ""}.jpg`, Buffer.from(await img.arrayBuffer()));
    }
    console.log(`${slug}: ${photos.length} photos saved`);
  } catch (e) {
    console.log(`${slug}: error`, e.message);
  }
}
console.log("Done. Restart your dev server.");
