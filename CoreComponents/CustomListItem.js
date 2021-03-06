import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { auth, db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessage, setChatMessage ] = useState([])

    useEffect(() =>{
        const AllChat = db
        .collection("chats")
        .doc(id)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
            setChatMessage(snapshot.docs.map((doc) =>doc.data()))
        )
        return AllChat
    })

    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider >
            <Avatar
                rounded
                source={{ uri: chatMessage?.[0]?.photoURL ||
                    "https://scontent.fdac24-1.fna.fbcdn.net/v/t1.6435-9/68657550_2939074412985070_8248171837960224768_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=d1Uy-mgy9vwAX-Gtg_z&tn=fItHuhbJ_hFH3E-5&_nc_ht=scontent.fdac24-1.fna&oh=8ea2283d3bf74b5274f87b4fd771debb&oe=60DE2E50" }}

            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 700 }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessage?.[0]?.displayName}: {chatMessage?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
