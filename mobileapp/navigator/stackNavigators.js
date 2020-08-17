import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/homeScreen';
import PrescriptionScreen from '../screens/prescription/prescriptionScreen';
import RecentDoctors from '../screens/prescription/recentDoctors';
import DoctorsScreen from '../screens/request/doctorScreen';
import ChatbotScreen from '../screens/botScreen';
import LogoTitle from '../Components/logoTitle';
import Location from '../screens/Location';
import DietScreen from '../screens/dietScreen';

const Stack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#007aff'},
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export const PrescriptionStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#007aff'},
    }}>
    <Stack.Screen name="Recent Doctors" component={RecentDoctors} />
    <Stack.Screen name="Prescriptions" component={PrescriptionScreen} />
  </Stack.Navigator>
);

export const RequestStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#007aff'},
    }}>
    <Stack.Screen name="Doctors" component={DoctorsScreen} />
  </Stack.Navigator>
);

export const ChatbotStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#094074'},
    }}>
    <Stack.Screen
      name="ChatBot"
      options={(props) => ({
        headerTitle: <LogoTitle {...props} />,
      })}
      component={ChatbotScreen}
    />
  </Stack.Navigator>
);

export const LocationStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#007aff'},
    }}>
    <Stack.Screen name="Nearest Hospitals!" component={Location} />
  </Stack.Navigator>
);

export const DietStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#5b6962'},
    }}>
    <Stack.Screen name="My Diet" component={DietScreen} />
  </Stack.Navigator>
);
