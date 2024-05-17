import React, { useRef, useMemo } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import MechanicBottomSheetContent from '../components/modals/BottomSheets/MechanicBottomSheetContent';

const MechanicScreen = () => {
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const handleSheetChanges = (index) => {
        console.log('handleSheetChanges', index);
    };

    const closeBottomSheet = () => {
        sheetRef.current?.close();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.mapsView}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 0.3476,
                            longitude: 32.5825,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 0.3476, longitude: 32.5825 }}
                            title={"Mechanic Location"}
                            description={"This is where the mechanic is located"}
                        />
                    </MapView>
                </View>
                <BottomSheet
                    ref={sheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={styles.bottomSheet}
                    backgroundComponent={() => null} // Disable background interaction
                >
                    <View style={styles.sheetContent}>
                        <MechanicBottomSheetContent />
                    </View>
                </BottomSheet>
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
        backgroundColor: 'transparent', // Make background transparent
    },
    sheetContent: {
        backgroundColor: 'white',
        padding: 10,
        minHeight: Dimensions.get('window').height * 0.5, // Set minimum height
        borderRadius: 14,
    },
});

export default MechanicScreen;
