// src/screens/TimerScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, TextInput, Modal, Alert,
} from 'react-native';
import { timerHistory } from '../data/mockData';
import { colors, spacing, radius, shadows, typography } from '../theme';
import { Button, SectionHeader } from '../components';

const PRESET_TIMERS = [
  { label: 'İlaç (8 dk)', seconds: 480, icon: '💊' },
  { label: 'Egzersiz (30 dk)', seconds: 1800, icon: '🏃‍♀️' },
  { label: 'Su Molası (2 dk)', seconds: 120, icon: '💧' },
  { label: 'Meditasyon (10 dk)', seconds: 600, icon: '🧘‍♀️' },
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function TimerScreen() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState(timerHistory);
  const [showModal, setShowModal] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [customMinutes, setCustomMinutes] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft]);

  const handleTimerComplete = () => {
    Alert.alert('⏰ Süre Doldu!', 'Zamanlayıcınız tamamlandı.', [{ text: 'Tamam' }]);
  };

  const startPreset = (preset) => {
    clearInterval(intervalRef.current);
    setTotalTime(preset.seconds);
    setTimeLeft(preset.seconds);
    setRunning(false);
    setTimeout(() => setRunning(true), 100);
  };

  const handleCustomStart = () => {
    const mins = parseInt(customMinutes, 10);
    if (!customLabel.trim()) { Alert.alert('Hata', 'Hatırlatıcı adı girin.'); return; }
    if (isNaN(mins) || mins <= 0) { Alert.alert('Hata', 'Geçerli bir süre girin.'); return; }
    const seconds = mins * 60;
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setRunning(false);
    setTimeout(() => setRunning(true), 100);
    setShowModal(false);
    setCustomLabel(''); setCustomMinutes('');
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(totalTime);
  };

  const stop = () => {
    if (totalTime > 0 && timeLeft < totalTime) {
      const spent = totalTime - timeLeft;
      setHistory(prev => [{
        id: `t${Date.now()}`,
        label: 'Manuel Zamanlayıcı',
        duration: spent,
        date: new Date().toISOString().split('T')[0],
        completed: false,
      }, ...prev]);
    }
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(0);
    setTotalTime(0);
  };

  const progress = totalTime > 0 ? (timeLeft / totalTime) : 0;
  const circumference = 2 * Math.PI * 90;
  const strokeDash = progress * circumference;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⏱️ Hatırlatıcı</Text>
          <Text style={styles.headerSub}>İlaç, randevu ve sağlık takibi</Text>
        </View>

        {/* Timer Ring */}
        <View style={styles.timerContainer}>
          {/* SVG-like ring using View borders */}
          <View style={styles.ringOuter}>
            <View style={[styles.ringProgress, {
              borderColor: timeLeft === 0 ? colors.border : colors.primary,
            }]}>
              <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
              <Text style={styles.timeLabel}>
                {running ? '▶ Çalışıyor' : timeLeft === 0 ? 'Hazır' : '⏸ Duraklatıldı'}
              </Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            {!running && timeLeft === 0 ? (
              <Button title="Özel Zamanlayıcı +" onPress={() => setShowModal(true)} />
            ) : (
              <View style={styles.controlRow}>
                <TouchableOpacity style={styles.controlBtn} onPress={reset}>
                  <Text style={styles.controlBtnText}>↺</Text>
                  <Text style={styles.controlBtnLabel}>Sıfırla</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.mainControlBtn, running && styles.pauseBtn]}
                  onPress={() => setRunning(!running)}
                >
                  <Text style={styles.mainControlText}>{running ? '⏸' : '▶'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={stop}>
                  <Text style={styles.controlBtnText}>⏹</Text>
                  <Text style={styles.controlBtnLabel}>Durdur</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Presets */}
        <SectionHeader title="Hızlı Başlat" />
        <View style={styles.presets}>
          {PRESET_TIMERS.map(preset => (
            <TouchableOpacity
              key={preset.label}
              style={styles.presetCard}
              onPress={() => startPreset(preset)}
              activeOpacity={0.8}
            >
              <Text style={styles.presetIcon}>{preset.icon}</Text>
              <Text style={styles.presetLabel}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* History */}
        <SectionHeader title={`Geçmiş (${history.length})`} />
        <View style={styles.historyList}>
          {history.slice(0, 5).map(item => (
            <View key={item.id} style={styles.historyItem}>
              <View style={[styles.historyDot, { backgroundColor: item.completed ? colors.success : colors.warning }]} />
              <View style={styles.historyInfo}>
                <Text style={styles.historyLabel}>{item.label}</Text>
                <Text style={styles.historyMeta}>{formatTime(item.duration)} · {item.date}</Text>
              </View>
              <Text style={styles.historyStatus}>{item.completed ? '✅' : '⚠️'}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Custom Timer Modal */}
      <Modal visible={showModal} animationType="slide" presentationStyle="formSheet">
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Özel Zamanlayıcı</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.inputLabel}>Hatırlatıcı Adı</Text>
            <TextInput
              style={styles.input}
              placeholder="Örn: İlaç Zamanı"
              placeholderTextColor={colors.textLight}
              value={customLabel}
              onChangeText={setCustomLabel}
            />
            <Text style={styles.inputLabel}>Süre (Dakika)</Text>
            <TextInput
              style={styles.input}
              placeholder="Örn: 30"
              placeholderTextColor={colors.textLight}
              keyboardType="numeric"
              value={customMinutes}
              onChangeText={setCustomMinutes}
            />
            <Button title="Başlat" onPress={handleCustomStart} style={{ marginTop: spacing.lg }} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg },
  headerTitle: { ...typography.h2, color: colors.text },
  headerSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },

  timerContainer: { alignItems: 'center', marginBottom: spacing.xl },
  ringOuter: { width: 200, height: 200, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  ringProgress: {
    width: 180, height: 180, borderRadius: 90,
    borderWidth: 8, alignItems: 'center', justifyContent: 'center',
    ...shadows.strong,
  },
  timeText: { fontSize: 44, fontWeight: '800', color: colors.text, fontVariantNumeric: 'tabular-nums' },
  timeLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 4, textTransform: 'none' },

  controls: { width: '100%', alignItems: 'center' },
  controlRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  controlBtn: { alignItems: 'center', padding: spacing.sm },
  controlBtnText: { fontSize: 28, color: colors.textSecondary },
  controlBtnLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 4, textTransform: 'none' },
  mainControlBtn: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    ...shadows.strong,
  },
  pauseBtn: { backgroundColor: colors.warning },
  mainControlText: { fontSize: 28 },

  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  presetCard: {
    flex: 1, minWidth: '45%',
    backgroundColor: colors.primaryLight, borderRadius: radius.md,
    padding: spacing.md, alignItems: 'center',
    borderWidth: 1, borderColor: colors.primary + '30',
  },
  presetIcon: { fontSize: 26, marginBottom: 6 },
  presetLabel: { ...typography.bodySmall, color: colors.primary, textAlign: 'center', fontWeight: '600' },

  historyList: { gap: spacing.xs, marginBottom: spacing.md },
  historyItem: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.surface, padding: spacing.md,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
  },
  historyDot: { width: 10, height: 10, borderRadius: 5 },
  historyInfo: { flex: 1 },
  historyLabel: { ...typography.label, color: colors.text },
  historyMeta: { ...typography.bodySmall, color: colors.textSecondary },
  historyStatus: { fontSize: 18 },

  modalSafe: { flex: 1, backgroundColor: colors.background },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalTitle: { ...typography.h3, color: colors.text },
  modalClose: { fontSize: 20, color: colors.textSecondary },
  modalBody: { padding: spacing.md },
  inputLabel: { ...typography.label, color: colors.text, marginBottom: spacing.xs, marginTop: spacing.md },
  input: {
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.md, ...typography.body, color: colors.text,
  },
});
