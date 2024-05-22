import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';

const LocationScreen = () => {
    return (
        <SafeAreaView style = {styles.container}>
        <View style = {styles.container}>
            <Text>Location Screen</Text>
        </View>
        <View style = {{height: '100%'}}>
            <GooglePlacesAutocomplete 
            placeholder='Search'
            onPress={(data, details = null) => {
                console.log(data, details);
            }}
            query={{
                key: 'AIzaSyBnFhnXkBxly_Yu_PehfSeoaJlDs6WwP-Y',
                language: 'en',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            enablePoweredByContainer={false}
            minLength={2}
            styles={{
                container: {
                    flex: 0,
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
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        //height: '100%',

    },
    helloContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    helloText: {
        fontFamily: 'Asap-Bold',
        fontSize: 24,
        color: '#161818',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontFamily: 'Asap-Regular',
        fontSize: 16,
        color: '#161818',
        marginLeft: 5,
    },
    mainContainer: {
        padding: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    gridItem: {
        width: '48%',
        height: 120,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridText: {
        fontFamily: 'Asap-Regular',
        fontSize: 20,
        color: '#161818',
    },
});

export default LocationScreen;