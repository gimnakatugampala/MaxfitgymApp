import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

// Path to your uploaded image (Update with correct local URI)
const profileImageUri = 'file:///mnt/data/f2061be2806d4a95ddef354440ec7fa8.jpg';

// Generate a training log for 365 days (52 weeks + 1 extra week)
const generateTrainingData = () => {
  const daysInYear = 365;
  return Array.from({ length: daysInYear }, () => Math.floor(Math.random() * 4)); // Random values 0-3
};

const trainingData = generateTrainingData();

const TrainingLog = () => {
  const cellSize = 6; // Small square size
  const padding = 1; // Space between squares
  const weeks = 52; // Number of weeks
  const days = 7; // Days per week

  const totalDays = trainingData.length;
  const width = weeks * (cellSize + padding); // Horizontal width
  const height = 7 * (cellSize + padding); // 7 rows (days of the week)

  // Color scale (Intensity)
  const getColor = (value) => {
    switch (value) {
      case 0: return '#333';  // No activity
      case 1: return '#66ff66'; // Low
      case 2: return '#33cc33'; // Medium
      case 3: return '#009900'; // High
      default: return '#000';
    }
  };

  return (
    <View>
      <Svg width={width} height={height}>
        {trainingData.map((value, index) => {
          const x = Math.floor(index / days) * (cellSize + padding);
          const y = (index % days) * (cellSize + padding);

          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              fill={getColor(value)}
              rx={2}
              ry={2}
            />
          );
        })}
      </Svg>
    </View >
  );
};

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profileImageUri }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.userName}>Jonny</Text>
        <Text style={styles.userLocation}>📍 Los Angeles, CA</Text>
        <Text style={styles.joinDate}>🕒 Joined 18th Oct</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}><Text style={styles.statNumber}>78</Text><Text style={styles.statLabel}>Total Sessions</Text></View>
        <View style={styles.statBox}><Text style={styles.statNumber}>16</Text><Text style={styles.statLabel}>Total Weeks</Text></View>
        <View style={styles.statBox}><Text style={styles.statNumber}>5</Text><Text style={styles.statLabel}>Total Cycles</Text></View>
        <View style={styles.statBox}><Text style={styles.statNumber}>281</Text><Text style={styles.statLabel}>Unique Exercises</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Training Log</Text>
        <Text style={styles.sectionSubtitle}>A twelve-month review of your training</Text>
        <TrainingLog />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    borderRadius: 50, // Ensures a circular image
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  profileImage: {
    width: 100, // Adjust size as needed
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userLocation: {
    fontSize: 16,
    color: '#aaa',
  },
  joinDate: {
    fontSize: 14,
    color: '#888',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  statLabel: {
    fontSize: 14,
    color: '#bbb',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
});

export default ProfileScreen;
