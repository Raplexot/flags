import React, { useState } from 'react'
import { StyleSheet, View, Linking, TextInput } from 'react-native'
import { Header as HeaderRNE, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SearchList from './SearchList'

type HeaderComponentProps = {
    title?: string
    view?: string
}

const Header: React.FunctionComponent<HeaderComponentProps> = (props) => {
    // const docsNavigate = () => {
    //     Linking.openURL(`https://reactnativeelements.com/docs/${props.view}`)
    // }

    // const playgroundNavigate = () => {
    //     Linking.openURL(`https://react-native-elements.js.org/#/${props.view}`)
    // }
    const [searchString, setSearchString] = useState('')

    const onChangeSearch = (e: any) => {
        const { value } = e.target
        setSearchString(value)
    }
    return (
        <SafeAreaProvider>
            <HeaderRNE
                centerComponent={
                    <>
                        <TextInput
                            value={searchString}
                            onChange={onChangeSearch}
                            style={styles.area}
                        />
                        <SearchList filter={searchString} />
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
})

export default Header
