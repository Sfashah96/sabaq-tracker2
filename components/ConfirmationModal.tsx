// src/components/ConfirmationModal.tsx
import {Colors} from '@/constants/Colors';
import React from 'react';
import {Button, Modal, StyleSheet, useColorScheme, View} from 'react-native';
import {ThemedText, ThemedView} from './ui/Themed';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmationModal({isVisible, onClose, onConfirm, title, message}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <ThemedView style={styles.modalView} lightColor={themeColors.surface} darkColor={themeColors.surface}>
          <ThemedText style={styles.modalTitle}>{title}</ThemedText>
          <ThemedText style={styles.modalMessage}>{message}</ThemedText>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Confirm" onPress={onConfirm} color={themeColors.danger} />
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // ... (use similar styles to AddStudentDialog)
  centeredView: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'},
  modalView: {margin: 20, borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '85%'},
  modalTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  modalMessage: {fontSize: 16, marginBottom: 20, textAlign: 'center'},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-around', width: '100%'}
});
