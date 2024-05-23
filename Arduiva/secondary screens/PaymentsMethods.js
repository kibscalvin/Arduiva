import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMode, selectPaymentMode } from '../Redux/slices/paymentSlice';

const PaymentOptionsPage = () => {
  const dispatch = useDispatch();
  const paymentMode = useSelector(selectPaymentMode);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const opacityAnim = useState(new Animated.Value(0))[0];

  const handleOptionSelect = (option) => {
    dispatch(setPaymentMode(option));
  };

  const handleConfirm = () => {
    setConfirmationVisible(true);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.choiceContainer}>
        <Text style={styles.choice}>Default Payment Method</Text>
      </View>

      <View style={styles.childContainer}>
        <TouchableOpacity
          style={[styles.option, paymentMode === 'cash' && styles.selectedOptionCash]}
          onPress={() => handleOptionSelect('cash')}
        >
          <FontAwesome name="money" size={24} color="#00be76" />
          <Text style={[styles.optionText, { color: '#00be76' }]}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, paymentMode === 'ePay' && styles.selectedOptionEpay]}
          onPress={() => handleOptionSelect('ePay')}
        >
          <FontAwesome name="credit-card" size={24} color="#1896c9" />
          <Text style={[styles.optionText, { color: '#1896c9' }]}>E-Pay</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.depositTextContainer}>
        <Text style={styles.depositText}>
          Add money to your Emergency Wallet
        </Text>
      </View>

      <View style={styles.deposit}>
        <FontAwesome name='plus' size={24} color='green' />
        <Text style={{ fontFamily: 'Asap-Medium', fontSize: 20, marginLeft: 16 }}>Deposit</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm {paymentMode}</Text>
      </TouchableOpacity>

      {confirmationVisible && (
        <Animated.View style={[styles.confirmationContainer, { opacity: opacityAnim }]}>
          <FontAwesome name="check-circle" size={100} color="green" />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  childContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  choice: {
    fontFamily: 'Asap-Medium',
    fontSize: 18,
    color: '#86868b',
    marginTop: 16,
    textAlign: 'left',
    marginRight: 48,
  },
  choiceContainer: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#F3F6FC',
  },
  deposit: {
    backgroundColor: '#F3F6FC',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  depositText: {
    fontSize: 14,
    justifyContent: 'center',
    marginVertical: 8,
    color: '#86868b',
    fontFamily: 'Asap-Medium',
  },
  depositTextContainer: {
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
    height: 160,
  },
  selectedOptionCash: {
    borderColor: 'green',
    elevation: 5,
    backgroundColor: '#e4f7ee',
    shadowColor: 'green',
  },
  selectedOptionEpay: {
    borderColor: '#1896c9',
    elevation: 5,
    backgroundColor: '#e1f7fc',
    shadowColor: 'green',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
  confirmButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default PaymentOptionsPage;
