// Static Cloudflare Pages build. Copies ONLY intentional public-preview assets.
// Do not expose repository docs, internal reports, draft sales kits or scripts on Pages.
import { mkdirSync, rmSync, copyFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";
const out = "dist";
const assets = ["index.html", "styles.css", "app.js", "robots.txt", "_headers"];
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const asset of assets) {
  if (!existsSync(asset) || !statSync(asset).isFile()) {
    console.error("Missing public asset:", asset);
    process.exit(1);
  }
  copyFileSync(asset, join(out, asset));
}
const actual = readdirSync(out).sort();
const expected = [...assets].sort();
if (actual.join("|") !== expected.join("|")) {
  console.error("Unexpected build output", actual);
  process.exit(1);
}
console.log("Cloudflare Pages preview build OK:", actual.join(", "));
