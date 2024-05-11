import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCog, faCreditCard, faUserCog, faGavel, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import DarkModeModal from '../components/modals/darkModeModal'; // Import the modal content
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';




const ProfilePage = () => {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const navigation = useNavigation();
    const goToSettings = () => {
        navigation.navigate('Settings');
    }
    const goToPayments = () => {
        navigation.navigate('Payments')
    }

    return (
        <View style={styles.container}>
            {/* Header Container */}
            <TouchableOpacity onPress={toggleModal}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <FontAwesomeIcon icon={faUser} size={26} color="#D1EDC0" style={styles.icon} />
                        <View style={styles.contactInfo}>
                            <Text style={styles.userName}>Kibirige Calvin</Text>
                            <Text style={styles.number}>+25675910888</Text>
                        </View>
                    </View>
                    <FontAwesomeIcon icon={faAngleRight} size={20} color="#000" />
                </View>
            </TouchableOpacity>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <TouchableOpacity style={styles.infoItem} onPress={goToSettings}>
                    <View style={styles.infoContent}>
                        <FontAwesomeIcon icon={faCog} size={20} color="#000" style={styles.icon} />
                        <Text style={styles.infoText}>Settings</Text>
                    </View>
                    <FontAwesomeIcon icon={faAngleRight} size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem} onPress ={goToPayments}>
                    <View style={styles.infoContent}>
                        <FontAwesomeIcon icon={faCreditCard} size={20} color="#000" style={styles.icon} />
                        <Text style={styles.infoText}>Payment Methods</Text>
                    </View>
                    <FontAwesomeIcon icon={faAngleRight} size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem}>
                    <View style={styles.infoContent}>
                        <FontAwesomeIcon icon={faUserCog} size={20} color="#000" style={styles.icon} />
                        <Text style={styles.infoText}>Manage Arduiva Account</Text>
                    </View>
                    <FontAwesomeIcon icon={faAngleRight} size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem}>
                    <View style={styles.infoContent}>
                        <FontAwesomeIcon icon={faGavel} size={20} color="#000" style={styles.icon} />
                        <Text style={styles.infoText}>Legal</Text>
                    </View>
                    <FontAwesomeIcon icon={faAngleRight} size={20} color="#000" />
                </TouchableOpacity>
                <Modal visible={isModalVisible} animationType="slide">
                    <DarkModeModal
                        darkModeEnabled={isDarkModeEnabled}
                        onDarkModeToggle={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
                    />
                    <TouchableOpacity style={styles.closeModalButton} onPress={toggleModal}>
                        <Text style={styles.closeModalButtonText}>Close</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingHorizontal: 8,
        marginVertical: 0,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 24,
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 16,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Asap-Medium',
        fontWeight: '500',  
        marginLeft: 4,
    },
    profileInfo: {
        marginTop: 20,
        backgroundColor: '#fafafa',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    infoContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        fontFamily: 'Asap-Light',
        fontWeight: '500',
    },
    number: {
        fontSize: 14,
        fontFamily: 'Asap-Light',
        fontWeight: '500',
        color: '#333',
    },
    contactInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    closeModalButton: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        alignItems: 'center',
    },
    closeModalButtonText: {
        fontSize: 16,
        fontFamily: 'Asap-Medium',
    },
});

export default ProfilePage;
