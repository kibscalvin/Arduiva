import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const PaymentOptionsPage = () => {
  const [selectedOption, setSelectedOption] = useState('cash');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
        <View>
            <Text style = {styles.choice}>
                Choose how you want to pay for these servicesg.
            </Text>
        </View>
        
     <View style = {styles.childContainer}>
     <TouchableOpacity
        style={[styles.option, selectedOption === 'cash' && styles.selectedOption]}
        onPress={() => handleOptionSelect('cash')}
      >
        <FontAwesome name="money" size={24} color="#000" />
        <Text style={styles.optionText}>Cash</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, selectedOption === 'ePay' && styles.selectedOption]}
        onPress={() => handleOptionSelect('ePay')}
      >
        <FontAwesome name="credit-card" size={24} color="#000" />
        <Text style={styles.optionText}>E-Pay</Text>
      </TouchableOpacity>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    paddingHorizontal: 16
  },
  childContainer : {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16

  },
  choice : {
    fontFamily: 'Asap-Medium',
    fontSize: 24
  },
  
  
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 40,
    marginBottom: 10,
    marginHorizontal: 4
  },
  selectedOption: {
    borderColor: '#00FF00', // Green color for selected option
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default PaymentOptionsPage;
