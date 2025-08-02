// src/app/(tabs)/index.tsx
import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {ActivityIndicator, FlatList, Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';

import {AddStudentDialog} from '@/components/AddStudentDialog';
import {ConfirmationModal} from '@/components/ConfirmationModal';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {ThemedText, ThemedView} from '@/components/ui/Themed';
import {Colors} from '@/constants/Colors';
import {useDatabase} from '@/hooks/useDatabase';
import {Student} from '@/types';
import {useColorScheme} from 'react-native';

// Student Card Component (can be in its own file: components/StudentCard.tsx)
function StudentCard({student, onPress, onDelete}: {student: Student; onPress: () => void; onDelete: () => void}) {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.card, {shadowColor: themeColors.text}]} lightColor={themeColors.surface} darkColor={themeColors.surface}>
        <ThemedText style={styles.cardText}>{student.name}</ThemedText>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <IconSymbol name="trash.fill" size={22} color={themeColors.danger} />
        </TouchableOpacity>
      </ThemedView>
    </Pressable>
  );
}

export default function TrackerScreen() {
  const {students, isLoading, addStudent, deleteStudent: deleteStudentFromDB} = useDatabase();
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  const handleAddStudent = async (name: string) => {
    try {
      await addStudent(name);
      Toast.show({type: 'success', text1: 'Student Added!', text2: `${name} has been added to your list.`});
    } catch (e) {
      Toast.show({type: 'error', text1: 'Error', text2: 'Could not add student.'});
      console.error(e);
    }
  };

  const openDeleteConfirmation = (student: Student) => {
    setStudentToDelete(student);
    setConfirmModalVisible(true);
  };

  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudentFromDB(studentToDelete.id);
      Toast.show({type: 'success', text1: 'Student Deleted'});
    } catch (e) {
      Toast.show({type: 'error', text1: 'Error', text2: 'Could not delete student.'});
    } finally {
      setConfirmModalVisible(false);
      setStudentToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={themeColors.tint} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <StudentCard student={item} onPress={() => router.push(`/student/${item.id}`)} onDelete={() => openDeleteConfirmation(item)} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <ThemedText style={{fontSize: 18, opacity: 0.7}}>No students yet.</ThemedText>
            <ThemedText style={{opacity: 0.5}}>Tap the '+' to add one!</ThemedText>
          </View>
        )}
      />

      <Pressable style={[styles.fab, {backgroundColor: themeColors.tint}]} onPress={() => setAddModalVisible(true)}>
        <IconSymbol name="plus" size={28} color="#FFF" />
      </Pressable>

      <AddStudentDialog isVisible={isAddModalVisible} onClose={() => setAddModalVisible(false)} onAdd={handleAddStudent} />

      {studentToDelete && <ConfirmationModal isVisible={isConfirmModalVisible} onClose={() => setConfirmModalVisible(false)} onConfirm={handleDeleteStudent} title="Delete Student" message={`Are you sure you want to delete ${studentToDelete.name}? All their records will be lost.`} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8},
  listContent: {padding: 16, paddingBottom: 100},
  card: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  cardText: {fontSize: 18, fontWeight: '500'},
  deleteButton: {padding: 8},
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  }
});
