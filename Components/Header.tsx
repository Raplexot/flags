import React, { useState } from 'react'
import { StyleSheet, View, Linking, TextInput } from 'react-native'
import { Header as HeaderRNE, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
        // <SafeAreaProvider>
        <HeaderRNE
            centerComponent={
                <TextInput
                    value={searchString}
                    onChange={onChangeSearch}
                    style={styles.area}
                />
            }
        />
        // </SafeAreaProvider>
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

// headerContainer: {
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#397af8',
// },

// headerRight: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginTop: 5,
// },

//     leftComponent={{
//         icon: 'menu',
//         color: '#fff',
//     }}
//     rightComponent={
//         <View style={styles.headerRight}>
//             <TouchableOpacity onPress={docsNavigate}>
//                 <Icon name="description" color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={{ marginLeft: 10 }}
//                 onPress={playgroundNavigate}
//             >
//                 <Icon
//                     type="antdesign"
//                     name="rocket1"
//                     color="white"
//                 />
//             </TouchableOpacity>
//         </View>
//     }
