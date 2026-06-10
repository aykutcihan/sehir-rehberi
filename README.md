# Şehir Rehberi

Yeni taşınanlar için basit bir şehir rehberi. Kategoriye göre filtrelenebilen
kutucuklara tıklayınca kısa bilgi, (varsa) fotoğraf ve Google Haritalar
konumu açılır.

## Yeni yer ekleme

`data.json` dosyasına aşağıdaki formatta yeni bir obje ekle:

```json
{
  "id": 9,
  "name": "Yer Adı",
  "category": "Kategori",
  "icon": "📍",
  "image": "images/dosya-adi.jpg",
  "description": "Kısa açıklama.",
  "address": "Tam adres veya yer adı, Şehir"
}
```

- `image` boş bırakılırsa (`""`) kart üzerinde `icon` (emoji) gösterilir.
- `address` alanı Google Haritalar'da arama için kullanılır; tam adres ya da
  "Yer adı, Şehir" şeklinde yazman yeterli.
- Fotoğrafları `images/` klasörüne koy ve `image` alanında yolunu belirt.

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
