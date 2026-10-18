# Lokmira L04 — HU/EN hizmet ve pilot içerik revizyonu

**Tarih:** 2026-10-18  
**Alan adı çalışması:** Kullanıcı tarafından yürütülüyor; bu değişiklikler `lokmira.com` DNS veya GitHub/Cloudflare adını değiştirmez.  
**Yayın statüsü:** Cloudflare'da `noindex` dahili önizleme, iletişim/form kapalı; kamuya açılma ve satış iddiası yok.

## Düzeltilen problem
Önceki sitenin ana sayfası yalnızca Budapeşte'deki premium PPF/araç koruma atölyelerini hedefliyor gibi görünüyordu. Oysa Lokmira sektör bağımsız dijital pazarlama ajansı, **PPF/detailing ilk saha pilotu**. Marka pozisyonu ve pilot kapsamı ayrıştırıldı.

## Yapılan işler
1. HU/EN hero başlığı ve gövde metni tüm Budapeşte **yerel hizmet işletmelerine** uyarlandı; ölçülebilir talep ve görünürlük mesajı verildi, garanti vaat edilmedi.
2. Üst menüye **Szolgáltatások / Services** eklendi. Yeni `#services` bölümü 4 faaliyet alanını anlaşılır ve ayrık şekilde tanıtıyor:
   - Google Cégprofil / Google Business Profile ve local SEO,
   - Google Ads (reklam harcaması ayrı),
   - İçerik ve **AI destekli video** (ürün iddiaları insan tarafından kontrol edilecek),
   - Arama, talep ve teklif takip süreci.
3. Hizmetlerin tamamının otomatik olarak **90 günlük pilot kapsamına girmediği** açıklandı.
4. Pilotun başlangıç sektörü **PPF/otomotiv koruma** olarak muhafaza edildi; pilot ücretleri ve başlangıç koşullarının taslak olduğu vurgulandı.
5. Sadece PPF'ye hitap eden genel site ifadeleri genişletildi; yanıltıcı referans, sonuç istatistiği veya müşteri sayısı eklenmedi.
6. HU/EN sayfa açıklamaları ve Open Graph açıklamaları sektör bağımsız site stratejisiyle eşitlendi.
7. `pilotTitle` çeviri işlemi HTML'deki `<br>` satır kesmesini siliyordu; `pilotTitleA` / `pilotTitleB` olarak bölünerek düzeltildi.
8. Responsive 4-kart grid ve 320–1440 px mobil tarayıcı kontrollerine `#services` / EN çeviri doğrulaması eklendi.
9. Düzenlenen `index.html`, `app.js`, `styles.css` ve aynı `dist/` karşılıkları GitHub ana dalına yazıldı.

## Kalite kapıları
- HU/EN çeviri anahtarlarının tamamı `scripts/verify.mjs` ile kontrol edilir.
- Gerçek tarayıcı QA: 320/360/390/768/1440 genişliklerinde yatay taşma; EN metin; mobil menü.
- Otomatik axe erişilebilirlik regresyonu; GitHub Actions.
- Kaynak/`dist` uyumu; canlı Worker'daki HTML/CSS/JS birebir uyumu; `noindex`, CSP ve kapalı özel klasörler.
- **Macarca native proofreading henüz yapılmadı:** özellikle Google Cégprofil, marketing, pilot ve sektör terminolojisi insanca gözden geçirilecek.
- Site hâlâ açık bağlantıyla ziyaret edilebilen, fakat arama motorlarına kapalı taslak önizlemedir. Ticari yayıma çıkarılmadı.

## Bir sonraki işin statüsü
- **L04 teknik ve içerik taslak revizyonu:** kod tamamlandı, CI ve canlı smoke başarılı; **Macarca native proofreading ayrıca açık**.
- **L05**: Lokmira sosyal profil tasarımları ile 6 HU/EN açılış gönderisi; mevcut 3 taslak yeniden kullanılmalı.
- **L06**: mevcut 40 adaylı ana müşteri tablosu olmadan eski veya eksik liste üzerinden yeni veri dosyası açılmamalı.
- **L08**: domain ve e-posta bağlantısı kullanıcıyla ayrı sürüyor. **Firma/vergi/hukuk/muhasebe işleri kapsam dışı.**

[Lokmira ana yol haritası](./LOKMIRA_ana_yol_haritasi_2026-10-18.md)

## Gerçek test kanıtları

- [GitHub Preview quality checks 39144476772](https://github.com/SamiGLab/DunaLocal/actions/runs/39144476772): **başarılı**. Statik kontrol **85 HU/EN çeviri anahtarı**, kaynak / dist eşitliği, dört marka SVG dosyası ve tarayıcı QA: **320, 360, 390, 768, 1440 px; yatay taşma 0**, mobil menü, EN servis adları.
- [Accessible Preview Audit 39144476682](https://github.com/SamiGLab/DunaLocal/actions/runs/39144476682): **başarılı**. `390 px HU`, `390 px EN`, `1440 px HU`, `1440 px EN` için her senaryoda **24 geçen kural, 0 otomatik WCAG A/AA ihlali, 0 JS hatası**. Bu sonuç manuel tam WCAG denetimi değildir.
- [Live Worker HTTP smoke 39144476648](https://github.com/SamiGLab/DunaLocal/actions/runs/39144476648): **başarılı**. Gerçek Cloudflare Worker'da HTML/CSS/JS repo ile birebir eşleşti; dört marka vektörü HTTP 200 / eş sürüm; noindex, CSP ve özel dosya yollarının kapalı kalması doğrulandı.
- Yardımcı `scripts/check-live.sh` içinde iç içe `brand/` varlıklarını geçici dizine kaydederken `curl` hata kodu 23 üreten **geçici dosya ismi sorunu** bulundu; `0430d4b4` commit'inde `safe="${name//\\//_}"` yaklaşımıyla düzeltildi. Bu yardımcı adım CI'da `continue-on-error` statüsünde olduğundan önceki **ana** CI'nın başarılı olması bu ek hatanın olmadığını kanıtlamaz. Düzeltme için son CI yeniden kontrol edilmelidir.

**İçerik editör kopyası (Drive):** https://docs.google.com/document/d/1NNU-5ph9cd6jpepdcwEKHeYv9umDombStPhNW3KRZl8/edit

**Kapsam sınırı:** Firma, vergi, muhasebe, hukuki işlemler ve domain/DNS çalışmaları bu L04 kapanışının konusu değildir.
