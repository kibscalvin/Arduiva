import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { faCarBattery, faGasPump, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setCurrentLocation, setServiceProviderLocation } from '../Redux/slices/navSlice';

const HomeScreen = () => {

    const dispatch = useDispatch();
    
    
    
    
    
    const name = 'Calvin';
    const currentLocation = 'Kyanja, Uganda';
    const [modalVisible, setModalVisible] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    const navigation = useNavigation();

    const toggleLocation = () => {
        setModalVisible(!modalVisible);
        if (!modalVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            fadeAnim.setValue(0);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}><Text style={{ color: '#86868b' }}>Hello,</Text> {name}</Text>
                <TouchableOpacity onPress={toggleLocation}>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location" size={24} color="#161818" />
                        <Text style={styles.locationText}>{currentLocation}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={{ alignSelf: 'flex-start', marginLeft: 5, paddingBottom: 8 }}>
                    <Text style={{ fontFamily: 'Asap-Medium', fontSize: 22, color: '#86868b', }}>Ping the Nearest Service Provider</Text>
                </View>
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#fdfde5', borderWidth: 2, borderColor: '#efa400' }]} onPress={() => console.log('Fuel pressed')}>
                        <FontAwesomeIcon icon={faGasPump} size={26} color='#efa400' style={{ marginLeft: 5 }} />
                        <Text style={[styles.gridText, { color: '#efa400' }]}>Fuel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#e3f2fd', borderWidth: 2, borderColor: '#0a99f5' }]} onPress={() => navigation.navigate('Mechanic')}>
                        <FontAwesomeIcon icon={faCarBattery} size={26} color='#0a99f5' />
                        <Text style={[styles.gridText, { color: '#0a99f5', fontSize: 17 }]}>Mechanic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.aiChat}>
                            <FontAwesomeIcon icon={faRobot} size={24} color='#86868b' />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#f7f7f7', borderWidth: 2 }]}>
                        <FontAwesomeIcon icon={faTruckLoading} size={26} color='black' />
                        <Text style={styles.gridText}>Tow Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#ffeaed', borderWidth: 2, borderColor: '#fc3c42' }]}>
                        <FontAwesomeIcon icon={faCalendar} size={26} color='#fc3c42' />
                        <Text style={[styles.gridText, { color: '#fc3c42' }]}>Schedule Service</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity>
                    <View style={styles.contactContainer}>
                        <Text style={styles.contactText}>Tips</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.VersionNumber}>Arduiva Beta 0.0.1</Text>
            </View>

            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleLocation}>
                            <Ionicons name="close" size={30} color="black" />
                        </TouchableOpacity>
                        <Text>Modal Content Here</Text>
                        <View style={styles.googlePlacesContainer}>
                            <GooglePlacesAutocomplete
                                placeholder="Search"
                                onPress={(data, details = null) => {
                                    dispatch(setCurrentLocation({
                                        location : details.geometry.location,
                                        description: data.description,
                                    }))
                                    dispatch(setServiceProviderLocation(null));
                                    console.log('Current Location: ', details.geometry.location);
                                }}
                                query={{
                                    key: 'AIzaSyBnFhnXkBxly_Yu_PehfSeoaJlDs6WwP-Y',
                                    language: 'en',
                                }}
                                nearbyPlacesAPI="GooglePlacesSearch"
                                debounce={400}
                                enablePoweredByContainer={false}
                                minLength={2}
                                fetchDetails={true}
                                predefinedPlaces={[{ description: 'Kyanja, Uganda' }]}
                               // currentLocation={true}
                               // currentLocationLabel='Current location'
                                returnKeyType={'search'}
                                // GoogleReverseGeocodingQuery={{
                                //     // available options for Google Reverse Geocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                // }}
                               



                                styles={{
                                    container: {
                                        flex: 0,
                                    },
                                    textInputContainer: {
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0,
                                    },
                                    textInput: {
                                        marginLeft: 0,
                                        marginRight: 0,
                                        height: 38,
                                        color: '#5d5d5d',
                                        fontSize: 16,
                                    },
                                }}
                            />
                        </View>
                    </View>
                </Animated.View>
            </Modal> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    aiChat: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#008000',
        position: 'absolute',
        bottom: 108,
        right: 14.5,
        padding: 10,
    },
    helloContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helloText: {
        fontSize: 24,
        fontFamily: 'Asap-Medium',
    },
    gridItem: {
        width: 150,
        height: 150,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 4,
    },
    gridText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Asap-SemiBold',
    },
    locationContainer: {
        alignItems: 'center',
    },
    locationText: {
        fontSize: 10,
        fontFamily: 'Asap-Medium',
        color: '#86868b',
    },
    VersionNumber: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#86868b',
        marginTop: 28,
        textAlign: 'center',
    },
    contactContainer: {
        marginVertical: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#86868b',
        borderRadius: 8,
        padding: 16,
        backgroundColor: '#f3f3f3',
        width: '100%',
    },
    contactText: {
        fontSize: 18,
        fontFamily: 'Asap-Medium',
        color: 'black',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color with transparency
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        width: '90%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    googlePlacesContainer: {
        width: '100%',
        marginTop: 20,
    },
});

export default HomeScreen;
