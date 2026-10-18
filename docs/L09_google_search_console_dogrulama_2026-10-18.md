# Lokmira — Google Search Console doğrulama hazırlığı

**Tarih:** 2026-10-18  
**Mülk hedefi:** `https://lokmira.com/` URL öneki (kullanıcının sağladığı HTML meta etiketi).  
**Statü:** **HTML doğrulama etiketi koda işlendi; Search Console hesabındaki sahiplik doğrulaması henüz yapılmadı**.

## Yapılan işlem

Kullanıcı şu HTML doğrulama etiketini sağladı:

```html
<meta name="google-site-verification" content="km1EpHT5L_IUzBBj709rZfeyxZ3zaUM86yIxYJ0nfJk" />
```

- `index.html` ve `dist/index.html` dosyalarının `<head>` bölümüne etiket **aynen** eklendi.
- `scripts/verify.mjs` dosyasına etiketin **tam değeriyle** bulunması ve **tek örnek** olması kontrolleri eklendi.
- Site meta `noindex,nofollow,noarchive`, `robots.txt` erişim kısıtları, `X-Robots-Tag`, CSP, kapalı müşteri iletişimi ve `workers.dev` önizleme statüsü değişmedi.
- `wrangler.jsonc` eski Worker'ı bozmamak için hâlâ `dunalocal`; `wrangler.lokmira.jsonc` hazırlanmış hedef Worker yapılandırmasıdır.
- Kullanıcı `lokmira.com` satın aldığını bildirdi, ancak bu oturumda `https://lokmira.com/` alanında etiketin servis edildiği doğrulanmadı.

## Google Search Console'da gerekli kalan adım

1. https://search.google.com/search-console/ adresinde Google hesabınla giriş yap.
2. **URL prefix / URL öneki** seçeneğine **tam olarak** `https://lokmira.com/` gir.
3. HTML tag / HTML etiketi yönteminde Google'ın verdiği doğrulama anahtarının yukarıdaki etiketle **aynı mülk ve Google kullanıcısına ait olduğunu** kontrol et.
4. `https://lokmira.com/` ana sayfasında sayfa kaynağını aç; meta etiketi `<head>` içinde **gerçekte bulunmalı**. Şu an yalnız Cloudflare iç önizleme koduna işlendi; özel domain bağlanmadıysa burada görünmeyebilir.
5. Google Search Console'da **Verify / Doğrula** seç. Başarılı doğrulama ekranı görülmeden “Search Console kaydı tamamlandı” deme.
6. Doğrulama etiketini kaldırma; Google mülk sahipliğini tekrar denetleyebilir.
7. **Önerilen ek yol:** Tüm `lokmira.com` alan adını, tüm alt alan adlarını ve HTTP/HTTPS varyantlarını tek mülkte izlemek için **Domain mülkü** de eklenebilir. Bunun için Google'ın kendi mülk ekranında verdiği **ayrı TXT DNS kaydı** gerekir; HTML meta etiketi bu yöntem için geçerli değildir. TXT değerini tahmin etme.
8. Sahiplik doğrulaması, sitemap göndermek veya indeksleme açmak anlamına **gelmez**. Sitedeki ticari yayına özel onay olmadan noindex ve müşteriye açık iletişim kilidi korunacak.

## Bağımsız doğrulama kapıları

- GitHub kodunda ve `dist/` içinde aynı etiket var mı?
- GitHub Actions statik QA ve Cloudflare live smoke success mi?
- Aktif `workers.dev` önizlemede etiket gerçekten servis ediliyor mu?
- **Asıl hedef URL** `https://lokmira.com/` etiketi servis ediyor mu? Doğrulanmadıkça Google'da Verify tuşuna basıldığında başarısızlık mümkün.
- Son adım Google Search Console'da kullanıcının kendi hesabındaki “Ownership verified / Sahiplik doğrulandı” ekranıdır; bu hesap eylemini GitHub/Drive araçları gerçekleştiremez.

## Kaynak
- https://support.google.com/webmasters/answer/9008080?hl=en (Google: meta HTML tag yalnız URL prefix; Domain mülk DNS TXT)
- https://developers.google.com/search/docs/monitor-debug/search-console-start
