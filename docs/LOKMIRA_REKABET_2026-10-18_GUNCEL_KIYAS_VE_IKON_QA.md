# Lokmira — 18 Ekim 2026 güncel Budapeşte ajans rakip karşılaştırması ve ikon QA

**Amaç:** Lokmira’nın 17 URL’lik Macarca/İngilizce müşteri edinimi ajansı web önizlemesini, gerçekten faaliyet gösteren pazarlama ajanslarının kamuya açık hizmet, tasarım ve dönüşüm kurgularıyla karşılaştırmak. Bu belge müşteri satın alma kararlarını veya rakiplerin kendi verdiği sonuç rakamlarını bağımsız olarak doğrulamaz. Tarih: 18.10.2026.

## A. İkon çalışması — UYGULANDI, KALİTE DOĞRULANDI

- İkon seçimi: **Lucide 1.59.0**, lokal `icons/` ve `dist/icons/`, **16 adet** SVG, 24×24 `viewBox`, 2px stroke; telif belgesi `icons/LICENSE` (ISC). İkonlar CSS mask ile marka tonuna uyarlanıyor. Harici CDN/script/font gerekmiyor.
- Ana sayfa akış şeması, servis kartları, süreç-rapor kartları ve bağlantılar; alt sayfalarda tüm 16 HU/EN süreç diyagramında simge kullanımı ve uygun içerik kartlarında semboller eklendi.
- Erişilebilirlik: dekoratif ikonlar `aria-hidden`; metinle anlatılan işlem ikona tek başına bağlı değil.
- HTML kaynakları ve `dist/` eş; noindex, CSP, Google doğrulama meta ve 17 URL sitemap korundu.
- **Son onaylanmış aynı commit:** `f8c922a9622b1d3ced2d13173921af768dc39d2c`.
  - [Deployment](https://github.com/SamiGLab/DunaLocal/actions/runs/39155026954): SUCCESS.
  - [Code + mobile + SVG visibility QA](https://github.com/SamiGLab/DunaLocal/actions/runs/39155027067): SUCCESS.
  - [Accessibility](https://github.com/SamiGLab/DunaLocal/actions/runs/39155027167): SUCCESS.
  - [Real Cloudflare Worker HTTP & icon assets](https://github.com/SamiGLab/DunaLocal/actions/runs/39155027069): SUCCESS.
- Preview: https://dunalocal.samiayten-hu.workers.dev/ (still a public-accessible, **noindex** internal preview, not a launched `lokmira.com` site). Final subjective user-design approval is distinct from automated tests.
- The user's correction is binding: **NO AI/video-production service** in Lokmira’s public positioning. Instead: social media management and content planning.

## B. Rakip sitelerin doğrulanmış hizmetleri ve web yaklaşımı

| Rakip | Doğrulanabilir kendi site sunumu | Güven / CTA / tasarım | Lokmira açısından sınıf |
|---|---|---|---|
| **I-Link Marketing** https://ilinkmarketing.hu/ | Google Ads, Google Maps + Cégprofil local SEO, SEO, Facebook/Instagram Ads, conversion-focused landing pages, analytics | 30 dk görüşme, faaliyet/hedef/bütçe seçimli teklif formu, belirtilen 24 saat dönüş | **En doğrudan yerel hizmet KOBİ rakibi** |
| **Ophelius Marketing** https://ophelius-marketing.com/ | Social management, organic content, Google Ads, Maps, technical SEO, branding/web | Çarpıcı tek cümlelik vaat, yerel ve çok dilli konumlandırma, isimli örnek müşteri sonuçları, 24 saat cevap CTA | **Yakın KOBİ/multi-language rakibi** |
| **Premium Studio** https://premiumstudio.hu/ | Google Ads, SEO, Meta, TikTok, web/webshop, brand strategy | Güçlü first fold, ayrı hizmetler, kurucu özgeçmişi, kendi projesi Premium Service, paketler, makaleler, CTA | **Tasarım + satış teklifi örneği** |
| **Marketing21** https://marketing21.hu/ | Google PPC, Meta/TikTok, SEO/GEO, social, web, CRO/analytics, danışmanlık | Çok kapsamlı alt sayfalar, ekip ve isimli müşteri logoları, yazılar, lead generation mesajı | **Kapasite / hizmet derinliği benchmark** |
| **Budapest Marketing** https://budapestmarketing.com/ | Ana vaat yalnız PPC; Google, Facebook/Instagram, TikTok reklamları, ağırlıkla HU webshops | Açık niş pozisyon, isimli müşteri görüşleri, hizmet seçimi + form | **PPC uzmanlık benchmark; tam doğrudan rakip değil (e-ticaret)** |
| **INTREN** https://intren.hu/ | PPC, SEO/GEO, web analytics, CRO, social, web development, strategy | Ücretsiz GA4/SEO/PPC audit çağrıları, çok sayıda özel servis, uzmanlık materyali | **Kurumsal ölçekte lead magnet / eğitim benchmark** |
| **Growww Digital** https://www.growwwdigital.com/services/ | CEE performance marketing, PPC, SEO, shopping, lead scoring, social, content, automation | Çok sayıda isimli yorum, müşteriler, sektör/vaka referansları, özel kurumsal ekip | **Kurumsal vaka çalışması / güven benchmark** |
| **Brand Hírnök** https://brandhirnok.hu/en/ | SEO, Google Ads, social, analytics/web + saha ve etkinlik promosyonları | Gerçek operasyon fotoğrafları, isimli örnekler (Bialetti, ARTDECO), süreç saatleri, açık iletişim | **Gerçek iş görüntüsüyle güven kurma benchmark** |

### Kaynaklara ilişkin kanıt ve ihtiyat
1. I-Link doğrudan site metni: https://ilinkmarketing.hu/ — teklif formundaki butonlar, aylık bütçe seçenekleri ve geri dönüş iddiası görülebiliyor.
2. Ophelius: https://ophelius-marketing.com/ — çok dilli ekip ve müşteri metrikleri **kendi beyanları**, bağımsız performans doğrulaması yapılmadı.
3. Premium: https://premiumstudio.hu/ — site bir kanal Ads yönetimi başlangıcını **40.000 HUF/ay net** olarak gösteriyor (reklam harcaması hariç); web sayfası **200.000 HUF’tan** başlıyor; bunlar bu rakibin ilgili tarihli *ilan ettiği başlangıç fiyatlarıdır*, sektör medyanı veya Lokmira için önerilen fiyat değildir.
4. Marketing21: https://marketing21.hu/ — 20 kişilik ekip, 90+ müşteri, yıllık harcama gibi sayılar ajansın kendi iddialarıdır; karşılaştırmada doğrulanmış bağımsız şirket ölçeği kabul edilmedi.
5. Budapest Marketing: https://budapestmarketing.com/ — birincil hedef Macar webshops ve yalnızca PPC odaklandığını **kendisinin belirttiği konumlandırma**; SEO ve web tasarım işi yaptıkları iddia edilmez.
6. INTREN: https://intren.hu/ — ücretsiz audit CTA ve analytics / PPC / SEO uzmanlık sayfaları.
7. Growww: https://www.growwwdigital.com/services/ , https://www.growwwdigital.com/references/ — referanslar ve yüzdeler kurum beyanıdır.
8. Brand Hírnök: https://brandhirnok.hu/en/ — online & field ayrımı ve özgün vaka fotoğrafları.

## C. Lokmira’nın doğrulanabilen durumu

**Mevcut teslim edilmiş temel:**
- Modern koyu/yeşil görsel kimlik, tutarlı Lucide ikonları.
- 17 URL: `/` + Macarca/İngilizce 8 sayfa çifti. Lokal SEO, Google Ads, sosyal medya/tartalom, talep-teklif takibi; yöntem, hizmet toplu sayfası, hakkında ve iletişim sayfaları.
- Karşılıklı HU/EN inner-page hreflang + canonical; Google meta; çalışan statik Cloudflare önizlemesi, mobil/a11y/HTTP testleri.
- Ziyaretçi problemi → önerilen çalışma adımları → örnek audit → 90 günlük pilot. Numuneler **gerçek müşteri kanıtı değildir**.

**Ticari dönüşümü engelleyen net açıklar (rakiplerin çoğunda mevcut):**
1. **Gerçek işletme iletişim yolu** henüz onaylı/aktif değil; kullanıcı e-posta vermeden tahmini mail/form koyma.
2. **İsimli referans, proje, fotoğraf** yok; üretilemez veya uydurulamaz, yalnız yaşanmış müşteri çalışmaları/izinle.
3. **Net teklif menüsü** hâlâ taslak: Local Presence, Customer Growth, özel Growth Partner — nelerin dahil ve hariç olduğunun kullanıcı tarafından yetkilendirilmesi gerekir.
4. **Müşterinin karşılaşacağı ilk audit çıktısı** örneklenmiş olsa da indirilebilir veya gerçek örnek üzerinden gösterilen saha kanıtı yok. Sadece temsili ve açıkça işaretlenmiş materyal hazırlanabilir.
5. **Native Macarca dil edit / son doğrulama** tamamlanmadı.
6. **`lokmira.com` gerçek domain, GSC ve kamuya açık indeksleme** henüz ayrı onay kapıları. Mevcut Worker bilerek `noindex`.
7. EN homepage root JS dil seçimi aynı URL üzerinde; ayrı indexlenebilir `/hu/` + `/en/` homepage çözümü yayından önce alınacak mimari karar.

## D. Stratejik karşılaştırma

**Rakiplerin avantajları:** gerçek yorum/referans ve ekip; izinli iş görselleri; daha somut paketler/başlangıç fiyatı (Premium); çalışan CTA; geniş bilgi kütüphanesi (Marketing21/INTREN); daha dar ve net teklif pozisyonu (Budapest Marketing). Bu konularda Lokmira henüz zayıf. Süslü ikonlar bu açığı kapatmaz.

**Lokmira’nın ayrışma fırsatı:** geniş kapsamlı büyük ajanslarla “her şeyi biz yapıyoruz” rekabetine girmemek. Yerel hizmet veren KOBİ için **“Google’da bulun → uygun müşteri talebi → teklif → gerçek ticari geri bildirim”** zincirini kolay anlaşılır ve ölçülebilir servis olarak konumlandırmak. Google Cégprofil + yerel SEO tek giriş hizmeti; ihtiyaca göre Search Ads ve sosyal medya desteği; müşteri işine odaklı kısa takip yöntemi. Tüm sektörlere açık, ilk müşteri araştırması PPF.

**Örnek teklifler (taslak, fiyat veya garantili kapsam değil):**
- **Local Presence:** GBP bilgi doğruluğu, ilk local SEO audit, öncelik listesi.
- **Customer Growth:** Local Presence çekirdeği + niyet odaklı Google Search kampanya planı + talep kaynağı takibi.
- **Growth Partner:** Yukarıdakilerin ihtiyaca göre sürdürülen versiyonu + sosyal medya planlama, aylık müşteri-işi geri bildirim özeti.

## E. Öncelik ve tasarım/yayın gate

**P0 — Önce:** kullanıcıdan onaylı iletişim kanalı al ve gerçek mail gönder/al testini yap; Local Presence/Customer Growth için net hedef-kapsam-çıktı tanımı ve tek giriş CTA; doğal Macarca son edit. Bunlar gelmeden form açma / indekslemeyi kaldırma.

**P1 — Sonra:** açıkça *sadece örnek* yerel arama analizi ekranı/şablonu hazırlama; fiyatlandırma karar dosyası; doğrulanmış kullanıcı onayı varsa yeni referans/gerçek proje materyalleri; 2 dilde net HU/EN homepage.

**P2 — İleride:** gerçek işler sonrası sektör mini vaka; sürdürülebilir özgün blog/rehberler; local SEO rakip analizi için içerik sayfaları. Proje farklı girişimlerle birleştirilmez.

### Değişiklik sınırı
Bu turda rekabet araştırması ve ikonların uygulanması yapıldı. Bu sonuçlar üzerinden **ticari sitede onaylanmamış paket/fiyat/form/refarans değişikliği yapılmadı**. Teknik GitHub repo ve Cloudflare Worker adı hâlâ önceki ortam adına referans verebilir; bu, marka adı Lokmira ile karıştırılmamalı.
