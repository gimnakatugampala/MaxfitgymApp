import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const VerificationPhoneNumberScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  const navigation = useNavigation();

  const handleChangeText = (text, index) => {
    let newCode = [...code];

    if (text.length === 1) {
      newCode[index] = text;
      setCode(newCode);
      if (index < 4) inputs.current[index + 1].focus();
    } else if (text.length === 0 && index > 0) {
      newCode[index] = '';
      setCode(newCode);
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    if (code.join('').length !== 5) {
      alert('Please enter all 5 digits.');
      return;
    }

    // Navigate to the next screen (Replace 'HomeScreen' with the actual screen name)
    navigation.navigate('MembershipDetails');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>

      {/* Caption */}
      <Text style={styles.caption}>
        Please check your SMS inbox to get the code.
      </Text>

      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChangeText(text.replace(/[^0-9]/g, ''), index)}
            keyboardType="numeric"
            maxLength={1}
            style={styles.input}
            textAlign="center"
          />
        ))}
      </View>

      <Button
        mode="contained"
        onPress={handleVerify}
        style={styles.button}
        labelStyle={styles.buttonText}
        theme={{ colors: { primary: '#ffd300' } }}
      >
        Verify
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
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  caption: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#333',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  button: {
    paddingVertical: 5,
    width: width * 0.8,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Roboto',
  },
});

export default VerificationPhoneNumberScreen;
