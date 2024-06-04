import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTools, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMode, selectPaymentMode } from '../../Redux/slices/paymentSlice';
import { selectUserBalance } from '../../Redux/slices/userSlice';
import { calculatePrice } from '../../utils/calc/priceCalc';
import { DotIndicator } from 'react-native-indicators';

const { height } = Dimensions.get('window');

const MechanicDetailsBottomSheet = ({ mechanic, isVisible, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(0);
    const [confirmed, setConfirmed] = useState(false);
    const opacityAnim = useState(new Animated.Value(0))[0];
    const dispatch = useDispatch();
    const paymentMode = useSelector(selectPaymentMode);
    const balance = useSelector(selectUserBalance);

    useEffect(() => {
        if (isVisible && mechanic) {
            setLoading(true);
            setConfirmed(false);
            setTimeout(() => {
                setPrice(calculatePrice(mechanic.distance));
                setLoading(false);
            }, 1000);
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
            snapPoints={['70%']}
            onClose={onClose}
            enablePanDownToClose={true}
        >
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <DotIndicator size={8} color="#bdff7b" />
                    </View>
                ) : confirmed ? (
                    <Animated.View style={[styles.confirmationContainer, { opacity: opacityAnim }]}>
                        <FontAwesomeIcon icon={faCheckCircle} size={100} color="#bdff7b" />
                    </Animated.View>
                ) : (
                    <View style={styles.contentContainer}>
                        <View style={styles.mechanicContainer}>
                            <FontAwesomeIcon icon={faTools} size={40} color="#424242" />
                            <Text style={styles.mechanicName}>{mechanic.name}</Text>
                        </View>
                        <View style={styles.priceDetails}>
                            <View style={[styles.detailContainer, { paddingVertical: 12 }]}>
                                <Text style={styles.detailLabel}>Distance:</Text>
                                <Text style={[styles.mechanicDetails, { fontFamily: 'RobotoMono-Regular' }]}>{mechanic.distance}</Text>
                            </View>
                            <View style={[styles.detailContainer, { paddingVertical: 12 }]}>
                                <Text style={styles.detailLabel}>Estimated Price:</Text>
                                <Text style={[styles.mechanicDetails, { fontFamily: 'RobotoMono-Regular' }]}>UGX {price}</Text>
                            </View>
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
                        {paymentMode === 'ePay' && (
                            <View style={styles.balanceContainer}>
                                <Text style={styles.balanceText}>Balance on E-Pay: UGX {balance.toLocaleString()}</Text>
                            </View>
                        )}
                        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.confirmButtonText}>Confirm</Text>
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
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    mechanicName: {
        fontSize: 24,
        marginVertical: 8,
        fontFamily: 'Asap-SemiBold',
        color: '#424242'
    },
    mechanicDetails: {
        fontSize: 18,
    },
    mechanicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 8,
        borderRadius: 12,
        borderColor: '#ccc',
        backgroundColor: '#f5f5f5',
    },
    priceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 8,
        borderRadius: 12,
        borderColor: '#ccc',
        backgroundColor: '#f5f5f5',
        marginVertical: 8,
    },
    detailContainer: {
        flex: 1,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 16,
        color: '#424242',
        fontFamily: 'Asap-Regular'
    },
    paymentContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
    },
    paymentButton: {
        flex: 1,
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
        textAlign: 'center',
    },
    balanceContainer: {
        marginTop: 8,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 17
    },
    balanceText: {
        fontSize: 16,
        color: '#424242',
        fontFamily: 'Asap-Regular',
    },
    confirmButton: {
        padding: 16,
        backgroundColor: '#10151D',
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        left: '5%',
        right: '5%',
    },
    confirmButtonText: {
        color: '#E1E7EF',
        fontSize: 18,
        textAlign: 'center',
    },
    confirmationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MechanicDetailsBottomSheet;
