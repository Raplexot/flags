import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React, { Component } from 'react'

class Country extends Component {
    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => Actions.firstMainPage()}>
                    <Text>Hello</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Country
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})
