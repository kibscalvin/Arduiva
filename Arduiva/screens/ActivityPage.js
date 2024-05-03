import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const RoadsideAssistanceLogs = () => {
  // Dummy data to simulate logs (replace with data fetched from Firebase later)
  const [logs, setLogs] = useState([
    { id: '1', title: 'Flat Tire', body: 'Tire repaired on Highway 101' },
    { id: '2', title: 'Fuel Refill', body: 'Refueled at Shell station' },
    { id: '3', title: 'Battery Jumpstart', body: 'Jumpstart performed in parking lot' },
    { id: '4', title: 'Towing Service', body: 'Tow truck called for assistance' },
    { id: '5', title: 'Flat Tire', body: 'Tire replaced with spare' },
    { id: '6', title: 'Fuel Refill', body: 'Fuel delivered to roadside location' },
    { id: '7', title: 'Battery Jumpstart', body: 'Car battery replaced with new one' },
    { id: '8', title: 'Towing Service', body: 'Vehicle towed to nearest service center' },
    { id: '9', title: 'Flat Tire', body: 'Tire patched and reinflated' },
    { id: '10', title: 'Fuel Refill', body: 'Fuel tank drained and refilled' },
    // Add more log items here
  ]);

  //  Function to fetch data from Firebase (to be implemented, currently using dummy data)
  const fetchLogsFromFirebase = () => {
    // Logic to fetch logs from Firebase API
    // Once data is fetched, this updates the logs state
  };

  // useEffect hook to fetch data from Firebase when component mounts, still learning how it works
  useEffect(() => {
    fetchLogsFromFirebase();
  }, []);

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log(item)}  >
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>

      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={logs}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator = {false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    
  },
  body: {
    fontSize: 16,
    color: '#86868b',
    fontFamily: 'PTSans_400Regular',
  },
});

export default RoadsideAssistanceLogs;
