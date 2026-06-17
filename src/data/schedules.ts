export interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  description: string;
  category?: 'ibadah' | 'sains' | 'keluarga' | 'karir' | 'bisnis' | 'kesehatan' | 'evaluasi';
}

export const WEEKDAY_SCHEDULE: ScheduleItem[] = [
  {
    id: 'wd-1',
    time: '03.00',
    activity: 'Bangun tidur, baca doa bangun tidur, cuci muka',
    description: 'Rasul bangun di sepertiga malam. Niatkan: "Aku bangun untuk ibadah dan mencari ridha Allah."',
    category: 'ibadah'
  },
  {
    id: 'wd-2',
    time: '03.15',
    activity: 'Tahajud & Witir (minimal 2 rakaat)',
    description: 'Shalat malam adalah kebiasaan beliau yang tidak pernah ditinggalkan.',
    category: 'ibadah'
  },
  {
    id: 'wd-3',
    time: '03.30',
    activity: 'Baca Al-Quran + 1 halaman tafsir',
    description: 'Bacaan dengan tartil, pahami artinya. Ini akan menenangkan hati seharian.',
    category: 'ibadah'
  },
  {
    id: 'wd-4',
    time: '04.00',
    activity: 'Belajar Sains Cambridge & Bahasa Inggris (baca 2 halaman buku IGCSE + hafal 5 kata)',
    description: 'Waktu ini adalah "waktu berkah". Rasulullah mendoakan umatnya yang bangun pagi.',
    category: 'sains'
  },
  {
    id: 'wd-5',
    time: '04.30',
    activity: 'Shalat Subuh berjamaah + Dzikir pagi',
    description: 'Setelah Subuh, Rasulullah ﷺ tidak langsung tidur, tetapi berdzikir hingga terang.',
    category: 'ibadah'
  },
  {
    id: 'wd-6',
    time: '04.45',
    activity: 'Olahraga ringan (stretching/push-up/senam pernapasan)',
    description: 'Tubuh adalah amanah. Nabi juga kuat fisiknya.',
    category: 'kesehatan'
  },
  {
    id: 'wd-7',
    time: '05.00',
    activity: 'Shalat Dhuha (2 rakaat) + sarapan pagi',
    description: 'Dhuha adalah sedekah untuk setiap sendi tubuh.',
    category: 'ibadah'
  },
  {
    id: 'wd-8',
    time: '05.30',
    activity: 'Membantu istri menyiapkan anak (mandi & ganti pakaian anak)',
    description: 'Sunnah: Membantu keluarga di pagi hari. Rasulullah selalu membantu pekerjaan rumah.',
    category: 'keluarga'
  },
  {
    id: 'wd-9',
    time: '06.00',
    activity: 'Bersiap berangkat ke sekolah (bawa bekal + buku catatan ide konten)',
    description: 'Sepanjang jalan, perbanyak istighfar.',
    category: 'karir'
  },
  {
    id: 'wd-10',
    time: '07.00 - 12.00',
    activity: 'Mengajar Inti (rekam suara/voice note saat menjelaskan)',
    description: 'Niatkan mengajar sebagai ibadah. Setiap ilmu yang bermanfaat adalah sedekah jariyah.',
    category: 'karir'
  },
  {
    id: 'wd-11',
    time: '12.00 - 13.00',
    activity: 'Shalat Zuhur, Makan Siang, & Listening Bahasa Inggris (15 menit di HP)',
    description: 'Gunakan waktu istirahat untuk "isi ulang" otak dengan kosakata baru.',
    category: 'sains'
  },
  {
    id: 'wd-12',
    time: '13.00 - 14.00',
    activity: 'Persiapan mengajar + Baca 1 artikel sains populer (BBC/National Geographic)',
    description: 'Perluas wawasan agar pengajaran Anda berkualitas internasional.',
    category: 'sains'
  },
  {
    id: 'wd-13',
    time: '14.00 - 16.00',
    activity: 'Mengajar Sore + Shalat Ashar di akhir jam',
    description: 'Tutup pelajaran dengan doa. Doakan murid-murid Anda.',
    category: 'karir'
  },
  {
    id: 'wd-14',
    time: '16.00',
    activity: 'Pulang sekolah (perbanyak shalawat di perjalanan)',
    description: 'Ucapkan "Bismillah" saat meninggalkan sekolah.',
    category: 'ibadah'
  },
  {
    id: 'wd-15',
    time: '17.30',
    activity: 'Tiba di rumah. Ucapkan salam keras-keras dan cium istri & anak.',
    description: 'Ini sunnah yang paling penting. Masuk rumah dengan wajah ceria adalah sedekah.',
    category: 'keluarga'
  },
  {
    id: 'wd-16',
    time: '18.00',
    activity: 'Shalat Maghrib berjamaah + Mengaji bersama anak (keras)',
    description: 'Biarkan anak-anak mendengar suara ayat-ayat Allah dari ayahnya.',
    category: 'keluarga'
  },
  {
    id: 'wd-17',
    time: '18.30 - 19.30',
    activity: 'Quality Time Keluarga: Mainkan anak, temani istri, makan malam (TANPA HP)',
    description: 'Rasulullah ﷺ adalah orang yang paling lembut dengan keluarganya.',
    category: 'keluarga'
  },
  {
    id: 'wd-18',
    time: '19.30 - 20.00',
    activity: 'Mandi, ganti baju, dan tidurkan anak (bacakan doa/dongeng nabi)',
    description: 'Momen paling sakral. Anak akan tertidur dengan doa dari ayahnya.',
    category: 'keluarga'
  },
  {
    id: 'wd-19',
    time: '20.00',
    activity: 'Shalat Isya berjamaah',
    description: 'Tutup ibadah malam.',
    category: 'ibadah'
  },
  {
    id: 'wd-20',
    time: '20.15 - 21.00',
    activity: 'Zona Bisnis & Finansial: Catat keuangan harian, update status produk, kirim pesan ke 1 calon reseller',
    description: 'Mulai dari kecil. 1 kontak per hari = 30 kontak per bulan.',
    category: 'bisnis'
  },
  {
    id: 'wd-21',
    time: '21.00 - 21.30',
    activity: 'Baca buku non-fiksi (sirah nabawiyah / pengembangan diri / parenting)',
    description: '"Barang siapa yang keluar untuk menuntut ilmu, maka ia berada di jalan Allah."',
    category: 'sains'
  },
  {
    id: 'wd-22',
    time: '21.30 - 22.00',
    activity: 'Evaluasi 1 menit: Apa 1 hal baik yang saya lakukan untuk istri & anak hari ini?',
    description: 'Renungkan. Lalu matikan HP dan cuci kaki.',
    category: 'evaluasi'
  },
  {
    id: 'wd-23',
    time: '22.00 - 03.00',
    activity: 'Tidur Nyenyak (5 jam)',
    description: 'Rasulullah tidur di awal malam dan bangun di akhir malam.',
    category: 'kesehatan'
  }
];

