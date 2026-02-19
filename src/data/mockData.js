// src/data/mockData.js

export const educationArticles = [
  {
    id: '1',
    category: 'Meme Kanseri',
    categoryColor: '#E91E8C',
    icon: '🎗️',
    title: 'Meme Kanseri Farkındalığı',
    summary: 'Erken teşhis hayat kurtarır. Belirtiler, tarama yöntemleri ve risk faktörleri hakkında bilgi edinin.',
    readTime: '5 dk',
    content: [
      {
        subtitle: 'Meme Kanseri Nedir?',
        text: 'Meme kanseri, meme hücrelerinin kontrolsüz çoğalmasıyla oluşur. Kadınlarda en sık görülen kanser türlerinden biridir. Erken teşhis ile tedavi başarı oranı %95\'in üzerindedir.',
      },
      {
        subtitle: 'Risk Faktörleri',
        text: '• Aile geçmişi (anne veya kız kardeşte meme kanseri)\n• 50 yaş üstü olmak\n• Uzun süreli hormon tedavisi\n• Obezite ve hareketsiz yaşam tarzı\n• Alkol tüketimi',
      },
      {
        subtitle: 'Belirtiler',
        text: '• Memede ya da koltuk altında şişlik veya kitle\n• Meme şeklinde veya boyutunda değişiklik\n• Meme derisinde kızarıklık veya kalınlaşma\n• Meme başından kan gelmesi\n• Meme başında içe çökme',
      },
      {
        subtitle: 'Kendi Kendine Muayene',
        text: 'Her ay adet bittikten 3-5 gün sonra düzenli kendi kendine meme muayenesi yapılmalıdır. Duş altında veya yatarken yapılabilir. Herhangi bir şüpheli bulguda hemen doktora başvurun.',
      },
      {
        subtitle: 'Tarama Yöntemleri',
        text: 'Mamografi: 40 yaşından itibaren yılda bir\nUltrason: Yoğun meme dokusunda tercih edilir\nMRG: Yüksek riskli bireylerde önerilir\n\nDüzenli tarama erken tanı için kritik önem taşır.',
      },
    ],
  },
  {
    id: '2',
    category: 'Tedavi',
    categoryColor: '#9C27B0',
    icon: '💊',
    title: 'Kemoterapi Süreci',
    summary: 'Kemoterapi tedavisi sırasında neler yaşanır? Yan etkiler ve baş etme yöntemleri.',
    readTime: '7 dk',
    content: [
      {
        subtitle: 'Kemoterapi Nedir?',
        text: 'Kemoterapi, kanser hücrelerini öldürmek veya büyümelerini durdurmak için kullanılan ilaç tedavisidir. Genellikle kürler halinde uygulanır ve aralarında dinlenme süreleri bulunur.',
      },
      {
        subtitle: 'Tedavi Süreci',
        text: 'Her kür genellikle 21 veya 28 günlük döngülerden oluşur. İlaçlar damar yolu ile veya ağızdan alınabilir. Tedavi süresi kanser tipine ve evresine göre değişir.',
      },
      {
        subtitle: 'Sık Görülen Yan Etkiler',
        text: '• Yorgunluk ve halsizlik\n• Bulantı ve kusma\n• Saç dökülmesi (geçici)\n• Enfeksiyona yatkınlık\n• İştah kaybı\n• Ağız yaraları',
      },
      {
        subtitle: 'Baş Etme Yöntemleri',
        text: 'Bol su için, hafif yürüyüşler yapın, sağlıklı beslenin. Destek gruplarına katılın. Yakınlarınızdan yardım isteyin. Psikolog desteği almayı düşünün.',
      },
    ],
  },
  {
    id: '3',
    category: 'Sağlıklı Yaşam',
    categoryColor: '#10B981',
    icon: '🌿',
    title: 'Sağlıklı Yaşam Rehberi',
    summary: 'Kanser riskini azaltmak için beslenme, egzersiz ve yaşam tarzı önerileri.',
    readTime: '4 dk',
    content: [
      {
        subtitle: 'Beslenme',
        text: 'Bol sebze ve meyve tüketin. İşlenmiş gıdalardan kaçının. Kırmızı et tüketimini sınırlayın. Omega-3 açısından zengin balık tüketin. Şeker ve rafine karbonhidratları azaltın.',
      },
      {
        subtitle: 'Egzersiz',
        text: 'Haftada en az 150 dakika orta yoğunlukta egzersiz yapın. Yürüyüş, yüzme veya yoga kanser riskini azaltır. Hareketsiz yaşam tarzından kaçının.',
      },
      {
        subtitle: 'Stres Yönetimi',
        text: 'Kronik stres bağışıklık sistemini zayıflatır. Meditasyon, nefes egzersizleri ve hobiler stresle başa çıkmada etkilidir.',
      },
    ],
  },
  {
    id: '4',
    category: 'Genel Sağlık',
    categoryColor: '#3B82F6',
    icon: '🛡️',
    title: 'Bağışıklık Sistemi',
    summary: 'Güçlü bir bağışıklık sistemi için yapabilecekleriniz.',
    readTime: '3 dk',
    content: [
      {
        subtitle: 'Bağışıklık Sisteminizi Güçlendirin',
        text: 'Yeterli uyku (7-9 saat), dengeli beslenme ve düzenli egzersiz bağışıklık sistemini destekler. D vitamini, çinko ve C vitamini özellikle önemlidir.',
      },
      {
        subtitle: 'Aşılamalar',
        text: 'Güncel aşılarınızı takip edin. HPV aşısı rahim ağzı kanseri riskini önemli ölçüde azaltır. Her yıl grip aşısı yaptırın.',
      },
    ],
  },
];

