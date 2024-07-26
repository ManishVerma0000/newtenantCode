import axios from 'axios';
import React from 'react';
import {View, Image, Button, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react';

const ImageUpload = () => {
  const [photos, setPhotos] = useState([]);

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
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
  );
};

export default ImageUpload;
