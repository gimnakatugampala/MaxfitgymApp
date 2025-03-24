import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutSchedule = () => {
  const weekSchedule = [
    { day: 'Mon', workout: 'Bench Press', sets: '3x10', duration: '45 min' },
    { day: 'Tue', workout: 'Squats', sets: '4x8', duration: '40 min' },
    { day: 'Wed', workout: 'Rest Day' },
    { day: 'Thu', workout: 'Deadlifts', sets: '3x6', duration: '50 min' },
    { day: 'Fri', workout: 'Pull-ups', sets: '3x12', duration: '35 min' },
    { day: 'Sat', workout: 'Cardio', duration: '30 min' },
    { day: 'Sun', workout: 'Rest Day' },
  ];

  return (
    <View style={styles.container}>
      {weekSchedule.map((item, index) => (
        <View key={index} style={styles.workoutItem}>
          <Text style={styles.day}>{item.day}</Text>
          <Text style={styles.workout}>{item.workout}</Text>
          {item.sets && <Text style={styles.details}>{item.sets} - {item.duration}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  workoutItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  day: {
    color: '#ffd300',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workout: {
    color: '#ffffff',
    fontSize: 14,
  },
  details: {
    color: '#ffffff',
    fontSize: 12,
  },
});

export default WorkoutSchedule;
