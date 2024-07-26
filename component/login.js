import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import api from '../api/api';
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addloginalert = id =>
    Alert.alert('login success', 'logged in !', [
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

  const addnotloginalert = id =>
    Alert.alert('login fail try again', 'logged fail !', [
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

  const submitlogin = () => {
    api
      .post('/login', {
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res.data);
        addloginalert();
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        addnotloginalert();
        navigation.navigate('login');
      });
  };

  const handleEmailChange = text => {
    setEmail(text);
  };
  const handlePaaswordchange = text => {
    setPassword(text);
  };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logojaruconstruction.jpeg')}
            style={styles.logo}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={handleEmailChange}
            placeholder="Email Address"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={handlePaaswordchange}
            placeholderTextColor="black"
            placeholder="Password"
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={submitlogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
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
    fontSize: 30,
  },

  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    borderRadius: 20,
    width: '80%',
    color: 'black',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    borderColor: 'black',
  },
  button: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    border: '2px solid black',
    borderRadius: 10,
    width: 100,
    backgroundColor: 'yellow',
  },
  button: {
    backgroundColor: '#6a5acd', // Purple color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'black', // White color
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Adjust the width and height as needed
    height: 150,
    borderRadius: 50, // Make it round
    marginBottom: 20, // Adjust margin as needed
  },
});
