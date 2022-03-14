import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'
import { Header as HeaderRNE } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { debounce, isArray } from 'lodash'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import * as RNLocalize from 'react-native-localize'

type HeaderComponentProps = {
    title?: string
    view?: string
}
export interface Welcome {
    name: Name
    idd: Idd
    capital: string[]
    languages: Languages
    flag: string
    population: number
    flags: string[]
}

export interface Idd {
    root: string
    suffixes: string[]
}

export interface Languages {
    ukr: string
}

export interface Name {
    common: string
    official: string
    nativeName: NativeName
}

export interface NativeName {
    ukr: Translation
}

export interface Translation {
    official: string
    common: string
}
const Header: React.FunctionComponent<HeaderComponentProps> = (props) => {
    const [searchString, setSearchString] = useState<string>('')
    const [countries, setCountries] = useState<Welcome[]>([])
    const [loading, setLoading] = useState(false)

    const findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lock = ` ${position.coords.latitude},${position.coords.longitude}`
                console.log(lock)
            },
            (error) => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }
    const cords = findCoordinates()
    console.log(cords)

    const onChangeSearch = (e: any) => {
        const { value } = e.target
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

    const geo = RNLocalize.getCountry()
    console.log(geo)
    return (
        <SafeAreaProvider>
            <HeaderRNE
                centerComponent={
                    <>
                        <TextInput
                            onChange={debouncedSearch}
                            style={styles.area}
                        />
                        <View style={styles.text}>
                            {countries.map((name) => {
                                return (
                                    <TouchableOpacity
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
            //{' '}
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
