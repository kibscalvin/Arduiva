import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons, but i dont need them
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBoltLightning, faCarBattery } from '@fortawesome/free-solid-svg-icons';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import MechanicScreen from './screens/MechanicScreen';




const HomeScreen = () => {
    const name = 'Calvin'; // Define my name here, i like how it looks
    const currentLocation = 'Kyanja, Uganda'

   const navigation = useNavigation();


    function hasPressed(){
        console.log('pressed')
    }

    return (
        <View style={styles.container}>
                                  {/* HelloContainer*/}
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}><Text style = {{color: '#86868b'}}>Hello,</Text> {name}</Text>
                <View style = {styles.locationContainer}>
                <Ionicons name="location" size={24} color="#161818" />
                <Text style = {styles.locationText }>{currentLocation}</Text>
                </View>
            </View>
            {/* MainContainer*/}
            <View style={styles.mainContainer}>
                <View style = {{alignSelf: 'flex-start', marginLeft: 5, paddingBottom: 8}}>
                    <Text style = {{fontFamily: 'Asap-Medium', fontSize: 22, color: '#86868b', }}>Ping the Nearest Service Provider</Text>
                </View>
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#fdfde5' }, {borderWidth: 2}, {borderColor: '#efa400'}]} onPress={hasPressed}>
                    <FontAwesomeIcon icon={faGasPump} size={26} color = '#efa400'  style = {{marginLeft: 5}}/>
                        
                        <Text style={[styles.gridText, {color: '#efa400'}]}>Fuel</Text>
                    </TouchableOpacity>
                   {/* blehh*/}
                    <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#e3f2fd'}, {borderWidth: 2}, {borderColor: '#0a99f5'}]} 

                    onPress = {() => navigation.navigate('Mechanic')}
                    
                    >
                     <FontAwesomeIcon icon={faCarBattery} size={26} color = '#0a99f5' />

                        <Text style={[styles.gridText, {color: '#0a99f5'}, {fontSize: 17}]}>Mechanic</Text>
                    </TouchableOpacity>
                {/* blehh*/}
                </View>
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#f7f7f7'}, {borderWidth: 2}]}>
                    {/*bleh */}
                    <FontAwesomeIcon icon={faTruckLoading} size={26} color = 'black' />
                        <Text style={styles.gridText}>Tow Service</Text>
                    </TouchableOpacity>
                    {/*bleh */}
                    <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#ffeaed'}, {borderWidth: 2}, {borderColor: '#fc3c42'}]}>
                          <FontAwesomeIcon icon={faCalendar} size={26} color = '#fc3c42' />
                        <Text style={[styles.gridText, {color: '#fc3c42'}]}>Schedule Service</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flexDirection:'column'}}>
                <TouchableOpacity>
                <View style = {styles.contactContainer}>
                    <Text style = {styles.contactText}>Emergency Contacts</Text>
                </View>
                

                </TouchableOpacity>
                <Text style = {styles.VersionNumber}>Arduiva Beta 0.0.1</Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    helloContainer: {
        marginTop: 20,
        marginBottom: 20,
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
        fontFamily : 'Asap-Medium',
        color: '#86868b'
    },
    VersionNumber : {
        fontSize: 12,
        fontFamily : 'Poppins-Regular',
        color: '#86868b',
        marginTop: 28,
        textAlign: 'center'
    },
    contactContainer : {
        marginVertical: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#86868b',
        borderRadius: 8,
        padding: 16,
        backgroundColor: `#f3f3f3`,
        width: '100%',
    },
    contactText : {
        fontSize: 18,
        fontFamily: 'Asap-Medium',
        color: 'black'
    }
});

export default HomeScreen;
