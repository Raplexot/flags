import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Header from './Header'

export default function Search() {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})
