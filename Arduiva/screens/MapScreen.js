import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

const MapScreen = ({ dataFromStore }) => {
    // Use the data from the Redux store here
    console.log(dataFromStore);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

// Connect the component to the Redux store
const mapStateToProps = (state) => {
    return {
        dataFromStore: state.dataFromStore, // Replace "dataFromStore" with the actual key in your Redux store
    };
};

export default connect(mapStateToProps)(MapScreen);