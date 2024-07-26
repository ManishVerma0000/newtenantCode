import React, {useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import api from '../api/api';
import {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';

const AllBuildings = ({navigation}) => {
  const handlePressDelete = id => {
    createTwoButtonAlertdelete(id);
  };

  const handlePressUpdate = id => {
    createTwoButtonAlertUpdate(id);
  };

  const createTwoButtonAlertdelete = id => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          api
            .get(`/deleteBuildings?id=${id}`)
            .then(res => {
              totalBillapi();
              navigation.navigate('listoftenate');
            })
            .catch(err => {});
        },
      },
    ]);
  };

  const createTwoButtonAlertUpdate = id => {
    Alert.alert('Update User', 'Do you want to update this user?', [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'Update',
        onPress: () => {
          navigation.navigate('SingleBuildingDetails', {
            id: id,
          });
        },
      },
    ]);
  };

  const [apiresponse, setApiResponse] = useState([]);

  const totalBillapi = () => {
    api
      .get('/listofbuilding')
      .then(res => {
        setApiResponse(res.data);
      })
      .catch(err => {});
  };

  useEffect(() => {
    totalBillapi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.table}>
          <View style={styles.searchContainer}>
            <TextInput style={styles.input} placeholder="Search ..." />
          </View>
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cellText}>Name</Text>
            <Text style={styles.cellText}>Care Taker</Text>
            <Text style={styles.cellText}>Total Rooms</Text>
            <Text style={styles.headerText}>Delete</Text>
            <Text style={styles.headerText}>Update</Text>
          </View>
          {apiresponse.map((item, index) => (
            <View key={item.id} style={styles.row}>
              <Text style={[styles.cell, styles.usernameCell]}>
                {item.buildingname}

                {'   '}
                {item.location}
              </Text>
              <Text style={[styles.cell, styles.phoneCell]}>
                {item.caretaker}
              </Text>
              <Text style={[styles.cell, styles.phoneCell]}>
                {item.rooms.length}
              </Text>
              
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
    color: 'black',
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

export default AllBuildings;
