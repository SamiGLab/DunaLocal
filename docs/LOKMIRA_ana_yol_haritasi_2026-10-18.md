# LOKMIRA — Ana proje yol haritası ve teslimat kapıları
**Sürüm:** V1 — 18 Ekim 2026  
**Proje:** Budapeşte / Macaristan odaklı butik dijital pazarlama ajansı  
**Marka:** **Lokmira**, kullanıcının seçtiği planlama adı. **Kullanıcı 18 Ekim 2026'da `lokmira.com` alan adını satın aldığını bildirdi.** Bu beyan kullanıcı kaydıdır; registrar/hesap DNS yetkisi bağımsız doğrulanmadı. Marka hakkı temizliği ve halka açık lansman onayı hâlâ bekliyor.
**Mevcut teknik referans:** `SamiGLab/DunaLocal` GitHub deposu, Cloudflare `dunalocal.samiayten-hu.workers.dev` **noindex iç önizleme**. Bunlar geçmişin teknik kimliğidir; yeni ticari marka değildir.

## Değişmeyen çalışma kuralları
1. **Her seferinde tek adım:** işi bitir, testi/kanıtı göster, GitHub **ve** Drive'a kaydet, sonra sonraki adıma geçmek için kullanıcı onayı iste.
2. GitHub: kaynak kod, vektör tasarımlar, teknik belgeler, değişiklik geçmişi. Google Drive: güncel ana plan, onaylı marka dosyaları, editoryal ve pazarlama taslakları, QA ekleri. Önemli teslimatlarda aynı çalışma iki tarafta izlenebilir olmalı.
3. **Şirket kurma, muhasebe, vergi, faaliyet kodları, izinler, hukuk ve sözleşmeler KAPSAM DIŞI** (T001/T002/T003/T004/T006 kullanıcı tarafından iptal edildi). Site için kullanıcıdan gelen onaylı metni teknik yerleştirmek kapsam içidir.
4. **Gerçek müşteri olmadan başarı verisi, referans, vaka çalışması, satış veya sonuç garantisi uydurma.**
5. Site mevcut güvenli iç önizlemede kalacak: `noindex`, kapalı gerçek iletişim/form, taslak pilot fiyatı. Açık ticari yayın için **ayrı son onay** gerekecek.
6. İlk satış testi PPF/detailing işletmeleri; **Lokmira markası otomotivle sınırlı değil**. Macarca yazılı iletişim, İngilizce görüşme esas.

## Doğrulanmış temel işler (yeniden yapılmayacak)
| Kod | Gerçek durum | Kanıt |
|---|---|---|
| BASE-01 | HU/EN web iç önizlemesi mevcut; halk için son marka versiyonu **değil** | [index.html](../index.html) |
| BASE-02 | V1 lacivert/kırık beyaz/yeşil CSS kaynak ve dist sürümleri düzenlendi | [styles.css](../styles.css) |
| BASE-03 | 320/360/390/768/1440px browser smoke, canlı Worker smoke ve HU/EN otomatik WCAG denetimleri önceki sürümlerde geçti | [QA raporu](./adim-2-3-dogrulanmis-qa_2026-10-18.md) |
| BASE-04 | Üç HU/EN sosyal gönderi taslağı ve üç SVG görsel var; yayımlanmadı | [social/launch-kit](../social/launch-kit.md) |
| BASE-05 | 10 kaynaklı PPF mini denetim taslağı mevcut; gerçek 10 nitelikli müşteri değil | [T013](./T013_ilk_10_PPF_web_audit_kaynakli_2026-10-18.md) |
| BASE-06 | 40 işletme / 32 faaliyet eşleşmesi / 8 bekleyen bilgisi önceki Codex kaydından; **güncel ana Excel bu oturumda erişilebilir değil** | [operasyon kaydı](./operasyon-oncelikleri_2026-10-18.md) |

## Yeni, onay kapılı yürütme sırası

