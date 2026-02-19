// src/screens/UploadScreen.js

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  FlatList, Alert, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { colors, spacing, radius, shadows, typography } from '../theme';
import { Button, StatusBadge, EmptyState, LoadingSpinner } from '../components';

const MOCK_UPLOADS = [
  { id: 'u1', name: 'Kan_Tahlili_Ocak.pdf', type: 'pdf', size: '1.2 MB', date: '2024-01-20', status: 'uploaded' },
  { id: 'u2', name: 'Mamografi_Sonucu.jpg', type: 'image', size: '3.4 MB', date: '2024-01-15', status: 'uploaded' },
];

export default function UploadScreen() {
  const [uploads, setUploads] = useState(MOCK_UPLOADS);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Fotoğraf galerisine erişim izni gerekiyor.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) simulateUpload(result.assets[0].fileName || 'Goruntu.jpg', 'image');
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Kamera erişim izni gerekiyor.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled) simulateUpload('Kamera_Foto.jpg', 'image');
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'] });
      if (result.assets && result.assets.length > 0) {
        simulateUpload(result.assets[0].name, 'pdf');
      }
    } catch (e) {
      Alert.alert('Hata', 'Dosya seçilirken bir sorun oluştu.');
    }
  };

  const simulateUpload = (fileName, type) => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          const newUpload = {
            id: `u${Date.now()}`,
            name: fileName,
            type,
            size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
            date: new Date().toISOString().split('T')[0],
            status: 'uploaded',
          };
          setUploads(prev => [newUpload, ...prev]);
          Alert.alert('✅ Başarılı', `"${fileName}" başarıyla yüklendi.`);
          return 0;
        }
        return prev + 12;
      });
    }, 150);
  };

  const deleteUpload = (id) => {
    Alert.alert('Dosyayı Sil', 'Bu belgeyi silmek istediğinizden emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => setUploads(prev => prev.filter(u => u.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🧪 Test Yükle</Text>
          <Text style={styles.headerSub}>Lab sonuçlarınızı güvenli saklayın</Text>
        </View>

        {/* Upload Buttons */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Belge Ekle</Text>
          <View style={styles.uploadButtons}>
            {[
              { icon: '📷', label: 'Kamera', onPress: pickFromCamera },
              { icon: '🖼️', label: 'Galeri', onPress: pickFromGallery },
              { icon: '📄', label: 'PDF / Dosya', onPress: pickDocument },
            ].map(btn => (
              <TouchableOpacity
                key={btn.label}
                style={styles.uploadBtn}
                onPress={btn.onPress}
                disabled={uploading}
                activeOpacity={0.8}
              >
                <Text style={styles.uploadBtnIcon}>{btn.icon}</Text>
                <Text style={styles.uploadBtnLabel}>{btn.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Progress Bar */}
          {uploading && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Yükleniyor...</Text>
                <Text style={styles.progressPct}>{Math.min(uploadProgress, 100)}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: `${Math.min(uploadProgress, 100)}%` }]} />
              </View>
            </View>
          )}
        </View>

        {/* Security Notice */}
        <View style={styles.securityBadge}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>Belgeleriniz uçtan uca şifreli olarak güvenle saklanır.</Text>
        </View>

        {/* Upload History */}
        <Text style={[styles.sectionTitle, { paddingHorizontal: spacing.md }]}>
          Yüklenen Belgeler ({uploads.length})
        </Text>
        <FlatList
          data={uploads}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState icon="📁" title="Henüz Belge Yok" subtitle="Yukarıdan ilk belgenizi yükleyin." />
          }
          renderItem={({ item }) => (
            <View style={[styles.uploadCard, shadows.card]}>
              <View style={styles.fileIcon}>
                <Text style={styles.fileIconText}>{item.type === 'pdf' ? '📄' : '🖼️'}</Text>
              </View>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.fileMeta}>{item.size} · {item.date}</Text>
                <StatusBadge status={item.status} />
              </View>
              <TouchableOpacity onPress={() => deleteUpload(item.id)} style={styles.deleteBtn}>
                <Text style={styles.deleteBtnText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  header: { padding: spacing.md, paddingBottom: spacing.sm },
  headerTitle: { ...typography.h2, color: colors.text },
  headerSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },

  uploadSection: { backgroundColor: colors.surface, margin: spacing.md, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border, ...shadows.card },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  uploadButtons: { flexDirection: 'row', gap: spacing.sm },
  uploadBtn: {
    flex: 1, backgroundColor: colors.primaryLight,
    borderRadius: radius.md, padding: spacing.md,
    alignItems: 'center', borderWidth: 1.5, borderColor: colors.primary + '40',
  },
  uploadBtnIcon: { fontSize: 28, marginBottom: 6 },
  uploadBtnLabel: { ...typography.caption, color: colors.primary, textTransform: 'none', textAlign: 'center' },

  progressContainer: { marginTop: spacing.md },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { ...typography.bodySmall, color: colors.textSecondary },
  progressPct: { ...typography.label, color: colors.primary },
  progressTrack: { height: 8, backgroundColor: colors.primaryLight, borderRadius: 4, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },

  securityBadge: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: '#F0FDF4', borderRadius: radius.md,
    marginHorizontal: spacing.md, padding: spacing.sm,
    marginBottom: spacing.md, borderWidth: 1, borderColor: '#BBF7D0',
  },
  securityIcon: { fontSize: 18 },
  securityText: { ...typography.bodySmall, color: '#166534', flex: 1 },

  list: { padding: spacing.md, paddingTop: 0, paddingBottom: spacing.xxl },
  uploadCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.border,
  },
  fileIcon: { width: 48, height: 48, backgroundColor: colors.primaryLight, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  fileIconText: { fontSize: 24 },
  fileInfo: { flex: 1, gap: 4 },
  fileName: { ...typography.label, color: colors.text },
  fileMeta: { ...typography.bodySmall, color: colors.textSecondary },
  deleteBtn: { padding: spacing.xs },
  deleteBtnText: { fontSize: 20 },
});
