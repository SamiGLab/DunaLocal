# Lokmira V4 — Kurumsal Site, Menü/Buton Tutarlılığı ve Yayın Hazırlığı

**Tarih:** 18 Ekim 2026
**Son kod commit:** `f2310e76189efb2c7e40f6964c84440c915abeaa`
**Canlı önizleme:** https://dunalocal.samiayten-hu.workers.dev/
**Hedef alan adı:** https://lokmira.com/ (bağlantı ve indeksleme ayrıca doğrulanmalı)

## Kullanıcı talebi ve sınır
Sitedeki *BELSŐ ELŐNÉZET / INTERNAL PREVIEW / Draft* bantları ve kullanıcıya taslak gibi görünen kurumsal sayfa metinleri temizlendi. Lokmira kamuya açık marka iletişiminde **yerel müşteri kazanımı** sunar. Core: Google Cégprofil / local SEO, Google Ads, sosyal medya yönetimi ve içerik planlaması, müşteri talebi/teklif izleme. AI-video üretimi, diğer kullanıcının işletmeleri ve "sadece PPF" marka konumu yasaktır.

**Önemli ayrım:** "Site taslak görünmesin" isteği editoryal ve UI tasarımı için yerine getirildi. `lokmira.com` alan adının Cloudflare custom domain üzerinde gerçekten hizmet verdiği doğrulanamadı. Yanlış workers.dev adresinin indekslenmesini önlemek için `robots.txt Disallow: /`, HTML `noindex,nofollow,noarchive` ve Cloudflare `X-Robots-Tag` bu yayında korunuyor. Çalışan ve kullanıcının doğruladığı kurumsal e-posta / telefon henüz bilinmediği için sahte iletişim kanalı veya çalışmayan form eklenmedi. Bu nedenle **alan adı + arama motoru üretim lansmanı tamamlandı** denemez.

## Tamamlanan UI/UX
- Root + 16 HU/EN ayrı sayfadan görünür eski "iç önizleme/draft" şeritleri ve marka taslak ibareleri silindi.
- Üç hizmet yolu için Macarca/İngilizce gerçek okunabilir ana sayfa bölümü eklendi:
  - `Local Presence` — Google Business Profile, local SEO ve iyileştirme öncelikleri
  - `Customer Growth` — Google Ads, enquiries ve quotes
  - `Growth Partner` — ihtiyaca göre arama, reklam ve sosyal medya planlaması
  - Bunlar fiyat/garanti/standart sözleşme iddiası değil; tam iş kapsamı ve ücret ayrıca belirlenir.
- 90 günlük uygulama örneği ana sayfada genel hizmet işletmelerine uygun hale geldi; ilk araştırılan PPF sektörü artık markanın ana sayfa uzmanlığı gibi sunulmuyor.
- Sadece "Kapalı / Draft" etiketi veren ana sayfa iletişim alanı yerine gerçek, çalışan `/hu/kapcsolat/` veya `/en/contact/` sayfasına giden CTA kondu. Dil değiştirilince parent translation tarafından CTA'nın silindiği somut hata tespit edildi ve düzeltildi.
- İletişim sayfasındaki kendine yönlenen ikinci buton servis listesine çevrildi. Mobil menülerde Escape ile kapanma eklendi.
- Tüm ürün/hizmet butonları gerçek yolları gösteriyor; link ve fragment denetimleri CI'da sürüyor.
- Yeni UI tasarım tokenları:
  - Header desktop 76px, mobile/tablet 70px
  - Navigation font 13px, hedef alan en az 44px
  - CTA: navigasyon min 44px, ana buton 50px
  - Breakpoint: 900px ve altı aynı hamburger menü
  - Aynı renk, border-radius, active/focus ve ikon davranışı `pages.css` ile tüm sayfalarda
  - `/?lang=en` English root linkine özel HU/EN query desteği; root URL'nin EN ayrı indekslenebilir alternatif olmadığını unutma.

## Test kanıtları — son kodun tamamı başarılı
- [Cloudflare deployment 39159127732](https://github.com/SamiGLab/DunaLocal/actions/runs/39159127732) — SUCCESS.
- [Preview quality, Playwright + Node CI 39159127793](https://github.com/SamiGLab/DunaLocal/actions/runs/39159127793) — SUCCESS.
- [Accessible Preview Audit 39159127803](https://github.com/SamiGLab/DunaLocal/actions/runs/39159127803) — SUCCESS.
- [Live Worker HTTP smoke 39159127806](https://github.com/SamiGLab/DunaLocal/actions/runs/39159127806) — SUCCESS.

Tarayıcı günlüğü: HU/EN root testi 320, 360, 390, 768, 900, 1024, 1440 px genişliklerde geçiyor. Root ve iç sayfa header yüksekliği, aynı 4 nav bağlantısının sırası/yazı boyutları ve buton genişlik-yükseklik farkı (≤3px), tıklama alanları ve menü görünürlüğü test ediliyor. Ayrıca **8 HU + 8 EN alt sayfanın her biri** için 390px mobil ve 1440px masaüstü nav eşitliği karşılaştırması PASS. Tüm 16 alt sayfa HTTP 200, yatay taşma 0. Otomatik WCAG denetimi SUCCESS; bu durum bağımsız manuel tasarım/onay ve native Hungarian edit gereksinimini ortadan kaldırmaz.

## Açık kalan yayın kapıları
1. `lokmira.com` özel alan adı bağlantısının gerçekten HTTPS yanıtı, canonical ve doğru Worker hostunu servis ettiğini doğrulama.
2. Kullanıcının çalışan ve kullanılmasını onayladığı kurumsal iletişim e-postası/telefonu. Bu olmadan aktif iletişim formu/talep toplama açılmamalı.
3. Google Search Console'da gerçek mülk doğrulaması ve uygun indeksleme/onay sonrası robots/noindex kaldırma.
4. Native Macarca hizmet ve satış metni editör kontrolü.
5. Onaylı final logo ve gerçek proje/referans kanıtları (sahte başarı rakamı/testimonial kesinlikle yok).
6. HU/EN bağımsız ana sayfa URL'leri/kök EN SEO mimarisi gelecekteki public index kapsamına eklenmeden önce karara bağlanmalı.
7. GitHub ve Cloudflare teknik `DunaLocal` adlarının `Lokmira` olarak hesap düzeyinde yeniden adlandırılması ayrıca doğrulanmalı.

**İlgili dosyalar:** `index.html`, `app.js`, `pages.css`, `pages.js`, `hu/*/index.html`, `en/*/index.html`, `dist/`, `scripts/browser-smoke.mjs`, `scripts/verify.mjs`, `scripts/live-smoke.mjs`.
