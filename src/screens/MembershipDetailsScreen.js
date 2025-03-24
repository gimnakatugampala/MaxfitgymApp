import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MembershipDetailsScreen = () => {
  const [membershipID, setMembershipID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const navigation = useNavigation();

  const handleNext = () => {
    if (!membershipID || !firstName || !lastName) {
      alert('Please fill in all fields.');
      return;
    }

    // Navigate to the next screen (Replace 'NextScreen' with the actual screen name)
    navigation.navigate('HomeNav', { screen: 'Home' });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Membership Details</Text>

      <TextInput
        label="Membership ID *"
        value={membershipID}
        onChangeText={setMembershipID}
        style={styles.input}
        theme={inputTheme}
        mode="outlined"
      />

      <TextInput
        label="First Name *"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        theme={inputTheme}
        mode="outlined"
      />

      <TextInput
        label="Last Name *"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        theme={inputTheme}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={handleNext}
        style={styles.button}
        labelStyle={styles.buttonText}
        theme={{ colors: { primary: '#ffd300' } }}
      >
        Finish
      </Button>
    </View>
  );
};

const inputTheme = {
  colors: {
    primary: '#ffd300',
    background: '#000000',
    placeholder: '#ffffff',
    text: '#ffffff',
    surface: '#333',
  },
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
    fontFamily: 'Roboto',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#333',
  },
  button: {
    paddingVertical: 5,
    width: width * 0.8,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Roboto',
  },
});

export default MembershipDetailsScreen;
