import React, {useEffect} from 'react';
import {Button, View, Text, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  Linking,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import api from '../api/api';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';
export default function Addtenate({navigation}) {
  const [selected, setSelected] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [advanceRent, setAdvanceRent] = useState('');
  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [Orgnisation, setOrgnisation] = useState('');
  const [buildingId, setBuildingsId] = useState('');
  const [dateofjoining, setdateofjoining] = useState('');
  const [address, setAddress] = useState('');
  const [rent, setRent] = useState('');
  const [room, selectRoom] = useState('');
  const [vacantRooms, setVacantRooms] = useState([]);
  const [people, setpeople] = useState('');
  const [photos, setPhotos] = useState([]);

  const [urlPath, setUrlPath] = useState([]);
  const handleChoosePhoto = () => {
    launchImageLibrary({selectionLimit: 0, mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setPhotos([...photos, ...response.assets]);
        console.log(response.assets);
      }
    });
  };

  const handleUploadPhoto = () => {
    const formData = new FormData();

    photos.forEach((photo, index) => {
      formData.append('images', {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName || `photo_${index}.jpg`,
      });
    });

    axios
      .post('http://192.168.205.211:7000/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setUrlPath(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    api
      .get(`/findopenRoomsOfBuilding?id=${buildingId}`)
      .then(async res => {
        const objectArray = res.data.rooms.map(data1 => ({
          label: data1,
          value: data1,
        }));
        setVacantRooms(objectArray);
      })
      .catch(err => {
        console.log(err);
      });
  }, [buildingId]);
  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
    api
      .get('/listofbuilding')
      .then(async res => {
        const objectArray = res.data.map(data1 => ({
          label: data1.buildingname,
          value: data1._id,
        }));
        setBuildings(objectArray);
      })
      .catch(err => {
        console.log(err, 'this is the value of the error');
      });
  }, []);

  const submitDetails = () => {
    const tenatesArray = handleSubmit();
    console.log(tenatesArray);

    api
      .post('/registertenate', {
        username: username,
        email: '',
        phone: phone,
        addhar: urlPath,
        address: address,
        orgnisation: Orgnisation,
        rent: rent,
        buildingId: buildingId,
        dateofjoining: dateofjoining,
        roomNo: room,
        people: people,
        tenates: tenatesArray,
        advanceRent: advanceRent,
      })
      .then(res => {
        const url = res.data.data;
        console.log(url);
        setUrl(res.data.data);
        if (res.data.data) {
          addtenateAlert();
          Linking.openURL(url).catch(err =>
            console.error('An error occurred', err),
          );
          navigation.navigate('Home');
        } else {
          navigation.navigate('Addtenate');
        }
      })
      .catch(err => {
        console.log(err);
        navigation.navigate('Addtenate');
      });
  };
  const addtenateAlert = id =>
    Alert.alert('Tenate Added', 'Added Successfully', [
      {
        text: 'OK',
        onPress: () => {
          console.log('ok is pressed');
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);

  const [inputGroups, setInputGroups] = useState([]);
  const handleAddInputs = () => {
    setInputGroups([
      ...inputGroups,
      {key: Date.now().toString(), values: ['', '', '']},
    ]);
  };
  const handleInputChange = (groupIndex, inputIndex, text) => {
    const newInputGroups = inputGroups.map((group, gIndex) => {
      if (gIndex === groupIndex) {
        const newValues = [...group.values];
        newValues[inputIndex] = text;
        return {...group, values: newValues};
      }
      return group;
    });
    setInputGroups(newInputGroups);
  };

  const [tenates, setResultofTenates] = useState([]);
  const handleSubmit = () => {
    let arrayofvalues = inputGroups.map(group => group.values);
    setResultofTenates(arrayofvalues);
    return arrayofvalues;
  };

  const [url, setUrl] = useState('');

  return (
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.Addtenate}>
            <Text style={styles.addtenattext}>Add Tenant</Text>
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setUserName(text);
              }}
              placeholder="Username"
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
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setOrgnisation(text);
              }}
              placeholder="Orgnisation Name"
              placeholderTextColor="black"
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: 'black', fontWeight: '700', marginBottom: 10}}>
              Select Building
            </Text>
            <View
              style={{
                width: 320,
                borderWidth: 1,
                borderRadius: 2,
              }}>
              <RNPickerSelect
                style={{
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    color: 'black',
                  },
                }}
                onValueChange={value => setBuildingsId(value)}
                items={buildings}
                placeholder={{
                  label: 'Select a building...',

                  color: 'black', // This sets the placeholder text color to black
                }}
              />
            </View>
          </View>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: 'black', fontWeight: '700', marginBottom: 10}}>
              Select Room
            </Text>
            <View
              style={{
                width: 320,
                borderWidth: 1,
                borderRadius: 2,
              }}>
              <RNPickerSelect
                style={{
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    color: 'black',
                  },
                }}
                onValueChange={value => {
                  selectRoom(value);
                }}
                items={vacantRooms}
                placeholder={{
                  label: 'Select a room...',
                  color: 'black',
                }}
              />
            </View>
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setpeople(text);
              }}
              placeholder="Total People"
              placeholderTextColor="black"
            />
          </View>
          <View>
            {inputGroups.map((group, groupIndex) => (
              <View style={styles.container} key={group.key}>
                <Text style={{color: 'black'}}>
                  Tenate No. {groupIndex + 1}
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => handleInputChange(groupIndex, 0, text)}
                  placeholder="Enter Tenant Name"
                  placeholderTextColor="black"
                />

                <TextInput
                  style={styles.input}
                  onChangeText={text => handleInputChange(groupIndex, 2, text)}
                  placeholder="Enter Tenant Phone no. "
                  placeholderTextColor="black"
                />
              </View>
            ))}
            <TouchableOpacity style={styles.button1} onPress={handleAddInputs}>
              <Text style={styles.buttonText1}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Selected Date"
              placeholderTextColor="black"
              value={selected}
              editable={false}
            />
            <Button title="Open Calendar" onPress={toggleCalendar} />
            {calendarVisible && (
              <Calendar
                onDayPress={day => {
                  setdateofjoining(day.dateString);
                  setSelected(day.dateString);
                  toggleCalendar();
                }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'orange',
                  },
                }}
              />
            )}
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setAddress(text);
              }}
              placeholder="Address"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setRent(text);
              }}
              placeholder="Total Rent"
              placeholderTextColor="black"
            />
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setAdvanceRent(text);
              }}
              placeholder="Advance Rent"
              placeholderTextColor="black"
            />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              {photos.map((photo, index) => (
                <Image
                  key={index}
                  source={{uri: photo.uri}}
                  style={{width: 100, height: 100, margin: 5}}
                />
              ))}
              {photos.length > 0 && (
                <Button title="Upload Photos" onPress={handleUploadPhoto} />
              )}
            </ScrollView>
            <Button title="Choose Photos" onPress={handleChoosePhoto} />
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button1} onPress={submitDetails}>
              <Text style={styles.buttonText1}>Submit</Text>
            </TouchableOpacity>
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
    color: 'black',
  },
  addtenattext: {
    fontWeight: 'bold',
    color: 'black',
  },
  container1: {
    marginLeft: 30,
  },

  scrollView: {
    marginHorizontal: 20,
    flexGrow: 1,
  },
  button: {
    backgroundColor: 'purple', // Background color of the button
    color: 'white', // Text color of the button
    width: 200, // Width of the button
    borderRadius: 8, // Border radius of the button
    paddingVertical: 12, // Vertical padding of the button
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
    borderColor: 'black',
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
  button1: {
    backgroundColor: '#4CAF50', // Button background color
    padding: 15, // Padding inside the button
    borderRadius: 10, // Rounded corners
    alignItems: 'center', // Center the text horizontally
    margin: 10, // Margin around the button
  },
  buttonText1: {
    color: '#FFFFFF', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Text weight
  },
});