export const SATURDAY_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sat-1',
    time: '03.30',
    activity: 'Bangun, Tahajud, Witir',
    description: 'Semangat Rasulullah ﷺ dalam beribadah sepertiga malam.',
    category: 'ibadah'
  },
  {
    id: 'sat-2',
    time: '04.00 - 05.00',
    activity: 'Subuh berjamaah + Dzikir Pagi + Baca Al-Quran 1 Juz (ini waktunya lebih panjang)',
    description: 'Membaca Kitabullah di waktu fajar disaksikan oleh para malaikat.',
    category: 'ibadah'
  },
  {
    id: 'sat-3',
    time: '05.00 - 06.30',
    activity: 'Olahraga berat (lari pagi / bersepeda / senam) Ajak istri jika mau.',
    description: 'Mukmin yang kuat lebih dicintai Allah daripada mukmin yang lemah.',
    category: 'kesehatan'
  },
  {
    id: 'sat-4',
    time: '06.30 - 08.00',
    activity: 'Sarapan pagi keluarga + Bermain dengan anak di teras/halaman',
    description: 'Kegembiraan keluarga di pagi hari adalah berkah yang nyata.',
    category: 'keluarga'
  },
  {
    id: 'sat-5',
    time: '08.00 - 10.00',
    activity: 'Zona Produksi Konten Massal: Rekam 3-5 video praktikum IPA / edit video untuk stok 1 minggu.',
    description: 'Mempersiapkan konten edukatif berkelas untuk membagikan ilmu bermanfaat.',
    category: 'bisnis'
  },
  {
    id: 'sat-6',
    time: '10.00 - 12.00',
    activity: 'Kursus Online / Webinar Internasional (dari British Council/Coursera)',
    description: 'Meningkatkan kapabilitas global agar menjadi pendidik berstandar internasional.',
    category: 'sains'
  },
  {
    id: 'sat-7',
    time: '12.00 - 13.00',
    activity: 'Shalat Zuhur + Makan Siang + Istirahat siang (qailulah)',
    description: 'Sunnah tidur sejenak (qailulah) sebelum atau setelah zuhur untuk penambah energi ibadah.',
    category: 'kesehatan'
  },
  {
    id: 'sat-8',
    time: '13.00 - 15.00',
    activity: 'Baca buku teks Cambridge + Latihan soal IGCSE (2 jam penuh fokus)',
    description: 'Persiapan matang menguasai kurikulum internasional untuk mendidik siswa dengan maksimal.',
    category: 'sains'
  },
  {
    id: 'sat-9',
    time: '15.00 - 16.00',
    activity: 'Shalat Ashar + Ngaji bareng anak kecil (kenalkan huruf hijaiyah)',
    description: 'Mengajarkan satu huruf Al-Quran kepada anak berpahala besar dan mengikat memori keluarga.',
    category: 'keluarga'
  },
  {
    id: 'sat-10',
    time: '16.00 - 17.30',
    activity: 'Jalan-jalan sore ke toko buku / beli bahan baku bisnis di pasar',
    description: 'Mencari ilmu baru atau membeli bahan baku halal untuk menyokong finansial keluarga.',
    category: 'keluarga'
  },
  {
    id: 'sat-11',
    time: '17.30 - 18.30',
    activity: 'Maghrib + Makan malam keluarga',
    description: 'Makan bersama mendatangkan keberkahan pada makanan.',
    category: 'keluarga'
  },
  {
    id: 'sat-12',
    time: '18.30 - 19.30',
    activity: 'Isya + Ngobrol dengan istri tanpa HP (Tanya: "Apa yang bisa aku bantu minggu depan?")',
    description: 'Rasulullah ﷺ adalah manusia yang paling mulia dalam memperlakukan istrinya.',
    category: 'keluarga'
  },
  {
    id: 'sat-13',
    time: '19.30 - 20.30',
    activity: 'Tidurkan anak + Baca cerita nabi untuk anak',
    description: 'Menanamkan akhlak dan keteladanan para Nabi ke alam bawah sadar anak sebelum terlelap.',
    category: 'keluarga'
  },
  {
    id: 'sat-14',
    time: '20.30 - 21.30',
    activity: 'Me Time / Hobi ringan (atau lanjut belajar jika kuat)',
    description: 'Merilekskan pikiran dan melakukan rekreasi intelektual ringan demi kesehatan jiwa.',
    category: 'kesehatan'
  },
  {
    id: 'sat-15',
    time: '22.00',
    activity: 'Tidur (Lebih cepat agar tubuh pulih)',
    description: 'Mengistirahatkan tubuh agar siap menyongsong sepertiga malam berikutnya.',
    category: 'kesehatan'
  }
];

