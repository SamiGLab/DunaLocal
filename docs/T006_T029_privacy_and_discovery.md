# KAPSAM NOTU (18 Ekim 2026)

**T006 hukuk/sözleşme şirket işleri kullanıcı kararıyla İPTAL.** Aşağıdaki şirketle ilgili bölüm yalnız tarihsel. **T029** müşteriye sorulacak keşif soruları ve süreç doğrulaması pazarlama görevimiz olarak aktiftir.

---

# T006 / T029 · Veri yönetişimi ve ilk keşif görüşmesi protokolü
**Durum:** Yasal inceleme ve gerçek müşteri testi için iç kontrol listesi. Müşteri verisi toplanmadı, e-posta/telefon gönderilmedi.

## 1. CRM/lead verisinin rol haritası
| Veri/kanal | Amaç | Rol kararı | İşlem |
|---|---|---|---|
| Google Ads kampanya metrikleri | Talep ve harcama izleme | Müşteri/ajans/Google rolleri sözleşmede tanımlanacak | Gerekli en az yetki |
| Telefon / e-posta sorguları | Kaynaktan teklife izleme | Veri sorumlusu/işleyen ayrımı müşteri özelinde | Ham kişisel kayıtları public GitHub'a yazma |
| Teklif tutarı, tarih, durum | Dönüşüm ve iş değeri ölçümü | DPA/erişim matrisi kontrolü | İlk prototipte anonim veya sahte veri |
| Ajans sitesinin iletişim formu | Ajansın kendi potansiyel müşterileri | Önce gerçek hukuki kimlik/gizlilik bildirimi | **Şu an kapalı** |
| Google Analytics/Ads remarketing | Takip ve pazarlama | Hukuki dayanak/çerez gereksinimi ayrı incelenecek | **Şu an kapalı** |

EDPB veri sorumlusu/işleyen rehberi: https://www.edpb.europa.eu/sme/learn-the-basics/data-controller-or-data-processor_en
NAIH ulusal veri koruma otoritesi: https://www.naih.hu/
NMHH Macar elektronik pazarlama kuralları: https://nmhh.hu/elektronikus-hirdetesek

## 2. Başlamadan önce uzmanla netleştirilecek başlıklar
- B2B ilk temasın hukuki kanalı, gerçek kişi ve genel şirket adresi ayrımı.
- Yazılı sözleşmede veri sorumlusu/işleyen tanımları, saklama, silme/iade, veri ihlali, alt işleyenler, uluslararası aktarımlar.
- Erişim rolü: Google Ads/GBP hesapları müşterinin kontrolünde, ajansa minimum rol, 2FA, ana şifre paylaşımı yok.
- Talep verilerinin saklama süresi, kaynağı, hukuki dayanağı, kişi bilgilendirmesi, veri erişim taleplerinin yöntemi.
- CRM entegrasyonu veya çağrı kaydı için ayrı değerlendirme; kayıtların rızası ve ülkeye göre kurallar.
- Ücretli reklam hizmeti sözleşmesi ve alacak/ödeme sürecinin faturalama modeli.

## 3. Nitelikli keşif görüşmesi standardı (gerçek konuşma olmadı)
Aşağıdaki soruların yanıtsız kalması “müşterinin ihtiyacı yok” diye yorumlanmaz:
1. PPF/seramik yüksek değerli hangi hizmet sizde kârlı ve gerçekten yeni iş almak istediğiniz alan?
2. Şu anda talepler Google, telefon, form, tavsiye gibi hangi kanallardan geliyor?
3. Talebin ne kadar sürede cevaplandığını nasıl biliyorsunuz?
4. Teklifler nerede kaydoluyor ve kazanılan/kaybedilen işle eşleşiyor mu?
5. Önümüzdeki üç ay için ekip/kabin kapasiteniz ve asgari kârlı iş tipi nedir?
6. Dar kapsamlı ücretli testte karar verici kimdir; bütçe ve onay süreci nasıl ilerliyor?

**Nitelikli görüşme kanıtı:** Gerçek karar verici, tarih/kanal, soruların cevapları, (varsa) itirazlar, takip izni ve kararlaştırılmış bir sonraki adım. Sorular bir sanal role oynama ile doldurulduysa **gerçek görüşme olarak işaretleme**.

## 4. CRM demo kapısı — T032
İlk 3 gerçek nitelikli görüşmede duyulan tekrar eden talep izleme sorunları üzerinden *minimum* demo gereksinimi yazılır. O zamana kadar ancak sentetik veriyle kullanılabilir arayüz taslağı hazırlanır. Gerçek CRM kurulmuş gibi pazarlamayız.

## 5. Şirket dışı iletişim kapısı
**Şu an:** Web iletişim formu kapalı; satış materyalleri taslak; ilk temas/yazılı fiyat teklifleri otomatik olarak gönderilmeyecek. Önce hukuk ve Macarca konuşmacı kontrolleri, sonra kullanıcının izin verdiği kanal ve işletmelere bireysel temas.

**T006 durumu:** Risk ve veri envanter şablonu hazır, fakat hukuk uzmanı incelemesi ve nihai politika/sözleşme henüz yok.