| Sıra | İş paketi | Durum | Tamamlanma ölçütü | Bağımlılık / kullanıcı işi |
|---|---|---|---|---|
| **L00** | **Lokmira kararıyla yol haritasını eşitle** | **TAMAMLANDI — plan kaydı** | Bu belge GitHub'da, eş ana yol haritası Drive'da; eski Duna isimlerinin güncel marka olmadığının belirtilmesi | Yok |
| **L01** | **Lokmira marka tasarım taslakları** | **SIRADAKİ / ONAY BEKLİYOR** | 2–3 logo yönü; yatay/dikey/kare SVG, mono ve açık/koyu örnekleri; favicon taslağı; tipografi ve renk kuralları; Drive'da karar seti | Taslak yapılabilir; tescil/alan adı riski devam eder; hiçbir final görsel yayımlanmaz |
| **L02** | **Marka uygunluğu ve alan adı durumunu kapat** | **BEKLİYOR** | `lokmira.hu` için kullanıcıdan resmî kayıt sonucu; `lokmira.com` kullanıcı satın alma beyanı kayda geçti; registrar/DNS erişimi henüz teyit edilmedi; temel mevcut marka benzerliği/handle kontrolünün açık raporu; kullanıcının final marka onayı | **Kullanıcı .hu'ya bakacak.** Hukuki tescil/işletme işleri alınmaz |
| **L03** | **Lokmira web iç önizleme kimliği** | **İÇ ÖNİZLEMEYE UYGULANDI — QA VE CANLI WORKER SMOKE GEÇTİ** | `LOCAL/OPS` yalnız **iç önizlemede** Lokmira taslağına dönüştürülür; favicon, OG görsel, erişilebilir navbar, footer ve HU/EN meta; kaynak+`dist/` eş; CI geçer; `noindex` korunur | L01 tasarım onayı; marka teyidi gelmeden ticari açılış yok |
| **L04** | **HU/EN teklif ve site mesajlarının revizyonu** | **SİTE İÇERİK TASLAĞI TAMAM — HU NATIVE DÜZELTME BEKLİYOR** | Yerel görünürlük, Google Ads, içerik/AI video, talep takibi ve `Search → Enquiry → Quote → Job` net sunulur; 90 günlük pilot kapsamı ölçülebilir; Macarca native proofreading için düzeltilebilir kopya hazırlanır | L01; native kontrol yapılmadan dışa yayın yok |
| **L05** | **Sosyal kimlik ve ilk 6 içerik paketi** | **BEKLİYOR** | LinkedIn/Facebook kapak-avatar, Instagram avatar; 3 eski post ve üç SVG yeniden kullanılarak toplam 6 gerçek post metni/görseli; HU/EN düzeltme notları ve ölçümler; kaynak+Drive kopyaları | L01/L04; hesap açma ve paylaşma ayrı onay |
| **L06** | **Müşteri havuzunu eşitle ve niteliklendir** | **DOSYA BEKLİYOR** | Son 40 kayıtlı **ana** çalışma kitabı bulunur; 8 bekleyenin kaynakları doğrulanır; 10 mini denetim doğru kayıtla eşleşir; duplicate/iletişim bilgileri ayrıştırılır; hiçbir veri uydurulmaz | Güncel Excel dosyasının doğrulanabilir kopyası; v9 üzerine yazma |
| **L07** | **Satış paketi ve ilk yazılı erişim** | **BEKLİYOR** | İyi bir ilk e-posta/mesaj HU; İngilizce görüşme gündemi, keşif soruları, 1 sayfa teklif/pilot; ilk 10 müşteri için kanıta dayalı kişiselleştirme | L04/L06; gönderim için **ayrı kullanıcı onayı** |
| **L08** | **Gerçek profesyonel e-posta ve alan adı bağlantısı** | **ALAN ADI SATIN ALINDI / BAĞLANTI BEKLİYOR** | Kullanıcının satın aldığı domain ve seçtiği mail sağlayıcısı için doğrulanmış DNS, `www`, `MX/SPF/DKIM/DMARC`; gelen e-posta testi; iki dilin URL şeması net | Kullanıcı `lokmira.com` alan adını aldığını bildirdi; registrar/DNS erişimi, mail sağlayıcısı ve uygulama onayı gerekir |
| **L09** | **Ticari yayına hazırlık** | **BEKLİYOR** | Son onaylı marka/iletişim; HU native metin kontrolü; gerçek ürün/hizmet bilgisi; tüm bağlantılar; mobil + a11y; `/hu/` ve `/en/` SEO; Google Search Console/analytics ihtiyacının değerlendirilmesi; kullanıcıdan gelen yayın metinlerinin teknik entegrasyonu | L02–L08; yayın sonrası otomatik veri toplama önceden açılmaz |
| **L10** | **Halka açık yayını ayrı onayla** | **YAYIN İZNİ YOK** | Açık kullanıcı onayıyla alan adı yayını; `noindex` sadece doğru production ortamından kaldırılır; yönlendirmeler/HTTPS/kanonikler ve smoke test kanıtlanır | L09 + **açık yayın onayı** |
| **L11** | **İlk müşteri deneyi ve değerlendirme** | **GERÇEK SONUÇ BEKLİYOR** | İzinli erişimler, gerçek keşif görüşmeleri, teklif ve pilot sonucu kaynakla kaydedilir; reklam tıklaması ve müşteriye dönüşüm ayrılır; Go/No-Go kararı gerçek veriyle verilir | L06–L10; müşteri iletişim kararı kullanıcıda |

