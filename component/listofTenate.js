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

const ITEMS_PER_PAGE = 10;

const ListOfTenate = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [apiresponse, setApiResponse] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePressDelete = (id) => {
        createTwoButtonAlertdelete(id);
    };

    const handlePressUpdate = (id) => {
        createTwoButtonAlertUpdate(id);
    };

    const createTwoButtonAlertdelete = (id) => {
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
                        totalBillapi();
                        navigation.navigate('listoftenate');
                    }).catch((err) => {
                        console.log(err);
                    });
                },
            },
        ]);
    };

    const createTwoButtonAlertUpdate = (id) => {
        Alert.alert('Update User', 'Do you want to update this user?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Update',
                onPress: () => {
                    navigation.navigate('UpdateTenate', { id });
                },
            },
        ]);
    };

    const totalBillapi = () => {
        api.get('/list').then((res) => {
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
                            placeholder="Search by Room No ..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.headerItem, styles.headerName]}>
                            <Text style={styles.headerText}>Name</Text>
                        </View>
                        <View style={[styles.headerItem, styles.headerPhone]}>
                            <Text style={styles.headerText}>Phone</Text>
                        </View>
                        <View style={[styles.headerItem, styles.headerRoomNo]}>
                            <Text style={styles.headerText}>Room No</Text>
                        </View>
                        <View style={[styles.headerItem, styles.headerAction]}>
                            <Text style={styles.headerText}>Actions</Text>
                        </View>
                    </View>
                    {currentItems.map((item) => (
                        <View key={item.id} style={styles.row}>
                            <View style={[styles.cellItem, styles.cellName]}>
                                <Text style={styles.cellText}>{item.username}</Text>
                            </View>
                            <View style={[styles.cellItem, styles.cellPhone]}>
                                <Text style={styles.cellText}>{item.phone}</Text>
                            </View>
                            <View style={[styles.cellItem, styles.cellRoomNo]}>
                                <Text style={styles.cellText}>{item.roomNo}</Text>
                            </View>
                            <View style={[styles.cellItem, styles.cellAction]}>
                                <TouchableOpacity
                                    style={[styles.button, styles.deleteButton]}
                                    onPress={() => handlePressDelete(item._id)}
                                >
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.updateButton]}
                                    onPress={() => handlePressUpdate(item._id)}
                                >
                                    <Text style={styles.buttonText}>Update</Text>
                                </TouchableOpacity>
                            </View>
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
                <Text style={styles.pageNumber}>Page {currentPage} of {totalPages}</Text>
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
    table: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    searchContainer: {
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: "black"
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    headerItem: {
        flex: 1,
        alignItems: 'center',
    },
    headerName: {
        width: 150,
        color: "black"
        // Adjust width as needed
    },
    headerPhone: {
        color: "black",
        width: 120, // Adjust width as needed
    },
    headerRoomNo: {
        color: "black",
        width: 120, // Adjust width as needed
    },
    headerAction: {
        color: "black",
        width: 100, // Adjust width as needed
    },
    headerText: {
        color: "black",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cellItem: {
        color: "black",
        flex: 1,
        alignItems: 'center',
    },
    cellName: {
        color: "black",
        width: 150,
        // Adjust width as needed
    },
    cellPhone: {
        width: 120, // Adjust width as needed
    },
    cellRoomNo: {
        width: 120, // Adjust width as needed
    },
    cellAction: {
        width: 100, // Adjust width as needed
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cellText: {
        textAlign: 'center',
        color: "black"
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    updateButton: {
        backgroundColor: '#007bff',
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

export default ListOfTenate;
