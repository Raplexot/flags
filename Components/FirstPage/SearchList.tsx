import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import {
    Linking,
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
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

const searchOptions = (keys: string[]) => ({
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 250,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [...keys],
})

const SearchList = ({ filter }: any) => {
    const [name, setName] = useState<Name[]>([])
    const [search, setSearch] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const data = await fetch(
                `https://restcountries.com/v3/name/${search}`
            ).then((res) => res.json())
            setName(data.name)
            setLoading(false)
        }
        fetchData()
    }, [search])

    // const filterList = (list: any, filter: string) => {
    //     if (!filter) return []

    //     const fuse = new Fuse(list, searchOptions(['name.common']))
    //     const result = fuse.search(filter)

    //     return result
    // }

    // const fetchList = async (url: string) => {
    //     const res = await fetch(url)
    //     return await res.json()
    // }

    //     const [list, setList] = useState([])
    //     const [filteredList, setFilteredList] = useState<any>([])
    //     const url = 'https://restcountries.com/v3.1/all'
    //     const playgroundNavigate = () => {
    //         Linking.openURL(`https://react-native-elements.js.org`)
    //     }
    //     useEffect(() => {
    //         fetchList(url).then((data) => setList(data))
    //     }, [url])

    //     useEffect(() => {
    //         setFilteredList(filterList(list, filter))
    //         console.log(list)
    //     }, [filter, list])

    //     const findCoordinates = () => {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const lock = ` ${position.coords.latitude},${position.coords.longitude}`
    //                 console.log(lock)
    //                 list.filter((it: any) => {
    //                     if (
    //                         it.latlng[0] > position.coords.latitude &&
    //                         it.latlng[1] > position.coords.longitude
    //                     ) {
    //                         return (
    //                             <Text>
    //                                 {it.flag}
    //                                 {it.name.common}
    //                             </Text>
    //                         )
    //                     }
    //                 })
    //             },
    //             (error) => Alert.alert(error.message),
    //             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //         )
    //     }

    return (
        <View style={styles.list}>
            {name.map((el: any) => {
                return (
                    <TouchableOpacity
                        key={el.refIndex}
                        // onPress={playgroundNavigate}
                    >
                        <View key={el.refIndex}>
                            <Text key={el.refIndex} style={styles.font}>
                                {el.flag}
                                {el.common}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
            {/* <FlatList
                style={styles.list}
                data={filteredList}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={playgroundNavigate}>
                        <Text>{item}</Text>
                    </TouchableWithoutFeedback>
                )}
            /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    list: {
        marginTop: 15,
        minWidth: 100,
        height: 65,
        fontSize: 16,
        backgroundColor: 'white',
        textAlign: 'center',
        overflow: 'hidden',
    },
    font: {
        color: 'black',
    },
})

export default SearchList
