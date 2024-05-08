import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const DarkModeModal = ({ darkModeEnabled, onDarkModeToggle }) => {
  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Dark Mode</Text>
      <Switch value={darkModeEnabled} onValueChange={onDarkModeToggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default DarkModeModal;
