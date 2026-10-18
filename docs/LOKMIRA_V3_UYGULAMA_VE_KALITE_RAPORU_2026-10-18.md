# Lokmira — Premium Site V3 / Tasarım, Uygulama ve Kalite Raporu
**Tarih:** 18 Ekim 2026 · **Statü:** Cloudflare'da `noindex` iç önizleme; ticari yayına çıkış / `lokmira.com` DNS bağlantısı ayrı.

## Kullanıcı talebi
Budapeşte'deki rakip ajansların (özellikle Marketing21, Premium Studio, Growww Digital) sitelerini inceleyerek önceki şablon görünümlü Lokmira sitesini görsel ve ticari açıdan çok daha nitelikli hale getirmek. Uygun olursa tüm öğrenimleri Codex'e eksiksiz aktarmak.

## Araştırmanın tasarım kararına etkisi
- Marketing21: ayrıntılı bağımsız hizmet sayfaları; Lokmira mevcut 4 hizmet alanını ayrı HU/EN detay sayfalarında sürdürüyor.
- Premium Studio: güçlü hero, okunaklı görsel hiyerarşi, net yöntem, gerçek kişilere ve gerçek işlere dayanan güven bölümleri; Lokmira güçlü hero ve süreç sunumunu geliştiriyor, fakat **sahte referans kullanmıyor**.
- Growww Digital: hizmetin faaliyet değil ticari sonuçla ilişkili sunulması ve gerçek vaka açıklamaları; Lokmira *bulunabilirlik → talep → teklif → geri bildirim* yaklaşımını öne çıkarıyor, gerçek vaka yokken bunu örnek metodoloji olarak etiketliyor.
- Hiçbir rakibin tasarım, metin, logoları veya görüntüleri kopyalanmadı.
Dış kaynaklar: https://premiumstudio.hu/ , https://marketing21.hu/en/ , https://www.growwwdigital.com/services/ , https://www.growwwdigital.com/references/.

## Gerçekten uygulanan V3 parçaları
- `index.html` içinde **gerçek müşteri problemlerini anlatan üç soruluk editorial bölüm**: doğru kişiye görünme, değer önerisinin anlaşılması ve sonrasındaki satış adımları.
- **Örnek audit föyü:** ilk bakışta gerçek verilere benzeme riski olmasın diye üstte ve altta *temsili, gerçek müşteri verisi değildir* uyarısı. Üç anlamlı başlangıç kontrolü; trafik/satış grafiği, dönüşüm rakamı, uydurma müşteri sonucu yok.
- **90 günlük pilot bölümünün düzenlenmesi:** henüz onaylanmamış fiyat/kapsam kutusu yerine 1–30/31–60/61–90 gün yol haritası; ücret ve hizmet kapsamı hâlâ müzakere aşamasında.
- `app.js` iki dilde **24 yeni anahtar** + pilot aşama açıklamaları. HU/EN değer önerisi ve risk sınırlamaları korunuyor.
- `pages.css` paylaşılan vektörel/CSS tasarım dili: derin lacivert gradyan, konsantrik geometrik motif, kontrollü lime, daha güçlü kart tipografisi, süreç görünümü, mevcut tüm iç sayfalarda modernize edilen ortak stil; 320–1440 ekranlar için responsive düzen.
- Otomatik WCAG denetimi audit kartı küçük metninde kontrast uyarısı verdi; renkler yeniden ayarlanarak **0 yeni WCAG A/AA ihlali** hedeflendi. Gerçek denetim sonucu ayrıca raporlanmalıdır.
- Gerçek GitHub Actions ekran görüntüleri manuel gözle incelendi. Mobilde navbar ve hero içinde logo tekrarı bulundu; **620 px altında hero marka mührü gizlenerek** ilk ekranın asıl mesaja/CTA'ya ayrılması sağlandı.
- `dist/index.html`, `dist/app.js`, `dist/pages.css` güncellemeleri kaynak kodla eşleniyor. `sitemap.xml` 17 gerçek URL'yi koruyor.

## Güven ve yayına hazırlık sınırı
- `noindex,nofollow,noarchive`, `robots.txt Disallow: /`, Cloudflare `X-Robots-Tag`, CSP korunacak.
- Google Search Console HTML etiketi aynen korunacak, site mülkünün doğrulandığı iddia edilmeyecek.
- Geçici Focus/Discovery logo #2 kullanıcıdan nihai onay almadı.
- `lokmira.com` domaini kullanıcı tarafından satın alınmış olduğu bildirildi; Cloudflare ve GSC'ye gerçek alan adı bağlandığı bağımsız doğrulanmadı.
- Gerçek iş e-postası/telefon ve kullanıcı onaylı iletişim akışı yok; form veya analytics açılmadı.
- Doğrulanamayan müşteri yorumları, vaka çalışmaları, ekip fotoğrafları, sertifikalar, fiyat/garanti iddiaları kullanılamaz.
- Macarca native edit; tüm 17 URL'de SEO canonical/hreflang (özellikle tek URL'de JS İngilizce root meselesi); klavyeyle manuel kontrol; tema ve performans ölçümleri ayrı bitirme kapılarıdır.
- Şirket/vergi/hukuk/muhasebe işleri owner tarafından kapsam dışı bırakıldı.

## Codex'e kalıcı bilgi aktarımı (başlatıldığı anlamına gelmez)
1. [`AGENTS.md`](../AGENTS.md) — repo içindeki Codex'e okunabilir kalıcı talimatlar (iş hedefi, logo ve dil sistemi, sınırlar, testler).
2. [`LOKMIRA_DESIGN_V3_CODEX_BRIEF_2026-10-18.md`](./LOKMIRA_DESIGN_V3_CODEX_BRIEF_2026-10-18.md) — rakip araştırması, müşteri-persona, bölüm hiyerarşisi, HU/EN copy, tasarım spesifikasyonu, bilinçli release kapıları ve kabul kriterleri.
3. `docs/LOKMIRA_rekabet_analizi_ve_site_yeniden_tasarim_2026-10-18.md` — önceki benchmark.
4. `scripts/build.mjs`, `scripts/browser-smoke.mjs`, `scripts/a11y.mjs`, `scripts/live-smoke.mjs` — otomatik QA ve canlı Worker kontrolleri.
Bu dosyalar GitHub'da mevcut olsa da **Codex ajanı ayrıca tetiklenmiş veya görev ataması yapılmış değildir**.

## Kontrol listesi (en son CI ile eşleştir)
- [ ] Cloudflare son deploy başarılı, 17 URL canlı.
- [ ] GitHub `Preview quality checks` başarılı ve her breakpoint'te yatay taşma 0.
- [ ] `Accessible Preview Audit` başarılı, HU/EN 390/1440 kontrolünde sıfır otomatik ihlal.
- [ ] `Live Worker HTTP smoke` HTML/JS/CSS, favicon, GSC token, sitemap, 16 alt sayfa ve güvenlik başlıklarında başarılı.
- [ ] İnsan gözünden sayfaların görsel ekran görüntüleri tekrar gözden geçirildi ve istenmeyen taşma bulunmadı.
- [ ] Açık şirket/ürün/sonuç iddiaları önümüzdeki içerik kontrolünde yetkili kişi tarafından onaylanmalı.

**Ticari yayın kriteri:** Kod güzel görünse bile iletişim ve gerçek marka bilgileri doğrulanmadan, kullanıcı ticari lansman onayı vermeden indeksleme açılmaz.
