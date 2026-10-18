#!/usr/bin/env bash
set -euo pipefail
base="https://dunalocal.samiayten-hu.workers.dev"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
get() {
  local route="$1" name="$2"
  curl --connect-timeout 8 --max-time 25 -fsSL -D "$tmp/$name.headers" -o "$tmp/$name.body" "$base$route"
  printf '%s: HTTP 200 (%s bytes)\n' "$route" "$(wc -c < "$tmp/$name.body")"
}
get "/" index
grep -q "Lokmira" "$tmp/index.body"
for name in app.js styles.css robots.txt brand/focus-mark.svg brand/focus-app-icon.svg brand/focus-logo.svg brand/favicon.svg; do
  get "/$name" "$name"
done
if cmp -s "dist/index.html" "$tmp/index.body"; then
  echo "LIVE VERSION: Matches this GitHub commit's index.html exactly"
else
  echo "LIVE VERSION: Different from this commit (Cloudflare may still be deploying)"
fi
if grep -qi "^x-robots-tag:.*noindex" "$tmp/index.headers"; then
  echo "ROBOTS HEADER: Present"
else
  echo "ROBOTS HEADER: Missing on live domain"
fi
if grep -qi "^content-security-policy:" "$tmp/index.headers"; then
  echo "CSP HEADER: Present"
else
  echo "CSP HEADER: Missing on live domain"
fi
status="$(curl --connect-timeout 8 --max-time 20 -sS -o "$tmp/404.body" -w "%{http_code}" "$base/missing-page-verification-404")"
echo "MISSING PAGE: HTTP $status"
private="$(curl --connect-timeout 8 --max-time 20 -sS -o "$tmp/private.body" -w "%{http_code}" "$base/docs/launch-gates-and-status.md")"
echo "INTERNAL DOCS: HTTP $private"
