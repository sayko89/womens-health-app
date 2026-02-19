// src/screens/HomeScreen.js

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../theme';

const modules = [
  {
    id: 'education',
    icon: '📚',
    title: 'Eğitim Merkezi',
    subtitle: 'Kanser farkındalığı & sağlıklı yaşam',
    color: '#E91E8C',
    bg: '#FCE4F3',
    tab: 'Education',
  },
  {
    id: 'expert',
    icon: '💬',
    title: 'Uzman Sor',
    subtitle: 'Doktorlara soru sor, yanıt al',
    color: '#9C27B0',
    bg: '#F3E5F5',
    tab: 'ExpertQA',
  },
  {
    id: 'upload',
    icon: '🧪',
    title: 'Test Yükle',
    subtitle: 'Lab sonuçlarını güvenli yükle',
    color: '#3B82F6',
    bg: '#EFF6FF',
    tab: 'Upload',
  },
  {
    id: 'timer',
    icon: '⏱️',
    title: 'Hatırlatıcı',
    subtitle: 'İlaç & randevu zamanlayıcısı',
    color: '#10B981',
    bg: '#ECFDF5',
    tab: 'Timer',
  },
];

const quickTips = [
  { icon: '🎗️', text: 'Ayda bir meme muayenesi yapın' },
  { icon: '💧', text: 'Günde 8 bardak su için' },
  { icon: '🚶‍♀️', text: '30 dk yürüyüş kanser riskini azaltır' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Merhaba 👋</Text>
            <Text style={styles.tagline}>Sağlığın için buradayız</Text>
          </View>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileEmoji}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>🎗️ Farkındalık Ayı</Text>
            <Text style={styles.heroTitle}>Erken teşhis{'\n'}hayat kurtarır.</Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => navigation.navigate('Education')}
            >
              <Text style={styles.heroButtonText}>Daha Fazla Bilgi →</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.heroIllustration}>🌸</Text>
        </View>

        {/* Modules Grid */}
        <Text style={styles.sectionTitle}>Modüller</Text>
        <View style={styles.grid}>
          {modules.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.moduleCard, { backgroundColor: m.bg }, shadows.card]}
              activeOpacity={0.82}
              onPress={() => navigation.navigate(m.tab)}
            >
              <Text style={styles.moduleIcon}>{m.icon}</Text>
              <Text style={[styles.moduleTitle, { color: m.color }]}>{m.title}</Text>
              <Text style={styles.moduleSubtitle}>{m.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Tips */}
        <Text style={styles.sectionTitle}>Günün İpuçları</Text>
        <View style={styles.tipsCard}>
          {quickTips.map((tip, i) => (
            <View key={i} style={[styles.tipRow, i < quickTips.length - 1 && styles.tipBorder]}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          ))}
        </View>

        {/* Emergency */}
        <TouchableOpacity style={styles.emergencyCard} activeOpacity={0.85}>
          <Text style={styles.emergencyIcon}>🆘</Text>
          <View style={styles.emergencyTextBlock}>
            <Text style={styles.emergencyTitle}>Acil Yardım Hattı</Text>
            <Text style={styles.emergencySubtitle}>182 · Sağlık Bakanlığı ALO</Text>
          </View>
          <Text style={styles.emergencyArrow}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greeting: { ...typography.caption, color: colors.textSecondary, textTransform: 'uppercase' },
  tagline: { ...typography.h2, color: colors.text, marginTop: 2 },
  profileBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  profileEmoji: { fontSize: 20 },

  heroBanner: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.strong,
  },
  heroContent: { flex: 1 },
  heroLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', lineHeight: 28, marginBottom: 14 },
  heroButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: radius.full, alignSelf: 'flex-start',
  },
  heroButtonText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  heroIllustration: { fontSize: 64, marginLeft: spacing.md },

  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm, marginTop: spacing.xs },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  moduleCard: {
    width: '47.5%', borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.04)',
  },
  moduleIcon: { fontSize: 30, marginBottom: spacing.sm },
  moduleTitle: { ...typography.label, fontSize: 15, marginBottom: 3 },
  moduleSubtitle: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 17 },

  tipsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    marginBottom: spacing.md, overflow: 'hidden',
    ...shadows.card,
  },
  tipRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.sm },
  tipBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  tipIcon: { fontSize: 22 },
  tipText: { ...typography.body, color: colors.text, flex: 1 },

  emergencyCard: {
    backgroundColor: '#FFF1F2',
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: '#FECDD3',
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  emergencyIcon: { fontSize: 28 },
  emergencyTextBlock: { flex: 1 },
  emergencyTitle: { ...typography.label, color: colors.error, fontSize: 15 },
  emergencySubtitle: { ...typography.bodySmall, color: '#9CA3AF' },
  emergencyArrow: { fontSize: 18, color: colors.error, fontWeight: '700' },
});
