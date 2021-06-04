import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button } from 'react-native'
import { StyleSheet, ScrollView, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../CoreComponents/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const Home = ({ navigation }) => {
    const [chats, setChats] = useState([])
    console.log(chats);
    const signOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
    }

    useEffect(() => {
        const AllChat = db.collection("chats").onSnapshot((snapshot) => {
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })
        return AllChat
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Messenger",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: 'black' },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>

                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('AllChat', {
            id, chatName
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
                {/* {
                    chats.map((chat) => <CustomListItem key={chat.id} chat={chat}></CustomListItem>)
                } */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
