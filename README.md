# Dari Ujung ke Ujung Sumatra

Halaman biografi romantis untuk Dinda Ridhatur Rahmah. Situs statis murni (HTML, CSS, JavaScript), tanpa framework dan tanpa proses build.

## Cara membuka

Klik dua kali `index.html`. Tidak perlu server. Butuh internet hanya untuk memuat font Google.

## Struktur

```
index.html          isi halaman
css/style.css       semua tampilan dan animasi
js/config.js        data yang sering diubah (kontak, foto, alasan, musik, tanggal)
js/main.js          logika animasi dan interaksi
assets/foto/        taruh foto kenangan di sini
assets/musik/       taruh musik latar di sini (opsional)
```

## Yang bisa diubah tanpa menyentuh kode lain

Semuanya ada di `js/config.js`:

- **Kontak**: nomor WhatsApp (format `62...`, tanpa `+`), pesan awal, dan link Instagram.
- **Alasan**: kartu yang bisa dibalik di bagian "Kenapa Abang Sayang Ade".
- **Foto**: taruh file di `assets/foto/`, lalu tambahkan ke `photos`:
  ```js
  photos: [
    { src: "assets/foto/foto1.jpg", caption: "Hari itu" }
  ]
  ```
- **Musik**: taruh file milik sendiri di `assets/musik/`, lalu isi `music: "assets/musik/lagu.mp3"`. Tombol musik muncul otomatis.
- **Tanggal**: `startDate` (awal cerita) dan `birthday`.

## Fitur

- Amplop pembuka yang terbuka saat diklik
- Kelopak bunga jatuh (canvas), hati melayang di hero
- Peta rute Aceh ke Lampung dengan hati yang bolak-balik
- Hitung hari bersama dan hitung mundur ulang tahun
- Kartu alasan yang bisa dibalik, galeri polaroid
- Surat dengan efek mesin tik, hati kecil di setiap ketukan
- Tombol chat WhatsApp dan Instagram untuk Abang dan Ade
- Mendukung `prefers-reduced-motion`, responsif untuk ponsel

## Upload ke GitHub dan tayang online (GitHub Pages)

1. Buat repository baru di GitHub, lalu unggah semua isi folder ini.
2. Buka **Settings > Pages**.
3. Pada **Source**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu simpan.
4. Tunggu satu sampai dua menit. Alamatnya: `https://NAMA-GITHUB.github.io/NAMA-REPO/`

## Catatan privasi

Nomor WhatsApp dan Instagram ada di `js/config.js`. Kalau repository dibuat **publik**, siapa pun bisa melihat nomor itu. Untuk menjaganya:

- Buat repository **private** (GitHub Pages untuk repo private butuh akun berbayar), atau
- Hapus nomor dari `config.js` sebelum diunggah lalu isi kembali saat dipakai sendiri.

Foto pribadi di `assets/foto/` juga ikut publik kalau repository publik.

## Ide pengembangan

- Lightbox untuk memperbesar foto
- Halaman kedua berisi surat-surat panjang
- Tema warna pink penuh (warna favorit Dinda)
- Tombol bagikan halaman lewat WhatsApp
