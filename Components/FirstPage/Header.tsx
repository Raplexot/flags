import React, {
    ReactElement,
    ReactFragment,
    useCallback,
    useEffect,
    useState,
} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native'
import { Header as HeaderRNE } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { debounce, isArray } from 'lodash'
import { Actions } from 'react-native-router-flux'
import { Countries } from '../types'

const Header: React.FunctionComponent = (props) => {
    const [searchString, setSearchString] = useState<string>('')
    const [countries, setCountries] = useState<Countries[]>([])
    const [loading, setLoading] = useState(false)
    const [cords, setCords] = useState('')
    // const findCoordinates = () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             setCords(
    //                 ` ${position.coords.latitude},${position.coords.longitude}`
    //             )
    //         },
    //         (error) => Alert.alert(error.message),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     )
    // }
    // findCoordinates()

    const onChangeSearch = (e: any) => {
        e.persist()
        console.log(e)
        const { value } = e.target
        console.log(value)
        setSearchString(value)
    }
    const debouncedSearch = useCallback(debounce(onChangeSearch, 500), [])

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            if (searchString) {
                const data = await fetch(
                    `https://restcountries.com/v3/name/${searchString}`
                ).then((res) => res.json())
                setCountries(isArray(data) ? data : [])
                console.log(data)
                setLoading(false)
            } else {
                setCountries([])
                setLoading(false)
            }
        }
        fetchData()
    }, [searchString])

    console.log(cords)
    return (
        <SafeAreaProvider>
            <HeaderRNE
                centerComponent={
                    <>
                        <TextInput
                            onChange={debouncedSearch}
                            style={styles.area}
                        />
                        <Text style={{ color: 'white', fontSize: 30 }}>
                            Your coordinates:{cords}
                        </Text>
                        <View style={styles.text}>
                            {countries.map((name, ind) => {
                                return (
                                    <TouchableOpacity
                                        key={ind}
                                        onPress={() => {
                                            Actions.jump('country', name)
                                        }}
                                    >
                                        <Text>
                                            {name.flag}
                                            {name.name.common}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </>
                }
            />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    area: {
        minWidth: 150,
        height: 40,
        fontSize: 16,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    text: { backgroundColor: 'white', width: '100%', textAlign: 'center' },
})

export default Header
