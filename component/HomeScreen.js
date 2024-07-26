import React, { useEffect, useState } from 'react';
import { View, Share, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the hamburger menu icon

const HomeScreen = ({ navigation }) => {

    const onPressCurrentMonthRevenue = () => { navigation.navigate('MonthlyCharge') }
    const [count, setCount] = useState(0);
    const onPressallbuildings = () => navigation.navigate('AllBuildings')
    const onPress = () => navigation.navigate('CompletedBills');
    const onPressHoldbills = () => navigation.navigate('HoldBills');
    const onPressAddteate = () => navigation.navigate('Addtenate');
    const onPresslistofTenate = () => navigation.navigate('listoftenate')
    const onPressAllBills = () => navigation.navigate('Allbills')
    const onPressPendingBills = () => navigation.navigate('PendingBills')
    const onPresssetting = () => navigation.navigate('UpdateTenate')
    const onPressAllVacantRooms = () => navigation.navigate('AllVacantRooms')
    const onPressaddbuilding = () => navigation.navigate('addbuilding')
    const onpressexcel = () => navigation.navigate('download')
    return (
        <ScrollView>
            <View style={styles.container}>

                <TouchableOpacity style={styles.button} onPress={onPressAddteate}>
                    <Text style={styles.textstyle}>Add Tenant</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onPresslistofTenate}>
                    <Text style={styles.textstyle}>List of Tenant</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.allbillbutton} onPress={onPressAllBills}>
                    <Text style={styles.textstyle}>All Bills</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.onPressPendingBills} onPress={onPressPendingBills}>
                    <Text style={styles.textstyle}>Pending Bills</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.onPressHoldbills} onPress={onPressHoldbills}>
                    <Text style={styles.textstyle}>Hold Bills</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.onPress} onPress={onPress}>
                    <Text style={styles.textstyle}>Completed Bills</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.button} onPress={onPresssetting}>
                <Text style={styles.textstyle} >Setting</Text>
            </TouchableOpacity> */}
                <TouchableOpacity style={styles.button} onPress={onPressaddbuilding}>
                    <Text style={styles.textstyle}>Add Building</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onPressallbuildings}>
                    <Text style={styles.textstyle}>All Buildings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onPressAllVacantRooms}>
                    <Text style={styles.textstyle}>All Vacanat Rooms</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onPressCurrentMonthRevenue}>
                    <Text style={styles.textstyle}>Current Month Revenue</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.button} onPress={onpressexcel}>
                    <Text style={styles.textstyle}>Download Tenant List</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    textstyle: {
        fontSize: 20
    },

    container: {

        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#32a89e',
        padding: 10,
        margin: 20,
        color: "black",
        fontWeight: "bold",
        fontSize: 700,
        borderRadius: 20
    },
    allbillbutton: {
        alignItems: 'center',
        backgroundColor: '#32a89e',
        padding: 10,
        margin: 20,
        color: "black",
        fontWeight: "bold",
        fontSize: 700,
        borderRadius: 20,
        backgroundColor: "#ebe134"
    },
    onPressPendingBills: {
        alignItems: 'center',
        backgroundColor: '#32a89e',
        padding: 10,
        margin: 20,
        color: "black",
        fontWeight: "bold",
        fontSize: 700,
        borderRadius: 20,
        backgroundColor: "#eb3434"
    },

    onPressHoldbills: {
        alignItems: 'center',
        backgroundColor: '#32a89e',
        padding: 10,
        margin: 20,
        color: "black",
        fontWeight: "bold",
        fontSize: 700,
        borderRadius: 20,
        backgroundColor: "#eb6734"
    }
    ,
    onPress: {
        alignItems: 'center',
        backgroundColor: '#32a89e',
        padding: 10,
        margin: 20,
        color: "black",
        fontWeight: "bold",
        fontSize: 700,
        borderRadius: 20,
        backgroundColor: "#86eb34"
    }
    ,
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
});

export default HomeScreen;
