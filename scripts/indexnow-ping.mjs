// IndexNow instant search indexing submission script for Lokmira.com
// Notifies Bing, Seznam, Yandex and participating search engines of all 22 localized URLs.
import { readFileSync } from "node:fs";

const HOST = "lokmira.com";
const KEY = "4b8c9d2e1a3f507b9c8e7d6a5b4c3d2e";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = "sitemap.xml";

async function main() {
  const xml = readFileSync(SITEMAP_PATH, "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  
  if (urls.length === 0) {
    console.error("No URLs found in sitemap.xml");
    process.exit(1);
  }

  console.log(`Found ${urls.length} URLs in ${SITEMAP_PATH} to submit via IndexNow.`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    console.log(`IndexNow API response status: ${res.status} ${res.statusText}`);
    if (res.status === 200 || res.status === 202) {
      console.log("IndexNow submission successful! Search engines notified.");
    } else {
      const text = await res.text();
      console.warn("IndexNow response body:", text);
    }
  } catch (err) {
    console.warn("IndexNow ping could not reach endpoint (e.g. offline or DNS check):", err.message);
  }
}

main();
