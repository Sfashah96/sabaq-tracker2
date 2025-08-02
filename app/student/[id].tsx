// src/app/student/[id].tsx
import {Picker} from '@react-native-picker/picker';
import {format} from 'date-fns';
import {useLocalSearchParams, useRouter} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, ScrollView, StyleSheet, Switch, TextInput, View} from 'react-native';
import Toast from 'react-native-toast-message';

import {ThemedText, ThemedView} from '@/components/ui/Themed';
import {Colors} from '@/constants/Colors';
import {getSurahById, juz, surahs} from '@/data/quran';
import * as db from '@/db';
import {DailyRecord, Student} from '@/types';
import {useColorScheme} from 'react-native';

const LessonPicker = ({label, selectedSurah, selectedFrom, selectedTo, onSurahChange, onFromChange, onToChange}: {label: string; selectedSurah: number | null; selectedFrom: number | null; selectedTo: number | null; onSurahChange: (value: number | null) => void; onFromChange: (value: string) => void; onToChange: (value: string) => void}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const surahData = selectedSurah ? getSurahById(selectedSurah) : null;
  const ayahOptions = surahData ? Array.from({length: surahData.totalAyahs}, (_, i) => i + 1) : [];

  return (
    <View style={styles.lessonPickerContainer}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={[styles.picker, {backgroundColor: themeColors.surface, borderColor: themeColors.border}]}>
        <Picker selectedValue={selectedSurah} onValueChange={onSurahChange} style={{color: themeColors.text}}>
          <Picker.Item label="Select Surah..." value={null} />
          {surahs.map(s => (
            <Picker.Item key={s.id} label={`${s.id}. ${s.name}`} value={s.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.ayahContainer}>
        <TextInput
          placeholder="From"
          keyboardType="number-pad"
          value={selectedFrom?.toString() || ''}
          onChangeText={onFromChange}
          style={[
            styles.ayahInput,
            {
              color: themeColors.text,
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border
            }
          ]}
        />
        <TextInput
          placeholder="To"
          keyboardType="number-pad"
          value={selectedTo?.toString() || ''}
          onChangeText={onToChange}
          style={[
            styles.ayahInput,
            {
              color: themeColors.text,
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border
            }
          ]}
        />
      </View>
    </View>
  );
};

const ToggleRow = ({label, value, onValueChange}: {label: string; value: boolean; onValueChange: (val: boolean) => void}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <View style={[styles.row, styles.toggleRow]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <Switch trackColor={{false: themeColors.icon, true: themeColors.success}} thumbColor={value ? themeColors.tint : themeColors.surface} onValueChange={onValueChange} value={value} />
    </View>
  );
};

export default function StudentDetailScreen() {
  const {id} = useLocalSearchParams<{id: string}>();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [record, setRecord] = useState<Partial<Omit<DailyRecord, 'id' | 'student_id' | 'date'>>>({
    sabaq_surah_id: null,
    sabaq_from_ayah: null,
    sabaq_to_ayah: null,
    sabqi_surah_id: null,
    sabqi_from_ayah: null,
    sabqi_to_ayah: null,
    manzil_juz_id: null,
    zuhr: false,
    maghrib: false
  });
  const [isLoading, setIsLoading] = useState(true);

  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setIsLoading(true);
      const studentId = parseInt(id, 10);
      try {
        const [studentData, recordData] = await Promise.all([db.getStudentById(studentId), db.getRecordForDate(studentId, today)]);

        setStudent(studentData);
        if (recordData) {
          setRecord(recordData);
        } else {
          setRecord({
            sabaq_surah_id: null,
            sabaq_from_ayah: null,
            sabaq_to_ayah: null,
            sabqi_surah_id: null,
            sabqi_from_ayah: null,
            sabqi_to_ayah: null,
            manzil_juz_id: null,
            zuhr: false,
            maghrib: false
          });
        }
      } catch (e) {
        console.error('Failed to load student data', e);
        Toast.show({type: 'error', text1: 'Error loading data'});
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id, today]);

  const updateField = (field: keyof typeof record, value: any) => {
    if (field.includes('ayah')) {
      value = value ? parseInt(value, 10) : null;
    }
    setRecord(prev => ({...prev, [field]: value}));
  };

  const handleSave = async () => {
    if (!id || !student) return;
    try {
      await db.addOrUpdateDailyRecord({
        student_id: parseInt(id, 10),
        date: today,
        sabaq_surah_id: record.sabaq_surah_id || null,
        sabaq_from_ayah: record.sabaq_from_ayah || null,
        sabaq_to_ayah: record.sabaq_to_ayah || null,
        sabqi_surah_id: record.sabqi_surah_id || null,
        sabqi_from_ayah: record.sabqi_from_ayah || null,
        sabqi_to_ayah: record.sabqi_to_ayah || null,
        manzil_juz_id: record.manzil_juz_id || null,
        zuhr: record.zuhr || false,
        maghrib: record.maghrib || false
      });
      Toast.show({type: 'success', text1: 'Record Saved!', text2: `Progress for ${student.name} has been saved.`});
      router.back();
    } catch (e) {
      console.error('Failed to save record', e);
      Toast.show({type: 'error', text1: 'Save Failed', text2: 'Could not save the record.'});
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={themeColors.tint} />
      </ThemedView>
    );
  }

  if (!student) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Student not found.</ThemedText>
        <Button title="Go Back" onPress={() => router.back()} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.title}>{student.name}</ThemedText>
        <ThemedText style={styles.date}>{format(new Date(), 'EEEE, MMMM d, yyyy')}</ThemedText>

        <LessonPicker label="Sabaq (New Lesson)" selectedSurah={record.sabaq_surah_id ?? null} selectedFrom={record.sabaq_from_ayah ?? null} selectedTo={record.sabaq_to_ayah ?? null} onSurahChange={val => updateField('sabaq_surah_id', val)} onFromChange={val => updateField('sabaq_from_ayah', val)} onToChange={val => updateField('sabaq_to_ayah', val)} />

        <LessonPicker label="Sabqi (Revision)" selectedSurah={record.sabqi_surah_id ?? null} selectedFrom={record.sabqi_from_ayah ?? null} selectedTo={record.sabqi_to_ayah ?? null} onSurahChange={val => updateField('sabqi_surah_id', val)} onFromChange={val => updateField('sabqi_from_ayah', val)} onToChange={val => updateField('sabqi_to_ayah', val)} />

        <View style={styles.lessonPickerContainer}>
          <ThemedText style={styles.label}>Manzil (Old Revision)</ThemedText>
          <View style={[styles.picker, {backgroundColor: themeColors.surface, borderColor: themeColors.border}]}>
            <Picker selectedValue={record.manzil_juz_id} onValueChange={val => updateField('manzil_juz_id', val)} style={{color: themeColors.text}}>
              <Picker.Item label="Select Juz..." value={null} />
              {juz.map(j => (
                <Picker.Item key={j.id} label={j.name} value={j.id} />
              ))}
            </Picker>
          </View>
        </View>

        <ToggleRow label="Zuhr Prayer" value={record.zuhr || false} onValueChange={val => updateField('zuhr', val)} />
        <ToggleRow label="Maghrib Prayer" value={record.maghrib || false} onValueChange={val => updateField('maghrib', val)} />

        <View style={styles.saveButtonContainer}>
          <Button title="Save Today's Record" onPress={handleSave} color={themeColors.tint} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 24,
    gap: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 16
  },
  row: {
    marginBottom: 12
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.9
  },
  saveButtonContainer: {
    marginTop: 24,
    paddingHorizontal: 20
  },
  lessonPickerContainer: {
    marginBottom: 20
  },
  picker: {
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center'
  },
  ayahContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  ayahInput: {
    width: '48%',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'center'
  }
});
