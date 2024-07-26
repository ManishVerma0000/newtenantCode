import React, {useEffect, useState} from 'react';
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

const PendingBills = ({route, navigation}) => {
  const [apiresponse, setApiResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePressDelete = id => {
    createTwoButtonAlertDelete(id);
  };

  const handlePressUpdate = id => {
    createTwoButtonAlertUpdate(id);
  };

  const createTwoButtonAlertDelete = id => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          api
            .get(`/deleteTenateProfile?id=${id}`)
            .then(res => {
              console.log('User deleted');
              totalBillApi();
              navigation.navigate('listoftenate');
            })
            .catch(err => {
              console.log(err);
            });
        },
      },
    ]);
  };

  const createTwoButtonAlertUpdate = id => {
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
    api
      .get('/pendingBill')
      .then(res => {
        setApiResponse(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    totalBillApi();
  }, []);

  const handleSearch = text => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const filteredItems = apiresponse.filter(item =>
    item.roomNo.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Text style={styles.headerText}>Update</Text>
          </View>
          {currentItems.map(item => (
            <View key={item.id} style={styles.row}>
              <Text style={[styles.cell, styles.usernameCell]}>
                {item.username}
              </Text>
              <Text style={[styles.cell, styles.phoneCell]}>{item.phone}</Text>
              <Text style={[styles.cell, styles.phoneCell]}>{item.roomNo}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePressDelete(item._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePressUpdate(item._id)}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={handlePreviousPage}
              disabled={currentPage === 1}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.pageNumber}>
              Page {currentPage} of {totalPages}
            </Text>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={handleNextPage}
              disabled={currentPage === totalPages}>
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
    color: 'black',
    borderColor: 'black',
  },
  searchContainer: {
    marginVertical: 10,
    color: 'black',
    borderColor: 'black',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    color: 'black',
  },
  header: {
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
  usernameCell: {
    flex: 1,
    width: 150,
    color: 'black',
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
    color: 'black',
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

export default PendingBills;
