import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EPayCard = () => {
  // State variables to hold the account balance and user's name
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');

  // Function to fetch updated balance and user's name (example)
  const fetchData = () => {
    // Simulated API call to fetch data
    // Replace this with actual API integration
    const updatedBalance = 231900; // Example balance
    const formattedBalance = updatedBalance.toLocaleString();
    const fetchedUserName = 'Calvin'; // Example user name
    setBalance(updatedBalance);
    setUserName(fetchedUserName);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={['#f0f0f0', '#cccccc']} // Light to dark gradient colors
      start={{ x: 0, y: 0 }} // Start from the top left corner
      end={{ x: 1, y: 0 }} // End at the top right corner
      style={styles.gradientContainer}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.userName}>Hello, {userName}</Text>
        <Text style={styles.balanceText}>Remaining Balance:</Text>
        <Text style={styles.balanceAmount}>UGX{balance}</Text>
        {/* "Add funds" button */}
        <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add funds')}>
          <Text style={styles.addButtonText}>+ Add Funds</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 10,
    padding: 20,
    width: '95%',
    alignSelf: 'center',
    marginTop: 40,
    height: 200,
    // Glassmorphism effect styles
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',   
    elevation: 8,
  },
  cardContainer: {
    backgroundColor: 'transparent', // Set background color to transparent
  },
  userName: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Asap-Bold', 
  },
  balanceText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'PTMono-Regular', 
  },
  balanceAmount: {
    fontSize: 24,
    color: '#a5b4b4',
    marginBottom: 20,
    fontFamily: 'PTMono-Regular', 
  },
  addButton: {
    backgroundColor: '#223a3a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start', // Align button to the left
    
  },
  addButtonText: {
    color: '#a5b4b4',
  },
});

export default EPayCard;
