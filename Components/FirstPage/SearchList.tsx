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

const searchOptions = (keys: string[]) => ({
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 250,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [...keys],
})

const filterList = (list: any, filter: string) => {
    if (!filter) return []

    const fuse = new Fuse(list, searchOptions(['name.common']))
    const result = fuse.search(filter)

    return result
}

const fetchList = async (url: string) => {
    const res = await fetch(url)
    return await res.json()
}

const SearchList = ({ filter }: any) => {
    const [list, setList] = useState([])
    const [filteredList, setFilteredList] = useState<any>([])
    const url = 'https://restcountries.com/v3.1/all'
    const playgroundNavigate = () => {
        Linking.openURL(`https://react-native-elements.js.org`)
    }
    useEffect(() => {
        fetchList(url).then((data) => setList(data))
    }, [url])

    useEffect(() => {
        setFilteredList(filterList(list, filter))
        console.log(list)
    }, [filter, list])

    const findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lock = ` ${position.coords.latitude},${position.coords.longitude}`
                console.log(lock)
                list.filter((it: any) => {
                    if (
                        it.latlng[0] > position.coords.latitude &&
                        it.latlng[1] > position.coords.longitude
                    ) {
                        return (
                            <Text>
                                {it.flag}
                                {it.name.common}
                            </Text>
                        )
                    }
                })
            },
            (error) => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    return (
        <View style={styles.list}>
            <Text></Text>
            {filteredList.map((el: any) => {
                return (
                    <TouchableOpacity
                        key={el.refIndex}
                        onPress={playgroundNavigate}
                    >
                        <View key={el.refIndex}>
                            <Text key={el.refIndex} style={styles.font}>
                                {el.item.flag}
                                {el.item.name.common}
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
