import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

const WorkoutSchedule = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);

  const weekSchedule = [
    { day: 'Mon', workouts: [
        { name: 'Bench Press', sets: '3x10', duration: 45 },
        { name: 'Incline Dumbbell Press', sets: '3x12', duration: 40 }
      ] 
    },
    { day: 'Tue', workouts: [
        { name: 'Squats', sets: '4x8', duration: 40 },
        { name: 'Lunges', sets: '3x10', duration: 35 }
      ]
    },
    { day: 'Wed', workout: 'Rest Day', rest: true },
    { day: 'Thu', workouts: [
        { name: 'Deadlifts', sets: '3x6', duration: 50 },
        { name: 'Romanian Deadlifts', sets: '3x10', duration: 45 }
      ]
    },
    { day: 'Fri', workouts: [
        { name: 'Pull-ups', sets: '3x12', duration: 35 },
        { name: 'Bent-over Rows', sets: '3x10', duration: 40 }
      ]
    },
    { day: 'Sat', workouts: [
        { name: 'Cardio', duration: 30 }
      ]
    },
    { day: 'Sun', workout: 'Rest Day', rest: true }
  ];

  const calculateTotalDuration = (workouts) => {
    return workouts.reduce((total, workout) => total + (workout.duration || 0), 0);
  };

  const openModal = (workouts) => {
    setSelectedWorkouts(workouts);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {weekSchedule.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => !item.rest && openModal(item.workouts)}>
          <View style={[styles.workoutItem, item.rest && styles.restDay]}>
            <Text style={[styles.day, item.rest && styles.restDayText]}>{item.day}</Text>
            {item.rest ? (
              <Text style={[styles.workout, styles.restDayText]}>{item.workout}</Text>
            ) : (
              <View style={styles.workoutOverview}>
                <Text style={styles.overviewText}>{item.workouts.length} Workouts</Text>
                <Text style={styles.overviewText}>Total: {calculateTotalDuration(item.workouts)} min</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Workouts</Text>
            <ScrollView style={styles.scrollView}>
              {selectedWorkouts.map((workout, i) => (
                <Text key={i} style={styles.modalText}>{workout.name} - {workout.sets ? `${workout.sets}, ` : ''}{workout.duration} min</Text>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  workoutItem: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  restDay: {
    backgroundColor: '#666',
    paddingVertical: 18,
  },
  day: {
    color: '#ffd700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workout: {
    color: '#ffffff',
    fontSize: 14,
  },
  workoutOverview: {
    marginTop: 6,
    alignItems: 'center',
  },
  overviewText: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  restDayText: {
    color: '#ddd',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 25,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 15,
  },
  scrollView: {
    maxHeight: 250,
  },
  modalText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  closeButton: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  }
});

export default WorkoutSchedule;