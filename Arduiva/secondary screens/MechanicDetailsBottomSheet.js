import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTools, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMode, selectPaymentMode } from '../Redux/slices/paymentSlice';

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
            }, 2000);
        }
    }, [isVisible, mechanic]);

    const calculatePrice = (distance) => {
        const distanceInKm = parseFloat(distance.split(' ')[0]);
        const basePrice = 5000;
        const pricePerKm = 1000;
        return basePrice + distanceInKm * pricePerKm;
    };

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
            snapPoints={[ '75%']}
            onClose={onClose}
            enablePanDownToClose={true}
        >
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                ) : confirmed ? (
                    <Animated.View style={[styles.confirmationContainer, { opacity: opacityAnim }]}>
                        <FontAwesomeIcon icon={faCheckCircle} size={100} color="#bdff7b" />
                    </Animated.View>
                ) : (
                    <View style={styles.contentContainer}>
                        <FontAwesomeIcon icon={faTools} size={40} color="#000" />
                        <Text style={styles.mechanicName}>{mechanic.name}</Text>
                        <Text style={styles.mechanicDetails}>Distance: {mechanic.distance}</Text>
                        <Text style={styles.mechanicDetails}>Estimated Price: UGX {price}</Text>
                        
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
        fontWeight: 'bold',
        marginVertical: 8,
    },
    mechanicDetails: {
        fontSize: 18,
        marginVertical: 4,
    },
    paymentContainer: {
        flexDirection: 'row',
        marginVertical: 16,
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
