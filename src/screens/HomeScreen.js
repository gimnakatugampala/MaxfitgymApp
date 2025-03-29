import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import WorkoutSchedule from '../components/WorkoutSchedule';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const healthMetrics = [
  { title: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: 'heartbeat' },
  { title: 'Heart Rate', value: '75', unit: 'bpm', icon: 'heart' },
  { title: 'Calories Burned', value: '450', unit: 'kcal', icon: 'fire' },
  { title: 'Steps Taken', value: '10,000', unit: 'steps', icon: 'walking' },
];

const HealthMetricCard = ({ title, value, unit, icon }) => {
  return (
    <View style={styles.metricCard}>
      <FontAwesome5 name={icon} size={24} color="yellow" />
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value} <Text style={styles.metricUnit}>{unit}</Text></Text>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Welcome Back! 👋</Text>

      {/* Running Workout Section */}
      <View style={styles.runningSection}>
        <View style={styles.runningIcon}>
          <MaterialIcons name="directions-run" size={30} color="black" />
        </View>
        <View style={styles.runningText}>
          <Text style={styles.runningTitle}>7-Day Running Streak</Text>
          <Text style={styles.runningSubtitle}>1 Days • 8 KM • 1h.12m.34s</Text>
        </View>
        <Button 
          mode="contained" 
          labelStyle={styles.buttonLabel}
          style={styles.runningButton} 
          onPress={() => navigation.navigate('StartWorkoutScreen')}>
          ➝
        </Button>
      </View>

      {/* Health Metrics Section */}
      <Text style={styles.subTitle}>Health Metrics</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <View style={styles.metricsContainer}>
          {healthMetrics.map((metric, index) => (
            <HealthMetricCard key={index} title={metric.title} value={metric.value} unit={metric.unit} icon={metric.icon} />
          ))}
        </View>
      </ScrollView>

      {/* Current Workout Schedule */}
      <Text style={styles.subTitle}>Your Workout Schedule</Text>
      <WorkoutSchedule />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20
  },
  title: {
    fontSize: 28,  
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,  
  },
  runningSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#212121',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  runningIcon: {
    backgroundColor: '#ffd300',
    padding: 10,
    borderRadius: 50,
  },
  runningText: {
    flex: 1,
    marginLeft: 15,
  },
  runningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  runningSubtitle: {
    fontSize: 14,
    color: '#aaaaaa',
  },
  runningButton: {
    backgroundColor: '#ffd300',
    borderRadius: 50,
    minWidth: 40,
  },
  subTitle: {
    fontSize: 22,  
    fontWeight: 'bold',
    color: '#ffd300',
    marginVertical: 10
  },
  startButton: {
    marginTop: 20,  
    backgroundColor: '#ffd300',
    paddingVertical: 15,  
  },
  horizontalScroll: {
    marginBottom: 20,  
  },
  metricsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricCard: {
    backgroundColor: '#212121',
    padding: 20,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  metricTitle: {
    fontSize: 14,
    color: '#ffffff',
    marginVertical: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  metricUnit: {
    fontSize: 14,
    color: '#aaaaaa',
  },
});

export default HomeScreen;
