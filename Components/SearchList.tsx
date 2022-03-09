import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { FlatList } from 'react-native-gesture-handler'
import { Linking, TouchableWithoutFeedback, View } from 'react-native'

const searchOptions = (keys: string[]) => ({
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [...keys],
})

const filterList = (list: Array<string>, filter: string) => {
    if (!filter) return list

    const fuse = new Fuse(list, searchOptions(['body']))
    const result = fuse.search(filter)

    return result
}

const fetchList = async (url: string) => {
    const res = await fetch(url)
    return await res.json()
}

const SearchList = ({ filter }: any) => {
    const [list, setList] = useState([])
    const [filteredList, setFilteredList] = useState<
        string[] | Fuse.FuseResult<string>[]
    >([])
    const url = 'https://restcountries.eu'
    const playgroundNavigate = () => {
        Linking.openURL(`https://react-native-elements.js.org`)
    }
    useEffect(() => {
        fetchList(url).then((data) => setList(data))
    }, [url])

    useEffect(() => {
        setFilteredList(filterList(list, filter))
    }, [filter, list])

    return (
        <View>
            <FlatList
                data={[filteredList]}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={playgroundNavigate}>
                        <Text style={styles.item}>{item.key}</Text>
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    )
}

export default SearchList
