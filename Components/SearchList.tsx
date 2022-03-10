import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { FlatList } from 'react-native-gesture-handler'
import {
    Linking,
    TouchableWithoutFeedback,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

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

const filterList = (list: any, filter: string) => {
    if (!filter) return list

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

    console.log(filteredList[0])

    return (
        <View style={styles.list}>
            {filteredList.map((el: any) => {
                return (
                    <TouchableOpacity
                        key={el.refIndex}
                        onPress={playgroundNavigate}
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
