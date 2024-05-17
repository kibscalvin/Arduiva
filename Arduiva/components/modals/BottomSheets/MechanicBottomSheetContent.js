import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, Dimensions } from 'react-native';

const MechanicBottomSheetContent = ({ closeBottomSheet }) => {
    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data from an API
        setTimeout(() => {
            const fetchedMechanics = [
                { id: '1', name: 'Mechanic 1', distance: '1.2 km' },
                { id: '2', name: 'Mechanic 2', distance: '2.4 km' },
                { id: '3', name: 'Mechanic 3', distance: '3.1 km' },
                // Add more mechanics data here
            ];
            setMechanics(fetchedMechanics);
            setLoading(false);
        }, 2000); // Simulating a network request
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.distance}>{item.distance}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.content}>
            <View>
                <Text style={{ color: '#86868b', fontSize: 18, textAlign:'center' }}>Nearest Mechanics</Text>
            </View>
            <FlatList
                data={mechanics}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent} // Ensures full height
                style={styles.flatList} // Ensures full width
            />
            <Button title="Close" onPress={closeBottomSheet} />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10, // Add vertical padding only
        paddingHorizontal: 0, // Remove horizontal padding
        width: '100%', // Ensure full width
    },
    
    flatListContent: {
        flexGrow: 1, // Makes FlatList fill its container
    },
    flatList: {
        width: '100%', // Ensures full width
    },
    item: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 5,
        borderRadius: 8,
       
    },
    name: {
        fontSize: 18,
        fontFamily: 'Asap-Medium',
    },
    distance: {
        color: '#666',
        fontFamily: 'Asap-Medium',
    },
});

export default MechanicBottomSheetContent;