export const SUNDAY_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sun-1',
    time: '03.30',
    activity: 'Bangun, Tahajud, Witir',
    description: 'Mendekatkan diri pada Allah di sepertiga malam terakhir.',
    category: 'ibadah'
  },
  {
    id: 'sun-2',
    time: '04.00 - 05.00',
    activity: 'Subuh berjamaah + Dzikir Pagi + Baca 1 Juz Al-Quran',
    description: 'Memulai hari Minggu dengan energi ruhani yang kuat.',
    category: 'ibadah'
  },
  {
    id: 'sun-3',
    time: '05.00 - 06.30',
    activity: 'Jalan santai keluarga ke taman atau pasar.',
    description: 'Menyehatkan fisik dan mempererat hubungan keluarga dengan berekreasi santai.',
    category: 'keluarga'
  },
  {
    id: 'sun-4',
    time: '06.30 - 08.00',
    activity: 'Quality Time Fase 1: Bermain dengan anak di rumah.',
    description: 'Kehadiran ayah secara utuh sangat penting bagi psikologis anak.',
    category: 'keluarga'
  },
  {
    id: 'sun-5',
    time: '08.00 - 10.00',
    activity: 'Zona Produksi Bisnis Massal: Produksi 5 kg Sambal Pecel/Keripik Sayur (Sambil ditemani istri).',
    description: 'Membangun aset produktif sampingan secara konsisten. Iringi dengan tawa gembira bersama istri.',
    category: 'bisnis'
  },
  {
    id: 'sun-6',
    time: '10.00 - 12.00',
    activity: 'Bersih-bersih rumah bersama keluarga (Sunnah: kebersihan adalah sebagian iman).',
    description: 'Bahu-membahu dengan keluarga menjaga kerapihan, kebersihan, dan kenyamanan hunian.',
    category: 'keluarga'
  },
  {
    id: 'sun-7',
    time: '12.00 - 13.00',
    activity: 'Shalat Zuhur + Makan Siang + Istirahat siang (qailulah)',
    description: 'Istirahat dan tidur siang sejenak untuk memulihkan kebugaran.',
    category: 'kesehatan'
  },
  {
    id: 'sun-8',
    time: '13.00 - 15.00',
    activity: 'Zona Finansial: Hitung untung rugi bisnis, setor ke rekening tabungan/investasi, riset harga rumah/KPR.',
    description: 'Merencanakan masa depan keuangan dengan cerdas demi ketahanan finansial keluarga.',
    category: 'bisnis'
  },
  {
    id: 'sun-9',
    time: '15.00 - 16.00',
    activity: 'Shalat Ashar + Mengajar istri dan anak membaca doa-doa pendek.',
    description: 'Menjadi imam keluarga yang sejati dengan membimbing ilmu agama praktis.',
    category: 'keluarga'
  },
  {
    id: 'sun-10',
    time: '16.00 - 17.30',
    activity: 'Quality Time Fase 2: Bawa anak ke taman bermain atau kolam renang anak. (Habiskan waktu bersama)',
    description: 'Menyenangkan hati buah hati. Setiap senyum mereka bernilai kegembiraan surgawi.',
    category: 'keluarga'
  },
  {
    id: 'sun-11',
    time: '17.30 - 18.30',
    activity: 'Maghrib + Makan malam keluarga (undang mertua/kakek nenek jika mungkin)',
    description: 'Menjalin silaturahim dengan orang tua/mertua, mendulang berkah yang memperpanjang umur & rezeki.',
    category: 'keluarga'
  },
  {
    id: 'sun-12',
    time: '18.30 - 19.30',
    activity: 'Isya + Evaluasi mingguan bersama istri: Bagaimana progress 1 minggu ke depan? Buat target baru.',
    description: 'Mengevaluasi bersama belahan jiwa untuk terus melangkah seirama mencapai mimpi mulia.',
    category: 'keluarga'
  },
  {
    id: 'sun-13',
    time: '19.30 - 20.30',
    activity: 'Tidurkan anak + Persiapan mental untuk Senin',
    description: 'Pelepasan hari yang penuh berkah dan menenangkan emosi menyambut hari baru.',
    category: 'keluarga'
  },
  {
    id: 'sun-14',
    time: '20.30 - 21.30',
    activity: 'Plan for Monday: Siapkan baju, buku, dan bekal untuk besok.',
    description: 'Manajemen persiapan yang matang di malam hari menghindarkan kerisauan di kesokan fajar.',
    category: 'karir'
  },
  {
    id: 'sun-15',
    time: '22.00',
    activity: 'Tidur (Pastikan tidur lebih cepat)',
    description: 'Tidur pulas berkualitas demi me-regenerasi sel-sel fisik untuk perjuangan esok hari.',
    category: 'kesehatan'
  }
];