## Kritik blokajlar
- **18 Ekim 2026:** Kullanıcı **`lokmira.com` satın aldığını bildirdi**. Satın alma kullanıcı beyanıyla güncellendi; DNS/registrar hesabı yetkisi ve teknik yönlendirme henüz doğrulanmadı. `lokmira.hu` kullanıcı tarafından kontrol edilecek; zorunlu değil.
- Marka benzerliği ve sosyal medya kullanıcı adlarının kesin uygunluğu **doğrulanmadı**; brand concept çalışmalarına engel değil, **yayına engel**.
- Nihai Macarca editör kontrolü yok.
- Gerçek iş e-postası yok.
- 40 adaylı güncel Excel hâlâ erişilebilir değil; 30'luk eski listeyle üzerine yazma yok.
- Gerçek müşteri görüşmesi, tahsil edilmiş pilot veya yayımlanmış sosyal profil/ilan kanıtı yok.

## Lokmira görsel sistem — **taslak** brif
- Renkler: lacivert `#101820`, kırık beyaz `#F6F7F4`, koyu yeşil `#236B50`; parlak lime `#B8E65B` yalnız kontrollü yüksek kontrastlı alanlarda.
- Yazı karakteri: net, çağdaş sans serif. Inter mevcut; Manrope alternatifi, zorunlu yükleme yok.
- Konseptler: (A) tipografik lokmira wordmark; (B) yerel keşif/odak çizgisiyle geometri; (C) arama-talep-akış yapısını simgeleyen soyut düğüm. Genel harita pini klişesi veya gerçek olmayan dashboard istatistikleri kullanılmaz.
- İngilizce çalışma mesajı: `Local visibility. Measurable enquiries.`; Macarca metin native inceleme bekler.
- Dış yayın, domain bağlama, marka/firma tescili, sosyal hesap oluşturma ve müşteri teması bu brifle onaylanmış sayılmaz.

## Sonraki kullanıcı onayı
**Bir sonraki TEK iş:** L01 — Lokmira logo ve görsel kimlik taslaklarını oluşturmak. Tamamlandığında GitHub'da düzenlenebilir SVG kaynakları, Drive'da tasarım karar seti ve gözle görülür örneklerle raporlayıp L02 için ayrıca onay istenecek.

