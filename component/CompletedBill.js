import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    Alert,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import api from '../api/api';

const CompletedBills = ({ navigation }) => {
    const [apiresponse, setApiResponse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePressDelete = (id) => {
        createTwoButtonAlertDelete(id);
    };

    const handlePressUpdate = (id) => {
        createTwoButtonAlertUpdate(id);
    };

    const createTwoButtonAlertDelete = (id) => {
        Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => {
                    api.get(`/deleteTenateProfile?id=${id}`).then((res) => {
                        console.log('User deleted');
                        totalBillApi();
                        navigation.navigate('listoftenate');
                    }).catch((err) => {
                        console.log(err);
                    });
                },
            },
        ]);
    };

    const createTwoButtonAlertUpdate = (id) => {
        Alert.alert('Update Bill', 'Do you want to update the Bill', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Update',
                onPress: () => {
                    console.log(id, 'this is the value of the id');
                    navigation.navigate('UpdateBillsofuser', {
                        id: id,
                    });
                },
            },
        ]);
    };

    const totalBillApi = () => {
        api.get('/completedPayement').then((res) => {
            setApiResponse(res.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        totalBillApi();
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        setCurrentPage(1);
    };

    const filteredItems = apiresponse.filter((item) =>
        item.roomNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView horizontal={false}>
                <View style={styles.tableContainer}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search by Room No..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                    <View style={[styles.row, styles.header]}>
                        <Text style={[styles.cell, styles.headerText]}>Name</Text>
                        <Text style={[styles.cell, styles.headerText]}>Phone</Text>
                        <Text style={[styles.cell, styles.headerText]}>Room No</Text>
                        <Text style={[styles.cell, styles.headerText]}>Delete</Text>
                    </View>
                    {currentItems.map((item) => (
                        <View key={item.id} style={styles.row}>
                            <Text style={[styles.cell, styles.usernameCell]}>{item.username}</Text>
                            <Text style={[styles.cell, styles.phoneCell]}>{item.phone}</Text>
                            <Text style={[styles.cell, styles.phoneCell]}>{item.roomNo}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handlePressDelete(item._id)}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={styles.paginationButton}
                    onPress={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageNumber}>{currentPage}</Text>
                <TouchableOpacity
                    style={styles.paginationButton}
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tableContainer: {
        marginHorizontal: 10,
        marginVertical: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    searchContainer: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        color: "black",
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        paddingVertical: 10,
    },
    header: {
        backgroundColor: '#f9f9f9',
    },
    headerText: {
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: '#333',
    },
    usernameCell: {
        flex: 2,
        paddingHorizontal: 5,
    },
    phoneCell: {
        flex: 2,
        paddingHorizontal: 5,
    },
    cellText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
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
        color: '#333',
    },
});

export default CompletedBills;
