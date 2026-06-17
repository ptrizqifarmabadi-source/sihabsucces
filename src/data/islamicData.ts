export interface IslamicItem {
  id: string;
  title: string;
  arabic: string;
  transliteration?: string;
  translation: string;
  countTarget?: number;
  note?: string;
}

export interface IslamicSection {
  id: string;
  title: string;
  description: string;
  items: IslamicItem[];
}

export const NU_DZIKIR_DOA: IslamicSection[] = [
  {
    id: 'nu-sholat',
    title: 'Doa Setelah Shalat Fardhu (Tradisi NU)',
    description: 'Rangkaian doa andalan amalan warga Nahdlatul Ulama setelah shalat lima waktu.',
    items: [
      {
        id: 'nu-istighfar',
        title: '1. Istighfar Agung',
        arabic: 'أَسْتَغْفِرُ اللهَ الْعَظِيْمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْهِ',
        transliteration: 'Astaghfirullahal \'adzhim, alladzi la ilaha illa huwal hayyul qayyumu wa atubu ilaih.',
        translation: 'Aku memohon ampun kepada Allah Yang Maha Agung, tiada Tuhan selain Dia, Yang Maha Hidup lagi terus-menerus mengurus makhluk-Nya, dan aku bertobat kepada-Nya.',
        countTarget: 3,
        note: 'Dibaca 3 kali setelah salam dengan khusyuk'
      },
      {
        id: 'nu-tauhid',
        title: '2. Ikrar Tauhid',
        arabic: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِيْ وَيُمِيْتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
        transliteration: 'La ilaha illallahu wahdahu la syarika lah, lahul mulku wa lahul hamdu yuhyi wa yumitu wa huwa \'ala kulli syai\'in qadir.',
        translation: 'Tiada Tuhan selain Allah yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya segala kekuasaan, dan bagi-Nya segala puji. Dia yang menghidupkan dan yang mematikan, dan Dia Maha Kuasa atas segala sesuatu.',
        countTarget: 3,
        note: 'Dibaca 3 kali (khusus Subuh & Maghrib dibaca 10 kali)'
      },
      {
        id: 'nu-salama',
        title: '3. Doa Keselamatan (Allahumma Antassalam)',
        arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ وَإِلَيْكَ يَعُوْدُ السَّلَامُ فَحَيِّنَا رَبَّنَا بِالسَّلَامِ وَأَدْخِلْنَا الْجَنَّةَ دَارَ السَّلَامِ تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        transliteration: 'Allahumma antas-salam, wa minkas-salam, wa ilaika ya\'udus-salam, fahayyina rabbana bis-salam, wa adkhilnal-jannata daras-salam, tabarakta rabbana wa ta\'alaita ya dzal-jalali wal-ikram.',
        translation: 'Ya Allah, Engkau adalah keselamatan, dari-Mu lah keselamatan, dan kepada-Mu lah kembali keselamatan. Maka hidupkanlah kami, wahai Tuhan kami, dengan keselamatan. Dan masukkanlah kami ke dalam surga, negeri keselamatan. Maha Berkah Engkau, wahai Tuhan kami, dan Maha Tinggi Engkau, wahai Pemilik Keagungan dan Kemuliaan.',
        countTarget: 1,
        note: 'Dibaca 1 kali'
      },
      {
        id: 'nu-tasbih-tahmid-takbir',
        title: '4. Tasbih, Tahmid, & Takbir',
        arabic: 'سُبْحَانَ اللهِ (٣٣إ) • الْحَمْدُ للهِ (٣٣إ) • اللهُ أَكْبَرُ (٣٣إ)',
        transliteration: 'Subhanallah (33x) • Alhamdulillah (33x) • Allahu Akbar (33x)',
        translation: 'Maha Suci Allah (33 kali) • Segala puji bagi Allah (33 kali) • Allah Maha Besar (33 kali)',
        countTarget: 99,
        note: 'Gunakan Tasbih Counter di bawah untuk menghitung 33x masing-masing amalan ini.'
      }
    ]
  },
  {
    id: 'nu-istighosah',
    title: 'Amalan Istighosah & Tahlil Pendek',
    description: 'Amalan andalan warga NU untuk mendekatkan diri kepada Allah SWT serta mendoakan arwah para leluhur.',
    items: [
      {
        id: 'ist-1',
        title: 'Istighfar Taubat',
        arabic: 'أَسْتَغْفِرُ الْلهَ الْعَظِيْمَ لِكُلِّ ذَنْبٍ وَأَتُوْبُ إِلَيْهِ',
        transliteration: 'Astaghfirullahal \'adzhim likulli dzanbin wa atubu ilaih.',
        translation: 'Aku memohon ampun kepada Allah Yang Maha Agung dari setiap dosa, dan aku bertaubat kepada-Nya.',
        countTarget: 11,
        note: 'Dibaca 11 kali'
      },
      {
        id: 'ist-ya-hayyu',
        title: 'Ya Hayyu Ya Qayyum',
        arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
        transliteration: 'Ya Hayyu Ya Qayyumu birahmatika astaghits.',
        translation: 'Wahai Yang Maha Hidup lagi Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan.',
        countTarget: 33,
        note: 'Amalan pengetuk pintu langit'
      },
      {
        id: 'ist-sholawat-jibril',
        title: 'Sholawat Jibril (Penarik Rezeki)',
        arabic: 'صَلَّى اللهُ عَلَى مُحَمَّدٍ',
        transliteration: 'Shallallahu \'ala Muhammad.',
        translation: 'Semoga Allah memberikan rahmat kepada Nabi Muhammad.',
        countTarget: 100,
        note: 'Amalan harian pelancar rezeki & penenang hati'
      }
    ]
  }
];

