// src/screens/EducationScreen.js

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Modal, StatusBar,
} from 'react-native';
import { educationArticles } from '../data/mockData';
import { colors, spacing, radius, shadows, typography } from '../theme';
import { CategoryChip, SectionHeader } from '../components';

const allCategories = ['Tümü', ...new Set(educationArticles.map(a => a.category))];

export default function EducationScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filtered = selectedCategory === 'Tümü'
    ? educationArticles
    : educationArticles.filter(a => a.category === selectedCategory);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 Eğitim Merkezi</Text>
          <Text style={styles.headerSub}>{filtered.length} makale</Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {allCategories.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>

        {/* Article List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {filtered.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onPress={() => setSelectedArticle(article)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Article Detail Modal */}
      <Modal
        visible={!!selectedArticle}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedArticle(null)}
      >
        {selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
}

function ArticleCard({ article, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.articleCard, shadows.card]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.articleRow}>
        <View style={[styles.iconContainer, { backgroundColor: article.categoryColor + '20' }]}>
          <Text style={styles.articleIcon}>{article.icon}</Text>
        </View>
        <View style={styles.articleInfo}>
          <View style={[styles.catBadge, { backgroundColor: article.categoryColor + '15' }]}>
            <Text style={[styles.catBadgeText, { color: article.categoryColor }]}>
              {article.category}
            </Text>
          </View>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleSummary} numberOfLines={2}>{article.summary}</Text>
          <Text style={styles.readTime}>⏱ {article.readTime} okuma</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ArticleDetail({ article, onClose }) {
  return (
    <SafeAreaView style={styles.detailSafe}>
      {/* Detail Header */}
      <View style={[styles.detailHeader, { backgroundColor: article.categoryColor }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕ Kapat</Text>
        </TouchableOpacity>
        <Text style={styles.detailIcon}>{article.icon}</Text>
        <Text style={styles.detailCategory}>{article.category}</Text>
        <Text style={styles.detailTitle}>{article.title}</Text>
        <Text style={styles.detailMeta}>⏱ {article.readTime} okuma</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>💡 {article.summary}</Text>
        </View>

        {article.content.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            <Text style={styles.sectionBody}>{section.text}</Text>
          </View>
        ))}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚕️ Bu içerik genel bilgi amaçlıdır. Sağlık kararları için doktorunuza danışın.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  header: { padding: spacing.md, paddingBottom: spacing.sm },
  headerTitle: { ...typography.h2, color: colors.text },
  headerSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  filterRow: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm, gap: spacing.xs },
  list: { padding: spacing.md, paddingTop: 0, paddingBottom: spacing.xxl },

  articleCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.border,
  },
  articleRow: { flexDirection: 'row', gap: spacing.md },
  iconContainer: { width: 56, height: 56, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  articleIcon: { fontSize: 28 },
  articleInfo: { flex: 1 },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full, marginBottom: 6 },
  catBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  articleTitle: { ...typography.label, color: colors.text, fontSize: 15, marginBottom: 4 },
  articleSummary: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 6 },
  readTime: { ...typography.caption, color: colors.textLight, textTransform: 'none' },

  // Detail Modal
  detailSafe: { flex: 1, backgroundColor: colors.background },
  detailHeader: { padding: spacing.lg, paddingTop: spacing.xl },
  closeBtn: { alignSelf: 'flex-start', marginBottom: spacing.md },
  closeBtnText: { color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontSize: 14 },
  detailIcon: { fontSize: 40, marginBottom: spacing.xs },
  detailCategory: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  detailTitle: { ...typography.h2, color: '#fff', marginBottom: spacing.xs },
  detailMeta: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  detailContent: { padding: spacing.md },
  summaryBox: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryText: { ...typography.body, color: colors.primaryDark, lineHeight: 22 },
  section: { marginBottom: spacing.lg },
  sectionSubtitle: { ...typography.h3, color: colors.text, marginBottom: spacing.xs },
  sectionBody: { ...typography.body, color: colors.textSecondary, lineHeight: 24 },
  disclaimer: {
    backgroundColor: '#F8F9FA',
    borderRadius: radius.md,
    padding: spacing.md,
    marginVertical: spacing.lg,
    borderLeftWidth: 3, borderLeftColor: colors.info,
  },
  disclaimerText: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 19 },
});
