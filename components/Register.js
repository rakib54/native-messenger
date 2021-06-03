import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'

const Register = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageURL, setImageURL] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:'Login'
        })
    },[navigation])

    const register = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageURL || "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create an account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(pass) => setPassword(pass)}
                />
                <Input
                    placeholder="Image Url"
                    type="text"
                    value={imageURL}
                    onChangeText={(img) => setImageURL(img)}
                    onSubmitEditing={register}
                />
            </View>
            <Button containerStyle={styles.button} raised onPress={register} title="Register"></Button>
            {/* <View style={{height: 100}}></View> */}
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'      
    },
    inputContainer: { 
        width:300
    },
    button: {
        width:200,
        marginTop:10
    }
})
