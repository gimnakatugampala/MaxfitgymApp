import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    // Navigate to the next screen
    navigation.navigate('NextScreen'); // Replace 'NextScreen' with the actual screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
        theme={{
          colors: {
            primary: '#ffd300', // Button color
            background: '#000000', // Background color
            placeholder: '#ffffff', // Placeholder color
            text: '#ffffff', // Text color
            surface: '#333', // Surface color
          },
        }}
        mode="outlined"
        placeholderTextColor="#ffffff"  // Ensuring placeholder text is white
      />
      {/* Caption to inform user about SMS */}
      <Text style={styles.caption}>
        An SMS will be sent to the entered phone number for verification.
      </Text>
      <Button
        mode="contained"
        onPress={handleNext}
        style={styles.button}
        labelStyle={styles.buttonText}
        theme={{ colors: { primary: '#ffd300' } }}
      >
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    color: '#ffffff', // Ensures the text is white
    backgroundColor: '#333', // Dark background for input field
  },
  caption: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 5,
    width: width * 0.8,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PhoneNumberScreen;
