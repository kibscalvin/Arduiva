// UserInfoScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfo = () => {
  const user = {
    id: '12345',
    name: 'Kibirige Calvin',
    phoneNumber: '+256775910888',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User ID:</Text>
      <Text style={styles.value}>{user.id}</Text>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Phone Number:</Text>
      <Text style={styles.value}>{user.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default UserInfo;
