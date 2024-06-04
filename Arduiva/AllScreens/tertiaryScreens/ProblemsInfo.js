import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ProblemsInfo = ({ isVisible, onClose, onProceed }) => {
  const [problems, setProblems] = useState([
    { id: 1, name: 'Flat Tire' },
    { id: 2, name: 'Engine Overheating' },
    { id: 3, name: 'Brake Failure' },
    { id: 4, name: 'Fuel Leak' },
    { id: 5, name: 'Transmission Issues' },
    { id: 6, name: 'Car Not Starting' },
    { id: 7, name: 'Not sure?' },
  ]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedSpareTireOption, setSelectedSpareTireOption] = useState(null);

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setSelectedSpareTireOption(null); // Reset spare tire option when a new problem is selected
  };

  const handleSelectSpareTireOption = (option) => {
    setSelectedSpareTireOption(option);
  };

  return (
    <BottomSheet
      index={isVisible ? 0 : -1}
      snapPoints={['100%']}
      enablePanDownToClose={true}
      onChange={(index) => {
        if (index === -1) {
          onClose();
        }
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesomeIcon icon={faClose} size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>What is the problem?</Text>
        </View>
        <FlatList
          data={problems}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectProblem(item)}>
              <Text style={[
                styles.problem,
                selectedProblem?.id === item.id && styles.selectedProblem
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
        {selectedProblem?.id === 1 && (
          <View style={styles.spareTireOptions}>
            <TouchableOpacity
              style={[
                styles.spareTireButton,
                selectedSpareTireOption === 'available' && styles.selectedSpareTireButton
              ]}
              onPress={() => handleSelectSpareTireOption('available')}
            >
              <Text style={[
                styles.spareTireButtonText,
                selectedSpareTireOption === 'available' && styles.spareTireButtonTextSelected
              ]}>Spare Tire Available</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.spareTireButton,
                selectedSpareTireOption === 'unavailable' && styles.selectedSpareTireButton
              ]}
              onPress={() => handleSelectSpareTireOption('unavailable')}
            >
              <Text style={[
                styles.spareTireButtonText,
                selectedSpareTireOption === 'unavailable' && styles.spareTireButtonTextSelected
              ]}>Spare Tire Unavailable</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            (!selectedProblem || (selectedProblem?.id === 1 && !selectedSpareTireOption)) && styles.buttonDisabled
          ]}
          disabled={!selectedProblem || (selectedProblem?.id === 1 && !selectedSpareTireOption)}
          onPress={onProceed}
        >
          <Text style={styles.buttonText}>Proceed</Text>
</TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  closeButton: {
    position: 'absolute',
    left: 0,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#000',
    padding: 8,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Asap-SemiBold',
    color: '#8686b',
  },
  problem: {
    fontSize: 18,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontFamily: 'Asap-Regular',
  },
  selectedProblem: {
    borderColor: '#6caf41',
    backgroundColor: '#eff8e9',
    color: '#6caf41',
    fontFamily: 'Asap-SemiBold'
  },
  flatListContent: {
    paddingBottom: 16,
  },
  spareTireOptions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  spareTireButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  selectedSpareTireButton: {
    backgroundColor: '#e7f6e6',
  },
  spareTireButtonText: {
    color: '#86868b',
    fontSize: 16,
    fontFamily: 'Asap-SemiBold'
  },
  spareTireButtonTextSelected: {
    color: '#6caf41',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Asap-SemiBold'
  },
});

export default ProblemsInfo;
