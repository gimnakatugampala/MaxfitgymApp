import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Alert, Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get("window");

const workouts = [
  { title: "Weight Lifting", time: 10, type: 'duration', image: "https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg" },
  { title: "HIIT Training", time: 10, type: 'set', sets: 3, reps: 8, image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { title: "Cardio Blast", time: 15, type: 'duration', image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg" },
];

const StartWorkoutScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workouts[0].time);
  const [isRunning, setIsRunning] = useState(true);
  const [currentSet, setCurrentSet] = useState(1);  // Track the current set for "set" type workouts
  const [completedSets, setCompletedSets] = useState([]);  // Track completed sets

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      if (workouts[currentWorkout].type === 'set') {
        handleSetCompletion();  // Handle set-based completion
      } else {
        handleWorkoutChange(currentWorkout + 1);  // Handle duration-based workouts
      }
    }
  }, [isRunning, timeLeft, currentSet]);

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
      setCurrentSet(1);  // Reset set count
      setCompletedSets([]); // Reset completed sets
      flatListRef.current?.scrollToIndex({ index, animated: true });
    } else {
      // If all workouts are completed, navigate to home
      Alert.alert("Good Job!", "You have completed all workouts.", [
        { text: "OK", onPress: () => navigation.navigate('HomeNav', { screen: 'Home' }) }, // Navigate to Home
      ]);
      setIsRunning(false);
    }
  };
  

  const handleSetCompletion = () => {
    const workout = workouts[currentWorkout];

    if (currentSet < workout.sets) {
      // Mark current set as completed
      setCompletedSets(prevSets => [...prevSets, currentSet]);  // Add the completed set to the completed sets array
      // Reset the timer for the next set
      setTimeLeft(workout.time);
      setCurrentSet(prevSet => prevSet + 1);  // Move to next set
    } else {
      // All sets completed, move to the next workout
      handleWorkoutChange(currentWorkout + 1);
    }
  };

  // Update the completed sets as a string
  const generateSetString = (sets, currentSet) => {
    let setString = [];
    for (let set = 1; set <= sets; set++) {
      // Check if the set is completed by checking the completedSets array
      setString.push(completedSets.includes(set) ? '✅' : `${set}`);
    }
    return setString.join(' | ');
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

          {/* Displaying Set Information */}
          {item.type === 'set' && (
            <View style={styles.setInfoContainer}>
              <Text style={styles.setInfo}>
                {generateSetString(item.sets, currentSet)}
              </Text>
            </View>
          )}

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
  setInfoContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  setInfo: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StartWorkoutScreen;
