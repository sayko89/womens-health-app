# 🌸 Women's Health App

> Kadın sağlığına odaklanan; kanser farkındalığı, lab test yükleme, uzman danışma ve sağlık takibi sunan mobil uygulama.

---

## 📸 Ekranlar

| Ana Sayfa | Eğitim | Uzman Sor | Test Yükle | Hatırlatıcı |
|-----------|--------|-----------|------------|-------------|
| Dashboard, modül kartları | Makaleler, kategori filtresi | Soru listesi, yanıt takibi | Dosya yükleme, geçmiş | Zamanlayıcı, preset'ler |

---

## 🎯 Problem & Hedef Kullanıcı

**Problem:** Türkiye'de kadınların büyük çoğunluğu kanser tarama testlerini zamanında yaptırmıyor, sağlık belgelerini düzensiz takip ediyor ve uzmanlara kolayca ulaşamıyor.

**Hedef Kullanıcı:** 30-60 yaş arası kadınlar; sağlık takibini dijitalleştirmek isteyen, sağlık okuryazarlığını artırmak isteyen bireyler.

**Çözüm:** Eğitim, belge yönetimi, uzman erişimi ve hatırlatıcıları tek uygulamada birleştiren bir sağlık asistanı.

---

## 🛠 Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | React Native |
| Platform | Expo (SDK 51) |
| Navigasyon | React Navigation (Bottom Tabs + Native Stack) |
| UI | Custom Design System (tema değişkenleri) |
| State | React useState / useEffect |
| Veri | Mock data (ileride Firebase entegrasyonu) |
| Dosya Seçme | expo-image-picker, expo-document-picker |
| Bildirimler | expo-notifications |

---

## 📁 Proje Yapısı

```
womens-health-app/
├── App.js                  # Giriş noktası
├── app.json                # Expo konfigürasyonu
├── package.json
├── babel.config.js
└── src/
    ├── navigation/
    │   └── AppNavigator.js  # Stack + Tab navigasyon
    ├── screens/
    │   ├── HomeScreen.js    # Dashboard
    │   ├── EducationScreen.js  # Eğitim & makale detayı
    │   ├── ExpertQAScreen.js   # Soru sor & yanıt takibi
    │   ├── UploadScreen.js     # Lab testi yükleme
    │   ├── TimerScreen.js      # Zamanlayıcı & hatırlatıcı
    │   └── ProfileScreen.js    # Profil & ayarlar
    ├── components/
    │   └── index.js         # Card, Button, Badge, EmptyState vb.
    ├── data/
    │   └── mockData.js      # Örnek veri (makaleler, sorular, geçmiş)
    └── theme/
        └── index.js         # Renkler, typography, spacing, shadow
```

---

## 🚀 Kurulum & Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Expo Go (telefonda) veya Android Emülatör

### Adımlar

```bash
# 1. Repoyu klonla
git clone https://github.com/KULLANICI_ADI/womens-health-app.git
cd womens-health-app

# 2. Bağımlılıkları yükle
npm install

# 3. Uygulamayı başlat
npx expo start

# 4. QR kodu tara (Expo Go uygulamasıyla)
#    veya 'a' tuşuna bas (Android emülatör)
```

### APK Build (Production)

```bash
# EAS CLI kur
npm install -g eas-cli

# Expo hesabına giriş yap
eas login

# Build al
eas build --platform android --profile preview
```

---

## 🧩 Modüller

### 1. 🏠 Ana Sayfa (Dashboard)
- Tüm modüllere kart tabanlı navigasyon
- Günlük sağlık ipuçları
- Acil yardım hattı kısayolu

### 2. 📚 Eğitim Merkezi
- Kategori bazlı filtreleme (Tümü, Meme Kanseri, Tedavi, Sağlıklı Yaşam)
- Makale detay modal (tam içerik, disclaimer)
- Scrollable rich content

### 3. 💬 Uzman Sor
- Soru gönderme formu (kategori + validation)
- Durum takibi (Bekliyor / Yanıtlandı)
- Yanıt detay ekranı (uzman adı, uzmanlık)
- Stats: toplam / yanıtlanan / bekleyen

