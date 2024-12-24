import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { SIZES, COLORS, SHADOWS } from '../../constants';



const ProfileScreen = () => {
  const [image, setImage] = useState(null);

  // Request permission on mount
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need permission to access your media library.');
      }
    };

    requestPermissions();
  }, []);

  // Pick an image from the media library
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);  // Set selected image URI from the result
      } else {
        Alert.alert('No image selected');
      }
    } catch (error) {
      Alert.alert('Error', error.message);  // Show error if picker fails
    }
  };

  return (
    
    <View style={{
      flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        //padding: 5,
        top: 0,
        left: 0,
        width: '100%',
      }}>
      
{image &&(
      <Image
          source={{ uri: image }}
          style={{
            width: 30,
            height: 30,
            borderRadius: SIZES.xxLarge,
          }}
        />
      )}
      
      <TouchableOpacity onPress={pickImage}>
        
        <Text style={{ fontSize: 8, fontWeight: "bold", ...SHADOWS.medium, shadowColor: COLORS.primary, borderRadius: 5, borderWidth: 0.5, padding: 5, marginLeft: 10 }}>Photo</Text>
      </TouchableOpacity>
      </View>
    
  );
};

export default ProfileScreen;
