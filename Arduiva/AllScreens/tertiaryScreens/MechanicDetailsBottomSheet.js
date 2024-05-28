import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTools, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMode, selectPaymentMode } from '../../Redux/slices/paymentSlice';
import { calculatePrice }  from '../../utils/calc/priceCalc';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

const MechanicDetailsBottomSheet = ({ mechanic, isVisible, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(0);
    const [confirmed, setConfirmed] = useState(false);
    const opacityAnim = useState(new Animated.Value(0))[0];
    const dispatch = useDispatch();
    const paymentMode = useSelector(selectPaymentMode);

    useEffect(() => {
        if (isVisible && mechanic) {
            setLoading(true);
            setConfirmed(false);
            setTimeout(() => {
                setPrice(calculatePrice(mechanic.distance));
                setLoading(false);
            }, 1); // 2000
        }
    }, [isVisible, mechanic]);

    

    const handleConfirm = () => {
        setConfirmed(true);
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <BottomSheet
            index={isVisible ? 0 : -1}
            snapPoints={[ '70%']}
            onClose={onClose}
            enablePanDownToClose={true}
        >
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                     {/* <SkypeIndicator size="100" color="#0000ff" /> */}
                     {/* <UIActivityIndicator size="100" color="#0000ff" /> */}
                     {/* <PulseIndicator size={100} color="#0000ff" /> */}
                     {/* <WaveIndicator size={100} color="#0000ff" /> */}
                     <DotIndicator size={8} color="#bdff7b" />

                        
                        {/* <Text style={styles.loadingText}>Loading
                        ...</Text> */}
                    </View>
                ) : confirmed ? (
                    <Animated.View style={[styles.confirmationContainer, { opacity: opacityAnim }]}>
                        <FontAwesomeIcon icon={faCheckCircle} size={100} color="#bdff7b" />
                    </Animated.View>
                ) : (
                    <View style={styles.contentContainer}>

                        <View style = {styles.mechanicContainer}>
                        <FontAwesomeIcon icon={faTools} size={40} color="#424242" />
                        <Text style={styles.mechanicName}>{mechanic.name}</Text>
                            </View>
                           
                            <View style = {styles.priceDetails}>
                        <Text style={styles.mechanicDetails}>Distance: {mechanic.distance}</Text>
                        <Text style={styles.mechanicDetails}>Estimated Price: UGX {price}</Text>
                            </View>

                            
                        
                        <View style={styles.paymentContainer}>
                            <Pressable
                                style={[
                                    styles.paymentButton,
                                    paymentMode === 'cash' && styles.paymentButtonSelected,
                                ]}
                                onPress={() => dispatch(setPaymentMode('cash'))}
                            >
                                <Text style={styles.paymentButtonText}>Cash</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.paymentButton,
                                    paymentMode === 'ePay' && styles.paymentButtonSelected,
                                ]}
                                onPress={() => dispatch(setPaymentMode('ePay'))}
                            >
                                <Text style={styles.paymentButtonText}>E-Pay</Text>
                            </Pressable>
                        </View>

                        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.confirmButtonText}>Confirm {paymentMode}</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
       
    },
    mechanicName: {
        fontSize: 24,
        //fontWeight: 'bold',
        marginVertical: 8,
        fontFamily: 'Asap-SemiBold',
        color: '#424242'
    },
    mechanicDetails: {
        fontSize: 18,
        marginVertical: 4,
        
    },
    mechanicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        width: '100%',
        padding: 8,
        borderRadius:12,
        borderColor: '#ccc',
    },
    paymentContainer: {
        flexDirection: 'row',
        marginVertical: 16,
        backgroundColor: '#000',
        width: '100%',
    },
    paymentButton: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 8,
    },
    paymentButtonSelected: {
        borderColor: 'green',
    },
    paymentButtonText: {
        fontSize: 18,
    },
    priceDetails: {
        
        backgroundColor: '#f5f5f5',
        width: '100%',
        padding: 8,
        borderRadius:12,
        borderColor: '#ccc',
        marginVertical: 8,
        justifyContent: 'space-between',
      
    },
    confirmButton: {
        padding: 16,
        backgroundColor: '#bdff7b',
        borderRadius: 8,
        marginTop: 16,
    },
    confirmButtonText: {
        color: '#366605',
        fontSize: 18,
    },
    confirmationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MechanicDetailsBottomSheet;
