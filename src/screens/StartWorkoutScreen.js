import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Alert, Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get("window");

const workouts = [
  { title: "Weight Lifting", time: 10, image: "https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg" },
  { title: "Cardio Blast", time: 15, image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg" },
  { title: "HIIT Training", time: 10, image: "https://images.pexels.com/photos/669586/pexels-photo-669586.jpeg" }
];

const StartWorkoutScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workouts[0].time);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleWorkoutChange(currentWorkout + 1);
    }
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleWorkoutChange = (index) => {
    if (index < workouts.length) {
      setCurrentWorkout(index);
      setTimeLeft(workouts[index].time);
      setIsRunning(true);
      flatListRef.current?.scrollToIndex({ index, animated: true }); // Auto scroll to next workout
    } else {
      Alert.alert("Good Job!", "You have completed all workouts.");
      setIsRunning(false);
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={workouts}
      keyExtractor={(item, index) => index.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={(event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.y / height);
        handleWorkoutChange(newIndex);
      }}
      renderItem={({ item, index }) => (
        <ImageBackground source={{ uri: item.image }} style={styles.background}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              Alert.alert(
                "Stop Workout",
                "Are you sure you want to stop working out?",
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Yes", onPress: () => navigation.goBack() }
                ]
              )
            }
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Workout Title */}
          <Text style={styles.workoutTitle}>{item.title.toUpperCase()}</Text>

          {/* Timer */}
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

          {/* Play/Pause Button */}
          <TouchableOpacity style={styles.playPauseButton} onPress={() => setIsRunning(!isRunning)}>
            <FontAwesome5 name={isRunning ? 'pause' : 'play'} size={28} color="black" />
          </TouchableOpacity>

          {/* Workout Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>TIME</Text>
              <Text style={styles.detailValue}>{item.time} SEC</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>EQUIP</Text>
              <Text style={styles.detailValue}>MUSCLES</Text>
            </View>
          </View>

          {/* Swipe Up Prompt */}
          {index < workouts.length - 1 && (
            <Text style={styles.swipeText}>SCROLL UP TO NEXT WORKOUT</Text>
          )}
        </ImageBackground>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    width: '100%',
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 30,
  },
  workoutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  timer: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  playPauseButton: {
    backgroundColor: '#ffd300',
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  detailCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    width: '40%',
  },
  detailTitle: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.8,
  },
  detailValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  swipeText: {
    position: 'absolute',
    bottom: 30,
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.8,
    textTransform: 'uppercase',
  },
});

export default StartWorkoutScreen;
