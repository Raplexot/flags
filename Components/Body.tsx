import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Body = () => {
    return (
        <View style={styles.Body}>
            <Text style={styles.Text}>Enter name of your country</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Body: {
        width: '100%',
        height: '100%',
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3d300de',
    },
    Text: {
        paddingBottom: 100,
        color: 'white',
        textAlign: 'center',
        fontSize: 100,
    },
})

export default Body
