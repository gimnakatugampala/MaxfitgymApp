import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStartedScreen from './src/screens/GetStartedScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import VerificationPhoneNumberScreen from './src/screens/VerificationPhoneNumberScreen';
import MembershipDetailsScreen from './src/screens/MembershipDetailsScreen';
import BottomNavigation from './src/navigation/BottomNavigation'; // Bottom Tab Navigation

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        {/* Onboarding Screens */}
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="VerificationPhoneNumber" component={VerificationPhoneNumberScreen} />
        <Stack.Screen name="MembershipDetails" component={MembershipDetailsScreen} />

        {/* Home & Bottom Navigation */}
        <Stack.Screen name="HomeNav" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
