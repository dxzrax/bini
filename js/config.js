/*
  Semua isi yang sering diubah ada di sini.
  Tidak perlu menyentuh index.html atau main.js untuk mengganti kontak, foto, atau alasan.
*/
window.SITE_CONFIG = {

  // Awal cerita (dipakai untuk hitung hari bersama)
  startDate: "2026-04-20T00:00:00",

  // Ulang tahun Dinda: 24 Februari 2003
  birthday: { day: 24, month: 2, year: 2003 },

  // Kontak. Nomor WhatsApp pakai format internasional tanpa + dan tanpa spasi (62...)
  contacts: [
    {
      name: "Abang",
      note: "Klik untuk chat langsung ke Abang",
      initial: "A",
      wa: "6289630094051",
      waText: "Halo abang, ade lagi kangen 💗",
      ig: "https://www.instagram.com/dxzrax"
    },
    {
      name: "Ade Dinda",
      note: "Klik untuk chat langsung ke Ade",
      initial: "D",
      wa: "6282361176108",
      waText: "Halo ade sayang, abang lagi mikirin ade 💗",
      ig: "https://www.instagram.com/_ridhtrhm"
    }
  ],

  // Alasan (kartu yang bisa dibalik). Tambah atau ubah bebas.
  reasons: [
    "Karena Dinda jujur dan tidak pernah suka berbohong.",
    "Karena pipimu cabi dan selalu bikin gemas.",
    "Karena capek main badminton pun, kamu masih sempat cerita.",
    "Karena ibu guru yang sabar untuk murid-muridnya.",
    "Karena kamu mau sabar menunggu kabar dari ujung pulau.",
    "Karena kamu selalu ingin ikut menyukai hal yang abang suka.",
    "Karena obrolan biasa jadi terasa istimewa kalau sama kamu.",
    "Karena mimpi kecil kita terasa mungkin kalau berdua."
  ],

  // Galeri foto. Taruh foto di assets/foto/ lalu tulis di sini, contoh:
  // { src: "assets/foto/foto1.jpg", caption: "Hari itu" }
  // Kalau masih kosong, tampil bingkai polaroid kosong.
  photos: [],

  // Musik latar (opsional). Taruh file sendiri di assets/musik/ lalu isi, contoh: "assets/musik/lagu.mp3"
  music: ""
};
