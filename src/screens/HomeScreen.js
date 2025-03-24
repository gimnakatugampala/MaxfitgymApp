import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import WorkoutSchedule from '../components/WorkoutSchedule';
import HealthMetrics from '../components/HealthMetrics';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Welcome Back! 👋</Text>

      {/* Running Workout Section */}
      <View style={styles.runningSection}>
        <View style={styles.runningIcon}>
          <MaterialIcons name="directions-run" size={30} color="black" />
        </View>
        <View style={styles.runningText}>
          <Text style={styles.runningTitle}>Running 7 days</Text>
          <Text style={styles.runningSubtitle}>1 Days • 8 KM • 1h.12m.34s</Text>
        </View>
        <Button 
          mode="contained" 
          style={styles.runningButton} 
          onPress={() => console.log('Start Running Workout')}>
          ➝
        </Button>
      </View>


      {/* Health Metrics Section */}
      <Text style={styles.subTitle}>Health Metrics</Text>
      <ScrollView horizontal style={styles.horizontalScroll}>
        <HealthMetrics />
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
    padding: 30,  
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
    marginTop: 30,  
    marginBottom: 15,  
  },
  startButton: {
    marginTop: 20,  
    backgroundColor: '#ffd300',
    paddingVertical: 15,  
  },
  horizontalScroll: {
    marginBottom: 20,  
  }
});

export default HomeScreen;
