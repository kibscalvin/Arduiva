import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentOptions = () => {
  return (
    <View style={styles.paymentMethods}>
      <Text style={styles.paymentTitle}>Funding Methods</Text>
      <TouchableOpacity style={styles.paymentOption}>
        <View style={styles.paymentOptionContent}>
        <MaterialIcons name="attach-money" size={24} color="#a5b4b4" />
          <Text style={styles.paymentText}>MTN Momo</Text>
         
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#a5b4b4" />
      </TouchableOpacity>
      {/* Separator */}
      <View style={styles.separator} />
      <TouchableOpacity style={styles.paymentOption}>
        <View style={styles.paymentOptionContent}>
        <MaterialIcons name="credit-card" size={24} color="#a5b4b4" />
          <Text style={styles.paymentText}>Card</Text>
          
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#a5b4b4" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentMethods: {
    marginTop: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontFamily: 'Asap-Bold',
    marginBottom: 10,
    color: '#000'
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    fontFamily: 'Asap-Medium',
    color: '#a5b4b4',
    marginLeft: 10,
    marginVertical: 16
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    marginLeft: 34
  },
});

export default PaymentOptions;
