import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    Alert,
    Share,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import api from '../api/api';

const ITEMS_PER_PAGE = 10;

const Allbills = ({ navigation }) => {
    const [apiresponse, setApiResponse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePressDelete = (id) => {
        createTwoButtonAlertdelete(id);
    };

    const handlePressUpdate = (id) => {
        createTwoButtonAlertUpdate(id);
    };

    const handleDownloadpdf = (id) => {
        createButtonDownload(id);
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
                    }).catch((err) => {
                        console.log(err);
                    });
                },
            },
        ]);
    };

    const createButtonDownload = (id) => {
        Alert.alert('Download pdf', 'Download pdf link', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Download',
                onPress: () => {
                    api.post(`/generatepdf`, { id: id }).then(async (res) => {
                        console.log(res.data.data);
                        const result = await Share.share({
                            message: res.data.data,
                            url: res.data.data,
                            title: 'Share via',
                        });
                        if (result.action === Share.sharedAction) {
                            if (result.activityType) {
                                console.log('shared ');
                            } else {
                                // Shared successfully
                            }
                        } else if (result.action === Share.dismissedAction) {
                            // Dismissed sharing
                        }
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
                    navigation.navigate('UpdateTenate', { id: id });
                },
            },
        ]);
    };

    const totalBillapi = () => {
        api.get('/totalBill').then((res) => {
            setApiResponse(res.data);
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
                        <Text style={styles.headerText}>Delete</Text>
                    </View>
                    {currentItems.map((item) => (
                        <View key={item._id} style={styles.row}>
                            <Text style={[styles.cell, item.ispending ? styles.usernameCellispending : styles.usernameCell]}>
                                {item.username}
                            </Text>
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
        // Larger size for username
    },
    phoneCell: {
        flex: 1,
        width: 150, // Larger size for phone
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

export default Allbills;
