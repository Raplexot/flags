import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { FlatList } from 'react-native-gesture-handler'
import Geocoder from 'react-native-geocoding'
import {
    Linking,
    TouchableWithoutFeedback,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { initialWindowMetrics } from 'react-native-safe-area-context';

const searchOptions2 = (key: string[]) => ({
    key: [...key],
})
const searchOptions = (keys: string[]) => ({
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 250,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [...keys],
})
type Name = {
    [key: string]: { [key: string]: string }
}
interface Country {
    name: Name
}

const filterList = (list: Array<any>, filter: string) => {
    if (!filter) return list

    const fuse = new Fuse(list, searchOptions(['name.common']))
    const result = fuse.search(filter)

    return result.map((el: any) => el.item)
}

const fetchList = async (url: string) => {
    const res = await fetch(url)
    return await res.json()
}

const SearchList = ({ filter }: { filter: string }) => {
    const [list, setList] = useState([])
    const [filteredList, setFilteredList] = useState<Array<any>>([])
    const url = 'https://restcountries.com/v3.1/all'
    const playgroundNavigate = () => {
        Linking.openURL(`https://react-native-elements.js.org`)
    }
    useEffect(() => {
        fetchList(url).then((data) => setList(data))
    }, [url])

    useEffect(() => {
        setFilteredList(filterList(list, filter))
    }, [filter, list])
    const [location, setLocation] = useState('')
    Geocoder.init('xxxxxxxxxxxxxxxx')
    const findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lock =  `${position.coords.latitude},${position.coords.longitude}`
                Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {
                    console.log(json);
    
                    const addressComponent = json.results[0].address_components;
                    
                   console.log(addressComponent)
    
                    console.log(addressComponent);
                }).catch(error => console.warn(error));                list.filter((it: any) => {
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
   console.log()
    return (
        <View style={styles.list}>
            <Text></Text>
            {filteredList.map((el: any) => {
                return (
                    <TouchableOpacity
                        key={el.refIndex}
                        onPress={findCoordinates}
                    >
                        <View key={el.refIndex}>
                            <Text key={el.refIndex} style={styles.font}>
                                {el.flag}
                                {el.name.common}
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
