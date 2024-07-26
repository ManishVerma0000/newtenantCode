import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';


import api from '../api/api';
export default function AuthenticateAdharCard({ navigation }) {

    const [number, onChangeNumber] = React.useState('');
    const [email, setEmail] = useState('')
    const [showloader, setShowLoader] = useState(false)
    // const [password, setPassword] = useState('')


    const submitlogin = () => {
        setShowLoader(true)
        api.post('/addharCardVerification', {
            addharcardnumber: email,

        }).then((res) => {
            console.log(res.data)
            setShowLoader(false)
            Toast.show({
                type: 'success',
                text1: 'Verified User',

            });
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
            setShowLoader(false)
            Toast.show({
                type: 'Warn',
                text1: 'Invalid  User',

            });
            navigation.navigate('Home')
        })
    }

    const handleEmailChange = (text) => {

        setEmail(text);
    };



    return (
        <View >

            <SafeAreaView>


                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/adhar.png')}
                        style={styles.logo}
                    />
                </View>

                {
                    showloader == true ? <ActivityIndicator size="large" /> : null
                }

                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleEmailChange}
                        placeholder="Enter Adhar Number"
                    />
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button}
                        onPress={submitlogin}

                    >


                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>


        </View>
    )
}
const styles = StyleSheet.create({
    Addtenate: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addtenattext: {
        fontWeight: 'bold',
        fontSize: 30
    },

    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,

        borderRadius: 10,
        width: '80%',
    },
    container: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        border: '2px solid black',
        borderRadius: 10,
        width: 100,
        backgroundColor: 'yellow',
    },
    button: {
        backgroundColor: '#6a5acd', // Purple color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff', // White color
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100, // Adjust the width and height as needed
        height: 150,

        marginBottom: 20, // Adjust margin as needed
    },
});
