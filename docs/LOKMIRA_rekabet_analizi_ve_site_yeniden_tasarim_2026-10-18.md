# Lokmira — Budapeşte rakip incelemesi ve çok sayfalı site tasarımı

**Araştırma ve uygulama:** 18 Ekim 2026  
**Durum:** Kamuya açık rakip web siteleri incelendi; Lokmira'nın noindex önizlemesi için farklılaştırılmış çok sayfalı konsept hazırlandı. Alan adı, kamusal yayın, marka son onayı, gerçek referanslar, şirket/izin/hukuk çalışmaları bu çalışmanın konusu değil.

## Karşılaştırılan 6 rakip — sitede doğrulanabilen unsurlar

| Rakip ve web adresi | Görülen yapısal unsur | Lokmira için öğrenim / uygulama |
|---|---|---|
| Marketing21 — https://marketing21.hu/ | Ana sayfa yanında çok sayıda PPC, Google Ads, SEO, SMM, web ve analitik hizmet sayfası; ekip üyeleri ve iletişim alanları | Hizmet genel bakışından ayrı dört spesifik servis detayı, tek teklif yerine açık kapsam |
| Premium Studio — https://premiumstudio.hu/ | Güçlü hero, alt hizmet sayfaları, yöntem, iş örnekleri, kişi tanıtımı, fiyat bölümü ve belirgin CTA | Koyu temalı güçlü hero, açık içerik blokları, süreç ve CTA hiyerarşisi; gerçek kişi/deneyim/veri yoksa asla taklit edilmez |
| Growww Digital — https://www.growwwdigital.com/hu/ | Kârlı büyüme konumu, hizmetlere ayrılan dallanma, müşteri logoları ve farklılaştırıcı model açıklaması | Metinler kanala değil müşteri problemine ve ölçüme bağlanmalı; gerçek referans yoksa logolar boş/geçici konulmamalı |
| INTREN — https://intren.hu/ | Hizmet açıklamaları, sektörel bilgi içerikleri/blog, iş ortaklığı ve müşteri kanıtları | Araştırmaya dayalı somut yöntem sayfası ve sonraki aşamada özgün eğitim içerikleri; mevcut aşamada sahte sonuç yok |
| Budapest Marketing — https://budapestmarketing.com/ | Google Ads odaklı dar uzmanlık, net teklif çağrısı ve müşteri geri bildirimleri | Lokmira B2B giriş teklifini keskin tutmalı; ana marka tek sektöre indirgenmemeli |
| Brand Hírnök — https://brandhirnok.hu/en/ | Sahadaki uygulamaları somut yer ve fotoğraflarla açıklama; çevrim içi/saha hizmetini ayrı sunma | Gelecekte gerçekleşmiş projeler için doğrulanabilir iş örnekleri kullanılmalı; bugünkü olmayan vaka çalışmaları uydurulmaz |

Bu araştırma **tasarım/içerik farklarını** inceler; rakiplerin gerçek müşteri sonuçlarının veya satış rakamlarının bağımsız denetimi değildir. Rakip sitelerin görselleri ya da yazıları kopyalanmadı.

## Sorun teşhisi — eski Lokmira sitesi

1. Tek sayfada hizmet, pilot, yöntem ve iletişim bölümleri var ama müşterinin sorularına yanıt verecek yeterli derinlik yoktu.
2. Tek sayfa yapısında her hizmet için ayrıntı, organik arama niyeti, müşteri problemi ve kapsam ayrı sunulamıyordu.
3. Hizmetler yazılı olsa bile `#services` kartlarından ayrı açıklama ve ilgili CTA bulunmuyordu.
4. Hero daha çok iç operasyon konsepti gibiydi; profesyonel ajans güveni oluşturacak güçlü görsel hiyerarşi ve sayfa geçişleri eksikti.
5. İş e-postası, iletişim kanalı ve gerçek referanslar hazır değil. Bunların boşluğunu gerçek dışı sosyal kanıtla doldurmak kabul edilemez.

## Seçilen Lokmira stratejisi

**Konumlandırma:** Budapeşte yerel hizmet şirketleri için arama görünürlüğü + niyet odaklı Google Ads + içerik + talep/teklif geri bildirimi. İlk müşteri araştırması/pilot sektörü PPF/oto koruma; marka tüm sektörlerle sınırlanmadı.

**Estetik:** Premium/düzenli; lacivert `#101820`, koyu yeşil `#236B50`, kontrollü lime `#c0ed72`, kırık beyaz `#f7f8f4`, geniş serif olmayan büyük tipografi, görsel yolculuk diyagramları. Dekoratif grafikte müşteri rakamı veya gerçekmiş gibi gösterilen dashboard yok.

