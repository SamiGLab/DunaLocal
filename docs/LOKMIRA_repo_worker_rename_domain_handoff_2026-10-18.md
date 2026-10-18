# Lokmira — GitHub repo / Cloudflare Worker isim değişimi ve lokmira.com bağlantı devri
**18 Ekim 2026 | Durum: uygulama hazırlığı yapıldı, hesap düzeyinde yeniden adlandırma tamamlanmadı**

## Talep ve hedefler

| Kaynak | Mevcut | Hedef | Şu anda |
|---|---|---|---|
| GitHub repo | `SamiGLab/DunaLocal` | `SamiGLab/Lokmira` | **Bekliyor — GitHub Settings yönetim işlemi** |
| Cloudflare Worker | `dunalocal` | `lokmira` | **Bekliyor — Cloudflare Worker yönetim işlemi** |
| Workers.dev önizleme | `dunalocal.samiayten-hu.workers.dev` | `lokmira.samiayten-hu.workers.dev` | **Bekliyor — yeni host gerçekten yanıt vermeli** |
| Özel domain | kullanıcı `lokmira.com` satın aldığını bildirdi | `lokmira.com` | **Bağlanmadı / kamuya yayın onayı yok** |

## Yapılan gerçek teknik hazırlıklar

- `wrangler.lokmira.jsonc`: yeni Worker için `name: lokmira`, mevcut `dist` statik asset yapılandırması, `workers_dev: true`. **Henüz canlı dağıtıma alınmadı**.
- `wrangler.jsonc`: mevcut `dunalocal` adını **koruyor**. Otomatik Cloudflare Builds bu adla eşleştiği için değiştirmeden bırakıldı. Yeni Worker gerçekten yeniden adlandırıldıktan/oluşturulduktan sonra ana dosya güvenle `lokmira` adına değiştirilmeli.
- `scripts/live-smoke.mjs` ve `scripts/check-live.sh`: `LOKMIRA_PREVIEW_ORIGIN` değişkeniyle yeni URL test edilebiliyor; değişken yoksa eski canlı çalışan Worker test edilir.
- `.github/workflows/ci.yml`: hem mevcut ana yapılandırmanın hem `wrangler.lokmira.jsonc` dosyasının **dry-run** testi çalışır, otomatik deploy veya DNS değişikliği yapmaz.
- Mevcut Lokmira SVG/site kimliği, `noindex,nofollow,noarchive`, CSP ve müşteri iletişim kısıtları korunur.

## Uygulama: önce GitHub, sonra Cloudflare

**1. GitHub repo adını değiştirme (kullanıcı yönetici yetkisi gerekli).**
- https://github.com/SamiGLab/DunaLocal adresini aç.
- `Settings` > `General` > `Repository name`: **Lokmira** > `Rename`.
- https://github.com/SamiGLab/Lokmira adresinin açıldığını doğrula. GitHub eski URL'lerden yönlendirme sağlar. Yeni bir `DunaLocal` reposu oluşturma; yönlendirme bozulabilir.
- Yerel clone varsa `git remote set-url origin https://github.com/SamiGLab/Lokmira.git`.
- Cloudflare'da Git bağlantısı eski repo adını tutuyorsa Builds > Settings alanından repo erişimini ve otomatik deploy'u kontrol et.