export const GOLDEN_RULES = [
  {
    title: '1. Jangan Target 100% di Minggu Pertama',
    text: 'Targetkan 70% ceklis tercentang. Jika ada yang terlewat (misal: bangun kesiangan), jangan putus asa. Istighfar dan lanjutkan. Yang penting konsisten.'
  },
  {
    title: '2. Libatkan Istri',
    text: 'Tunjukkan jadwal ini ke istri Anda. Katakan: "Ini cara saya ingin menjadi suami dan ayah yang lebih baik. Bantu saya mengingatkan jika saya lupa." Ini akan membuat istri merasa dihargai dan ikut mendukung mimpi Anda.'
  },
  {
    title: '3. Ceklis di Akhir Pekan',
    text: 'Setiap Minggu malam, lihat kembali 7 hari terakhir. Lingkari (pilih) 1 kebiasaan terbaik yang sudah Anda lakukan, dan 1 kebiasaan yang akan Anda perbaiki minggu depan.'
  }
];

export const CLOSING_MESSAGE = {
  hadits: '"Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya." (HR. Ahmad)',
  reminders: [
    {
      context: 'Ketika Anda belajar Cambridge di jam 4 pagi',
      purpose: 'Anda sedang mempersiapkan diri agar murid-murid Anda mendapat guru terbaik.'
    },
    {
      context: 'Ketika Anda membuat sambal pecel di hari Minggu',
      purpose: 'Anda sedang menyediakan nafkah halal untuk anak-anak Anda.'
    },
    {
      context: 'Ketika Anda mematikan HP dan bermain dengan anak di sore hari',
      purpose: 'Anda sedang menanamkan rasa aman dan cinta yang akan mereka bawa seumur hidup.'
    }
  ],
  footer: 'Allah tidak melihat hasil besar Anda, tapi Allah melihat usaha kecil yang Anda lakukan dengan konsisten. Semoga di usia 40 tahun nanti, Anda bukan hanya bebas finansial, tetapi juga menjadi Ayah, Suami, dan Guru yang dicintai Allah dan Rasul-Nya. Saya doakan setiap langkah Anda diberkahi. Aamiin Ya Rabbal Alamin. 🌙📋🤲'
};

export const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string; icon: string }> = {
  ibadah: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', text: 'text-emerald-700', label: 'Ibadah', icon: 'Sparkles' },
  sains: { bg: 'bg-blue-50 text-blue-700 border-blue-100', text: 'text-blue-700', label: 'Belajar & Sains', icon: 'BookOpen' },
  keluarga: { bg: 'bg-rose-50 text-rose-700 border-rose-100', text: 'text-rose-700', label: 'Keluarga & Anak', icon: 'Heart' },
  karir: { bg: 'bg-violet-50 text-violet-700 border-violet-100', text: 'text-violet-700', label: 'Mengajar / Sekolah', icon: 'GraduationCap' },
  bisnis: { bg: 'bg-amber-50 text-amber-700 border-amber-100', text: 'text-amber-700', label: 'Bisnis & Finansial', icon: 'Briefcase' },
  kesehatan: { bg: 'bg-teal-50 text-teal-700 border-teal-100', text: 'text-teal-700', label: 'Kesehatan Fizikal', icon: 'Activity' },
  evaluasi: { bg: 'bg-indigo-50 text-indigo-700 border-indigo-100', text: 'text-indigo-700', label: 'Evaluasi Diri', icon: 'ClipboardCheck' }
};