export const RATIB_AL_HADDAD: IslamicSection = {
  id: 'ratib-haddad',
  title: 'Ratib Al-Haddad (Lengkap)',
  description: 'Amalan dahsyat karya Al-Imam Al-Habib Abdullah bin Alwi Al-Haddad untuk benteng diri, tolak bala, pelancar rezeki, dan ketenteraman rumah tangga.',
  items: [
    {
      id: 'rh-fatihah',
      title: '1. Sura Al-Fatihah (Hadiah Ruh)',
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۞ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۞ الرَّحْمَٰنِ الرَّحِيمِ ۞ مَالِكِ يَوْمِ الدِّينِ ۞ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۞ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۞ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      transliteration: 'Bismillahir-rahmanir-rahim. Alhamdu lillahi rabbil-\'alamin. Ar-rahmanir-rahim. Maliki yawmid-din. Iyyaka na\'budu wa iyyaka nasta\'in. Ihdinas-siratal-mustaqim. Siratal-ladzina an\'amta \'alaihim ghairil-maghdubi \'alaihim walad-dallin.',
      translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam. Maha Pemurah lagi Maha Penyayang. Pemilik Hari Pembalasan. Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. (Yaitu) jalan orang-orang yang telah Engkau anugerahkan nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat.',
      countTarget: 1,
      note: 'Fadhilah pembuka segala kebaikan'
    },
    {
      id: 'rh-kursi',
      title: '2. Ayat Kursi (Benteng Perlindungan)',
      arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
      transliteration: 'Allahu la ilaha illa huwal-hayyul-qayyum, la ta\'khudhuhu sinatuw-wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa\'u \'indahu illa bi-idhnih. Ya\'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bishay\'im-min \'ilmihi illa bima sha\'a. Wasi\'a kursiyyu-hus-samawati wal-arda wa la ya\'uduhu hifdhuhuma wa huwal-\'aliyul-\'adhim.',
      translation: 'Allah, tidak ada Tuhan melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafaat di sisi Allah tanpa izin-Nya. Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Agung.',
      countTarget: 1,
      note: 'Dianjurkan dibaca malam / pagi sebagai pelindung utama'
    },
    {
      id: 'rh-amanar-rasul',
      title: '3. Akhir Surah Al-Baqarah (Amantur-Rasulu / Kecukupan Jiwa)',
      arabic: 'آَمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آَمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ... لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
      transliteration: 'Amanar-rasulu bima unzila ilaihi mir-rabbihi wal-mu\'minun. Kullun amana billahi wa mala\'ikatihi wa kutubishi wa rusulih, la nufarriqu bayna ahadim-mir-rusulih. Wa qalu sami\'na wa ata\'na ghufranaka rabbana wa ilaikal-masir... La yukallifullahu nafsan illa wus\'aha. Laha ma kasabat wa \'alaiha maktasabat. Rabbana la tu\'akhidhna in-nasina aw akhta\'na. Rabbana wa la tahmil \'alaina isran kama hamaltahu \'alal-ladzina min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa\'fu \'anna, waghfir lana, warhamna. Anta mawlana fansurna \'alal-qawmil-kafirin.',
      translation: 'Rasul telah beriman kepada Al-Quran yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang yang beriman. Semuanya beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya dan rasul-rasul-Nya... Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. Ia mendapat pahala yang diusahakannya dan ia mendapat siksa dari kejahatan yang dikerjakannya...',
      countTarget: 1,
      note: 'Siapa yang membaca 2 ayat ini di malam hari, maka akan dicukupkan baginya.'
    },
    {
      id: 'rh-tahlil-haddad',
      title: '4. Ikrar Tauhid Agung',
      arabic: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِيْ وَيُمِيْتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
      transliteration: 'La ilaha illallahu wahdahu la syarika lah, lahul mulku wa lahul hamdu yuhyi wa yumitu wa huwa \'ala kulli syai\'in qadir.',
      translation: 'Tiada Tuhan selain Allah yang Maha Esa, tidak ada sekutu bagi-Nya. Milik-Nyalah kerajaan dan bagi-Nya segala puji. Dia yang menghidupkan dan yang mematikan, dan Dia Maha Kuasa atas segala sesuatu.',
      countTarget: 3,
      note: 'Baca 3 kali'
    },
    {
      id: 'rh-tasbih-1',
      title: '5. Penyucian Allah Yang Maha Agung',
      arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيْمِ',
      transliteration: 'Subhanallahi wa bihamdih, Subhanallahil \'adhim.',
      translation: 'Maha Suci Allah dan segala puji bagi-Nya, Maha Suci Allah Yang Maha Agung.',
      countTarget: 3,
      note: 'Baca 3 kali. Dicintai oleh Ar-Rahman, ringan di lidah, berat di timbangan.'
    },
    {
      id: 'rh-taubat',
      title: '6. Doa Taubat & Istighfar Ratib',
      arabic: 'رَبَّنَا اغْفِرْ لَنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيْمُ',
      transliteration: 'Rabbana-ghfirlana wa tub \'alaina, innaka antat-tawwabur-rahim.',
      translation: 'Wahai Tuhan kami, ampunilah kami dan terimalah tobat kami, sesungguhnya Engkau-lah Yang Maha Penerima Tobat lagi Maha Penyayang.',
      countTarget: 3,
      note: 'Baca 3 kali'
    },
    {
      id: 'rh-sholawat',
      title: '7. Shalawat Atas Baginda Nabi Muhammad SAW',
      arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، اللَّهُمَّ صَلِّ عَلَيْهِ وَسَلِّمْ',
      transliteration: 'Allahumma shalli \'ala Muhammad, Allahumma shalli \'alaihi wa sallim.',
      translation: 'Ya Allah, limpahkanlah rahmat kemuliaan kepada Nabi Muhammad, Ya Allah limpahkan rahmat dan keselamatan kepadanya.',
      countTarget: 3,
      note: 'Baca 3 kali'
    },
    {
      id: 'rh-kalimat-tammah',
      title: '8. Perlindungan dari Sengatan Makhluk Jahat',
      arabic: 'أَعُوْذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      transliteration: 'A\'udzu bi-kalimatillahit-tammaati min syarri ma khalaq.',
      translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa yang diciptakan-Nya.',
      countTarget: 3,
      note: 'Baca 3 kali. Menolak bahaya racun, sihir, and gangguan jin.'
    },
    {
      id: 'rh-bismillah-adza',
      title: '9. Benteng Nama Allah (Bismillahilladzi la yadurru)',
      arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      transliteration: 'Bismillahilladzi la yadurru ma\'asmihi syai\'un fil-ardhi wa la fis-sama\'i wa huwas-sami\'ul-\'alim.',
      translation: 'Dengan menyebut nama Allah, yang dengan nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat membahayakan, dan Dia-lah Yang Maha Mendengar lagi Maha Mengetahui.',
      countTarget: 3,
      note: 'Baca 3 kali pagi & sore. Tameng mutlak dari petaka mendadak.'
    },
    {
      id: 'rh-radhitu',
      title: '10. Ridha dengan Ketentuan Allah',
      arabic: 'رَضِيْنَا بِاللهِ رَبًّا وَبِالْإِسْلَامِ دِيْنًا وَبِمُحَمَّدٍ نَبِيًّا',
      transliteration: 'Radhina billahi rabba, wa bil-Islami dina, wa bi-Muhammadin nabiya.',
      translation: 'Kami ridha Allah sebagai Tuhan kami, Islam sebagai agama kami, dan Nabi Muhammad sebagai Nabi kami.',
      countTarget: 3,
      note: 'Baca 3 kali'
    }
  ]
};

