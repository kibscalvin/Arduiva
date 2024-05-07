import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons, but i dont need them
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = () => {
    const name = 'Calvin'; // Define my name here, i like how it looks
    const currentLocation = 'Kyanja, Uganda'


    function hasPressed(){
        console.log('pressed')
    }

    return (
        <View style={styles.container}>
                                  {/* HelloContainer*/}
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Hello, {name}</Text>
                <View style = {styles.locationContainer}>
                <Ionicons name="location" size={24} color="#161818" />
                <Text style = {styles.locationText }>{currentLocation}</Text>
                </View>
            </View>
            {/* MainContainer*/}
            <View style={styles.mainContainer}> 
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#fdfde5' }, {borderWidth: 1}, {borderColor: '#efa400'}]} onPress={hasPressed}>
                    <FontAwesomeIcon icon={faGasPump} size={26} color = '#efa400'  style = {{marginLeft: 5}}/>
                        
                        <Text style={[styles.gridText, {color: '#efa400'}]}>Fuel</Text>
                    </TouchableOpacity>
                   {/* blehh*/}
                    <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#e3f2fd'}, {borderWidth: 1}, {borderColor: '#0a99f5'}]}>
                     <FontAwesomeIcon icon={faBoltLightning} size={26} color = '#0a99f5' />

                        <Text style={[styles.gridText, {color: '#0a99f5'}, {fontSize: 17}]}>Battery Jumpstart</Text>
                    </TouchableOpacity>
                {/* blehh*/}
                </View>
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#f7f7f7'}, {borderWidth: 1}]}>
                    {/* */}
                    <FontAwesomeIcon icon={faTruckLoading} size={26} color = 'black' />
                        <Text style={styles.gridText}>Tow Service</Text>
                    </TouchableOpacity>
                    {/* */}
                    <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#ffeaed'}, {borderWidth: 1}, {borderColor: '#fc3c42'}]}>
                          <FontAwesomeIcon icon={faCalendar} size={26} color = '#fc3c42' />
                        <Text style={[styles.gridText, {color: '#fc3c42'}]}>Schedule Service</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flexDirection:'column'}}>
                <Text style = {styles.VersionNUmber}>Arduiva Beta 0.0.1</Text>
                

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingHorizontal: 16,
    },
    helloContainer: {
        marginTop: 20,
        marginBottom: 80,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        fontFamily: 'Asap-Medium'
    },
    gridItem: {
        width: 150,
        height: 150,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 4
    },
    gridText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Asap-SemiBold'
    },
    locationContainer :{
        alignItems : 'center',
        

    },
    locationText : {
        fontSize: 10,
        fontFamily : 'Asap-Medium'
    },
    VersionNUmber : {
        fontSize: 10,
        fontFamily : 'Asap-MediumItalic',
        color: '#86868b',
        marginTop: 130,
        textAlign: 'center'
    }
});

export default HomeScreen;
