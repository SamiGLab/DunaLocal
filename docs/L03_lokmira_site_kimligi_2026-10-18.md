# Lokmira — L03 ilk site marka uygulaması (18 Ekim 2026)

**Tasarım durumu:** Onaylanmamış üç konsept arasından, bir önceki değerlendirmede en uygun bulunan **Konsept 2 — Focus / Discovery**, **yalnızca mevcut iç önizleme için geçici taslak** olarak kodlandı. Kullanıcı 18 Ekim'de siteye uygulama çalışmalarına başlanmasını onayladı; henüz logo alternatifleri arasından nihai marka sembolünü onaylamadı.

## Kodda yapılan işler
- `brand/focus-mark.svg`: kaynak düzenlenebilir logo işareti (L biçimli lacivert çerçeve + yeşil keşif yayı + odak noktası).
- `brand/focus-app-icon.svg`: koyu zeminli kare sosyal/app ikon görseli.
- `brand/focus-logo.svg`: yatay Lokmira + İngilizce slogan kilidi (editable SVG).
- `brand/favicon.svg`: browser favicon.
- `design/brand-alternatives/concept-1-typographic-mark.svg` ve `concept-3-enquiry-flow-mark.svg`: yayımlanmayan diğer iki konseptin kaynak sembolleri; alternatif olarak korunur.
- `index.html`, `app.js`, `styles.css` ve aynı `dist/` sürümlerinde: üst menüye Lokmira işareti ve adı; hero alanına ikon + geçici marka vaadi; alt bilgiye ikon/isim; HU/EN arayüz marka notu; tarayıcı sekme başlığı ve favicon; mobil uyumlu ek stiller.
- Önizlemede `noindex,nofollow,noarchive`, robots disallow, mevcut CSP, canlı iletişim kapalı, veri toplama ve sahte metrik yok. `LOCAL/OPS` etiketinin web arayüzündeki eski görünümü kaldırıldı; depo/Cloudflare Worker teknik adı `DunaLocal` kalır.
- `scripts/build.mjs` yalnız **dört seçilmiş** `brand/` varlığını `dist/brand/` içine dahil eder; diğer konseptler deploy edilmez.
- `scripts/verify_brand_svgs.py` kaynak/deploy eşitliği, SVG parse ve dış bağımlılık engelini kontrol eder; CI'ya bağlandı. İçerik kontrollerinde Lokmira adı ve favicon zorunlu hale getirildi; canlı worker scripti eski LOCAL/OPS adını aramıyor.

## Konsept karşılaştırması ve kaynak sınırı
Bu SVG'ler yapay zekâ ile oluşturulmuş sunum görsellerinin **düzenlenebilir vektör yeniden çizimidir**. Kaynak PNG'lerin birebir piksel kopyası veya profesyonel tipografi path outline dosyaları değildir. Wordmark SVG'sinde tarayıcı font yedeği (Inter/Arial) kullanılabilir. İleride nihai tasarım seçilince özel metin/harf aralıkları tasarım QA'sı gerektirir.

## Kapsam dışı / bekleyenler
- `lokmira.com` kullanıcı tarafından satın alındı; **DNS, `www`, HTTPS, Cloudflare özel domain, profesyonel e-posta, sosyal hesaplar veya halka açık yayın bağlanmadı**.
- `lokmira.hu` kontrolü kullanıcıda. HU marka/alan adı ve sosyal kullanıcı adı benzerlik doğrulaması tamamlanmadı.
- HU native-proofreading ve tam web teklif metinlerinin Lokmira'ya göre yeniden yazımı henüz ayrı iş.
- Yalnız GitHub commit/CI başarılı olsa bile Cloudflare canlı servis dağıtımı **ayrıca** doğrulanmalı. CI kanıtı sonuçlarına göre durum güncellenir.

## Kabul kriterleri
1. Web kaynak/dağıtım dosyaları eş: `index.html`, `styles.css`, `app.js`, `brand/*`.
2. Browser QA ekran genişlikleri 320, 360, 390, 768, 1440px; yatay taşma 0; HU/EN ve mobil menü.
3. Axe otomatik A/AA regresyon denetimi: HU/EN mobil/masaüstü, 0 doğrulanmış ihlal.
4. Canlı Worker HTML/asset yolları ve noindex/CSP/özel dosya izolasyonu kontrolü.
5. Konsept 2 kullanıcı onayı olmadan final logo sayılmayacak; marka yayını için ayrı izin.

**Bir sonraki karar:** Konsept 2'yi nihai logo kimliği olarak mı kullanacağımız veya 1/3 alternatiflerinden hangisinin değiştirileceği. Ardından onaylı logonun web ve sosyal materyallerini finalize etmek.

[GitHub ana yol haritası](./LOKMIRA_ana_yol_haritasi_2026-10-18.md)
