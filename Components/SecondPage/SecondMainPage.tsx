import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'

export default function Country(name: any) {
    console.log(name)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Actions.popTo('search')}>
                <Text>{name.altSpellings[1]}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})
