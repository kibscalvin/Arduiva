import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentLocation, setCurrentLocation, setServiceProviderLocation, selectServiceProviderLocation } from '../Redux/slices/navSlice';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Function to generate random coordinates within a 20km radius
const generateRandomCoordinates = (lat, lng, radius = 20000) => {
    const getRandomOffset = () => (Math.random() - 0.5) * 2 * radius / 111300; // 1 degree of latitude is approximately 111.3 km

    const randomLat = lat + getRandomOffset();
    const randomLng = lng + getRandomOffset() / Math.cos(lat * Math.PI / 180);

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
    const [selectedMechanicId, setSelectedMechanicId] = useState(null);
    const [currentSnapIndex, setCurrentSnapIndex] = useState(0);

    useEffect(() => {
        if (currentLocation?.location) {
            const { lat, lng } = currentLocation.location;

            console.log('Fetching mechanics...');
            setTimeout(() => {
                const fetchedMechanics = Array.from({ length: 10 }).map((_, index) => {
                    const randomCoordinates = generateRandomCoordinates(lat, lng);
                    return {
                        id: `${index + 1}`,
                        name: `Mechanic ${index + 1}`,
                        distance: `${(Math.random() * 5).toFixed(1)} km`, // adjust the test distance for the mechanics
                        coordinates: randomCoordinates,
                    };
                });

                console.log('Mechanics fetched:', fetchedMechanics);
                setMechanics(fetchedMechanics);
                setLoading(false);
            }, 2000); // Simulating a network request
        }
    }, [currentLocation]);

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
                selectedMechanicId === item.id && { borderColor: 'black' }
            ]}
            onPress={() => setSelectedMechanicId(item.id)}
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
                        latitudeDelta: 100,
                        longitudeDelta: 100,
                    }}
                    region={currentLocation?.location ? {
                        latitude: currentLocation.location.lat,
                        longitude: currentLocation.location.lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    } : undefined}
                >
{/* 
                    {currentLocation && serviceProviderLocation &&(
                        <MapViewDirections
                            currentLocation={currentLocation.description}
                            serviceProviderLocation={serviceProviderLocation.description}
                            apiKey = {AIzaSyBnFhnXkBxly_Yu_PehfSeoaJlDs6WwP-Y}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />
                    )} */}


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
                            pinColor={selectedMechanicId === mechanic.id ? 'blue' : 'green'}
                            onPress={() => setSelectedMechanicId(mechanic.id)}
                        />
                    ))}
                </MapView>
            </View>
            <BottomSheet
                ref={sheetRef}
                index={0} // Set to 0 for initial snap point
                snapPoints={snapPoints}
                onChange={setCurrentSnapIndex}
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
