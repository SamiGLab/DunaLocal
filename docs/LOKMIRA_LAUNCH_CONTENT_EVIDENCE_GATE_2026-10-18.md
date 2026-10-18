# Lokmira — Müşteri güveni, iletişim ve son yayın hazırlığı

**18 Ekim 2026 · Kullanıcıya sunulacak bilgi toplama ve yayına hazırlık kontrolü**  
Bu belge bir sözleşme, muhasebe, vergi, izin veya hukuki danışmanlık belgesi **değildir**. Yalnızca web ve içerik üretimi için doğrulanabilir kaynak envanteridir.

## A. Tamamlanmış site çalışmaları
- Rakiplerden çıkarılan yapısal dersler V3 arayüze uygulandı; 18 sayfa (`/` HU ana sayfa + `/en/` EN ana sayfa + 8 Macarca + 8 İngilizce alt sayfa).
- Dört ayrı hizmetin her birinde, anlaşmanın kesin hizmet kapsamı sanılmayacak şekilde etiketlenmiş **örnek çalışma çıktıları** eklendi.
- Tüm 18 sayfada (`/` ↔ `/en/` ana sayfa çifti ve 16 alt sayfa çiftinde) Google Search Central tavsiyelerine uygun **self-canonical** ve **karşılıklı `hreflang` bağlantıları** var; açıklayıcı title, OG locale/URL ve marka alanları güçlendirildi.
- `scripts/build.mjs` üzerinden `/en/index.html` sunucu taraflı İngilizce ana sayfası `index.html` + `app.js` kaynağından otomatik üretilir hale getirildi; 16 alt sayfanın ortak footer ve marka bağlantıları tek şablondan senkronize edildi.
- Site içi bağlantı ve fragment kontrolü; `_config.yml` GitHub Pages dahili klasör izolasyonu; aktif olmayan e-posta/gizli iletişim kontrolü; içerik sayfalarında mobil ve masaüstü erişilebilirlik kontrolü CI'ya eklendi.
- `noindex`, `robots.txt Disallow: /`, GSC meta, CSP, özel klasör kısıtları ve form/analytics yokluğu korundu.

## B. Doğrulama bekleyen somut kullanıcı girdileri

| Alan | Gereken doğrulanmış kaynak | Siteye uygulanacak değişiklik | Yayın kuralı |
|---|---|---|---|
| Logo / görsel kimlik | Focus / Discovery Konsept 2 son seçimi ve PNG favicon gerekliyse özgün export | Logo, favicon, OG, sosyal profil görsellerinin tutarlı final sürümleri | Onay olmadan “final” yazma |
| Kurumsal e-posta | Kullanıcının gerçek, hem gönderip hem alan aktif kutusu ve tercih ettiği görünür adres | HU/EN iletişim sayfasında gerçek `mailto:` ve net keşif daveti | Tahminî `info@`, `hello@` kullanma; posta kutusunu test et |
| İş örnekleri | Müşteri/proje izinleri ve gerçek ekran görüntüsü/metrik kaynağı | Hakkımızda ve iş örneği / vaka çalışması sayfaları | İzin/veri yoksa test sonucu ya da yıldız/yorum ekleme |
| 90 günlük pilot | Kullanıcının gerçekten sunacağı kapsam, çıktılar ve süreç sorumlusu | Hizmet açıklamaları, yöntem ve pilot teklif CTA | Taslağı bağlayıcı teklif veya garanti diye gösterme |
| HU dil kalitesi | Macarca ana dili olan editörün onaylı metin düzeltmeleri | Kök dahil 9 HU sayfanın son yazım, doğal üslup ve terminoloji düzeni | Otomatik model denetimi “native onay” sayılmaz |
| Domain + SEO yayın | `https://lokmira.com/` üzerinde canlı HTTP/HTTPS ve GSC mülk doğrulaması | Gerekli yönlendirmeler, canonical/hreflang yayına alma, Search Console sitemap | Ayrı kullanıcı ticari yayına çıkış ve indeksleme onayı |

