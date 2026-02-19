// src/screens/ProfileScreen.js

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Alert, Switch,
} from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../theme';
import { Divider } from '../components';

const MOCK_USER = {
  name: 'Kullanıcı Adı',
  email: 'kullanici@email.com',
  joinDate: 'Ocak 2024',
  testsUploaded: 2,
  questionsAsked: 3,
};

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkmak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış Yap', style: 'destructive', onPress: () => Alert.alert('Çıkış yapıldı (demo)') },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '⚠️ Hesabı Sil',
      'Bu işlem geri alınamaz. Tüm verileriniz (belgeler, sorular, geçmiş) kalıcı olarak silinecektir.',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Hesabı Sil', style: 'destructive', onPress: () => Alert.alert('Hesap silindi (demo)') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarRing}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.userName}>{MOCK_USER.name}</Text>
          <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
          <Text style={styles.joinDate}>📅 {MOCK_USER.joinDate}'dan beri üye</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { icon: '🧪', value: MOCK_USER.testsUploaded, label: 'Test Yüklendi' },
            { icon: '💬', value: MOCK_USER.questionsAsked, label: 'Soru Soruldu' },
            { icon: '📚', value: 4, label: 'Makale Okundu' },
          ].map(s => (
            <View key={s.label} style={styles.statBox}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>🔔 Uzman Yanıtları</Text>
              <Text style={styles.settingDesc}>Sorularınız yanıtlandığında bildirim al</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={notifications ? colors.primary : '#f4f3f4'}
            />
          </View>
          <Divider />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>⏰ Zamanlayıcı Bildirimleri</Text>
              <Text style={styles.settingDesc}>İlaç ve randevu hatırlatmaları</Text>
            </View>
            <Switch
              value={reminders}
              onValueChange={setReminders}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={reminders ? colors.primary : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Account Actions */}
        <Text style={styles.sectionTitle}>Hesap</Text>
        <View style={styles.settingsCard}>
          {[
            { icon: '🔒', label: 'Şifre Değiştir', onPress: () => Alert.alert('Şifre değiştir (demo)'), color: colors.text },
            { icon: '📤', label: 'Verilerimi Dışa Aktar', onPress: () => Alert.alert('Dışa aktarma (demo)'), color: colors.text },
            { icon: '🚪', label: 'Çıkış Yap', onPress: handleLogout, color: colors.warning },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity style={styles.actionRow} onPress={item.onPress} activeOpacity={0.7}>
                <Text style={styles.actionIcon}>{item.icon}</Text>
                <Text style={[styles.actionLabel, { color: item.color }]}>{item.label}</Text>
                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>
              {i < arr.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>⚠️ Tehlikeli Bölge</Text>
          <Text style={styles.dangerDesc}>Hesabınızı silmek tüm verilerinizi kalıcı olarak kaldırır.</Text>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
            <Text style={styles.deleteBtnText}>Hesabı Kalıcı Olarak Sil</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Women's Health App v1.0.0 · Built with ❤️</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },

  profileHeader: { alignItems: 'center', paddingVertical: spacing.lg },
  avatarRing: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: colors.primary + '40', marginBottom: spacing.md,
  },
  avatarEmoji: { fontSize: 40 },
  userName: { ...typography.h2, color: colors.text },
  userEmail: { ...typography.body, color: colors.textSecondary, marginTop: 4 },
  joinDate: { ...typography.bodySmall, color: colors.textLight, marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  statBox: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border,
    ...shadows.card,
  },
  statIcon: { fontSize: 22, marginBottom: 4 },
  statValue: { ...typography.h2, color: colors.primary, fontWeight: '800' },
  statLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center', marginTop: 2, textTransform: 'none', lineHeight: 15 },

  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm, marginTop: spacing.sm },

  settingsCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg, ...shadows.card,
  },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.md },
  settingInfo: { flex: 1 },
  settingLabel: { ...typography.label, color: colors.text },
  settingDesc: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },

  actionRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.sm },
  actionIcon: { fontSize: 20, width: 28 },
  actionLabel: { ...typography.label, flex: 1, fontSize: 15 },
  actionArrow: { fontSize: 20, color: colors.textLight },

  dangerCard: {
    backgroundColor: '#FEF2F2', borderRadius: radius.lg,
    borderWidth: 1, borderColor: '#FECACA', padding: spacing.md, marginBottom: spacing.lg,
  },
  dangerTitle: { ...typography.label, color: colors.error, marginBottom: 6 },
  dangerDesc: { ...typography.bodySmall, color: '#9CA3AF', marginBottom: spacing.md },
  deleteBtn: { backgroundColor: colors.error, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  deleteBtnText: { color: '#fff', fontWeight: '700' },

  version: { ...typography.caption, color: colors.textLight, textAlign: 'center', marginTop: spacing.md, textTransform: 'none' },
});
