import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

const EPayCard = () => {
  const { balance, userName } = useSelector(state => state.user);

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
        <Text style={styles.balanceAmount}>UGX {balance.toLocaleString()}</Text>
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
