import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const LocationUpdate = () => {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const storedLocation = useSelector(state => state.location);

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const handleSaveLocation = () => {
    dispatch(setLocation(location));
  };

  return (
    <View style={styles.container}>
      <Text>Location Update.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        onChangeText={handleLocationChange}
        value={location}
      />
      <Button title="Save Location" onPress={handleSaveLocation} />
      <Text>Stored Location: {storedLocation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default LocationUpdate;
