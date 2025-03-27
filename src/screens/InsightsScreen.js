import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, 
  FlatList, Dimensions 
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const { width } = Dimensions.get('window');

const InsightsScreen = () => {
  const allDates = Array.from({ length: 30 }, (_, i) => moment().subtract(15 - i, 'days')); // Generate past & future days
  const todayIndex = allDates.findIndex(date => date.isSame(moment(), 'day')); // Find index of today
  const [selectedDate, setSelectedDate] = useState(moment()); // Default to today
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && todayIndex >= 0) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({
          index: todayIndex,
          animated: true,
          viewPosition: 0.5, // Centers the item
        });
      }, 300); // Ensures UI is rendered before scrolling
    }
  }, []);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedDate.isSame(item, 'day');
    return (
      <TouchableOpacity onPress={() => handleDateSelection(item)} style={styles.dateItem}>
        <Text style={[styles.dateText, isSelected && styles.selectedDate]}>
          {isSelected && item.isSame(moment(), 'day') ? "Today" : item.format('DD MMM')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Date Selector */}
        <FlatList
          ref={flatListRef}
          data={allDates}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.format('YYYY-MM-DD')}
          renderItem={renderItem}
          contentContainerStyle={styles.dateContainer}
          initialScrollIndex={todayIndex >= 0 ? todayIndex : 0} // Prevents crashes
          getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })} // Optimized scrolling
        />

        {/* Health Grade */}
        <View style={styles.healthGradeContainer}>
          <View>
            <Text style={styles.healthGradeTitle}>Health Grade</Text>
            <Text style={styles.healthGradeSubtitle}>
              Perfect progress dude, keep going to apply your fitness activity
            </Text>
          </View>
          <View style={styles.progressCircle}>
            <Svg height="60" width="60">
              <Circle cx="30" cy="30" r="25" stroke="#ffd300" strokeWidth="4" fill="none" />
              <Text style={styles.progressText}>80</Text>
            </Svg>
          </View>
        </View>

        {/* Health Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>620.98</Text>
            <Text style={styles.metricLabel}>Calories</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>70.98</Text>
            <Text style={styles.metricLabel}>Weight (kg)</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>120</Text>
            <Text style={styles.metricLabel}>Blood Pressure</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>80</Text>
            <Text style={styles.metricLabel}>Heart Beat (bpm)</Text>
          </View>
        </View>

        {/* Workout Chart */}
        <View style={styles.workoutContainer}>
          <View style={styles.workoutHeader}>
            <Text style={styles.sectionTitle}>Workout</Text>
            <View style={styles.workoutTabs}>
              {["Week", "Day", "Month"].map((tab, index) => (
                <Text key={index} style={[styles.workoutTab, tab === "Week" && styles.activeTab]}>
                  {tab}
                </Text>
              ))}
            </View>
          </View>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [{ data: [20, 45, 28, 80, 99, 43, 50] }],
            }}
            width={width - 40}
            height={200}
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#000",
              backgroundGradientTo: "#000",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 211, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: { r: "4", strokeWidth: "2", stroke: "#ffd300" },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dateItem: {
    paddingHorizontal: 15,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.5,
  },
  selectedDate: {
    color: '#ffd300',
    fontWeight: 'bold',
    opacity: 1,
    fontSize: 16,
  },
  healthGradeContainer: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  healthGradeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  healthGradeSubtitle: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
    width: '70%',
  },
  progressCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    top: 20,
    left: 22,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd300',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricBox: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffd300',
  },
  metricLabel: {
    fontSize: 14,
    color: '#bbb',
  },
  workoutContainer: {
    marginBottom: 20,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  workoutTabs: {
    flexDirection: 'row',
  },
  workoutTab: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 10,
  },
  activeTab: {
    color: '#ffd300',
    fontWeight: 'bold',
  },
});

export default InsightsScreen;
