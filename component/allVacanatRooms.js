import React from 'react';
import { View, SafeAreaView, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../api/api';

const VacantRooms = ({ route, navigation }) => {
    const [Apiresponse, setApiResponse] = useState([]);

    useEffect(() => {
        api.get('/allVacanatRooms')
            .then((res) => {
                console.log(res.data.data);
                setApiResponse(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderRoom = ({ item }) => <Text style={styles.roomText}>{item}</Text>;

    const renderBuilding = ({ item }) => (
        <View style={styles.buildingContainer}>
            <Text style={styles.buildingName}>
                {item.buildingName} {'  '}
                {item.location}
            </Text>
            {item.rooms.length > 0 ? (
                <FlatList
                    style={{ color: 'red' }}
                    data={item.rooms}
                    renderItem={renderRoom}
                    keyExtractor={(room, index) => index.toString()} // Use index as key if room names are not unique
                />
            ) : (
                <Text style={styles.noRoomsText}>No vacant rooms</Text>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <FlatList
                data={Apiresponse}
                renderItem={renderBuilding}
                keyExtractor={(building, index) => index.toString()} // Use index as key if building names are not unique
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Home Page"
                    onPress={() => {
                        navigation.navigate('Homeone');
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    buildingContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    buildingName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    roomText: {
        fontSize: 16,
        paddingLeft: 10,
        color: 'black',
    },
    noRoomsText: {
        fontSize: 16,
        fontStyle: 'italic',
        paddingLeft: 10,
        color: 'red',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default VacantRooms;
