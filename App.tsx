import React, { Component } from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Country from './Components/SecondPage/CountryPage'
import Search from './Components/FirstPage/SearchPage'

class App extends Component {
    render(): React.ReactNode {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="search"
                        component={Search}
                        title="Search"
                        initial
                    />

                    <Scene key="country" component={Country} title="Country" />
                </Scene>
            </Router>
        )
    }
}

export default App
