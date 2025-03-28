import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import moment from 'moment';
import Svg, { Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const InsightsScreen = () => {
  const allDates = Array.from({ length: 30 }, (_, i) => moment().subtract(15 - i, 'days'));
  const todayIndex = allDates.findIndex(date => date.isSame(moment(), 'day'));
  const [selectedDate, setSelectedDate] = useState(moment());
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && todayIndex >= 0) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({
          index: todayIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }, 300);
    }
  }, []);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedDate.isSame(item, 'day');
    return (
      <TouchableOpacity onPress={() => handleDateSelection(item)} style={[styles.dateItem, isSelected && styles.selectedDateItem]}>
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{item.format('ddd')}</Text>
        <View style={[styles.dateCircle, isSelected && styles.selectedDateCircle]}>
          <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{item.format('DD')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [selectedFilter, setSelectedFilter] = useState('Weekly');
  const filterOptions = ['Weekly', 'Monthly', 'Yearly'];

  const chartData = {
    Weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [70, 71, 69, 72, 70, 73, 71],
    },
    Monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [69, 70, 72, 71],
    },
    Yearly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      data: [65, 68, 70, 72, 75, 78, 80],
    },
  };

  const renderChart = (label, dataObj) => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{label}</Text>
      <LineChart
        data={{
          labels: dataObj.labels,
          datasets: [{ data: dataObj.data }],
        }}
        width={width - 40}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={styles.chartStyle}
      />
    </View>
  );


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
          initialScrollIndex={todayIndex >= 0 ? todayIndex : 0}
          getItemLayout={(data, index) => ({ length: 70, offset: 70 * index, index })}
        />

        {/* Health Grade */}
        <View style={[styles.healthGradeContainer, { width: width - 40 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.healthGradeTitle}>Health Grade</Text>
            <Text style={styles.healthGradeSubtitle}>
              Perfect progress dude, keep going to apply your fitness activity
            </Text>
          </View>
          <View style={styles.progressCircle}>
            <Svg height="70" width="70">
              <Circle cx="35" cy="35" r="30" stroke="#ffd300" strokeWidth="4" fill="none" />
            </Svg>
            <Text style={styles.progressText}>80</Text>
          </View>
        </View>

          {/* Health Metrics */}
          <View style={styles.metricsContainer}>
          {[
            { label: "Calories", value: "620.98", icon: "fire" },
            { label: "Weight (kg)", value: "70.98", icon: "weight-kilogram" },
            { label: "Bicep Size (cm)", value: "35.5", icon: "arm-flex" },
            { label: "Hip Size (cm)", value: "98.2", icon: "human-female" },
            { label: "Chest Size (cm)", value: "105.3", icon: "human-male" },
            { label: "MAX H/R", value: "180", icon: "heart-pulse" },
          ].map((metric, index) => (
            <View key={index} style={[styles.metricBox, { width: (width - 60) / 2 }]}>
              <Icon name={metric.icon} size={30} color="#ffd300" />
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

            {/* Filter Tabs */}
                <View style={styles.filterContainer}>
                  {filterOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[styles.filterTab, selectedFilter === option && styles.activeFilterTab]}
                      onPress={() => setSelectedFilter(option)}
                    >
                      <Text style={[styles.filterText, selectedFilter === option && styles.activeFilterText]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
        
                {/* Charts */}
                {renderChart('Weight (kg)', chartData[selectedFilter])}
                {renderChart('Bicep Size (cm)', {
                  labels: chartData[selectedFilter].labels,
                  data: chartData[selectedFilter].data.map(value => value - 35),
                })}
                {renderChart('Hip Size (cm)', {
                  labels: chartData[selectedFilter].labels,
                  data: chartData[selectedFilter].data.map(value => value + 25),
                })}
                {renderChart('Chest Size (cm)', {
                  labels: chartData[selectedFilter].labels,
                  data: chartData[selectedFilter].data.map(value => value + 35),
                })}


      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundColor: '#000',
  backgroundGradientFrom: '#000',
  backgroundGradientTo: '#000',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 211, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: { r: '4', strokeWidth: '2', stroke: '#ffd300' },
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  selectedDateItem: {
    borderRadius: 20,
    backgroundColor: '#ffd300',
    padding: 5,
  },
  dayText: {
    color: '#aaa',
    fontSize: 14,
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateCircle: {
    backgroundColor: '#fff',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDateText: {
    color: '#000',
  },
  healthGradeContainer: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
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
  },
  progressCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressText: {
    position: 'absolute',
    top: 22,
    left: 25,
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffd300',
  },
  activeFilterTab: {
    backgroundColor: '#ffd300',
  },
  filterText: {
    color: '#ffd300',
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: '#000',
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  chartStyle: {
    borderRadius: 16,
  },
});

export default InsightsScreen;
