# DunaLocal — Adım 2.3 doğrulanmış responsive / Cloudflare QA

**Tarih:** 2026-10-18
**Kod sürümü:** `186192da91906b52eeed2b06a031d550922369fa` (`main`)
**Durum:** İç önizleme teknik QA **GEÇTİ**. Ticari lansman **ONAYLANMADI**.

## GitHub Actions delilleri

- [Preview quality checks — run 39123395579](https://github.com/SamiGLab/DunaLocal/actions/runs/39123395579): `completed/success`.
- [Live Worker HTTP smoke — run 39123395560](https://github.com/SamiGLab/DunaLocal/actions/runs/39123395560): `completed/success`.
- [Tarayıcı ekran görüntüleri (GitHub artifact)](https://github.com/SamiGLab/DunaLocal/actions/runs/39123395579/artifacts/12135217398): 5 PNG.
- [Aynı ekran görüntülerinin Drive arşivi](https://drive.google.com/file/d/1BqEdAmazQ-9I_5kZMGF1lldV5JHQ0wjV/view): 1.580.318 bayt; klasör: DunaLocal - Ajans Projesi.

## Kayda alınan gerçek sonuçlar

1. Playwright smoke test geçti: **320, 360, 390, 768 ve 1440 px**. Her genişlikte `overflow 0`; EN metin ve mobil davranış kontrolü geçti.
2. Kaynak `dist/` ile eşit; JS söz dizimi, HU/EN toplam 70 karşılıklı çeviri anahtarı, önizleme korumaları, SEO meta, SVG dosyaları, Wrangler dry-run geçti.
3. GitHub-hosted runner gerçek `https://dunalocal.samiayten-hu.workers.dev/` adresinde ana sayfa, CSS, JS, robots.txt için **HTTP 200**; iç doküman yollarında **HTTP 404** gördü.
4. Live Worker testi **'live release matches committed HTML/CSS/JS, noindex, CSP and private-path restrictions'** raporladı.
5. Ekran görüntüleri ayrıca görsel olarak incelendi: 1440 masaüstü, 768 tablet, 390/360/320 mobil tasarımda ana başlık, CTA, diyagram, hizmet kartları, pilot/SSS ve alt bölüm yerleşimi görünür; kırpılma veya büyük boş blok tespit edilmedi.

## Sınırlar / kapanmayan işler

- Testlerin başarıyla geçmesi tam WCAG erişilebilirlik denetimi ya da Macarca native proofreading yapıldığı anlamına gelmez. Kullanıcı deneyimi gerçek müşteri testiyle izlenmelidir.
- Sitedeki `LOCAL/OPS` **geçici marka**; DunaLocal yalnız repo/proje adı. Nihai marka, logo, domain, iletişim ve hesap adları onay bekliyor.
- Site bilerek `noindex`, ticari iletişim kapalı, pilot fiyatı halka açık nihai teklif değil; kamuya açma izni verilmiş sayılmaz.
- GitHub Actions'ta `actions/checkout@v4` ve `actions/upload-artifact@v4` için Node 20 deprecation uyarısı var; şu an başarısızlık yaratmıyor. Gelecek bakımda sürüm kontrolü yapılabilir.

**Sonuç:** Adım 2.3'ün teknik yayın öncesi responsive ve canlı smoke QA'sı kapatıldı. Bir sonraki **Adım 3** marka adının kararlaştırılması ve onaylı adla logo + sosyal profil şablonlarının hazırlanmasıdır; marka adı varsayımla kesinleştirilmeyecek.