export const expertQuestions = [
  {
    id: 'q1',
    question: 'Mamografi yaptırmak için doğru yaş nedir?',
    category: 'Tarama & Teşhis',
    status: 'answered',
    date: '2024-01-15',
    answer: '40 yaşından itibaren yılda bir mamografi yaptırmanız önerilir. Aile geçmişinizde meme kanseri varsa bu yaş 30\'a kadar inebilir. Doktorunuzla bireysel risk değerlendirmesi yapmanızı tavsiye ederim.',
    expertName: 'Dr. Ayşe Kaya',
    expertTitle: 'Onkoloji Uzmanı',
  },
  {
    id: 'q2',
    question: 'Kemoterapi sırasında çalışmaya devam edebilir miyim?',
    category: 'Tedavi Süreci',
    status: 'answered',
    date: '2024-01-18',
    answer: 'Bu tamamen kişiye ve tedavinin yoğunluğuna bağlıdır. Bazı hastalar tedavi süresince çalışabilirken, bazıları tam istirahat ihtiyacı duyar. İşvereninizle açık bir iletişim kurmanızı ve doktorunuzun önerilerine göre hareket etmenizi tavsiye ederim.',
    expertName: 'Dr. Fatma Demir',
    expertTitle: 'Medikal Onkoloji Uzmanı',
  },
  {
    id: 'q3',
    question: 'Meme kanseri genetik midir?',
    category: 'Genetik & Risk',
    status: 'pending',
    date: '2024-01-22',
    answer: null,
    expertName: null,
    expertTitle: null,
  },
];

export const categories = [
  'Tarama & Teşhis',
  'Tedavi Süreci',
  'Genetik & Risk',
  'Beslenme & Yaşam',
  'Psikolojik Destek',
  'İlaç & Yan Etki',
  'Diğer',
];

export const timerHistory = [
  { id: 't1', label: 'İlaç Hatırlatıcısı', duration: 480, date: '2024-01-22', completed: true },
  { id: 't2', label: 'Egzersiz Zamanı', duration: 1800, date: '2024-01-21', completed: true },
  { id: 't3', label: 'Muayene Randevu', duration: 600, date: '2024-01-20', completed: false },
];
