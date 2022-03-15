import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import React from 'react'

export default function Country(name: any) {
    console.log(name)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Actions.popTo('search')}>
                <Text style={styles.text}>
                    {name.flag}
                    {name.altSpellings[1]}
                </Text>
            </TouchableOpacity>
            <Text style={styles.text}>Capital:{name.capital}</Text>
            <Text style={styles.text}>Region:{name.region}</Text>
            <Text style={styles.text}>Population:{name.population}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
    },
})
