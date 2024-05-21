import React, { useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

const MechanicScreen = ({ navigation }) => {
    const sheetRef = useRef(null);
    const mapRef = useRef(null); // Reference for the MapView
    const snapPoints = useMemo(() => ['40%', '65%'], []);
    const [snapIndex, setSnapIndex] = useState(0);
    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [region, setRegion] = useState({
        latitude: 0.3476,
        longitude: 32.5825,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    useEffect(() => {
        // Simulate fetching data from an API
        setTimeout(() => {
            const fetchedMechanics = [
                { id: '1', name: 'Mechanic 1', distance: '1.2 km' },
                { id: '2', name: 'Mechanic 2', distance: '2.4 km' },
                { id: '3', name: 'Mechanic 3', distance: '3.1 km' },
                { id: '4', name: 'Mechanic 4', distance: '4.5 km' },
                { id: '5', name: 'Mechanic 5', distance: '5.2 km' },
                { id: '6', name: 'Mechanic 6', distance: '6.7 km' },
                { id: '7', name: 'Mechanic 7', distance: '7.2 km' },
                { id: '8', name: 'Mechanic 8', distance: '8.4 km' },
                { id: '9', name: 'Mechanic 9', distance: '9.1 km' },
                { id: '10', name: 'Mechanic 10', distance: '10.5 km' }, 
                { id: '11', name: 'Mechanic 11', distance: '11.2 km' },
                { id: '12', name: 'Mechanic 12', distance: '12.4 km' },
                { id: '13', name: 'Mechanic 13', distance: '13.1 km' },
                { id: '14', name: 'Mechanic 14', distance: '14.5 km' },
                { id: '15', name: 'Mechanic 15', distance: '15.2 km' },
                { id: '16', name: 'Mechanic 16', distance: '16.7 km' },
                { id: '17', name: 'Mechanic 17', distance: '17.2 km' },
                { id: '18', name: 'Mechanic 18', distance: '18.4 km' },
                { id: '19', name: 'Mechanic 19', distance: '19.1 km' },
                { id: '20', name: 'Mechanic 20', distance: '20.5 km' },
                // Add more mechanics data here
            ];
            setMechanics(fetchedMechanics);
            setLoading(false);
        }, 2000); // Simulating a network request
    }, []);

    const handleSheetChanges = (index) => {
        console.log('handleSheetChanges', index);
        setSnapIndex(index);
        adjustMapRegion(index);
    };

    const adjustMapRegion = (index) => {
        const bottomSheetHeight = index === 1 ? 300 : 150; // Adjust height based on snap point
        const offset = bottomSheetHeight * 0.00002; // Adjust this multiplier to fit your map scale
        const newRegion = {
            ...region,
            latitude: region.latitude + offset, // Adjust latitude to keep marker centered
        };
        mapRef.current.animateToRegion(newRegion, 1000); // Animate to the new region
    };

    const handleMechanicSelect = (mechanic) => {
        setSelectedMechanic(mechanic);
    };

    const navigateToDetail = () => {
        navigation.navigate('MechanicDetail', { mechanic: selectedMechanic });
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[
                styles.item,
                item.id === selectedMechanic?.id && styles.selectedItem,
                index === mechanics.length - 1 && styles.lastItem, // Apply margin to the last item
            ]}
            onPress={() => handleMechanicSelect(item)}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.distance}>{item.distance}</Text>
        </TouchableOpacity>
    );

    // Filter mechanics based on snapIndex
    const filteredMechanics = snapIndex === 0 ? mechanics.slice(0, 1) : mechanics;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.mapsView}>
                    <MapView
                        ref={mapRef} // Reference for the MapView
                        style={styles.map}
                        region={region} // Use state region
                        onRegionChangeComplete={setRegion} // Update region state on change
                    >
                        <Marker
                            coordinate={{ latitude: 0.3476, longitude: 32.5825 }}
                            title="Mechanic Location"
                            description="This is where the mechanic is located"
                            onPress={() => {
                                sheetRef.current?.snapToIndex(1); // Open the bottom sheet to half height
                            }}
                        />
                    </MapView>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faChevronCircleLeft} size={38} color='gray' style={{ position: 'absolute', bottom: 330, right: 144 }} />
                    </TouchableOpacity>
                </View>
                <BottomSheet
                    ref={sheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={styles.bottomSheet}
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Nearest Mechanics</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <BottomSheetFlatList
                            data={filteredMechanics}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.flatListContent}
                            style={styles.flatList}
                        />
                    )}
                </BottomSheet>
                <View style={styles.bottomSheetFooter}>
                    {selectedMechanic && (
                        <Pressable onPress={navigateToDetail} style={styles.pressable}>
                            <Text style={styles.pressableText}>
                                {selectedMechanic.name} - {selectedMechanic.distance}
                            </Text>
                        </Pressable>
                    )}
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
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
    bottomSheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    headerContainer: {
        paddingVertical: 10,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Asap-Medium',
        fontSize: 20,
    },
    flatListContent: {
        paddingBottom: 0, // Adjusted to make space for the sticky red view
        paddingHorizontal: 8,
    },
    flatList: {
        flex: 1,
    },
    item: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 5,
        borderRadius: 8,
    },
    selectedItem: {
        borderColor: 'black',
        borderWidth: 2,
    },
    lastItem: {
        marginBottom: 150, // Adjusted to make space for the sticky red view
    },
    name: {
        fontSize: 18,
        fontFamily: 'Asap-Medium',
    },
    distance: {
        color: '#666',
        fontFamily: 'Asap-Medium',
    },
    pressable: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        width: '80%'
    },
    pressableText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Asap-Medium',
        color: '#fafafa',
       
    },
    bottomSheetFooter: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#000',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default MechanicScreen;
