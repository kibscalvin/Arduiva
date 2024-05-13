import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MechanicScreen = () => {
  return (
    <View style = {styles.container}>
      <Text>MechanicScreen</Text>
    </View>
  )
}

export default MechanicScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    }

})