import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentLocation, setCurrentLocation, setServiceProviderLocation, selectServiceProviderLocation } from '../Redux/slices/navSlice';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';

// Function to generate random coordinates within a 20km radius
const generateRandomCoordinates = (lat, lng, radius = 1000) => {
    const getRandomOffset = () => (Math.random() - 0.5) * 2 * radius; // Random offset within the radius

    const earthRadius = 6371; // Radius of the Earth in kilometers

    const getRandomDistance = () => Math.sqrt(Math.random()) * radius; // Random distance within the radius

    const getRandomAngle = () => Math.random() * 2 * Math.PI; // Random angle in radians

    const dx = getRandomDistance() / earthRadius; // Convert distance to radians
    const angle = getRandomAngle();

    const deltaLat = dx * Math.cos(angle);
    const deltaLng = dx * Math.sin(angle);

    const randomLat = lat + deltaLat;
    const randomLng = lng + deltaLng;

    return { latitude: randomLat, longitude: randomLng };
};

export const MechanicScreen = () => {
    const currentLocation = useSelector(selectCurrentLocation);
    const serviceProviderLocation = useSelector(selectServiceProviderLocation);
    const dispatch = useDispatch();
    const sheetRef = useRef(null);
    const mapRef = useRef(null); // Add ref for MapView
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [currentSnapIndex, setCurrentSnapIndex] = useState(0);
    const [region, setRegion] = useState(null); // Add region state

    useEffect(() => {
        if (currentLocation?.location) {
            const { lat, lng } = currentLocation.location;

            console.log('Fetching mechanics...');
            setTimeout(() => {
                const fetchedMechanics = Array.from({ length: 5 }).map((_, index) => {
                    const randomCoordinates = generateRandomCoordinates(lat, lng);
                    return {
                        id: `${index + 1}`,
                        name: `Mechanic ${index + 1}`,
                        distance: `${(Math.random() * 10 + 1).toFixed(1)} km`, // Random distance between 1 and 10 km
                        coordinates: randomCoordinates,
                    };
                });

                console.log('Mechanics fetched:', fetchedMechanics);
                setMechanics(fetchedMechanics);
                setLoading(false);
            }, 2000); // Simulating a network request
        }
    }, [currentLocation]);

    const adjustMapPadding = (snapIndex) => {
        const paddingMap = {
            0: { top: 100, right: 100, bottom: 300, left: 100 },
            1: { top: 100, right: 100, bottom: 700, left: 100 },
        };

        return paddingMap[snapIndex] || { top: 100, right: 100, bottom: 100, left: 100 };
    };

    useEffect(() => {
        if (currentLocation?.location && serviceProviderLocation?.coordinates) {
            mapRef.current.fitToSuppliedMarkers(['currentLocation', 'serviceProviderLocation'], {
                edgePadding: adjustMapPadding(currentSnapIndex),
                animated: true,
            });
        }
    }, [currentLocation, serviceProviderLocation, currentSnapIndex]);

    // Update region state when current location or service provider location changes
    useEffect(() => {
        if (currentLocation?.location && serviceProviderLocation?.coordinates) {
            const { lat: lat1, lng: lng1 } = currentLocation.location;
            const { latitude: lat2, longitude: lng2 } = serviceProviderLocation.coordinates;

            const midLat = (lat1 + lat2) / 2;
            const midLng = (lng1 + lng2) / 2;

            const latDelta = Math.abs(lat1 - lat2) * 1.5; // Adjust the factor to ensure both markers are visible
            const lngDelta = Math.abs(lng1 - lng2) * 1.5;

            setRegion({
                latitude: midLat,
                longitude: midLng,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta,
            });
        }
    }, [currentLocation, serviceProviderLocation]);

    useEffect(() => {
        if (region && mapRef.current) {
            mapRef.current.animateToRegion(region, 1000); // Animate to the new region over 1 second
        }
    }, [region]);

    const handleSearchSubmit = (data, details = null) => {
        if (details && details.geometry) {
            const { lat, lng } = details.geometry.location;
            const newRegion = {
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };

            dispatch(setCurrentLocation({ location: { lat, lng }, description: data.description }));
            dispatch(setServiceProviderLocation(null));

            if (mapRef.current) {
                mapRef.current.animateToRegion(newRegion, 1000); // Animate to new region over 1 second
            }
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.item,
                selectedMechanic?.id === item.id && { borderColor: 'black' }
            ]}
            onPress={() => {
                setSelectedMechanic(item);
                dispatch(setServiceProviderLocation(item));
            }}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.distance}>{item.distance}</Text>
        </TouchableOpacity>
    );

    const mechanicsToShow = currentSnapIndex === 0 ? mechanics.slice(0, 1) : mechanics;

    return (
        <View style={styles.container}>
            <View style={styles.autoComplete}>
                <GooglePlacesAutocomplete
                    placeholder="Where are you?"
                    onPress={handleSearchSubmit}
                    query={{
                        key: 'AIzaSyBnFhnXkBxly_Yu_PehfSeoaJlDs6WwP-Y',
                        language: 'en',
                        components: 'country:Ug'
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={300}
                    enablePoweredByContainer={true}
                    minLength={2}
                    fetchDetails={true}
                    predefinedPlaces={[{ description: 'Kyanja, Uganda' }]}
                    returnKeyType={'search'}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            marginRight: 0,
                            height: 36,
                            color: '#5d5d5d',
                            fontSize: 16,
                            width: '80%',
                            backgroundColor: 'white',
                            marginVertical: 2,
                        },
                    }}
                />
            </View>
            <View style={styles.mapScreen}>
                <MapView
                    ref={mapRef} // Set the ref to MapView
                    style={{ flex: 1 }}
                    mapType="mutedStandard"
                    initialRegion={{
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    region={currentLocation?.location ? {
                        latitude: currentLocation.location.lat,
                        longitude: currentLocation.location.lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    } : undefined}
                >
                    {currentLocation?.location?.lat && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.location.lat,
                                longitude: currentLocation.location.lng,
                            }}
                            title={currentLocation.description || "Current Location"}
                            description="You are here"
                            identifier="currentLocation"
                        />
                    )}

                    {mechanics.map(mechanic => (
                        <Marker
                            key={mechanic.id}
                            coordinate={mechanic.coordinates}
                            title={mechanic.name}
                            description={mechanic.distance}
                            pinColor={selectedMechanic?.id === mechanic.id ? 'blue' : 'green'}
                            onPress={() => setSelectedMechanic(mechanic)}
                            identifier="serviceProviderLocation"
                        />
                    ))}

                    {currentLocation && selectedMechanic && (
                        <MapViewDirections
                            origin={{ latitude: currentLocation.location.lat, longitude: currentLocation.location.lng }}
                            destination={selectedMechanic.coordinates}
                            apikey='AIzaSyBnFhnXkBxly_Yu_PehfSeoaJlDs6WwP-Y'
                            strokeWidth={3}
                            strokeColor="green"
                        />
                    )}
                </MapView>
            </View>
            <BottomSheet
                ref={sheetRef}
                index={0} // Set to 0 for initial snap point
                snapPoints={snapPoints}
                onChange={(index) => {
                    setCurrentSnapIndex(index);
                }}
            >
                <View style={styles.contentContainer}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8, justifyContent: 'center' }}>
                        <Text style={styles.headerText}>Nearest Mechanics</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <BottomSheetFlatList
                            data={mechanicsToShow}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.flatListContent}
                        />
                    )}
                </View>
            </BottomSheet>
        </View>
    );
};

export default MechanicScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapScreen: {
        width: '100%',
        height: '100%' // Adjust to ensure enough space for the BottomSheet
    },
    contentContainer: {
        flex: 1, // Ensure this container can expand
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: '#fff'
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Asap-Medium',
        marginBottom: 8,
    },
    item: {
        marginVertical: 8,
        padding: 16,
        borderWidth: 1.5,
        borderColor: '#eee',
        borderRadius: 8
    },
    name: {
        fontSize: 14
    },
    distance: {
        fontSize: 12,
        color: '#666'
    },
    flatListContent: {
        paddingBottom: 16,
        flexGrow: 1, // Ensure the FlatList content container expands to fill available space
        paddingHorizontal: 16
    },
    autoComplete: {
        position: 'absolute',
        top: 40,
        left: 16,
        right: 16,
        zIndex: 1,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});
