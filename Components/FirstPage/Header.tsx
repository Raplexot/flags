import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Linking, TextInput } from 'react-native'
import { Header as HeaderRNE, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SearchList from './SearchList'
import { useMemo } from 'react'
import { debounce } from 'lodash'

// const debounce = (func: any) => {
//     let timer: any
//     return function (...args: any) {
//         // eslint-disable-next-line @typescript-eslint/no-this-alias
//         const context = this
//         if (timer) clearTimeout(timer)
//         timer = setTimeout(() => {
//             timer = null
//             func.apply(context, args)
//         }, 500)
//     }
// }

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

    const debouncedSearch = useCallback(debounce(onChangeSearch, 500), [])
    return (
        <SafeAreaProvider>
            <HeaderRNE
                centerComponent={
                    <>
                        <TextInput
                            onChange={debouncedSearch}
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
