# Lokmira — XML sitemap kurulumu (18 Ekim 2026)

## Mevcut içerik ve kapsam
- **Sitemap adresi (hedef alan adı):** `https://lokmira.com/sitemap.xml`.
- **Repo kaynak:** `sitemap.xml`; **Cloudflare Workers static assets:** `dist/sitemap.xml`.
- XML Sitemap protokolünde `<urlset>` içerisinde **tek bir geçerli mantıksal URL** bulunuyor: `https://lokmira.com/`. Mevcut site tek sayfa ve HU/EN dil geçişi `app.js` içinde aynı URL'de olduğu için `/hu/` veya `/en/` **henüz yok; sitemap'e eklenmedi**. `#services`, `#pilot` gibi sayfa içi anchorlar da ayrı URL değil.
- `<lastmod>` yer almıyor: sayfa değişiklik tarihi ileride otomatik güncellenmediği takdirde eski veya yanlış tarih göndermek yerine şimdilik atlandı.
- Google `<priority>` ve `<changefreq>` değerlerini kullanmadığından eklenmedi.
- `robots.txt` ve `dist/robots.txt` içerisinde `Sitemap: https://lokmira.com/sitemap.xml` satırı eklendi.

## Güvenlik / indeksleme sınırı
- Site halen *ticari olarak yayın onayı verilmemiş* bir `noindex,nofollow,noarchive` iç önizleme. `robots.txt` içindeki `Disallow: /` ve Cloudflare `X-Robots-Tag: noindex` olduğu gibi bırakıldı.
- **Sitemap dosyasının varlığı Google'da indekslenme veya Search Console'da otomatik gönderim anlamına gelmez.** Sayfa URL'si Google botlarına kapalı olduğu sürece taranması/indekslenmesi beklenmemeli.
- `lokmira.com` alan adı kullanıcı tarafından satın alındı. DNS bağlantısı ve hedef URL'nin gerçekten yayında olması bu dosya değişikliğinin haricindedir; `workers.dev` adresinin site haritasını göstermesi `lokmira.com` alan adında gösterdiğini kanıtlamaz.
- Sitemap'i Search Console'a göndermeyi **lokmira.com DNS ve özel domain erişimi doğrulandıktan, kullanıcı yayına/indekslemeye izin verdikten ve noindex/Disallow kapıları kontrollü olarak kaldırıldıktan sonra** tamamla.

## Teknik uygulama
1. `scripts/build.mjs`: `sitemap.xml` dosyası `dist/` içine zorunlu public artifact olarak dahil edildi.
2. `.github/workflows/ci.yml`: `dist/sitemap.xml` varlığı zorunlu.
3. `scripts/verify.mjs`: `robots.txt` sitemap bildirimi, XML'de tek gerçek canonical homepage, HU/EN sahte yol ve workers.dev hostname bulunmaması, kaynak/dist eşitliği doğrulanır.
4. `scripts/live-smoke.mjs`: gerçek Worker `/sitemap.xml` HTTP 200 ve içeriğinin repo ile eşleşmesini; `robots.txt` sitemap direktifini test eder.
5. `scripts/check-live.sh`: `/sitemap.xml` HTTP erişimini smoke test içine alır.
6. Site dokümanındaki Search Console doğrulama etiketi ve diğer yayın kilitleri değişmedi.

## Search Console gönderim işlemi (domain doğrulandıktan sonra)
1. [Google Search Console](https://search.google.com/search-console/) aç.
2. `https://lokmira.com/` URL-prefix mülkünü seç veya (TXT ile doğrulanmışsa) `lokmira.com` Domain property'i seç.
3. **Site Haritaları / Sitemaps** > `Yeni site haritası ekle` alanına `sitemap.xml` gir ve gönder.
4. Gönderilen tam sitemap URL'si `https://lokmira.com/sitemap.xml`. Search Console durumunu **Başarılı / Success** olmadan tamamlandı olarak kaydetme.
5. İleride gerçek `/hu/`, `/en/` veya hizmet alt sayfaları yayımlanırsa sitemap genişletilebilir. Mevcut tek URL'de iki dilin JS ile değiştirilmesi iki indexlenebilir dil sayfası üretmez.

## Dayanak
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (Google Search Central sitemap yönergeleri, güncelleme 08.07.2026)
- https://www.sitemaps.org/protocol.html


## 18.10.2026 — ÇOK SAYFALI SİTE GÜNCELLEMESİ (ÖNCEKİ TEK-URL DURUMUNU GEÇERSİZ KILAR)
Rakip analizi sonrası Lokmira'nın statik site önizlemesi **16 yeni HU/EN sayfayla** genişletildi. Bu nedenle sitemap artık tek URL içermez; `https://lokmira.com/` ana sayfasıyla birlikte **17 gerçek URL** içerir. Güncel yollar: `/hu/szolgaltatasok/`, `/hu/modszer/`, `/hu/rolunk/`, `/hu/kapcsolat/`, `/hu/helyi-seo/`, `/hu/google-ads/`, `/hu/tartalom-video/`, `/hu/meres/`; İngilizce karşılıkları: `/en/services/`, `/en/approach/`, `/en/about/`, `/en/contact/`, `/en/local-seo/`, `/en/google-ads/`, `/en/content-video/`, `/en/measurement/`. Kaynak ve dist kopyaları birebir; gerçek Worker HTTP smoke testi geçti. Önceki **“tek sayfa/tek URL”** ifadesi tarihsel durum olarak kalır.
`noindex`, `Disallow: /` ve iletişim kısıtları hâlâ etkin; alan adı GSC mülkünde doğrulanmadan/ayrı üretim lansman onayı olmadan sitemap Google'a resmen gönderildi veya indekslendi denemez. [Site v2 benchmark ve teslimat](./LOKMIRA_rekabet_analizi_ve_site_yeniden_tasarim_2026-10-18.md).
