import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const healthMetrics = [
  { title: 'Blood Pressure', value: '120/80', unit: 'mmHg' },
  { title: 'Heart Rate', value: '75', unit: 'bpm' },
  { title: 'Calories Burned', value: '450', unit: 'kcal' },
  { title: 'Steps Taken', value: '10,000', unit: 'steps' },
];

const HealthMetrics = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {healthMetrics.map((metric, index) => (
        <View key={index} style={styles.metricCard}>
          <Text style={styles.title}>{metric.title}</Text>
          <Text style={styles.value}>{metric.value}</Text>
          <Text style={styles.unit}>{metric.unit}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    color: '#ffd300',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  unit: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default HealthMetrics;
