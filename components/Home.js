import React, { useLayoutEffect } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../CoreComponents/CustomListItem'
import { auth } from '../firebase'

const Home = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Messenger",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: 'black' },
            headerTintColor: "black",
            headerLeft: () => {
                <View style={{ marginLeft: 20 }}>
                    <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                </View>
            },
        })
    }, [])
    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
