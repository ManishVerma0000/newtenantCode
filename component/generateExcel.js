import React from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Linking } from 'react-native';
import api from '../api/api';

import {  useState } from 'react';

const CenteredButton = () => {

    const addtenateAlert = (id) =>
        Alert.alert('Download excel file here', 'Download', [
            {
                text: 'OK', onPress: () => {
                    console.log('ok is pressed')

                }
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ]);
    const [url, setUrl] = useState('')
    const download = () => {
        api.get('/exportExcel').then((Res) => {
            console.log(Res.data.url, 'this is the value of the response')
            setUrl(Res.data.url)
            addtenateAlert()
            if (Res.data.url) {
                Linking.openURL(Res.data.url).catch((err) => console.error('An error occurred', err));
            }

        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={download} >
                <Text style={styles.buttonText}>Download Excel Here</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CenteredButton;
