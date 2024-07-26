import React, {useState} from 'react';
import {View, TextInput, Button, Image, ScrollView, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const DynamicForm = () => {
  const [inputs, setInputs] = useState([{username: '', phone: '', photos: []}]);
  const [urlPath, setUrlPath] = useState('');
  const [username, setUserName] = useState([]);
  const [phone, setPhone] = useState('');
  const handleAddInput = () => {
    setInputs([...inputs, {input1: '', input2: '', photos: []}]);
  };

  const handleInputChange = (text, index, field) => {
    const newInputs = [...inputs];
    newInputs[index][field] = text;
    setInputs(newInputs);
  };

  const handleChoosePhoto = index => {
    launchImageLibrary({selectionLimit: 0, mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const newInputs = [...inputs];
        newInputs[index].photos = [
          ...newInputs[index].photos,
          ...response.assets,
        ];
        setInputs(newInputs);
        console.log(response.assets);
      }
    });
  };

  let arrayofusername = [];
  let arrayofPhone = [];
  const handleUploadPhoto = () => {
    const formData = new FormData();

    inputs.forEach((input, inputIndex) => {
      input.photos.forEach((photo, photoIndex) => {
        formData.append('images', {
          uri: photo.uri,
          type: photo.type,
          name: photo.fileName || `photo_${inputIndex}_${photoIndex}.jpg`,
        });
      });
    });

    inputs.forEach(res => {
      arrayofusername.push(res.input1);
      arrayofPhone.push(res.input2);
    });
    console.log(
      arrayofusername,
      arrayofPhone,
      'this is the value of the username',
    );

    formData.append('username',arrayofusername)
    formData.append('phone',arrayofPhone)
    axios
      .post('http://192.168.0.100:7000/img', formData, {
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

  const handleSubmit = () => {
    console.log('Inputs:', inputs);
    handleUploadPhoto();
  };

  return (
    <ScrollView>
      <View style={{padding: 20}}>
        {inputs.map((input, index) => (
          <View key={index} style={{marginBottom: 20}}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
              }}
              placeholder={`Enter Username `}
              value={input.input1}
              onChangeText={text => handleInputChange(text, index, 'input1')}
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
              }}
              placeholder={`Enter Phone Number `}
              value={input.input2}
              onChangeText={text => handleInputChange(text, index, 'input2')}
            />
            <Button
              title="Pick Image"
              onPress={() => handleChoosePhoto(index)}
            />
            {input.photos.map((photo, idx) => (
              <Image
                key={idx}
                source={{uri: photo.uri}}
                style={{width: 100, height: 100, marginTop: 10}}
              />
            ))}
          </View>
        ))}
        <View style={{marginTop: 20}}>
          <Button
            style={{marginBottom: 10}}
            title="Add Tenant"
            onPress={handleAddInput}
          />
          <View style={{height: 10}} />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default DynamicForm;
