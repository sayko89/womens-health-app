// src/screens/ExpertQAScreen.js

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, Modal, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { expertQuestions, categories } from '../data/mockData';
import { colors, spacing, radius, shadows, typography } from '../theme';
import { Card, StatusBadge, Button, EmptyState, CategoryChip, Divider } from '../components';

export default function ExpertQAScreen() {
  const [questions, setQuestions] = useState(expertQuestions);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? questions
    : questions.filter(q => q.status === activeFilter);

  const handleAskSuccess = (newQ) => {
    setQuestions(prev => [newQ, ...prev]);
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>💬 Uzman Sor</Text>
            <Text style={styles.headerSub}>Doktorlarımız 24-48 saat içinde yanıtlıyor</Text>
          </View>
          <TouchableOpacity style={styles.askBtn} onPress={() => setShowModal(true)}>
            <Text style={styles.askBtnText}>+ Sor</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {[['all', 'Tümü'], ['pending', 'Bekleyen'], ['answered', 'Yanıtlananlar']].map(([val, label]) => (
            <CategoryChip
              key={val}
              label={label}
              selected={activeFilter === val}
              onPress={() => setActiveFilter(val)}
            />
          ))}
        </ScrollView>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Toplam', value: questions.length, color: colors.text },
            { label: 'Yanıtlandı', value: questions.filter(q => q.status === 'answered').length, color: colors.success },
            { label: 'Bekliyor', value: questions.filter(q => q.status === 'pending').length, color: colors.warning },
          ].map(s => (
            <View key={s.label} style={styles.statItem}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Question List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {filtered.length === 0
            ? <EmptyState
                icon="💭"
                title="Henüz Soru Yok"
                subtitle="İlk sorunuzu uzmanlarımıza sorun."
                action="Soru Sor"
                onAction={() => setShowModal(true)}
              />
            : filtered.map(q => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  onPress={() => setSelectedQuestion(q)}
                />
              ))
          }
        </ScrollView>
      </View>

      {/* Ask Modal */}
      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet">
        <AskModal onClose={() => setShowModal(false)} onSuccess={handleAskSuccess} />
      </Modal>

      {/* Detail Modal */}
      <Modal visible={!!selectedQuestion} animationType="slide" presentationStyle="pageSheet">
        {selectedQuestion && (
          <QuestionDetail
            question={selectedQuestion}
            onClose={() => setSelectedQuestion(null)}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
}

function QuestionCard({ question, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.questionCard, shadows.card]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.qTop}>
        <View style={styles.catBadge}>
          <Text style={styles.catText}>{question.category}</Text>
        </View>
        <StatusBadge status={question.status} />
      </View>
      <Text style={styles.questionText} numberOfLines={2}>{question.question}</Text>
      <View style={styles.qMeta}>
        <Text style={styles.qDate}>📅 {question.date}</Text>
        {question.status === 'answered' && (
          <Text style={styles.expertName}>👩‍⚕️ {question.expertName}</Text>
        )}
      </View>
      {question.answer && (
        <View style={styles.answerPreview}>
          <Text style={styles.answerPreviewText} numberOfLines={2}>
            💡 {question.answer}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function QuestionDetail({ question, onClose }) {
  return (
    <SafeAreaView style={styles.detailSafe}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.backBtn}>← Geri</Text>
        </TouchableOpacity>
        <StatusBadge status={question.status} />
      </View>
      <ScrollView style={styles.detailScroll}>
        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>KATEGORİ</Text>
          <Text style={styles.detailCategory}>{question.category}</Text>
        </View>
        <Divider />
        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>SORU</Text>
          <Text style={styles.detailQuestion}>{question.question}</Text>
          <Text style={styles.qDate}>📅 {question.date}</Text>
        </View>
        {question.answer ? (
          <>
            <Divider />
            <View style={[styles.detailSection, styles.answerSection]}>
              <Text style={[styles.detailLabel, { color: colors.success }]}>UZMAN YANITI</Text>
              <View style={styles.expertInfo}>
                <Text style={styles.expertEmoji}>👩‍⚕️</Text>
                <View>
                  <Text style={styles.expertNameLarge}>{question.expertName}</Text>
                  <Text style={styles.expertTitle}>{question.expertTitle}</Text>
                </View>
              </View>
              <Text style={styles.answerText}>{question.answer}</Text>
            </View>
          </>
        ) : (
          <View style={styles.pendingInfo}>
            <Text style={styles.pendingIcon}>⏳</Text>
            <Text style={styles.pendingText}>Sorunuz uzman onayı bekleniyor. 24-48 saat içinde yanıtlanacak.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function AskModal({ onClose, onSuccess }) {
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!question.trim() || question.length < 20) e.question = 'Sorunuz en az 20 karakter olmalıdır.';
    if (!selectedCategory) e.category = 'Lütfen bir kategori seçin.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newQuestion = {
        id: `q${Date.now()}`,
        question: question.trim(),
        category: selectedCategory,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        answer: null,
        expertName: null,
        expertTitle: null,
      };
      setLoading(false);
      onSuccess(newQuestion);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.modalSafe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Soru Sor</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalClose}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalBody}>
          {/* Category */}
          <Text style={styles.inputLabel}>Kategori *</Text>
          <View style={styles.categoryGrid}>
            {categories.map(cat => (
              <CategoryChip
                key={cat}
                label={cat}
                selected={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
              />
            ))}
          </View>
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

          {/* Question Input */}
          <Text style={styles.inputLabel}>Sorunuz *</Text>
          <TextInput
            style={[styles.textArea, errors.question && styles.inputError]}
            placeholder="Sorunuzu buraya yazın... (min. 20 karakter)"
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={5}
            value={question}
            onChangeText={setQuestion}
            maxLength={1000}
          />
          <Text style={styles.charCount}>{question.length}/1000</Text>
          {errors.question && <Text style={styles.errorText}>{errors.question}</Text>}

          {/* Info box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              ℹ️ Sorularınız gizli tutulur. Uzman doktorlarımız 24-48 saat içinde yanıtlar. Bu platform acil tıbbi durumlar için uygun değildir.
            </Text>
          </View>

          <Button title="Soru Gönder" onPress={handleSubmit} loading={loading} style={{ margin: spacing.md }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, paddingBottom: spacing.sm },
  headerTitle: { ...typography.h2, color: colors.text },
  headerSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  askBtn: { backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 10, borderRadius: radius.full },
  askBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  filters: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm, gap: spacing.xs },

  statsRow: { flexDirection: 'row', marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadows.card, borderWidth: 1, borderColor: colors.border },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { ...typography.h2, fontWeight: '800' },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2, textTransform: 'none' },

  list: { padding: spacing.md, paddingTop: 0, paddingBottom: spacing.xxl },
  questionCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  qTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  catBadge: { backgroundColor: colors.primaryLight, paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.full },
  catText: { color: colors.primary, fontSize: 10, fontWeight: '700' },
  questionText: { ...typography.label, color: colors.text, fontSize: 15, marginBottom: spacing.sm, lineHeight: 22 },
  qMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  qDate: { ...typography.bodySmall, color: colors.textLight },
  expertName: { ...typography.bodySmall, color: colors.success },
  answerPreview: { backgroundColor: '#F0FDF4', borderRadius: radius.sm, padding: spacing.sm, marginTop: spacing.sm },
  answerPreviewText: { ...typography.bodySmall, color: '#166534', lineHeight: 18 },

  // Detail
  detailSafe: { flex: 1, backgroundColor: colors.background },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { ...typography.label, color: colors.primary, fontSize: 15 },
  detailScroll: { padding: spacing.md },
  detailSection: { paddingVertical: spacing.md },
  detailLabel: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs },
  detailCategory: { ...typography.label, color: colors.primary },
  detailQuestion: { ...typography.h3, color: colors.text, marginBottom: spacing.xs, lineHeight: 26 },
  answerSection: { backgroundColor: '#F0FDF4', borderRadius: radius.md, padding: spacing.md },
  expertInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  expertEmoji: { fontSize: 32 },
  expertNameLarge: { ...typography.label, color: colors.success },
  expertTitle: { ...typography.bodySmall, color: colors.textSecondary },
  answerText: { ...typography.body, color: '#166534', lineHeight: 24 },
  pendingInfo: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, backgroundColor: '#FFF7ED', borderRadius: radius.md, margin: spacing.md, alignItems: 'flex-start' },
  pendingIcon: { fontSize: 24 },
  pendingText: { ...typography.body, color: '#92400E', flex: 1, lineHeight: 22 },

  // Modal
  modalSafe: { flex: 1, backgroundColor: colors.background },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalTitle: { ...typography.h3, color: colors.text },
  modalClose: { fontSize: 20, color: colors.textSecondary, padding: 4 },
  modalBody: { padding: spacing.md },
  inputLabel: { ...typography.label, color: colors.text, marginBottom: spacing.sm, marginTop: spacing.md },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.xs },
  textArea: {
    backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.md,
    ...typography.body, color: colors.text,
    minHeight: 120, textAlignVertical: 'top',
  },
  inputError: { borderColor: colors.error },
  charCount: { ...typography.caption, color: colors.textLight, textAlign: 'right', marginTop: 4, textTransform: 'none' },
  errorText: { ...typography.bodySmall, color: colors.error, marginTop: 4 },
  infoBox: { backgroundColor: '#EFF6FF', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md, borderLeftWidth: 3, borderLeftColor: colors.info },
  infoText: { ...typography.bodySmall, color: '#1E40AF', lineHeight: 19 },
});
