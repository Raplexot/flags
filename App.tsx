import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Header from './Components/FirstPage/Header'
import Body from './Components/Body'

export default function App() {
    return (
        <View style={styles.container}>
            <Header />
            {/* <Body /> */}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})
