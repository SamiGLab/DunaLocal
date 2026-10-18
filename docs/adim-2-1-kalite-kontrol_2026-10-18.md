# Adım 2.1 — Kaynak kalite kontrolü ve açık doğrulamalar (2026-10-18)

## Doğrulanmış
- `index.html` ile `dist/index.html` önceki sürümde eşit blob SHA taşıyordu; aynı tema rengi düzeltmesi ikisine de yazıldı.
- `app.js` ile `dist/app.js` aynı blob SHA: `b033d8b08bf4d85f0942e354cd63282b86beba40`.
- `styles.css` ve `dist/styles.css` önceki adımda aynı V1 görsel eklemeyi aldı.
- HTML: `lang=hu`, `viewport`, `noindex,nofollow,noarchive`, ana içerik atlama bağlantısı, HU/EN düğmeleri, mobil menü ve işleyen bölüm hedefleri kaynakta mevcut.
- Mevcut `.github/workflows/ci.yml` JavaScript söz dizimi, build/dist tutarlılığı, önizleme korumaları, SVG, Wrangler dry-run ve Playwright beş genişlik testi (320/360/390/768/1440) tanımlıyor.
- Tespit edilen tasarım tutarsızlığı: tarayıcı meta `theme-color` eski koyu yeşil `#102a25` iken V1 site koyu lacivert `#101820` kullanıyordu. İki HTML dosyasında `#101820` yapıldı.

## Bu oturumda doğrulanamayan
- Cloudflare Worker URL'si web üzerinden erişilemedi. Çalışan sürüm/commit veya HTTP/CSP başlıklarını doğrulama yok.
- Gerçek Chromium mobil ve masaüstü ekran görüntüsü, menü tıklama, dil geçişi ve renk kontrastı bu oturumda yeniden test edilmedi.
- Son GitHub Actions sonucuna bu oturumda erişilmedi; CI başarılı denemez.
- Marka adı ve iletişim kanalı onaylanmamış; site iç önizlemedir, halka açık ticari lansman değildir.

## Sonraki doğrulama kapısı
1. GitHub Actions `Preview quality checks` son push sonucunun başarılı olduğunu ve screenshot artifact'lerini doğrula.
2. 320, 360, 390, 768 ve 1440 px'de yatay taşma, menü, HU/EN çeviri, klavye odağı, okunabilirlik ve kart yerleşimini kontrol et.
3. Cloudflare dağıtılan sürümün kaynak commit ile eşleştiğini, HTTP 200 ve noindex güvenlik başlıklarını kontrol et.
4. Sorun bulunursa yalnız o sorunu düzelt, test et; GitHub ve Google Drive durum kaydını güncelle.
5. Sonrasında sosyal SVG şablonları ile görsel tokenları uyumlandırmak için ayrı aşama onayı al.

Kapsam dışı: şirket yönetimi, hukuk, vergi, muhasebe.
