import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase'
import firebase from 'firebase'


const AllChat = ({ navigation, route }) => {

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Avatar rounded 
                    source={{ uri: messages[0]?.data.photoURL }} />

                    <Text style={{ color: "white", marginLeft: 10, fontWeight: 600 }}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white"></AntDesign>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    margin: 20
                }}>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation,messages])

    const sendMessage = () => {
        Keyboard.dismiss()
        db.collection('chats').doc(route.params.id).collection('message').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput("");
    }

    useLayoutEffect(() => {
        const AllChat = db
            .collection("chats")
            .doc(route.params.id)
            .collection("message")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
            )
        return AllChat

    }, [route])

    return (
        <SafeAreaView>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop: 10}}>

                            {
                                messages.map(({ id, data }) =>
                                    data.email === auth.currentUser.email ? (
                                        <View key={id} style={styles.receiver}>
                                            <Avatar containerStyle={{}}
                                                position="absolute"
                                                rounded
                                                bottom={-15}
                                                right={-5}
                                                size={20}
                                                source={{ uri: data.photoURL }}
                                            />
                                            <Text style={styles.receiverText}>{data?.message}</Text>
                                        </View>
                                    ) :
                                        (
                                            <View key={id} style={styles.sender}>
                                                <Avatar rounded 
                                                    position="absolute"
                                                    rounded
                                                    bottom={-15}
                                                    right={-5}
                                                    size={20}
                                                    source={{ uri: data.photoURL }}
                                                />
                                                <Text style={styles.senderText}>{data?.message}</Text>
                                                <Text style={styles.senderName}>{data?.displayName}</Text>
                                            </View>
                                        )
                                )
                            }

                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                placeholder="Type a message"
                                onSubmitEditing={sendMessage}
                                style={styles.TextInput}
                            />
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default AllChat

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    TextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 10
    },
    receiverText: {
        color: 'black',
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    senderText: {
        color: 'black',
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B6BE6",
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: 'relative'
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    }
})
