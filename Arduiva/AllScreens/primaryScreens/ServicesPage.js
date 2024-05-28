import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Importing icons from Font Awesome

// Define the services and their icons
const services = [
  { id: '1', name: 'Fuel Refill', icon: 'gas-pump' },
  { id: '2', name: 'Battery Jumpstart', icon: 'battery-full' },
  { id: '3', name: 'Key Retrieval', icon: 'key' },
  { id: '4', name: 'Schedule Service', icon: 'calendar-alt' },
  { id: '5', name: 'Tow Service', icon: 'truck' },
  { id: '6', name: 'Car Not Starting', icon: 'car-crash' },
  { id: '7', name: 'Been or Seen an Accident?', icon: 'exclamation-triangle' },
  { id: '8', name: 'Electric Car Charge', icon: 'bolt' },
];

const ServicesOffered = () => {
  // Function to render each service tile
  const renderItem = ({ item }) => (
    <View style={styles.tile}>
      <FontAwesome5 name={item.icon} size={24} color="#333" />
      <Text style={styles.serviceName}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={services}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      numColumns={2} // Display two tiles per row
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3F6FC',
    flex: 1
  },
  tile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceName: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Asap-Regular',
    color: '#86868b',
  },
});

export default ServicesOffered;
