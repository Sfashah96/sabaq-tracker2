// src/components/AddStudentDialog.tsx
import {Colors} from '@/constants/Colors';
import React, {useState} from 'react';
import {Button, KeyboardAvoidingView, Modal, Platform, StyleSheet, TextInput, useColorScheme, View} from 'react-native';
import {ThemedText, ThemedView} from './ui/Themed';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddStudentDialog({isVisible, onClose, onAdd}: Props) {
  const [name, setName] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
      onClose();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
        <ThemedView style={styles.modalView} lightColor={themeColors.surface} darkColor={themeColors.surface}>
          <ThemedText style={styles.modalTitle}>Add New Student</ThemedText>
          <TextInput placeholder="Student's Name" placeholderTextColor={themeColors.icon} style={[styles.input, {color: themeColors.text, borderColor: themeColors.border, backgroundColor: themeColors.background}]} value={name} onChangeText={setName} autoFocus />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color={themeColors.danger} />
            <Button title="Add" onPress={handleAdd} disabled={!name.trim()} />
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});
