import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Header from './Components/FirstPage/Header'
import { Router, Scene } from 'react-native-router-flux'
import FirstMainPage from './Components/FirstPage/FirstMainPage'
import SecondMainPage from './Components/SecondPage/SecondMainPage'

class App extends Component {
    render(): React.ReactNode {
        return (
            <Router>
                <Scene key="root" sceneStyle={styles?.container}>
                    <Scene
                        sceneStyle={styles?.container}
                        key="firstMainPage"
                        component={FirstMainPage}
                        title="Search"
                        initial={true}
                    />

                    <Scene
                        sceneStyle={styles?.container}
                        key="secondMainPage"
                        component={SecondMainPage}
                        title="Country"
                    />
                </Scene>
            </Router>
        )
    }
}

export default App
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})
