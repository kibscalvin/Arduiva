import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native';

const MechanicScreen = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        setIsVisible(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const closeBottomSheet = () => {
        setIsVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapsView}>
                <Text>Mechanic Screen</Text>
                <TouchableOpacity onPress={closeBottomSheet}>
                    <Text>Close Bottom Sheet</Text>
                </TouchableOpacity>
            </View>
            <Modal
                isVisible={isVisible}
                backdropOpacity={0.5}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                style={styles.modal}
                onSwipeComplete={() => setIsVisible(false)}
                swipeDirection={['down', 'up']}
                propagateSwipe={true}
                gestureEnabled={true}
            >
                <View style={styles.modalContent}>
                    <Text>Bottom Sheet Content</Text>
                    <Button title="Close" onPress={closeBottomSheet} />
                </View>
            </Modal>
        </SafeAreaView>
    );
}

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
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

export default MechanicScreen;
