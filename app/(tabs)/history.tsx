// src/app/(tabs)/history.tsx
import {format} from 'date-fns';
import {useFocusEffect} from 'expo-router';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import {IconSymbol} from '@/components/ui/IconSymbol';
import {ThemedText, ThemedView} from '@/components/ui/Themed';
import {Colors} from '@/constants/Colors';
import {getSurahById} from '@/data/quran';
import * as db from '@/db';
import {DailyRecordWithStudentName} from '@/types';
import {useColorScheme} from 'react-native';

// Helper to format a lesson record into a readable string
function formatLesson(surahId: number | null, from: number | null, to: number | null): string {
  if (!surahId) return 'N/A';
  const surah = getSurahById(surahId);
  if (!surah) return 'Unknown Surah';

  let text = `${surah.name}`;
  if (from && to) {
    text += ` (${from}-${to})`;
  } else if (from) {
    text += ` (${from})`;
  }
  return text;
}

function HistoryCard({record}: {record: DailyRecordWithStudentName}) {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  const sabaqText = formatLesson(record.sabaq_surah_id, record.sabaq_from_ayah, record.sabaq_to_ayah);
  const sabqiText = formatLesson(record.sabqi_surah_id, record.sabqi_from_ayah, record.sabqi_to_ayah);
  const manzilText = record.manzil_juz_id ? `Juz ${record.manzil_juz_id}` : 'N/A';

  const isZuhrCompleted = Boolean(record.zuhr);
  const isMaghribCompleted = Boolean(record.maghrib);

  return (
    <ThemedView
      style={[
        styles.card,
        {
          borderColor: themeColors.border,
          shadowColor: themeColors.text,
          backgroundColor: themeColors.surface
        }
      ]}
    >
      <View style={styles.cardHeader}>
        <ThemedText style={styles.cardTitle}>{record.student_name}</ThemedText>
        <ThemedText style={styles.cardDate}>{format(new Date(record.date), 'MMMM d, yyyy')}</ThemedText>
      </View>
      <View style={styles.cardBody}>
        <ThemedText>
          <ThemedText style={{fontWeight: 'bold'}}>Sabaq:</ThemedText> {sabaqText}
        </ThemedText>
        <ThemedText>
          <ThemedText style={{fontWeight: 'bold'}}>Sabqi:</ThemedText> {sabqiText}
        </ThemedText>
        <ThemedText>
          <ThemedText style={{fontWeight: 'bold'}}>Manzil:</ThemedText> {manzilText}
        </ThemedText>
      </View>
      <View style={styles.prayerSection}>
        <PrayerStatus label="Zuhr" completed={isZuhrCompleted} />
        <PrayerStatus label="Maghrib" completed={isMaghribCompleted} />
      </View>
    </ThemedView>
  );
}

const PrayerStatus = ({label, completed}: {label: string; completed: boolean}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const color = completed ? themeColors.success : themeColors.danger;
  return (
    <View style={styles.prayerStatus}>
      <IconSymbol name="checkmark.circle.fill" color={color} size={16} />
      <ThemedText style={{color, marginLeft: 4}}>{label}</ThemedText>
    </View>
  );
};

export default function HistoryScreen() {
  const [records, setRecords] = useState<DailyRecordWithStudentName[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  useFocusEffect(
    useCallback(() => {
      async function loadHistory() {
        setIsLoading(true);
        try {
          const allRecords: any = await db.getAllRecordsWithStudentNames();
          setRecords(allRecords);
        } catch (e) {
          console.error('Failed to load history', e);
        } finally {
          setIsLoading(false);
        }
      }
      loadHistory();
    }, [])
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={themeColors.tint} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{flex: 1}}>
      <FlatList
        data={records}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}) => <HistoryCard record={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <ThemedText style={{fontSize: 18, opacity: 0.7}}>No records found.</ThemedText>
            <ThemedText style={{opacity: 0.5}}>Saved progress will appear here.</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8},
  listContent: {padding: 16},
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  cardTitle: {fontSize: 18, fontWeight: 'bold'},
  cardDate: {fontSize: 14, opacity: 0.8},
  cardBody: {
    gap: 6,
    marginBottom: 12
  },
  prayerSection: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  prayerStatus: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
