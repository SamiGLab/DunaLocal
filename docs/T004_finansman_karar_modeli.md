# T004 · Kurucu geçimi ve ajans finansmanı — şeffaf karar modeli
**Durum:** Parametrik iç senaryo / bütçe görüşmesi için taslak. Gerçek nakit rezervi bilinmiyor. 18 Ekim 2026.

## 1. Ayrıştırılan kalemler
- **Müşteriden gelen tahsilat:** nakit girişi, katkı kârından farklıdır.
- **Doğrudan hizmet maliyeti:** işçilik saatleri + yazılım/operasyon; hizmet ücretinden düşülür.
- **Aylık sabit işletme gideri:** 260.000 / 430.000 / 650.000 Ft = **alternatif** senaryolar; gerçek veya bugünkü kira değildir.
- **Kurucu yükü:** ayrıca **0 veya 350.000 Ft/ay şirket maliyeti** varsayımı; sıfır ücret seçeneği kurucunun ücretsiz çalışmayı finanse edebileceği anlamına gelmez.
- **Nakit tamponu:** 5,5–7 milyon Ft yalnızca önceki kötü senaryo modelinde önerilen *planlama aralığıdır*, bankadaki para değildir.

## 2. İÇ hizmet matematiği (tahsil edilmiş müşteri yok)
| Kalem | Pilot | Standart | Genişletilmiş |
|---|---:|---:|---:|
| Aylık müşteri ücreti | 149.000 Ft | 199.000 Ft | 299.000 Ft |
| Aylık teslimat saatleri | 12 | 15 | 24 |
| Saatlik iç maliyet | 6.500 Ft | 6.500 Ft | 6.500 Ft |
| Diğer doğrudan gider | 12.000 Ft | 20.000 Ft | 30.000 Ft |
| Aylık katkı | 59.000 Ft | 81.500 Ft | 113.000 Ft |

Pilot kurulum: 79.000 Ft gelir − 45.000 Ft doğrudan kurulum maliyeti = 34.000 Ft katkı. 3 pilot ayı + 1 kurulum = **211.000 Ft toplam katkı**, ortak gider ve kurucu maliyeti hariç.

Reklam harcaması müşterinin Google Ads hesabındadır; ajansın paket ücreti değil.

## 3. Standart müşteri sayısı ile basit aylık başabaş
Aylık standart katkı = 81.500 Ft. Aşağıdaki tablo tamamen senaryodur, gerçek mevcut müşteri sayısı **0**.

| Sabit gider | Kurucu ayrıca 0 Ft | Kurucu ayrıca 350.000 Ft |
|---|---:|---:|
| 260.000 Ft | 4 müşteri | 8 müşteri |
| 430.000 Ft | 6 müşteri | 10 müşteri |
| 650.000 Ft | 8 müşteri | 13 müşteri |

Bu rakamlar ilk satışın ne zaman gerçekleşeceğini, pilottan standarda dönüşü, müşteri kaybını, vergi/kur farkını, peşin tahsilatı, kurucu kişisel ev kirası ve seyahat masraflarını hesaba katmaz. Dolayısıyla gerçek nakit akışı projeksiyonu değildir.

## 4. Mutlaka doldurulacak gerçek bütçe tablosu
**Aşağıdaki boşluklara bu herkese açık GitHub deposunda hassas banka rakamları veya kişisel bilgiler yazma. Güvenli özel dosyada tutulmalı.**

- Kurucunun minimum aylık NET kişisel geçim ihtiyacı: **[özel kayıt]**
- Kişisel mevcut serbest nakit tamponu ve kullanılabilecek ay: **[özel kayıt]**
- Şirket için ayrılmış başlangıç bütçesi: **[özel kayıt]**
- Gerçek yazılım, muhasebe, hukuk, iletişim ve reklam ön harcaması: **[doğrulanacak]**
- Tahsilat sözleşmesi (kurulum peşin/aylık peşin/vade), KDV ve para birimi: **[uzman onayı]**
- İlk müşteri edinimi için kaç ay ve kaç saat çalışma süresi ayrılabilir: **[kurucu kararı]**
- 0 müşteri, 1 pilot ve 3 pilot olan 6/9 aylık nakit akışı: **[gerçek girdilerle hesaplanacak]**

## 5. Karar kuralı
Hukuk/muhasebe giderleri ve kurucu yaşam gideri **hariç** tutulmuş nakit tablosuyla şirket kurma kararı verilmez. 5,5–7m Ft aralığı otomatik harcanabilir bütçe değildir; fiilî finansman ihtiyacı yaşam giderine ve gelir zamanlamasına göre yeniden hesaplanmalıdır.

### Makineyle doğrulanan iç aritmetik
Depoda `node scripts/finance_scenarios.mjs` komutu pilot/standart/geniş katkıları ve senaryo başabaş sayılarını yeniden hesaplar.

**T004 durumu:** hesaplama altyapısı hazır, ancak gerçek kişisel/şirket finansman girdileri ve seçilmiş 6–9 aylık plan olmadan **tamamlanmadı**.
