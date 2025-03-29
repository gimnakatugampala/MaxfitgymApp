import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StartWorkoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Start Your Workout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd300',
  },
});

export default StartWorkoutScreen;
