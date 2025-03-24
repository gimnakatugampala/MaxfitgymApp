import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import WorkoutSchedule from '../components/WorkoutSchedule';
import HealthMetrics from '../components/HealthMetrics';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back! 👋</Text>
      <Text style={styles.subTitle}>Your Workout Schedule</Text>
      <WorkoutSchedule />
      <Text style={styles.subTitle}>Health Metrics</Text>
      <ScrollView horizontal>
        <HealthMetrics />
      </ScrollView>
      <Button mode="contained" style={styles.button}>Start Today's Workout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd300',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ffd300',
  },
});

export default HomeScreen;
