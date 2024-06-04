import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentLocation, setCurrentLocation, setServiceProviderLocation, selectServiceProviderLocation } from '../../Redux/slices/navSlice';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import MechanicDetailsBottomSheet from '../tertiaryScreens/MechanicDetailsBottomSheet';
import ProblemsInfo from '../tertiaryScreens/ProblemsInfo';
import { generateRandomCoordinates } from '../../utils/calc/randomCoord';
import { adjustMapPadding } from '../../utils/calc/mapPadding';

const MechanicNameRow = ({ selectedMechanic, onPress }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedMechanic) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedMechanic]);

  const slideInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0]
  });

  return (
    <View style={styles.mechanicNameRow}>
      <Animated.Text style={{ ...styles.nearestMechanicText, transform: [{ translateX: slideInterpolate }], color: '#86868b', fontSize: 18 }}>
        Nearest mechanic
      </Animated.Text>
      {selectedMechanic && (
        <Animated.View style={{ ...styles.selectedMechanicContainer, opacity: opacityAnim }}>
          <Text style={styles.selectedMechanicText} onPress={onPress}>
            {selectedMechanic.name}
          </Text>
          <FontAwesomeIcon icon={faChevronCircleRight} size={20} color="#fff" style={styles.icon} />
        </Animated.View>
      )}
    </View>
  );
};

export const MechanicScreen = () => {
  const currentLocation = useSelector(selectCurrentLocation);
  const serviceProviderLocation = useSelector(selectServiceProviderLocation);
  const dispatch = useDispatch();
  const sheetRef = useRef(null);
  const mapRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(0);
  const [region, setRegion] = useState(null);
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const [isProblemsInfoVisible, setProblemsInfoVisible] = useState(false);

  const handleProceed = () => {
    setDetailsVisible(true);
    setProblemsInfoVisible(false); // Hide ProblemsInfo when navigating to MechanicDetails

  };

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
            distance: `${(Math.random() * 10 + 1).toFixed(1)}km`,
            coordinates: randomCoordinates,
          };
        });
        console.log('Mechanics fetched:', fetchedMechanics);
        setMechanics(fetchedMechanics);
        setLoading(false);
      }, 2000);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (currentLocation?.location && serviceProviderLocation?.coordinates) {
      mapRef.current.fitToSuppliedMarkers(['currentLocation', 'serviceProviderLocation'], {
        edgePadding: adjustMapPadding(currentSnapIndex),
        animated: true,
      });
    }
  }, [currentLocation, serviceProviderLocation, currentSnapIndex]);

  useEffect(() => {
    if (currentLocation?.location && serviceProviderLocation?.coordinates) {
      const { lat: lat1, lng: lng1 } = currentLocation.location;
      const { latitude: lat2, longitude: lng2 } = serviceProviderLocation.coordinates;
      const midLat = (lat1 + lat2) / 2;
      const midLng = (lng1 + lng2) / 2;
      const latDelta = Math.abs(lat1 - lat2) * 1.5;
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
      mapRef.current.animateToRegion(region, 1000);
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
        mapRef.current.animateToRegion(newRegion, 1000);
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
            key: GOOGLE_MAPS_APIKEY,
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
          ref={mapRef}
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
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="green"
            />
          )}
        </MapView>
      </View>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={(index) => {
          setCurrentSnapIndex(index);
        }}
      >
        <MechanicDetailsBottomSheet
  mechanic={selectedMechanic}
  isVisible={isDetailsVisible}
  onClose={() => setDetailsVisible(false)}
/>

        <View style={styles.contentContainer}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8, justifyContent: 'center' }}>
            <MechanicNameRow
              selectedMechanic={selectedMechanic}
              onPress={() => setProblemsInfoVisible(true)} // Show ProblemsInfo when a mechanic is selected
            />
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
      <MechanicDetailsBottomSheet
        mechanic={selectedMechanic}
        isVisible={isDetailsVisible}
        onClose={() => setDetailsVisible(false)}
      />
      {isProblemsInfoVisible && (
        <View style={styles.overlay}>
          <ProblemsInfo
            isVisible={isProblemsInfoVisible}
            onProceed={handleProceed}
            onClose={() => setProblemsInfoVisible(false)}
          />
        </View>
      )}
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
    height: '100%'
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
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
    flexGrow: 1,
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
  },
  mechanicNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#ccc',
  },
  nearestMechanicText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedMechanicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'black',
    padding: 0,
  },
  selectedMechanicText: {
    fontSize: 16,
    marginRight: 10,
    fontFamily: 'Asap-Medium',
    color: 'white',
    padding: 6,
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
});
