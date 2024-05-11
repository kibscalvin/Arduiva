import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const PaymentOptionsPage = () => {
  const [selectedOption, setSelectedOption] = useState('cash');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
        <View style={styles.choiceContainer}>
  <Text style={styles.choice}>Default Payment Method</Text>
</View>

        
     <View style = {styles.childContainer}>
     <TouchableOpacity
        style={[styles.option, selectedOption === 'cash' && styles.selectedOptionCash]}
        onPress={() => handleOptionSelect('cash')}
      >
        <FontAwesome name="money" size={24} color="#00be76" />
        <Text style={[styles.optionText, {color: '#00be76'}]}>Cash</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, selectedOption === 'ePay' && styles.selectedOptionEpay]}
        onPress={() => handleOptionSelect('ePay')}
      >
        <FontAwesome name="credit-card" size={24} color="#1896c9" />
        <Text style={[styles.optionText, {color : '#1896c9'}]}>E-Pay</Text>
      </TouchableOpacity>
     </View>
     <View style = {styles.depositTextContainer} >
     <Text style = {styles.depositText}>
      Add money to your Emergency Wallet
      </Text>
     </View>
     <View style = {styles.deposit}>
      <View style = {{marginRight : 8}}>
      <FontAwesome name = 'plus' size = {24} color = 'green'/>
      </View> 
   

      <Text style = {{fontFamily: 'Asap-Medium', fontSize: 20, marginLeft: 16}}>Deposit </Text>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
    alignItems: 'center',
    //justifyContent: 'center',
    paddingHorizontal: 16,
   // backgroundColor: '#f4f9e6'
  },
  childContainer : {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
   




  },
  choice : {
    fontFamily: 'Asap-Medium',
    fontSize: 18,
    color: '#86868b',
    marginTop: 16,
    textAlign: 'left',
    marginRight: 48
  },
  choiceContainer: {
    alignSelf: 'flex-start', // Align children to the start (left) of the container
    marginBottom: 16, // Adjust as needed
    backgroundColor: '#F3F6FC', // Set a background color
    

  },
  deposit: {
    backgroundColor: '#F3F6FC', // Set a background color
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000', // Set a shadow color
    shadowOpacity: 0.3, // Set the opacity of the shadow
    shadowRadius: 5, // Set the radius of the shadow
    elevation: 5, // Set the elevation (Android only)
  },
  
  depositText : {
    fontSize : 14,
    //textAlign: 'left',
    justifyContent: 'center',
   // alignItems: 'center',
    marginVertical: 8,
    color: '#86868b',
    fontFamily: 'Asap-Medium'

    

  },
  depositTextContainer : {
    alignSelf: 'flex-start',
    marginBottom: 16,



  },
  
  
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 40,
    marginBottom: 10,
    marginHorizontal: 4,
    width: 160,
    height: 160
  },
  selectedOption: {
    borderColor: 'green', // Green color for selected option( thinl about this one E1FF40)
    elevation: 5, // Set the elevation (Android only)
    backgroundColor: '#F3F6FC', // Set a background color
    shadowColor: 'green', // Set a shadow color
  },
  selectedOptionCash: {
    borderColor: 'green', // Green color for selected option( thinl about this one E1FF40)
    elevation: 5, // Set the elevation (Android only)
    backgroundColor: '#e4f7ee', // Set a background color
    shadowColor: 'green', // Set a shadow color

  },
  selectedOptionEpay:{
    borderColor: '#1896c9', // Green color for selected option( thinl about this one E1FF40)
    elevation: 5, // Set the elevation (Android only)
    backgroundColor: '#e1f7fc', // Set a background color
    shadowColor: 'green', // Set a shadow color

  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default PaymentOptionsPage;