**2. Cloudflare Worker yeniden adlandırma (Cloudflare oturumu/yetkisi gerekli).**
- https://dash.cloudflare.com/ > `Workers & Pages` > `dunalocal` Worker'ını aç.
- Settings altında mevcut Worker adını düzenleme/rename seçeneği varsa **lokmira** olarak değiştir. Cloudflare 2026 Workers API sabit Worker ID üzerinden rename işlemini de destekler; renaming UI yetkisi/konumu hesapta farklı olabilir.
- Eğer ad düzenleme işlemi UI'da yoksa **yeni `lokmira` Worker oluşturup** eski Worker'ın repo bağlantısını/asset config'ini ona aktar, test et, ancak **eski `dunalocal` Worker'ı testler geçmeden silme**.
- Worker Build ayarında GitHub repository `SamiGLab/Lokmira` ve branch `main` görünmeli. Wrangler `name` alanı Worker adı ile eşleşmeli.
- Yeni URL'yi canlı doğrula: `https://lokmira.samiayten-hu.workers.dev/`. Bu URL **henüz doğrulanmadı**; isim teorik hedef.
- Yeni Worker doğrulandıktan sonra `wrangler.jsonc` içindeki `name` alanını `lokmira` yap, eski fallback live-smoke referanslarını `lokmira` ile değiştir, GH workflow ve Cloudflare Builds sonuçlarını doğrula. Bu aşamadan önce ana config değişmemeli.

## Domain bağlantısı — kullanıcının ileride birlikte uygulayacağı aşama

**Domain registrar bilinmiyor.** Alan adı paneli görüldüğünde o firmaya özgü ekranlarla netleştirilecek.

1. Cloudflare > `Websites` / `Add a domain` > `lokmira.com`. DNS kayıtları içe aktarılırsa **mevcut MX, TXT (SPF/DKIM/DMARC), mail ve verification kayıtlarını önce kontrol et**. Bilmeden silme.
2. Cloudflare tarafından **bu zone için gösterilen iki nameserver**'ı, alan adını satın aldığın registrar'ın `Nameservers` kısmına gir. Nameserver'ları önceden tahmin etme/kopyalama. Cloudflare zone `Active` olmalı.
3. `Workers & Pages` > `lokmira` > `Domains` (veya `Settings > Domains & Routes`) > `Add custom domain` > `lokmira.com`. Cloudflare Worker custom domain için DNS ve SSL sertifikası otomatik oluşturur. El ile `CNAME dunalocal...workers.dev` veya uydurma A kaydı girme.
4. `www.lokmira.com` için ya ayrı Worker custom domain bağla ya da Cloudflare Redirect Rule ile `https://lokmira.com` adresine 301 yönlendir. Tek canonical tercih olarak apex `lokmira.com` seçildi; form, site analytics ve hreflang hazır olana kadar `noindex` korunur.
5. Doğrula: HTTPS sertifika, `www` yönlendirme, favicon/brand SVG, Macarca/İngilizce içerik, status code 200/301/404, güvenlik başlıkları, iletişim e-postası sağlayıcısının DNS kayıtları. E-posta barındırma ayrı; sadece domain almak e-posta oluşturmaz.
6. **Ticari açılış ayrı son kullanıcı onayı gerektirir.** DNS bağlanması otomatik olarak indeksleme/aktif müşteri toplama yetkisi değildir.

## Güvenlik, geri dönüş
- GitHub repo adını değiştirmek GitHub içinde çoğu repo URL'sini yönlendirir, fakat Cloudflare Git bağlantısını/iş akışlarını elle doğrula; lokal clone remote URL'si yenilenecek.
- Ana Wrangler adı güncellenmeden Cloudflare Worker adı tek taraflı değiştirilirse deploy hata verebilir. İşlemler yakından sıralanır.
- Eski Worker'ı kaldırma, eski DNS kayıtlarını gelişigüzel silme, gerçek marka adından farklı dosyaları halka açma.
- GitHub bağlı uygulaması repo **yeniden adlandırma** yönetim çağrısı sağlamıyor; Cloudflare doğrudan bağlı değil. Bu iki hesap işlemini model yapmış gibi raporlamak doğru değil. Kullanıcı panelde isimleri değiştirdikten sonra testlerin yeniden çalışmasıyla tamamlanır.

## Dayanak
- GitHub rename repo: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- Cloudflare Worker Builds name requirement: https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/
- Cloudflare Worker naming via config: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
- Cloudflare Workers rename 2025 API: https://developers.cloudflare.com/changelog/post/2025-09-03-new-workers-api/
- Cloudflare DNS: https://developers.cloudflare.com/dns/get-started/
- Cloudflare Worker custom domain: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
