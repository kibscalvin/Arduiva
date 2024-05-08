import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EPayCard from '../components/ePayCard'
import PaymentOptions from '../components/paymentOptions'

export default function EPayPage() {
  return (
    <View style = {styles.container}>
        <EPayCard />
        <PaymentOptions />

        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  }
})