import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add New Conversation"
        })
    }, [navigation])

    const createChat = async () => {
        await db.collection("chats")
        .add({
            chatName: input
        })
        .then(() =>{
            navigation.goBack();
        })
        .catch((error) => alert(error))
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="green" />
                }
                onSubmitEditing={createChat}
            />
            <Button disabled={!input} onPress={createChat} title="create new chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding:30,
        height:"100%"
    }
})
