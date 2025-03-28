import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { Pedometer, Accelerometer, Gyroscope, Barometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define background task name
const BACKGROUND_TRACKER = 'background-fitness-tracker';

TaskManager.defineTask(BACKGROUND_TRACKER, async () => {
  try {
    const stepCount = await Pedometer.getStepCountAsync(new Date(), new Date());
    
    let motion = { x: 0, y: 0, z: 0 };
    let rotation = { x: 0, y: 0, z: 0 };
    let altitude = null;

    const accSubscription = Accelerometer.addListener((data) => { motion = data; });
    const gyroSubscription = Gyroscope.addListener((data) => { rotation = data; });
    const baroSubscription = Barometer.addListener((data) => { altitude = data.pressure; });

    setTimeout(() => {
      accSubscription?.remove();
      gyroSubscription?.remove();
      baroSubscription?.remove();
    }, 2000);

    const newData = {
      timestamp: new Date().toISOString(),
      steps: stepCount?.steps || 0,
      motion,
      rotation,
      altitude,
    };

    const existingData = JSON.parse(await AsyncStorage.getItem('fitness_data')) || [];
    existingData.push(newData);
    await AsyncStorage.setItem('fitness_data', JSON.stringify(existingData));

    console.log('Background tracking data saved:', newData);
    
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background Task Error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Register background task
export async function registerBackgroundTask() {
  const status = await BackgroundFetch.getStatusAsync();
  if (status === BackgroundFetch.BackgroundFetchStatus.Available) {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TRACKER, {
      minimumInterval: 15 * 60, // Every 15 minutes
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log('Background tracking enabled.');
  } else {
    console.log('Background tracking not available.');
  }
}
