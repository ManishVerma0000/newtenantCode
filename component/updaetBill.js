import React, {useEffect, useState} from 'react';
import {Button, View, Linking, Alert} from 'react-native';

import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import api from '../api/api';
export default function UpdateBillsofuser({route, navigation}) {
  const [apiresponseCome, setApiResponeCome] = useState(false);

  const createButtonAlertUpdate = () => {
    Alert.alert('Charge Added', 'Do you want to Added the charge to user?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('ok is pressed');
          setApiResponeCome(false);
          api
            .get(`/pdf?id=${route.params.id}`)
            .then(res => {
              console.log(res.data);
              const url = res.data;
              Linking.openURL(url).catch(err =>
                console.error('An error occurred', err),
              );
              navigation.navigate('PendingBills');
            })
            .catch(err => {
              console.log(err);
            });
        },
      },
    ]);
  };
  const [waterCharge, setWaterCharge] = useState('');
  const [electricitycharge, setElectricity] = useState('');
  const [otherCharge, setotherCharge] = useState('');
  const [apiResponse, setApiRespone] = useState({
    waterCharge:"",
    electricitycharge:"",
    otherCharge:""
  });

  const id = route.params.id;

  useEffect(() => {
    api
      .get(`/Tenateprofile/?id=${id}`)
      .then(res => {
        setApiRespone(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateBill = () => {
    const data = {
      waterCharge: waterCharge,
      electricitycharge: electricitycharge,
      otherCharge: otherCharge,
    };

    api
      .post(`/additionalCharge?id=${id}`, data)
      .then(res => {
        console.log(res.data);
        createButtonAlertUpdate();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            onChangeText={text => setWaterCharge(text)}
            placeholder="Water Charge"
           defaultValue={apiResponse['waterCharge']==''? '0':apiResponse['waterCharge']}
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setElectricity(text);
            }}
             defaultValue={apiResponse['electricitycharge']==''?'0':apiResponse['electricitycharge']}
            placeholderTextColor="black"
            placeholder="Electricity charge"
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setotherCharge(text);
            }}
            placeholderTextColor="black"
            placeholder="Other Charge"
             defaultValue={apiResponse['otherCharge']==''?'0':apiResponse['otherCharge']}
          />
        </View>

        <View style={styles.container}>
          <Button
            onPress={updateBill}
            style={styles.button}
            title="Submit"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    border: '2px solid black',
    borderRadius: 10,
    width: '80%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    border: '2px solid black',
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'yellow',
  },
});