**Güven yolu:** Gerçek referans ve ekip bilgisi henüz hazır değil; bunun yerine yapılabilecek işin kapsamı, çalışma şekli, örnek 90 günlük pilot, raporlama mantığı, risk/garanti sınırları açıklanıyor. Kontak kanalı hazırlık aşamasında ve kullanıcı verisi toplanmıyor.

## Uygulanan site ağacı — root ve 16 yeni sayfa

- `/` — bilingual, dinamik HU/EN premium ana sayfa; 4 hizmet kartı ve yönlendirme; eski GSC meta korunuyor.
- `/hu/szolgaltatasok/` ↔ `/en/services/` — hizmetleri karşılaştır ve 4 ayrı detay sayfasına git.
- `/hu/modszer/` ↔ `/en/approach/` — ilk 90 günün taslak çalışma ve geri bildirim sistemi.
- `/hu/rolunk/` ↔ `/en/about/` — marka ilkeleri ve gerçek durum, kurgusal ekip tanıtımı yok.
- `/hu/kapcsolat/` ↔ `/en/contact/` — neden henüz form/e-posta yok; ilk keşif soruları.
- `/hu/helyi-seo/` ↔ `/en/local-seo/` — GBP / yerel SEO.
- `/hu/google-ads/` ↔ `/en/google-ads/` — Google Ads.
- `/hu/tartalom-video/` ↔ `/en/content-video/` — yaratıcı / AI video.
- `/hu/meres/` ↔ `/en/measurement/` — müşteri talebi / teklif takibi.

Teknik bileşenler: `pages.css`, `pages.js`, `scripts/build.mjs` ve 16 HTML sayfasının kaynak + dist sürümü. `sitemap.xml` sadece gerçek 17 yola genişletildi. `noindex`, `robots.txt` engeli, `X-Robots-Tag`, CSP ve onaysız müşteri verisi toplama yasağı korunuyor.

## QA ve bekleyenler
- CI kaynak ile `dist` dosyalarının eşliğini, tüm 16 locale sayfasının varlığını, tek doğru dil etiketini, sitemap URL'lerini ve güvenlik yönergelerini kontrol eder.
- Tarayıcı testleri root için 320/360/390/768/1440 ve yeni sayfalar için mobil/masaüstü örneklerini kapsar. Canlı Worker tüm yeni URL'leri HTTP 200 ve repo ile eşit olana kadar “tamamlandı” denmemeli.
- Tablet menü taşması başlangıç QA'da keşfedildi; `pages.css` 900px altında açılır menü kullanımına geçirildi. Son QA sonuçları kapanış raporuna ayrıca işlenecek.
- **Önemli açık işler:** Macarca native metin kontrolü; gerçek iletişim kanalı ve e-posta; onaylı marka/logo; gerçek müşteriden kanıt ve fotoğraflar; performans, SEO hreflang/canonical doğrulama; GitHub/Cloudflare teknik rename ve `lokmira.com` DNS; kullanıcının **ayrı ticari lansman onayı**.
- Blog/güncel yazılar ancak gerçek araştırma takvimi olduğunda. Kopya içerikle gereksiz sayfa sayısı büyütülmez.

## Ölçülebilir kabul kriterleri
1. 17 URL planı; 16 ayrı statik sayfa gerçekten erişilebilir.
2. HU/EN sayfa karşılıkları arası dil seçimi ve root navigasyonu çalışır.
3. Noindex/gizli klasör/CSP her sayfada korunur; aktif form, sahte sonuç veya referans yok.
4. Kırık iç link, yatay taşma ve 404 bulunmaz (tarayıcı ve canlı Worker smoke).
5. Macarca edit ve GSC/dns ile ticari yayın **ayrı onayla**.

**Kaynaklar:** [Marketing21](https://marketing21.hu/), [Premium Studio](https://premiumstudio.hu/), [Growww Digital](https://www.growwwdigital.com/hu/), [INTREN](https://intren.hu/), [Budapest Marketing](https://budapestmarketing.com/), [Brand Hírnök](https://brandhirnok.hu/en/).


## SON QA KAPANIŞI — 18.10.2026
**GitHub kod sürümü `7d1dacd76e`:** [Preview quality checks 39148536615](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536615) **success**, [Accessible Preview Audit 39148536605](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536605) **success**, [Live Worker HTTP smoke 39148536611](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536611) **success**, [pages build and deployment 39148536555](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536555) **success**.
Kalite günlüğü: 90 HU/EN i18n anahtarı, kök URL için 320/360/390/768/1440px responsive test, **16 yerelleştirilmiş sayfanın hepsi HTTP 200 / taşma 0**, noindex kontrolleri. İlk incelemede 768px'de 31px taşma tespit edildi, menü 900px altında hamburger yapısına geçince düzeldi. Kontroller otomatik olup estetik insan tasarım onayının yerine geçmez.
