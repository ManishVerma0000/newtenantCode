import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import api from '../api/api';
export default function UpdateBuildings({ route, navigation }) {
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [tenateDbdetails, setTenateDbDetails] = useState([])


    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [Orgnisation, setOrgnisation] = useState('')
    const [buildingId, setBuildingsId] = useState('')
    const [dateofjoining, setdateofjoining] = useState('')
    const [address, setAddress] = useState('')
    const [rent, setRent] = useState('')
    const [addhar, setAddhar] = useState('')
    const [room, selectRoom] = useState('')
    const [vacantRooms, setVacantRooms] = useState([])
    const [people, setpeople] = useState('')
    const toggleCalendar = () => {
        setCalendarVisible(!calendarVisible);
    };


    const [apiresponse, setApiRespone] = useState([])
    const [buildings, setBuildings] = useState([])
    const [totalRooms, setTotalRooms] = useState(0)
    const id = route.params.id;
    useEffect(() => {


        api.get(`/singleBuildingDetails?id=${id}`).then((res) => {
            // console.log(res.data)
            setTenateDbDetails(res.data)
            console.log(res.data.rooms.length)
            setTotalRooms(res.data.rooms.length)

        }).catch((err) => {
            console.log(err, 'this is the value of the error')
        })
    }, [])


    const createTwoButtonAlertdelete = (id) => {
        Alert.alert('Update Again', 'Try Again', [
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




    return (
        <>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.scrollView}>

                    <View style={styles.Addtenate}>
                        <Text style={styles.addtenattext}>Update Building</Text>
                    </View>

                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                setUserName(text)
                            }}
                            placeholder="Building Name"
                            defaultValue={tenateDbdetails['buildingname']}


                        />
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                setUserName(text)
                            }}
                            placeholder="Landmark Name"
                            defaultValue={tenateDbdetails['location']}


                        />
                    </View>

                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                            placeholder="ContactNo"
                            defaultValue={tenateDbdetails['caretaker']}
                        />
                    </View>

                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                setPhone(text)
                            }}
                            placeholder="Rooms"
                            defaultValue={totalRooms}
                        />
                    </View>











                    <View style={styles.container}>
                        <Button
                            // onPress={nextpage}

                            style={styles.button}
                            title="Submit"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>


                </ScrollView>

            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    Addtenate: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addtenattext: {
        fontWeight: 'bold',
    },

    scrollView: {
        marginHorizontal: 20,
        flexGrow: 1,
    },

    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "black",

        borderRadius: 10,
        width: '80%',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {

        backgroundColor: 'yellow',
    }, dropdownButton: {
        width: 200,
        height: 50,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderRadius: 8,
    },
    dropdownButtonText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
    },
    dropdown: {
        marginTop: 8,
        width: 200,
        height: 'auto',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    dropdownRow: {
        backgroundColor: '#fafafa',
        padding: 10,
    },
    dropdownText: {
        color: '#333',
        fontSize: 16,
    },
});
const pickerSelectStyles = StyleSheet.create({

    inputAndroid: {

        width: 350,
        borderColor: "black",
        borderRadius: 10,
        borderTopColor: "black",
        marginLeft: 25,

        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});