### 4. 🧪 Test Yükle
- Kamera, galeri ve PDF seçimi
- Upload progress bar (simüle)
- Yüklenen belgeler listesi (silme özelliği)
- Güvenlik bilgi bandı

### 5. ⏱️ Hatırlatıcı
- Görsel countdown ring
- Preset zamanlayıcılar (ilaç, egzersiz vb.)
- Özel zamanlayıcı modal (ad + süre)
- Geçmiş listesi

### 6. 👤 Profil
- Kullanıcı istatistikleri
- Bildirim toggle'ları
- Şifre değiştir, veri export
- Çıkış yap ve hesap silme (confirm dialog)

---

## 🎨 Tasarım Kararları

- **Renk paleti:** Pembe/mor gradient → kadın sağlığı için sıcak, erişilebilir
- **Loading/Error/Empty states:** Tüm async işlemlerde tanımlandı
- **Validasyon:** Form alanlarında inline error gösterimi
- **Türkçe UI:** Tüm metinler Türkçe (hedef kullanıcıya uygun)
- **Güvenlik:** Alert dialog'lar destructive işlemler için (silme, çıkış)

---

## 📝 Geliştirme Notları 

Bu projeyi geliştirirken panodaki teknik debt analizinden şu kararları verdim:

1. **Mock data kullandım** → Gerçek Firebase entegrasyonu yerine, hızlı prototipleme için. Auth sistemi sonraki aşamada.
2. **Cascade delete alert** → Hesap silme işleminde kullanıcıya açık uyarı gösterdim.
3. **Validasyon eklendi** → Soru formunda minimum karakter + kategori zorunlu.
4. **Loading state her yerde** → Upload progress, form submit loading state.
5. **Empty state'ler** → Henüz veri olmadığında yönlendirici mesajlar.

---

📱 Uygulama Çıktısı
🔗 Expo Link

Bu proje Expo ile geliştirilmiştir.

Projeyi Expo Go üzerinden çalıştırmak için:

Telefonuna Expo Go uygulamasını indir.

Aşağıdaki linki aç veya QR kodu okut:

https://expo.dev/@kullaniciadi/womens-health-app


Not: Eğer link aktif değilse, projeyi çalıştırmak için:

npm install
npx expo start

📦 APK (Android Build)

Android APK dosyasını indirmek için:

https://expo.dev/artifacts/eas/your-apk-link


APK, Expo EAS Build kullanılarak oluşturulmuştur.

📝 Proje Notu
🎯 Hedef Kullanıcı Kitlesi

18–40 yaş arası kadınlar

Regl takibi yapmak isteyen kullanıcılar

Günlük sağlık verilerini basit bir arayüzle takip etmek isteyenler

Sağlık konusunda farkındalığını artırmak isteyen mobil kullanıcılar

❓ Çözmek İstenen Problem

Birçok kadın, regl döngüsü ve genel sağlık durumunu takip etmek için ya karmaşık uygulamalar kullanmak zorunda kalıyor ya da düzenli kayıt tutamıyor.

Bu uygulama ile amaç:

Basit ve anlaşılır bir arayüz sunmak

Regl takibini kolaylaştırmak

Günlük semptom kayıtlarını pratik hale getirmek

Kullanıcının kendi sağlık verisini görselleştirmesini sağlamak

Karmaşık ve reklam dolu uygulamalara alternatif olarak sade bir deneyim sunmak hedeflenmiştir.

🎨 İlham ve Tasarım Kararları

Tasarım sürecinde:

Yumuşak tonlar ve pastel renkler kullanılarak güvenli ve sakin bir hissiyat oluşturuldu.

Minimal ve sade bir arayüz tercih edildi.

Kadın sağlığı temasına uygun olarak modern, ferah ve okunabilir bir UI tasarlandı.

Ekranlar arası geçişler basit tutuldu, kullanıcıyı yormayan bir navigasyon akışı oluşturuldu.

Panodan alınan ilham doğrultusunda:

Feminen ama klişe olmayan bir renk paleti seçildi.

Bilgi yoğunluğu azaltıldı.

Kart yapıları ve boşluk kullanımıyla ferah bir tasarım hedeflendi.

## 👩‍💻 Geliştirici

**Safiye Özkan** 