## C. Referans yayımlamadan önce gerçek veri kontrol şablonu

**Müşteri / proje adı:** yalnız müşteri bu adın kullanımına izin veriyorsa.  
**Yer / sektör:** gerekliyse genel ve kimliksiz.  
**Karşılaşılan sorun:** müşteriyle doğrulanmış asıl başlangıç durumu.  
**Dönem:** raporlanan başlangıç ve sonuç tarihleri.  
**Yapılan işlem:** gerçekten uygulanan reklam, Cégprofil, içerik veya takip işi.  
**Ölçüt tanımı:** tıklama, form, arama, mesaj, teklif ve satış birbirinden ayrılmalı.  
**Kaynak:** doğrulanabilir ölçüm ekranı / izinli gerçek çıktı; ekran görüntülerindeki özel müşteri bilgileri karartılmalı.  
**Sınırlılık:** mevsimsellik, atribüsyon belirsizliği, paralel kampanyalar ve müşteri kapasitesi.  
**Alıntı/testimonial:** müşteri tarafından yazılı olarak gerçekten sağlanmışsa.  
**Onay durumu:** izin verilmediyse yalnız anonim ve doğrulanan genel öğrenim kullanılır, gerçekmiş gibi müşteri logosu konmaz.

Hiç müşteri verisi yoksa bu şablon **internette portföy olarak yayımlanmaz**. Örnek audit kartları zaten açıkça illüstratif olarak işaretlidir.

## D. Macarca edit için odak noktaları

- Yerleşik Google marka kullanımı: **Google Cégprofil**, **Google Ads** ve `helyi keresés`; Google Macarca yardım dokümanı `Cégprofil` terimini kullanır.
- `érdeklődés`, `megkeresés`, `ajánlatkérés`, `ajánlat` ve `megrendelés` farklı aşamalar; aynı anlamda gelişigüzel kullanılmaz.
- `AI-támogatott` gösterimler ve servis koşulları yanıltıcı sonuç garantisi içermemeli.
- `pilot` / `próbaprogram` için hedef kitlenin anlayacağı nihai yerel ifade editörce seçilmeli.
- HU fiyat, form, şirket adresi, yetkinlik veya gerçek müşteri sonucu **tahmin edilmemeli**.
- Önizleme uyarısı metinleri İngilizce ve Macarca birbirini karşılamalı.

## E. Teknik SEO yayına çıkış kapısı
- Şu an 16 alt sayfa çiftinde hreflang karşılıklılığı kurulmuş durumda. `/` sadece Macarca server-rendered kök; İngilizce JS seçimi tek URL üzerinde değişiyor. SEO için ayrı ve gerçek `/en/` + muadili HU ana sayfa mimarisi tasarlanmalı. Bu mimari kurulmadan `/en/` gibi URL'leri sitemap veya hreflang'a ekleme.
- Gerçek domain üzerinde HTTPS, www yönlendirmeleri, gerçek title, canonical, hreflang, OG paylaşım görseli, sitemap, HTML dil bilgisi ve mobil testler birlikte doğrulanır.
- Robots Disallow ile noindex yönergeleri şu an **bilerek aktif**: Search Console doğrulaması otomatik indeksleme anlamına gelmez. İndeksleme ancak kullanıcı açıkça lansmanı onayladığında açılır.

## Dayanak / geliştirici brifi
- Codex: [`AGENTS.md`](../AGENTS.md)
- V3 uygulama: [`LOKMIRA_V3_UYGULAMA_VE_KALITE_RAPORU_2026-10-18.md`](./LOKMIRA_V3_UYGULAMA_VE_KALITE_RAPORU_2026-10-18.md)
- [Google international/localized pages](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google canonical guidelines](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Cégprofil HU yardım](https://support.google.com/business/answer/3039617?hl=hu)
