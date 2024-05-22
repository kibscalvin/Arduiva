import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCurrentLocation } from '../Redux/slices/navSlice';
import MapView, { Marker } from 'react-native-maps';

const MechanicScreen = () => {
    const currentLocation = useSelector(selectCurrentLocation);
    console.log('Current Location:', currentLocation); // Log current location

    // if (!currentLocation) {
    //     return <ActivityIndicator size="large" color="#0000ff" />;
    // }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapsView}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        // latitude: currentLocation.lat,
                        // longitude: currentLocation.lng,
                        // latitudeDelta: 0.005,
                        // longitudeDelta: 0.005,
                        latitude: 33.738045,
                        longitude: 73.084488
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 33.738045, longitude: 73.084488 }}
                        title="Current Location"
                    />
                </MapView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    mapsView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MechanicScreen;
