import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Linking, Text, TextInput } from 'react-native'
import { Header as HeaderRNE, Icon } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { debounce, isArray } from 'lodash'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'

// const docsNavigate = () => {
//     Linking.openURL(`https://reactnativeelements.com/docs/${props.view}`)
// }

// const playgroundNavigate = () => {
//     Linking.openURL(`https://react-native-elements.js.org/#/${props.view}`)
// }

type HeaderComponentProps = {
    title?: string
    view?: string
}
export interface Welcome {
    name: Name
    tld: string[]
    cca2: string
    ccn3: string
    cca3: string
    cioc: string
    independent: boolean
    status: string
    unMember: boolean
    currencies: Currencies
    idd: Idd
    capital: string[]
    altSpellings: string[]
    region: string
    subregion: string
    languages: Languages
    translations: { [key: string]: Translation }
    latlng: number[]
    landlocked: boolean
    borders: string[]
    area: number
    demonyms: Demonyms
    flag: string
    maps: Maps
    population: number
    gini: Gini
    fifa: string
    car: Car
    timezones: string[]
    continents: string[]
    flags: string[]
}

export interface Car {
    signs: string[]
    side: string
}

export interface Currencies {
    UAH: Uah
}

export interface Uah {
    name: string
    symbol: string
}

export interface Demonyms {
    eng: Eng
    fra: Eng
}

export interface Eng {
    f: string
    m: string
}

export interface Gini {
    '2019': number
}

export interface Idd {
    root: string
    suffixes: string[]
}

export interface Languages {
    ukr: string
}

export interface Maps {
    googleMaps: string
    openStreetMaps: string
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
    const [name, setName] = useState<Welcome[]>([])

    const [loading, setLoading] = useState(false)
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
                setName(isArray(data) ? data : [])
                console.log(data)
                setLoading(false)
            } else {
                setName([])
                setLoading(false)
            }
        }
        fetchData()
    }, [searchString])

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
                            {name.map((name) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => Actions.secondMainPage()}
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
