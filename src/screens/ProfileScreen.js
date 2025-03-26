import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
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
        <View style={styles.logPlaceholder}></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Momentum</Text>
        <Text style={styles.sectionSubtitle}>Your training momentum charted</Text>
        <View style={styles.momentumPlaceholder}></View>
      </View>
    </View>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
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
  logPlaceholder: {
    backgroundColor: '#222',
    height: 100,
    borderRadius: 10,
  },
  momentumPlaceholder: {
    backgroundColor: '#222',
    height: 80,
    borderRadius: 10,
  },
});

export default ProfileScreen;
