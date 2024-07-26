import React from 'react';
import { Button, View, Text } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import api from '../api/api';
export default function AddBuilding({ route, navigation }) {

    const createTwoButtonAlertaddBuilding = (id) => {
        Alert.alert('Added', 'Added', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Ok',
                onPress: () => console.log('Cancel Pressed'),
                style: 'ok',
            },
        ]);
    };


    const createTwoButtonAlertaddBuildingerror = (id) => {
        Alert.alert('error occurs', 'Try Again', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Ok',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ]);
    };
    const [buildingname, setbuildingname] = useState('')
    const [buildingRoomName, setbuildingRoomName] = useState('')
    const [room, setrooms] = useState('')
    const [location, setlocation] = useState('')
    const [caretaker, setcaretaker] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')

    const addbuildingHandler = () => {
        api.post('/addbuilding', {
            buildingname, room, location, caretaker, phoneNumber, buildingRoomName
        }).then((res) => {
            console.log(res)
            createTwoButtonAlertaddBuilding()
            navigation.navigate('AllBuildings')

        }).catch((err) => {
            console.log(err)
            createTwoButtonAlertaddBuildingerror()
        })
    }



    const onChangeNumber = (text) => {
        // Validate that the input is numeric
        const numericValue = text.replace(/[^0-9]/g, '');
        setrooms(numericValue);
    };

    return (
        <>
            <SafeAreaView>

                <View style={styles.Addtenate}>
                    <Text style={styles.addtenattext}>
                        Add Building
                    </Text>
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setbuildingname(text)
                        }}
                        placeholder="Name of Building"
                        placeholderTextColor="black"
                    />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setbuildingRoomName(text)
                        }}
                        placeholder="Room Name"
                        placeholderTextColor="black"
                    />
                </View>

                <View style={styles.container} >
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setlocation(text)
                        }}
                        placeholder="Landmark"
                        placeholderTextColor="black"

                    />
                </View>

                <View style={styles.container} >
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setphoneNumber(text)
                        }}
                        placeholder="ContactNo."
                        placeholderTextColor="black"

                    />
                </View>
                <View style={styles.container} >
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setcaretaker(text)
                        }}
                        placeholder="Care Taker Name"
                        placeholderTextColor="black"

                    />
                </View>
                <View style={styles.container} >
                    <TextInput
                        value={room}
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        placeholder="Total Room"
                        keyboardType="numeric"
                        placeholderTextColor="black"

                    />
                </View>

                <View style={styles.container} >
                    <Button
                        onPress={addbuildingHandler}

                        style={styles.button}
                        title="Submit"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

            </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    Addtenate: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    addtenattext: {
        fontWeight: 'bold',
        color: "black"

    },

    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        border: "2px solid black",
        borderRadius: 10,
        width: '80%',
        color: "black",
        borderColor: "black"
    },
    container: {
        display: "flex",
        justifyContent: "center"
        ,
        alignItems: "center"
    },
    button: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        border: "2px solid black",
        borderRadius: 10,
        width: '80%',
        backgroundColor: "yellow"
    }
});