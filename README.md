# 's-Hertogenbosch Rehberi

's-Hertogenbosch (Den Bosch)'a yeni taşınanlar için basit bir şehir rehberi.
Kategoriye göre filtrelenebilen kutucuklara tıklayınca kısa bilgi, (varsa)
fotoğraf, harita ve yol tarifi linkleri açılır.

## Yeni yer ekleme

`data.json` dosyasına aşağıdaki formatta yeni bir obje ekle:

```json
{
  "id": 13,
  "name": "Yer Adı",
  "category": "Kategori",
  "icon": "📍",
  "image": "",
  "description": "Kısa açıklama.",
  "address": "Tam adres veya yer adı, Şehir",
  "lat": 51.6953936,
  "lng": 5.298312
}
```

- `image` boş bırakılırsa (`""`) kart üzerinde `icon` (emoji) gösterilir.
- `address` alanı Google Haritalar'da arama için kullanılır; tam adres ya da
  "Yer adı, Şehir" şeklinde yazman yeterli.
- `lat`/`lng` (enlem/boylam) varsa Waze yol tarifi linki bu koordinatlara göre
  oluşturulur ve doğrudan navigasyonu başlatır. Yoksa Waze de adres metnine
  göre arama yapar.
- Adres bilgisi olmayan yerlerde (örn. uygulamalar) `address` boş (`""`)
  bırakılabilir; bu durumda harita ve konum linkleri (Google Haritalar, Waze)
  gizlenir.
- Fotoğrafları `images/` klasörüne koy ve `image` alanında yolunu belirt.

### Opsiyonel alanlar

- `website`: Modal'da "Web Sitesini Aç ↗" linki gösterir. `websiteLabel` ile
  buton metni özelleştirilebilir (örn. `"Radyoları Aç ↗"`).
- `downloadUrl`: Modal'da "İndir ⬇" linki gösterir (örn. bir APK dosyası).

## Yerel olarak çalıştırma

`data.json` dosyası `fetch` ile yüklendiği için dosyayı doğrudan tarayıcıda
açmak (file://) çalışmaz. Basit bir yerel sunucu başlat:

```bash
npx serve .
# veya
python -m http.server
```

## Yayına alma (GitHub Pages)

1. Bu repoyu GitHub'a push et.
2. Repo ayarlarından **Settings > Pages** kısmına git.
3. **Branch**: `main`, **Folder**: `/ (root)` seçip kaydet.
4. Birkaç dakika içinde `https://<kullanici-adi>.github.io/<repo-adi>/`
   adresinden site yayında olur.

## İletişim

Sayfanın altında, eklenmesi istenen yerler için bir WhatsApp linki bulunur.
