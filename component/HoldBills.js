import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    Alert,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import api from '../api/api';

const ITEMS_PER_PAGE = 10;

const HoldBills = ({ navigation }) => {
    const [apiresponse, setApiResponse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePressComplete = (id) => {
        createTwoButtonAlertComplete(id);
    };

    const createTwoButtonAlertComplete = (id) => {
        Alert.alert('Bills is Completed', 'Are you sure Bills is Completed?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    api.get(`/updateHoldBills?id=${id}`).then((res) => {
                        totalBillapi();
                        navigation.navigate('HoldBills');
                    }).catch((err) => {
                        console.log(err);
                    });
                },
            },
        ]);
    };

    const totalBillapi = () => {
        api.get('/holdBills').then((res) => {
            setApiResponse(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        totalBillapi();
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        setCurrentPage(1);
    };

    const filteredItems = apiresponse.filter((item) =>
        item.roomNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredItems.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView horizontal={true}>
                <View style={styles.table}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search by Room No..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                    <View style={[styles.row, styles.header]}>
                        <Text style={styles.cellText}>Name</Text>
                        <Text style={styles.cellText}>Phone</Text>
                        <Text style={styles.cellText}>Room No</Text>
                        <Text style={styles.headerText}>Completed</Text>
                    </View>
                    {currentItems.map((item) => (
                        <View key={item.id} style={styles.row}>
                            <Text style={[styles.cell, styles.usernameCell]}>{item.username}</Text>
                            <Text style={[styles.cell, styles.phoneCell]}>{item.phone}</Text>
                            <Text style={[styles.cell, styles.phoneCell]}>{item.roomNo}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handlePressComplete(item._id)}
                            >
                                <Text style={styles.buttonText}>Completed</Text>
                            </TouchableOpacity>
                        </View>
                    ))}

                    <View style={styles.pagination}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            <Text style={styles.buttonText}>Previous</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageNumber}>Page {currentPage} of {totalPages}</Text>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    table: {
        marginHorizontal: 20,
        color: "black",
        borderColor: "black"
    },
    searchContainer: {
        marginVertical: 10,
        color: "black",
        borderColor: "black"
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        color: "black",
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        color: "black"
    },
    header: {
        backgroundColor: '#f2f2f2',
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black"
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: "black"
    },
    usernameCell: {
        flex: 1,
        width: 150,
        color: "black"
    },
    phoneCell: {
        flex: 1,
        width: 150,
    },
    cellText: {
        flex: 1,
        width: 150,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "black"
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    paginationButton: {
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    pageNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HoldBills;
