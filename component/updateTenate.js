import React, {useEffect} from 'react';
import {Button, View, Text, Image} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {useState} from 'react';

import api from '../api/api';
export default function UpdateTenate({route, navigation}) {
  const [tenateDbdetails, setTenateDbDetails] = useState([]);
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [Orgnisation, setOrgnisation] = useState('');
  const [buildingId, setBuildingsId] = useState('');
  const [dateofjoining, setdateofjoining] = useState('');
  const [address, setAddress] = useState('');
  const [rent, setRent] = useState('');
  const [addhar, setAddhar] = useState([]);
  const [room, selectRoom] = useState('');
  const [people, setpeople] = useState('');
  const [advanceRent, setAdvanceRent] = useState('');
  const [ispending, setispending] = useState('');
  const [waterCharge, setwaterCharge] = useState('');
  const [electricitycharge, setelectricitycharge] = useState('');
  const [otherCharge, setotherCharge] = useState('');
  const [onhold, setonhold] = useState('');
  const [rentToBePaid, setrentToBePaid] = useState('');
  const [tenates, settenates] = useState([]);
  const [theBillisFirstTime, settheBillisFirstTime] = useState();
  const [NextInstallement, setNextInstallement] = useState();

  const submitupdateuserdetails = () => {
    const id = route.params.id;
    api
      .post(`/updateTenate?id=${id}`, data)
      .then(res => {
        console.log(res);
        addloginalert();
      })
      .catch(err => {
        createTwoButtonAlertdelete();
      });
  };
  const addloginalert = id =>
    Alert.alert('Updated Successfully', 'Updated !', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('listoftenate');
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  useEffect(() => {
    const id = route.params.id;
    api
      .get(`/Tenateprofile?id=${id}`)
      .then(res => {
        console.log(res.data.data,'this is the final addahr card value')
        console.log(
          typeof res.data.data.addhar == 'string',
          'this is the addahr',
        );
        setTenateDbDetails(res.data.data);
        setUserName(res.data.data.username);
        setPhone(res.data.data.phone);
        setOrgnisation(res.data.data.orgnisation);
        setAddress(res.data.data.address);
        setRent(res.data.data.rent);
        selectRoom(res.data.data.roomNo);
        setAddhar(res.data.data.addhar);
        setpeople(res.data.data.people);
        setNextInstallement(res.data.data.NextInstallement);
        setAdvanceRent(res.data.data.advanceRent);
        setispending(res.data.data.ispending);
        setwaterCharge(res.data.data.waterCharge);
        setelectricitycharge(res.data.data.electricitycharge);
        setotherCharge(res.data.data.otherCharge);
        setonhold(res.data.data.onhold);
        setrentToBePaid(res.data.data.rentToBePaid);
        settenates(res.data.data.tenates);
        settheBillisFirstTime(res.data.data.theBillisFirstTime);
        setdateofjoining(res.data.data.dateofjoining);
        setBuildingsId(res.data.data.buildingId);
      })
      .catch(err => {
        console.log(err, 'this is the value of the error');
      });
  }, []);

  const createTwoButtonAlertdelete = id => {
    Alert.alert('Update Failed', 'Try Again', [
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

  const data = {
    advanceRent: advanceRent,
    ispending: ispending,
    waterCharge: waterCharge,
    electricitycharge: electricitycharge,
    otherCharge: otherCharge,
    onhold: onhold,
    rentToBePaid: rentToBePaid,
    tenates: tenates,
    theBillisFirstTime: theBillisFirstTime,
    NextInstallement: NextInstallement,
    username: username,
    phone: phone,
    addhar: addhar,
    address: address,
    orgnisation: Orgnisation,
    rent: rent,
    roomNo: room,
    people: people,
    dateofjoining: dateofjoining,
    buildingId: buildingId,
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.Addtenate}>
            <Text style={styles.addtenattext}>Update Tenate here</Text>
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setUserName(text);
              }}
              placeholder="Username"
              defaultValue={tenateDbdetails['username']}
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setPhone(text);
              }}
              placeholder="Phone"
              placeholderTextColor="black"
              defaultValue={tenateDbdetails['phone']}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setOrgnisation(text);
              }}
              placeholderTextColor="black"
              placeholder="Orgnisation Name"
              defaultValue={tenateDbdetails['orgnisation']}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setAddress(text);
              }}
              placeholderTextColor="black"
              placeholder="Address"
              defaultValue={tenateDbdetails['address']}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setRent(text);
              }}
              placeholderTextColor="black"
              placeholder="Total Rent"
              defaultValue={tenateDbdetails['rent']}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setAdvanceRent(text);
              }}
              placeholderTextColor="black"
              placeholder="Advance Rent"
              defaultValue={tenateDbdetails['advanceRent']}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setpeople(text);
              }}
              placeholderTextColor="black"
              defaultValue={tenateDbdetails['people']}
              placeholder="Total People"
            />
          </View>

          {(typeof addhar == 'string') == true ? (
            <View></View>
          ) : (
            <View>
              {addhar.map((url, index) => {
                return (
                  <View style={styles.container}>
                    <Image
                      source={{uri: url}}
                      style={{width: 300, height: 300}}
                    />
                  </View>
                );
              })}
            </View>
          )}

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              defaultValue={tenateDbdetails['roomNo']}
              placeholder="Room No. "
            />
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              //   onChangeText={text => {
              //     setpeople(text);
              //   }}
              placeholderTextColor="black"
              defaultValue={tenateDbdetails['NextInstallement']}
              placeholder="Next Installement "
            />
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              //   onChangeText={text => {
              //     setpeople(text);
              //   }}
              placeholderTextColor="black"
              defaultValue={tenateDbdetails['advanceRent']}
              placeholder="Advance Rent"
            />
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              //   onChangeText={text => {
              //     setpeople(text);
              //   }}
              placeholderTextColor="black"
              defaultValue={tenateDbdetails['waterCharge']}
              placeholder="Water Charge"
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              //   onChangeText={text => {
              //     setpeople(text);
              //   }}
              placeholderTextColor="black"
              defaultValue={tenateDbdetails['electricitycharge']}
              placeholder="Electricity Charge"
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              //   onChangeText={text => {
              //     setpeople(text);
              //   }}
              placeholderTextColor="black"
              defaultValue={tenateDbdetails['otherCharge']}
              placeholder="Other Charge"
            />
          </View>

          <View style={styles.container}>
            <Button
              onPress={submitupdateuserdetails}
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
    color: 'black',

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
  },
  dropdownButton: {
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
    borderColor: 'black',
    borderRadius: 10,
    borderTopColor: 'black',
    marginLeft: 25,

    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