## İlişkili belgeler
- [Eski görev ID'leri ve iptaller](./operasyon-oncelikleri_2026-10-18.md)
- [Marka adı araştırması](./T015_marka-ismi_karsilastirma_2026-10-18.md)
- [Lokmira domain stratejisi](./T015_lokmira_domain_stratejisi_2026-10-18.md)
- [Teknik yayın kapıları](./launch-gates-and-status.md)
- [Teknik kalite kanıtları](./adim-2-3-dogrulanmis-qa_2026-10-18.md)


### 18.10.2026 — L03 teknik kapanış
Konsept 2 (Focus / Discovery), kullanıcıdan **nihai logo onayı alınmaksızın** geçici olarak noindex site önizlemesine uygulandı. GitHub [L03 raporu](./L03_lokmira_site_kimligi_2026-10-18.md), [başarılı CI](https://github.com/SamiGLab/DunaLocal/actions/runs/39140780014), [erişilebilirlik](https://github.com/SamiGLab/DunaLocal/actions/runs/39140780006) ve [canlı Worker smoke](https://github.com/SamiGLab/DunaLocal/actions/runs/39140780030) testleri kaynaklıdır. `lokmira.com` domain bağlantısı ve kamuya yayına çıkış **yapılmadı**. Sonraki tek kullanıcı kararı: logo konseptini kesinleştirmek, ardından site/sosyal materyallerde final sürümü uygulamak.


### 18.10.2026 — L04 site kapsamı düzeltildi (alan adı hariç)
Lokmira ana marka mesajı tüm Budapeşte yerel hizmet işletmelerine genişletildi. PPF yalnızca **ilk 90 günlük pilotun** örnek sektörü olarak ayrıldı. `#services` bölümünde Google Cégprofil & local SEO, Google Ads, AI destekli içerik/video, talep-teklif takibi HU/EN olarak sunuluyor. Pilot başlığının dil değişince kaybolan satır kesmesi düzeltildi. Kaynak ve `dist` eşitlendi. [L04 kaynak ve QA raporu](./L04_lokmira_HU_EN_hizmet_metni_2026-10-18.md). HU native edit hâlâ açık; halka açık indeksleme ve iletişim kanalı kapalı. `lokmira.com` domain/dns çalışması kullanıcı tarafından ayrıca yürütülüyor. Bir sonraki domain dışı iş L05 sosyal medya kimlik ve ilk 6 gönderi seti; logo seçim onayı nihai materyaller öncesinde gerekecek.


### 18.10.2026 — SITE V2: rekabet incelemesinden sonra çok sayfalı premium önizleme
**Gerçek teslimat:** 6 Budapeşte ajansının web sayfası örüntüleri araştırıldı; [ayrıntılı benchmark ve geliştirme raporu](./LOKMIRA_rekabet_analizi_ve_site_yeniden_tasarim_2026-10-18.md) yazıldı. Lokmira iç önizlemesinin ana sayfası modernize edildi; **8 HU + 8 EN = 16** ayrı içerik sayfası ile **17 URL** oluşturuldu. Dört ana hizmetin her biri HU/EN detay sayfasına sahip. İşleyiş, konumlandırma ve temas durumu ayrıca sunuluyor. `pages.css`, `pages.js`, kaynak/dist, sitemap, CI ve canlı HTTP kontrolleri eşitlendi. Eski 404 adı Lokmira yapıldı.
**Son QA kanıtı:** [kod ve tarayıcı](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536615) PASS; [a11y](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536605) PASS; [canlı Worker 16 sayfa](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536611) PASS; [Cloudflare deploy](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536555) PASS. Root 320/360/390/768/1440 px, alt sayfalarda mobil / masaüstü, noindex korunuyor. İlk QA'daki 768 px menü taşması düzeltildi.
**Açık kritik eksikler:** native Macarca edit, nihai logo kararı, gerçek iletişim e-postası/form çözümü, gerçek güven kanıtı/referanslar, iki dil SEO canonical/hreflang yayın kapısı, domain & GSC ve ticari lansman izni. Site *müşteriye teklif almaya hazır prodüksiyon site* olarak kabul edilmez; hâlâ erişilebilir noindex önizleme.
