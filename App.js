import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pedometer, Accelerometer, Gyroscope, Barometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerBackgroundTask } from './src/components/BackgroundTracker';
import GetStartedScreen from './src/screens/GetStartedScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import VerificationPhoneNumberScreen from './src/screens/VerificationPhoneNumberScreen';
import MembershipDetailsScreen from './src/screens/MembershipDetailsScreen';
import BottomNavigation from './src/navigation/BottomNavigation';

const Stack = createStackNavigator();

export default function App() {
  const [liveData, setLiveData] = useState({
    steps: 0,
    motion: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    altitude: null,
  });

  useEffect(() => {
    registerBackgroundTask(); // Start background tracking

    // Step Counter
    Pedometer.watchStepCount((result) => {
      setLiveData((prev) => ({ ...prev, steps: result.steps }));
    });

    // Accelerometer (Motion)
    Accelerometer.addListener((data) => {
      setLiveData((prev) => ({ ...prev, motion: data }));
    });

    // Gyroscope (Rotation)
    Gyroscope.addListener((data) => {
      setLiveData((prev) => ({ ...prev, rotation: data }));
    });

    // Barometer (Altitude)
    Barometer.addListener((data) => {
      setLiveData((prev) => ({ ...prev, altitude: data.pressure }));
    });

    return () => {
      Accelerometer.removeAllListeners();
      Gyroscope.removeAllListeners();
      Barometer.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    // Save real-time data every 10 seconds
    const interval = setInterval(async () => {
      const existingData = JSON.parse(await AsyncStorage.getItem('fitness_data')) || [];
      existingData.push({ timestamp: new Date().toISOString(), ...liveData });
      await AsyncStorage.setItem('fitness_data', JSON.stringify(existingData));
      console.log('Live fitness data saved:', liveData);
    }, 10000);

    return () => clearInterval(interval);
  }, [liveData]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="VerificationPhoneNumber" component={VerificationPhoneNumberScreen} />
        <Stack.Screen name="MembershipDetails" component={MembershipDetailsScreen} />
        <Stack.Screen name="HomeNav" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
