import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Country() {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text onPress={() => Actions.search}>Hello</Text>
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