export const MAJMU_SYARIF_KITAB: IslamicSection[] = [
  {
    id: 'ms-surah',
    title: 'Surah Mulia Pilihan (Kunci Majmu\' Syarif)',
    description: 'Surah utama yang masyhur diamalkan siang dan malam untuk melapangkan rezeki, menerangi kubur, dan memberi ketenangan abadi.',
    items: [
      {
        id: 'ms-mulk',
        title: 'Surah Al-Mulk (Ayat 1-5 - Penyelamat Siksa Kubur)',
        arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ۞ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ ۞ الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ ۞ ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ ۞ وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ',
        transliteration: 'Tabarakal-ladhi biyadihil-mulku wa huwa \'ala kulli syai\'in qadir... Alladzi khalaqalmouta walhayata liyabluwakum ayyukum ahsanu \'amala...',
        translation: 'Maha Suci Allah yang menguasai (segala) kerajaan, dan Dia Maha Kuasa atas segala sesuatu. Yang menciptakan mati dan hidup, untuk menguji kamu, siapa di antara kamu yang lebih baik amalnya...',
        countTarget: 1,
        note: 'Dianjurkan dibaca sebelum idul fithr/tidur tiap malam.'
      },
      {
        id: 'ms-waqiah-intro',
        title: 'Keutamaan Surah Al-Waqi\'ah (Kunci Rezeki)',
        arabic: 'إِذَا وَقَعَتِ الْوَاقِعَةُ ۞ لَيْسَ لِوَقَعَتِهَا كَاذِبَةٌ ۞ خَافِضَةٌ رَّافِعَةٌ ۞ إِذَا رُجَّتِ الْأَرْضُ رَجًّا ۞ وَبُسَّتِ الْجِبَالُ بَسًّا ۞ فَكَانَتْ هَبَاءً مُّنبَثًّا',
        transliteration: 'Idha waqa\'atil-waqi\'ah... Laysa li-waqa\'atiha kadhibah...',
        translation: 'Apabila terjadi hari kiamat, tidak seorang pun dapat mendustakan kejadiannya. (Kejadian itu) merendahkan (satu golongan) dan meninggikan (golongan yang lain)...',
        countTarget: 1,
        note: 'Amalan pembuka keran rezeki milik keluarga Sihab. Dibaca setelah shalat ashar atau shalat isya.'
      }
    ]
  },
  {
    id: 'ms-sholawat',
    title: 'Shalawat Agung Majmu\' Syarif',
    description: 'Amalan shalawat yang memiliki fadhilah menembus langit untuk segala rintangan berat.',
    items: [
      {
        id: 'ms-nariyah',
        title: 'Shalawat Nariyah (Pembuka Kesulitan Jalan Hidup)',
        arabic: 'اللَّهُمَّ صَلِّ صَلَاةً كَامِلَةً وَسَلِّمْ سَلَامًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ وَتَنْفَرِجُ بِهِ الْكُرَبُ وَتُقْضَى بِهِ الْحَوَائِجُ وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِمِ وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيمِ وَعَلَى آلِهِ وَصَحْبِهِ فِي كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُومٍ لَكَ',
        transliteration: 'Allahumma shalli shalatan kamilataw wa sallim salaman tamman \'ala sayyidina Muhammadinil-ladzi tanhallu bihil-\'uqadu, wa tanfariju bihil-kurabu, wa tuqda bihil-hawaiju, wa tunalu bihir-ragha\'ibu wa husnul-khawatimi wa yustasqal-ghamamu bi-wajhihil-karimi wa \'ala alihi wa shahbihi fi kulli lamhataw-wa-nafasim bi-\'adadi kulli ma\'lumin lak.',
        translation: 'Ya Allah, limpahkanlah shalawat yang sempurna dan salam yang tuntas kepada junjungan kami Nabi Muhammad, yang dengannya terurai segala ikatan, lenyap segala kesedihan, terpenuhi segala hajat, tercapai segala keinginan dan akhir hidup yang baik (husnul khatimah), serta dicurahkan hujan berkat wajahnya yang mulia, juga kepada keluarga dan para sahabatnya di setiap kedipan mata dan napas, sebanyak bilangan yang Engkau ketahui.',
        countTarget: 1,
        note: 'Amalan pereda kemelut, penenang jiwa, and peluas jalan rezeki.'
      },
      {
        id: 'ms-munjiyat',
        title: 'Shalawat Munjiyat (Penyelamat dari Bahaya)',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الْأَهْوَالِ وَالآفَاتِ وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ وَتَرْفَعُنَا بِهَا عِنْدَكَ أَعْلَى الدَّرَجَاتِ وَتُبَلِّغُنَا بِهَا أَقْصَى الْغَايَاتِ مِنْ جَمِيعِ الْخَيْرَاتِ فِي الْحَيَاةِ وَبَعْدَ الْمَمَاتِ',
        transliteration: 'Allahumma shalli \'ala sayyidina Muhammadin shalatan tunjina biha min jami\'il-ahwali wal-afat, wa taqdi lana biha jami\'al-hajat, wa tutahhiruna biha min jami\'is-sayyi\'at, wa tarfa\'una biha \'indaka a\'lad-darajat, wa tuballighuna biha aqsal-ghayati min jami\'il-khayrati fil-hayati wa ba\'dal-mamat.',
        translation: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad, dengan rahmat yang dapat menyelamatkan kami dari segala ketakutan dan bencana, yang dapat memenuhi segala kebutuhan kami, menyucikan kami dari segala keburukan, mengangkat kami ke derajat tertinggi di sisi-Mu, dan menyampaikan kami pada tujuan terjauh dari segala kebaikan baik di masa hidup maupun setelah mati.',
        countTarget: 1,
        note: 'Penghalau bahaya fisik & batiniah.'
      }
    ]
  }
];
