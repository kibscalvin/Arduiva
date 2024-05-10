import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement logic to switch between dark and light mode
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Settings</Text> */}
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Display</Text>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
      </View>
      {/* Add more categories and settings here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
    padding: 20,
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Asap-Medium',
    color: '#86868b'
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingText: {
    fontSize: 18,
    fontFamily: 'Asap-Medium',
  },
});

export default SettingsPage;
